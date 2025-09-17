import { Button } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import { toPng } from "html-to-image";

type Props = {
  selector: string;
  fileName: string;
};

export default function DownloadChartsButton({ selector, fileName }: Props) {
  function downloadImage(dataUrl: string) {
    const a = document.createElement("a");
    a.setAttribute("download", fileName);
    a.setAttribute("href", dataUrl);
    a.click();
  }
  const handleClick = () => {
     setTimeout(() => {
   const element = document.querySelector(
        selector
      ) as HTMLElement | null;
      if (!element) {
        console.warn( selector + " not found.");
        return;
      }
    document.fonts.ready.then(() => {
      toPng(element, {
        backgroundColor: "##ececec",
        pixelRatio: 2,
        style: {
          fontFamily: "Arial, sans-serif",
        },
      })
        .then((dataUrl) => {
          downloadImage(dataUrl);
        })
          .catch((err) => {
          console.error(err);
        });
    });
  },300);
  };

  return (
    <Button
      onClick={handleClick}
      leftIcon={<FiDownload />}
      size="sm"
      colorScheme="blue"
    >
      Download
    </Button>
  );
}
