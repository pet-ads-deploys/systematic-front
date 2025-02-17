interface FileProps {
  fileExtension: string;
  entries: string[];
}

export function createFileToInvalidEntries({
  fileExtension,
  entries,
}: FileProps) {
  const content = entries.join("\n");
  const type =
    fileExtension === "bib" ? "application/x-bibtex" : "application/rdf+xml";
  return new Blob([content], { type });
}

export function downloadFile(file: Blob, fileName: string) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


