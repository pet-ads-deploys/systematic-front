import {  IconButton } from "@chakra-ui/react";
import { Panel, useReactFlow } from "@xyflow/react";
import { toPng } from "html-to-image";
import { FiDownload } from "react-icons/fi";

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");
  a.setAttribute("download", "StudiesFunnel.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

export default function DownloadFunnelButton() {
  const { fitView } = useReactFlow();

  const ButtonClick = (): void => {
    fitView();

    setTimeout(() => {
      const element = document.querySelector(
        ".react-flow__viewport"
      ) as HTMLElement | null;
      if (!element) {
        console.warn(" .react-flow__viewport not found.");
        return;
      }

      toPng(element, {
        backgroundColor: "#ececec",
        pixelRatio: 2,
        skipFonts: true,
      })
        .then((dataUrl) => {
          downloadImage(dataUrl);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 300);
  };

  return (
    <Panel position="top-right">
      <IconButton
        onClick={ButtonClick}
        aria-label="Download Image"
        icon={<FiDownload />}
        size="sm"
      />
    </Panel>
  );
}
