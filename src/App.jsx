import React from "react";
import UrlCleaner from "./UrlCleaner";
import { cn } from "./lib/utils";
import GuideModal from "./components/GuideModal";

function App() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-white dark:bg-black"> 
    <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
    />
      <UrlCleaner />
      
    </div>    
  );
}

export default App;