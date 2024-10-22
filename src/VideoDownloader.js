import React, { useState } from "react";
import axios from "axios";
import "./Style.css";

const VideoDownloader = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!videoUrl.trim()) {
      setMessage("Please enter a valid video URL.");
      return;
    }

    setIsDownloading(true); // Disable button during download

    try {
      const response = await axios.post(
        "https://yt-backend-5nnt.onrender.com/download",
        { url: videoUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob", // Expect a blob (binary data)
        }
      );

      const blob = new Blob([response.data], { type: "video/mp4" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "video.mp4";
      link.click();

      setMessage("Download successful!");
    } catch (error) {
      console.error("Error downloading video:", error);
      if (error.message.includes("Sign in to confirm you’re not a bot")) {
        setMessage(
          "This video requires sign-in or CAPTCHA verification. Please download it manually from YouTube."
        );
      } else {
        setMessage(
          "Something went wrong: " +
            (error.response?.data?.error || error.message)
        );
      }
    } finally {
      setIsDownloading(false); // Re-enable button after download completes
    }
  };

  return (
    <div>
      <h1>Download YouTube Video</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter video URL"
      />
      <button onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? "Downloading..." : "Download"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VideoDownloader;
