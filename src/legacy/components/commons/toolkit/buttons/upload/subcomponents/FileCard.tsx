/* eslint-disable @typescript-eslint/no-explicit-any */
import "../upload.css";
import CloseIcon from "/assets/Close.svg";
import ReloadIcon from "/assets/Reload.svg";
import InProgressIcon from "/assets/InProgress.svg";
import FailedProgressIcon from "/assets/FailedProgress.svg";
import FinishProgressIcon from "/assets/FinishedProgress.svg";

interface FileCardProps {
  file: {
    name: string;
    sizeFormatted: string;
    progress: number;
    status: "IN_PROGRESS" | "FAILED_PROGRESS" | "FINISH_PROGRESS";
  };
  visibility: string;
  reloadUploadFile: (file: any) => void;
  abortUploadProgress: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, visibility, reloadUploadFile, abortUploadProgress }) => {
  return (
    <div className="content-card-list-files" style={{ display: visibility }}>
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

        <div className="content-file">
          <div className="file-title primary-text">{file.name}</div>
          <div className="file-size secondary-text">{file.sizeFormatted}</div>
          <div className="file-progress">
            <div className="bar-progress">
              <div
                className={`file-progress-bg ${file.status?.toLowerCase()}`}
                style={{ width: `${file.progress ?? 0}%` }}
              ></div>
            </div>
            <div className="count-progress secondary-text">{`${file.progress ?? 0}%`}</div>
          </div>
        </div>
      </div>

      <div className="handle-action-upload">
        {file.status === "FAILED_PROGRESS" ? (
          <img src={ReloadIcon} onClick={() => reloadUploadFile(file)} alt="Fechar" style={{ cursor: "pointer" }} />
        ) : (
          <img src={CloseIcon} onClick={abortUploadProgress} alt="Fechar" style={{ cursor: "pointer" }} />
        )}
      </div>
    </div>
  );
};

export default FileCard;
