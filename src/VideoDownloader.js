import React, { useState } from 'react';
import axios from 'axios';
import "./Style.css";

const VideoDownloader = () => {
    const [videoUrl, setVideoUrl] = useState('');

    const handleDownload = async () => {
        try {
            const response = await axios.post('https://yt-backend-5nnt.onrender.com/download', {
                url: videoUrl,
            });

            const blob = new Blob([response.data], { type: 'video/mp4' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'video.mp4';
            link.click();
        } catch (error) {
            console.error("Error downloading video:", error.response.data);
            alert("Something went wrong: " + error.response.data.error);
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
            <button onClick={handleDownload}>Download</button>
        </div>
    );
};

export default VideoDownloader;
