import React, { useState } from "react";

function cleanUrl(url) {
  // Remove "range=...&" from URL
  url = url.replace(/range=[^&]*&?/, "");
  // Remove "=1&srfvp=1"
  url = url.replace("=1&srfvp=1", "");
  // Clean trailing '&' or '?'
  url = url.replace(/[&?]+$/, "");
  return url;
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function UrlCleaner() {
  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [cleanedVideoUrl, setCleanedVideoUrl] = useState("");
  const [cleanedAudioUrl, setCleanedAudioUrl] = useState("");

  const handleClean = () => {
    const cleanedVideo = videoUrl ? cleanUrl(videoUrl) : "";
    const cleanedAudio = audioUrl ? cleanUrl(audioUrl) : "";

    setCleanedVideoUrl(cleanedVideo);
    setCleanedAudioUrl(cleanedAudio);
  };

  const handleDownloadVideo = () => {
    if (cleanedVideoUrl) {
      downloadText("video.url.txt", cleanedVideoUrl);
    }
  };

  const handleDownloadAudio = () => {
    if (cleanedAudioUrl) {
      downloadText("audio.url.txt", cleanedAudioUrl);
    }
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleReset = () => {
    setVideoUrl("");
    setAudioUrl("");
    setCleanedVideoUrl("");
    setCleanedAudioUrl("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Google Drive URL Cleaner</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Video URL</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste video URL here"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Audio URL</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="Paste audio URL here"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClean}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            disabled={!videoUrl && !audioUrl}
          >
            Clean URLs
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {(cleanedVideoUrl || cleanedAudioUrl) && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Cleaned URLs:</h3>
          
          {cleanedVideoUrl && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Video URL:</label>
              <div className="bg-gray-50 p-3 rounded-lg border">
                <p className="text-sm text-gray-600 break-all mb-3">{cleanedVideoUrl}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(cleanedVideoUrl, '_blank')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Download Video
                  </button>
                  <button
                    onClick={() => handleCopyToClipboard(cleanedVideoUrl)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors text-sm"
                  >
                    Copy
                  </button>
                  <button
                    onClick={handleDownloadVideo}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    Download as TXT
                  </button>
                </div>
              </div>
            </div>
          )}

          {cleanedAudioUrl && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Audio URL:</label>
              <div className="bg-gray-50 p-3 rounded-lg border">
                <p className="text-sm text-gray-600 break-all mb-3">{cleanedAudioUrl}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(cleanedAudioUrl, '_blank')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Download Audio
                  </button>
                  <button
                    onClick={() => handleCopyToClipboard(cleanedAudioUrl)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors text-sm"
                  >
                    Copy
                  </button>
                  <button
                    onClick={handleDownloadAudio}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    Download as TXT
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}