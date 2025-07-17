/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FormatFileSize } from "../../utils/helpers/FormatFileSize";
import axios, { CancelTokenSource } from "axios";
import { v4 } from "uuid";

interface IFileCustom extends File {
  sizeFormatted: number;
  uuid: string;
  progress: number;
  status: "IN_PROGRESS" | "FAILED_PROGRESS" | "FINISH_PROGRESS";
  onAbortUpload: CancelTokenSource;
}
const abortList: any[] = [];
const useUploadHandler = () => {
  const [files, setFiles] = useState<IFileCustom[]>([]);

  const dropHandler = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === "file") {
          const file = ev.dataTransfer.items[i].getAsFile() as any;
          file.sizeFormatted = FormatFileSize(file.size as number, 2);
          file.uuid = v4();
          file.progress = 0;

          const formData = new FormData();
          formData.append("file", file);
          uploadFile(formData, file);
          setFiles((prev) => [...prev, file]);
        }
      }
    }
  };

  const dragOverHandler = (ev: React.DragEvent<HTMLDivElement>) => {
    console.log("File(s) in drop zone");
    ev.preventDefault();
  };

  const uploadFile = (formData: FormData, file: IFileCustom) => {
    const updateProgressFiles = (_files: IFileCustom[], progress: number) => {
      const filesList = _files.map((x) => {
        if (x.uuid === file.uuid) {
          x.progress = progress;
          if (progress <= 0 || progress < 100) {
            x.status = "IN_PROGRESS";
          }
          if (progress === 100) {
            x.status = "FINISH_PROGRESS";
          }
          console.log(progress);
        }
        return x;
      });

      return filesList;
    };

    const abortUploadProgress = () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      abortList.push(source);
      console.log(abortList);
      return source;
    };

    const source = abortUploadProgress();

    axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    axios
      .post("https://file.io", formData, {
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded / (e.total || 1)) * 100);
          setFiles((prev) => updateProgressFiles(prev, progress));
        },
        cancelToken: source.token,
      })
      .then((response: { data: any }) => {
        console.log(response.data);
      })
      .catch((error: { message: string }) => {
        if (axios.isCancel(error)) {
          setFiles((prev) =>
            prev.map((_) => {
              if (_.uuid === error.message) {
                _.status = "FAILED_PROGRESS";
              }
              return _;
            })
          );
        }
        console.error(error);
      });
  };

  const reloadUploadFile = (file: IFileCustom) => {
    const formData = new FormData();
    formData.append("file", file);
    uploadFile(formData, file);
  };

  return {
    dropHandler,
    dragOverHandler,
    files,
    abortList,
    reloadUploadFile,
  };
};

export { useUploadHandler };
