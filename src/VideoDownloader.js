import React, { useState } from 'react';
import axios from 'axios';
import "./Style.css";

const VideoDownloader = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleDownload = async () => {
        try {
            const response = await axios.post(
                'https://yt-backend-5nnt.onrender.com/download',
                { url: videoUrl },
                {
                    headers: {
                        'Content-Type': 'application/json', // Set content type as JSON
                    },
                }
            );

            const blob = new Blob([response.data], { type: 'video/mp4' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'video.mp4';
            link.click();
            
            setMessage("Download successful!");
        } catch (error) {
            console.error("Error downloading video:", error);
            setMessage("Something went wrong: " + error.response?.data?.error || error.message);
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
            {message && <p>{message}</p>}
        </div>
    );
};

export default VideoDownloader;
