import React, { useState } from 'react';
import { Info, X, Video, Volume2, Zap, Download } from 'lucide-react';

const GuideModal = ({ isDark = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('video');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const themeClasses = {
    cardBg: isDark ? 'bg-black' : 'bg-white',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    resultBg: isDark ? 'bg-gray-800' : 'bg-gray-50',
    hoverBg: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className={`p-3 rounded-xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } transform hover:scale-110`}
      >
        <Info className="w-5 h-5" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in z-999">
          <div className={`${themeClasses.cardBg} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transition-all duration-500 transform hover:scale-[1.01]`}>
            {/* Modal Header */}
            <div className={`flex justify-between items-center p-6 border-b ${themeClasses.border}`}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${themeClasses.text}`}>
                    Google Drive URL Extraction Guide
                  </h2>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Learn how to extract downloadable URLs
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } transform hover:scale-110`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className={`flex border-b ${themeClasses.border} ${themeClasses.resultBg}`}>
              <button
                onClick={() => setActiveTab('video')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'video'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : `${themeClasses.text} ${themeClasses.hoverBg}`
                } rounded-t-lg`}
              >
                <Video className="w-4 h-4" />
                Video Extraction
              </button>
              <button
                onClick={() => setActiveTab('audio')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'audio'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : `${themeClasses.text} ${themeClasses.hoverBg}`
                } rounded-t-lg`}
              >
                <Volume2 className="w-4 h-4" />
                Audio Extraction
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {activeTab === 'video' && (
                <div className="space-y-6">
                  <div className={`${isDark ? 'bg-blue-900/20 border-l-4 border-blue-500' : 'bg-blue-50 border-l-4 border-blue-500'} p-4 rounded-r-xl`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Video className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-lg font-bold ${themeClasses.text}`}>Video URL Extraction</h3>
                    </div>
                    <p className={`${themeClasses.textSecondary}`}>Follow these steps to extract downloadable video URLs from Google Drive</p>
                  </div>

                  {/* Step 1 */}
                  <div className={`border ${themeClasses.border} rounded-xl p-6 ${themeClasses.resultBg} transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <h4 className={`text-lg font-bold ${themeClasses.text}`}>Open the Video</h4>
                    </div>
                    <div className={`${themeClasses.textSecondary} space-y-2`}>
                      <p>• Open the view-only Google Drive video in your browser (Chrome recommended)</p>
                      <p>• Set the video quality to the highest available setting</p>
                      <p>• Play the video for a few seconds to ensure it loads properly</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className={`border ${themeClasses.border} rounded-xl p-6 ${themeClasses.resultBg} transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <h4 className={`text-lg font-bold ${themeClasses.text}`}>Open Developer Tools</h4>
                    </div>
                    <div className={`${themeClasses.textSecondary} space-y-3`}>
                      <p>• Right-click anywhere on the page and select <strong className={themeClasses.text}>"Inspect"</strong> or press <kbd className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} px-2 py-1 rounded text-sm`}>Ctrl+Shift+I</kbd></p>
                      <p>• Navigate to the <strong className={themeClasses.text}>"Network"</strong> tab in the developer tools</p>
                      <p>• In the filter box, type <code className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} px-2 py-1 rounded text-sm font-mono`}>mime=video</code> or simply <code className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} px-2 py-1 rounded text-sm font-mono`}>video</code></p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className={`border ${themeClasses.border} rounded-xl p-6 ${themeClasses.resultBg} transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <h4 className={`text-lg font-bold ${themeClasses.text}`}>Find and Copy the URL</h4>
                    </div>
                    <div className={`${themeClasses.textSecondary} space-y-3`}>
                      <p>• Sort the network requests by <strong className={themeClasses.text}>"Size"</strong> in descending order (largest first)</p>
                      <p>• Look for a request that contains <code className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} px-2 py-1 rounded text-sm font-mono`}>mime=video/mp4</code></p>
                      <p>• Right-click on that request and select <strong className={themeClasses.text}>"Copy"</strong> → <strong className={themeClasses.text}>"Copy link address"</strong></p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className={`border ${themeClasses.border} rounded-xl p-6 ${themeClasses.resultBg} transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">4</span>
                      </div>
                      <h4 className={`text-lg font-bold ${themeClasses.text}`}>Use GDrive URL Cleaner</h4>
                    </div>
                    <div className={`${themeClasses.textSecondary} space-y-3`}>
                      <p>Paste the copied URL into our app and click <strong className={themeClasses.text}>"Clean URLs"</strong>. The tool will automatically:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Remove <code className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} px-2 py-1 rounded text-sm font-mono`}>=1&srfvp=1</code> from the end</li>
                        <li>Remove the <code className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} px-2 py-1 rounded text-sm font-mono`}>range=xxxx-yyyy&</code> parameter</li>
                      </ul>
                      <div className={`${isDark ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-50 border border-green-200'} rounded-xl p-4 mt-4`}>
                        <p className={`${isDark ? 'text-green-300' : 'text-green-800'} font-semibold flex items-center gap-2`}>
                          <Download className="w-4 h-4" />
                          Result: A clean, downloadable video file link that you can open and download directly!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'audio' && (
                <div className="space-y-6">
                  <div className={`${isDark ? 'bg-purple-900/20 border-l-4 border-purple-500' : 'bg-purple-50 border-l-4 border-purple-500'} p-4 rounded-r-xl`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-lg font-bold ${themeClasses.text}`}>Audio URL Extraction</h3>
                    </div>
                    <p className={`${themeClasses.textSecondary}`}>Extract audio tracks from Google Drive videos</p>
                  </div>

                  {/* Steps 1-2 Reference */}
                  <div className={`${themeClasses.resultBg} border ${themeClasses.border} rounded-xl p-6`}>
                    <p className={`${themeClasses.textSecondary}`}>
                      <strong className={themeClasses.text}>Steps 1-2:</strong> Follow the same process as video extraction - open the video and access Developer Tools.
                    </p>
                  </div>

                  {/* Step 3 - Audio Specific */}
                  <div className={`border ${themeClasses.border} rounded-xl p-6 ${themeClasses.resultBg} transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <h4 className={`text-lg font-bold ${themeClasses.text}`}>Filter for Audio</h4>
                    </div>
                    <div className={`${themeClasses.textSecondary} space-y-3`}>
                      <p>• In the Network tab filter box, type <code className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} px-2 py-1 rounded text-sm font-mono`}>audio</code></p>
                      <p>• Look for a request that contains <code className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} px-2 py-1 rounded text-sm font-mono`}>mime=audio/mp4</code></p>
                      <p>• Right-click and copy the link address</p>
                    </div>
                  </div>

                  {/* Step 4 - Clean URL */}
                  <div className={`border ${themeClasses.border} rounded-xl p-6 ${themeClasses.resultBg} transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">4</span>
                      </div>
                      <h4 className={`text-lg font-bold ${themeClasses.text}`}>Clean the Audio URL</h4>
                    </div>
                    <div className={`${themeClasses.textSecondary} space-y-3`}>
                      <p>Use our GDrive URL Cleaner to remove:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li><code className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} px-2 py-1 rounded text-sm font-mono`}>=1&srfvp=1</code></li>
                        <li><code className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} px-2 py-1 rounded text-sm font-mono`}>range=xxxx-yyyy&</code></li>
                      </ul>
                      <div className={`${isDark ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-50 border border-green-200'} rounded-xl p-4 mt-4`}>
                        <p className={`${isDark ? 'text-green-300' : 'text-green-800'} font-semibold flex items-center gap-2`}>
                          <Download className="w-4 h-4" />
                          Result: A clean, downloadable audio file link!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 - Combine Audio */}
                  <div className={`border ${themeClasses.border} rounded-xl p-6 ${themeClasses.resultBg} transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">5</span>
                      </div>
                      <h4 className={`text-lg font-bold ${themeClasses.text}`}>Add Audio to Video</h4>
                    </div>
                    <div className={`${themeClasses.textSecondary} space-y-3`}>
                      <p>To combine your video with the extracted audio track:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li><strong className={themeClasses.text}>On PC:</strong> Use VLC Media Player</li>
                        <li><strong className={themeClasses.text}>On Android:</strong> Use MX Player</li>
                      </ul>
                      <p className="mt-2">Simply load the video file and select the downloaded audio file as an external audio track. Your video will now have sound!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

           
          </div>
        </div>
      )}

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
    </>
  );
};

export default GuideModal;