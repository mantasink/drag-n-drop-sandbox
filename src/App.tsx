import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Toggle from "./Toggle";

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [useFsAccessApi, setUseFsAccessApi] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    useFsAccessApi: useFsAccessApi,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseFsAccessApi(event.target.checked);
  };

  return (
    <div className="m-3">
      <h1 className="text-3xl font-bold mb-1">Testing Drag'n'drop</h1>

      <div className="mt-5">
        <Toggle
          checked={useFsAccessApi}
          onChange={handleCheckboxChange}
          label="Use File System Access API"
        />
      </div>

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={`h-80 rounded-lg flex items-center justify-center font-semibold ${
            isDragActive ? "bg-green-600" : "bg-blue-800"
          } text-white`}
        >
          {isDragActive ? "Drop here" : "Drag 'n' drop some files here"}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-bold">Selected Files</h2>
        {files.length === 0 && <div>(none)</div>}
        <ul>
          {files.map((file) => (
            <li key={file.name} className="font-light">
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
