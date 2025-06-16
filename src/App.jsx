import React from "react";
import UrlCleaner from "./UrlCleaner";
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";

function App() {
  return (
    <BackgroundGradientAnimation>
      <UrlCleaner />
    </BackgroundGradientAnimation>
  );
}

export default App;