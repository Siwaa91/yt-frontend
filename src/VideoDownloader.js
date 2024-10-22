import React, { useState } from "react";
import axios from "axios";
import "./Style.css"; // Import the CSS file

function VideoDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleDownload = async () => {
    try {
        const response = await axios.post('https://yt-backend-5nnt.onrender.com/download', {
            url: videoUrl, // Ensure videoUrl is correctly set
        });

        // Handle successful response
        const blob = new Blob([response.data], { type: 'video/mp4' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'video.mp4'; // Set the desired filename
        link.click();
    } catch (error) {
        console.error("Error downloading video:", error.response.data);
        alert("Something went wrong: " + error.response.data.error);
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
