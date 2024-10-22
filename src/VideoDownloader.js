import React, { useState } from "react";
import axios from "axios";
import "./Style.css"; // Import the CSS file

function VideoDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleDownload = async () => {
    try {
      const response = await axios.post(
        "https://yt-backend-5nnt.onrender.com/download",
        {
          video_url: videoUrl,
        },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "video/mp4" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "downloaded_video.mp4"; // Default file name
      link.click();

      setMessage("Download successful");
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>Download YouTube Video</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter YouTube video URL"
      />
      <button onClick={handleDownload}>Download</button>
      <p>{message}</p>
    </div>
  );
}

export default VideoDownloader;
