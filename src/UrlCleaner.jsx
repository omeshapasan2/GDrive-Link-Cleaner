import React, { useState, useEffect } from "react";
import { Moon, Sun, Copy, Download, ExternalLink, Trash2, Check, Zap } from "lucide-react";

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
  const [isDark, setIsDark] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [cleanedVideoUrl, setCleanedVideoUrl] = useState("");
  const [cleanedAudioUrl, setCleanedAudioUrl] = useState("");
  const [copiedVideo, setCopiedVideo] = useState(false);
  const [copiedAudio, setCopiedAudio] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleClean = async () => {
    setIsProcessing(true);
    
    // Simulate processing time for smooth animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const cleanedVideo = videoUrl ? cleanUrl(videoUrl) : "";
    const cleanedAudio = audioUrl ? cleanUrl(audioUrl) : "";

    setCleanedVideoUrl(cleanedVideo);
    setCleanedAudioUrl(cleanedAudio);
    setIsProcessing(false);
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

  const handleCopyToClipboard = async (text, type) => {
    await navigator.clipboard.writeText(text);
    if (type === 'video') {
      setCopiedVideo(true);
      setTimeout(() => setCopiedVideo(false), 2000);
    } else {
      setCopiedAudio(true);
      setTimeout(() => setCopiedAudio(false), 2000);
    }
  };

  const handleReset = () => {
    setVideoUrl("");
    setAudioUrl("");
    setCleanedVideoUrl("");
    setCleanedAudioUrl("");
    setCopiedVideo(false);
    setCopiedAudio(false);
  };

  const themeClasses = {
    bg: isDark ? 'bg-gray-900' : 'bg-gray-50',
    cardBg: isDark ? 'bg-black' : 'bg-white',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    input: isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-400' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500',
    resultBg: isDark ? 'bg-gray-800' : 'bg-gray-50'
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses.bg} flex items-center justify-center p-4 z-999`}>
      <div className={`w-full max-w-4xl ${themeClasses.cardBg} shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.01]`}>
        {/* Header */}
        <div className={`p-6 border-b ${themeClasses.border} flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${themeClasses.text}`}>
                URL Cleaner Pro
              </h1>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Clean Google Drive URLs instantly
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transform hover:scale-110`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className={`block text-sm font-semibold ${themeClasses.text} flex items-center space-x-2`}>
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Video URL</span>
              </label>
              <div className="relative">
                <input
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-200 focus:outline-none ${themeClasses.input}`}
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste your Google Drive video URL here..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    videoUrl ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className={`block text-sm font-semibold ${themeClasses.text} flex items-center space-x-2`}>
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Audio URL</span>
              </label>
              <div className="relative">
                <input
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-200 focus:outline-none ${themeClasses.input}`}
                  type="text"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  placeholder="Paste your Google Drive audio URL here..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    audioUrl ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 z-40">
            <button
              onClick={handleClean}
              disabled={(!videoUrl && !audioUrl) || isProcessing}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                isDark
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Clean URLs</span>
                </div>
              )}
            </button>
            
            <button
              onClick={handleReset}
              className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Trash2 className="w-5 h-5" />
                <span>Reset</span>
              </div>
            </button>
          </div>

          {/* Results Section */}
          {(cleanedVideoUrl || cleanedAudioUrl) && (
            <div className={`space-y-6 pt-6 border-t ${themeClasses.border} animate-fade-in`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${themeClasses.text}`}>
                  Cleaned URLs Ready!
                </h3>
              </div>
              
              <div className="grid gap-6">
                {cleanedVideoUrl && (
                  <div className={`p-6 rounded-xl ${themeClasses.resultBg} border ${themeClasses.border} transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <h4 className={`font-semibold ${themeClasses.text}`}>Video URL</h4>
                    </div>
                    <div className={`p-4 rounded-lg bg-opacity-50 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
                      <p className={`text-sm ${themeClasses.textSecondary} break-all font-mono`}>
                        {cleanedVideoUrl}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => window.open(cleanedVideoUrl, '_blank')}
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open Video</span>
                      </button>
                      <button
                        onClick={() => handleCopyToClipboard(cleanedVideoUrl, 'video')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                          copiedVideo
                            ? 'bg-green-500 text-white'
                            : isDark
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        {copiedVideo ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedVideo ? 'Copied!' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={handleDownloadVideo}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                          isDark
                            ? 'bg-blue-700 hover:bg-blue-600 text-blue-200'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        <span>Download TXT</span>
                      </button>
                    </div>
                  </div>
                )}

                {cleanedAudioUrl && (
                  <div className={`p-6 rounded-xl ${themeClasses.resultBg} border ${themeClasses.border} transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <h4 className={`font-semibold ${themeClasses.text}`}>Audio URL</h4>
                    </div>
                    <div className={`p-4 rounded-lg bg-opacity-50 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
                      <p className={`text-sm ${themeClasses.textSecondary} break-all font-mono`}>
                        {cleanedAudioUrl}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => window.open(cleanedAudioUrl, '_blank')}
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open Audio</span>
                      </button>
                      <button
                        onClick={() => handleCopyToClipboard(cleanedAudioUrl, 'audio')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                          copiedAudio
                            ? 'bg-green-500 text-white'
                            : isDark
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        {copiedAudio ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedAudio ? 'Copied!' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={handleDownloadAudio}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                          isDark
                            ? 'bg-blue-700 hover:bg-blue-600 text-blue-200'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        <span>Download TXT</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}