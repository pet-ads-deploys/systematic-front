import { Button } from "@chakra-ui/react";
import { Panel, useReactFlow } from "@xyflow/react";
import { toPng } from "html-to-image";
import { FiDownload } from "react-icons/fi";


type Props={
  selector:string
  fileName:string
}

export default function DownloadFunnelButton({selector,fileName}: Props) {


  function downloadImage(dataUrl: string) {
  const a = document.createElement("a");
  a.setAttribute("download", fileName);
  a.setAttribute("href", dataUrl);
  a.click();
}

  const { fitView } = useReactFlow();

  const handleClick = (): void => {
    fitView();

    setTimeout(() => {
      const element = document.querySelector(
        selector
      ) as HTMLElement | null;
      if (!element) {
        console.warn( selector + " not found.");
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
    <Panel position="bottom-right">
      <Button
        onClick={handleClick}
        leftIcon={<FiDownload/>}
        size="sm"
        colorScheme="blue"
      >
        Download
      </Button>
    </Panel>
  );
}
