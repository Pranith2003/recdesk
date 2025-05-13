"use client";

import FileInput from "@/components/fileinput";
import FormFields from "@/components/formfields";
import { useFileInput } from "@/lib/useFileInput";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "../../../../constants";
import {
  getThumbnailUploadUrl,
  getVideoUploadUrl,
  saveVideoDetails,
} from "@/lib/actions/video";
import { apiFetch } from "@/lib/utils";
import { useRouter } from "next/navigation";

const fileUploadToBunny = async (
  file: File,
  uploadUrl: string,
  accessKey: string,
): Promise<void> => {
  return apiFetch(uploadUrl, {
    method: "PUT",
    bunnyType: "storage",
    headers: {
      "Content-Type": file.type,
      AccessKey: accessKey,
    },
    body: file,
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to Upload File");
    }
  });
};

export default function Page() {
  const router = useRouter();
  const [formFields, setFormFields] = useState({
    title: "",
    description: "",
    visibility: "public",
  });
  const [videoDuration, setVideoDuration] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState("");
  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  useEffect(() => {
    if (video.duration !== null || video.duration !== 0) {
      setVideoDuration(video.duration);
    }
  }, [video.duration]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      if (!video.file || !thumbnail.file) {
        setErrors("Please Upload Video or thumbnail");
        return;
      }
      if (
        !formFields.description ||
        !formFields.title ||
        !formFields.visibility
      ) {
        console.log(formFields);
        setErrors("Form Fields cannot be empty");
        return;
      }

      const {
        videoId,
        uploadUrl: videoUploadUrl,
        accessKey: videoAccessKey,
      } = await getVideoUploadUrl();

      if (!videoUploadUrl || !videoAccessKey) {
        throw new Error("Failed to get video credentails");
      }
      await fileUploadToBunny(video.file, videoUploadUrl, videoAccessKey);

      const {
        uploadUrl: thumbnailUploadUrl,
        accessKey: thumbnailAccessKey,
        cdnUrl: thumbnailCdnUrl,
      } = await getThumbnailUploadUrl(videoId);

      if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl) {
        throw new Error("Failed to get thumbnail credentails");
      }
      await fileUploadToBunny(
        thumbnail.file,
        thumbnailUploadUrl,
        thumbnailAccessKey,
      );

      await saveVideoDetails({
        videoId,
        thumbnailUrl: thumbnailCdnUrl,
        ...formFields,
        duration: videoDuration,
      });

      router.push(`vidoe/${videoId}`);
    } catch (err) {
      console.log(err);
      // setErrors(err);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a Video</h1>
      {errors && <div className="error-field">{errors}</div>}
      <form
        className="rounded-20 shadow-10 gap-6 flex flex-col w-full px-5 py-7.5"
        onSubmit={handleSubmit}
      >
        <FormFields
          id="title"
          label="Title"
          value={formFields.title}
          placeholder="Enter a clear and consie title"
          onChange={handleInputChange}
        />
        <FormFields
          id="description"
          label="Description"
          value={formFields.description}
          placeholder="Describe what this video about"
          onChange={handleInputChange}
          as="textarea"
        />
        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          file={video.file}
          onChange={video.handleFileChange}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onReset={video.resetFile}
          type="video"
        />
        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          file={thumbnail.file}
          onChange={thumbnail.handleFileChange}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onReset={thumbnail.resetFile}
          type="image"
        />
        <FormFields
          id="visibility"
          label="Visibility"
          value={formFields.visibility}
          placeholder="Describe what this video about"
          onChange={handleInputChange}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
        />

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Uploading..." : "Upload a Video"}
        </button>
      </form>
    </div>
  );
}
