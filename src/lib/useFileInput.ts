import { useRef, useState, ChangeEvent } from "react";

export const useFileInput = (maxSize: number) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFiles = e.target.files[0];
      if (selectedFiles.size > maxSize) return;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(selectedFiles);
      const objectUrl = URL.createObjectURL(selectedFiles);
      setPreviewUrl(objectUrl);
      if (selectedFiles.type.startsWith("video")) {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          if (isFinite(video.duration) && video.duration > 0) {
            setDuration(Math.round(video.duration));
          } else {
            setDuration(0);
          }
          URL.revokeObjectURL(video.src);
        };
        video.src = objectUrl;
      }
    }
  };

  const resetFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl("");
    setDuration(0);

    if (inputRef.current) inputRef.current.value = "";
  };

  return {
    file,
    previewUrl,
    duration,
    inputRef,
    handleFileChange,
    resetFile,
  };
};
