import { useUploadHandler } from "../../../../../../hooks/useUploadHandler";
import CloudIcon from "/assets/CloudArrowUp.svg";
import FailedProgressIcon from "/assets/FailedProgress.svg";
import FinishProgressIcon from "/assets/FinishedProgress.svg";
import InProgressIcon from "/assets/InProgress.svg";
import CloseIcon from "/assets/Close.svg";
import ReloadIcon from "/assets/Reload.svg";
import "./upload.css";
import { useState } from "react";

const Upload = () => {
  const { dropHandler, dragOverHandler, files, abortList, reloadUploadFile } =
    useUploadHandler();
  const [visibilities, setVisibilities] = useState(
    Array(files.length).fill("block")
  );

  const abortUploadProgress = (index: number) => {
    if (abortList[index]) {
      abortList[index].cancel();
      const newVisibilities = [...visibilities];
      newVisibilities[index] = "none";
      setVisibilities(newVisibilities);
    } else {
      console.error("Abort list item at index", index, "is undefined");
    }
  };
  return (
    <>
      <div className="container-upload">
        <div id="drop_zone" onDrop={dropHandler} onDragOver={dragOverHandler}>
          <img src={CloudIcon} alt="Cloud Icon React" />
          <h1 className="upload-drag-title">Importe seus arquivos</h1>
          <p className="secondary-text">Arraste ou clique para fazer upload</p>
        </div>
        <div className="container-list-files">
          {files.map((file, key) => (
            <div
              key={key}
              className="content-card-list-files"
              style={{ display: visibilities[key] }}
            >
              <div className="thumb-image">
                <img
                  src={
                    file.status === "IN_PROGRESS"
                      ? InProgressIcon
                      : file.status === "FINISH_PROGRESS"
                      ? FinishProgressIcon
                      : FailedProgressIcon
                  }
                  alt="In Progress React"
                />
              </div>
              <div className="content-file">
                <div className="file-title primary-text">{file.name}</div>
                <div className="file-size secondary-text">
                  {file.sizeFormatted}
                </div>
                <div className="file-progress">
                  <div className="bar-progress">
                    <div
                      className={`file-progress-bg ${file.status?.toLowerCase()}`}
                      style={{ width: `${file.progress ?? 0}%` }}
                    ></div>
                  </div>
                  <div className="count-progress secondary-text">{`${
                    file.progress ?? 0
                  }%`}</div>
                </div>
              </div>
              <div className="handle-action-upload">
                {file.status === "FAILED_PROGRESS" ? (
                  <img
                    src={ReloadIcon}
                    onClick={() => reloadUploadFile(file)}
                    alt="Fechar"
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <img
                    src={CloseIcon}
                    onClick={() => abortUploadProgress(key)}
                    alt="Fechar"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { Upload };
