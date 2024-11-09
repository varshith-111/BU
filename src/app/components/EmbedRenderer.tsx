"use client";

import { useEffect } from "react";

interface EmbedRendererProps {
  embedHtml: string;
}

const EmbedRenderer = ({ embedHtml }: EmbedRendererProps) => {
  useEffect(() => {
    // Check if the Twitter widgets library has already been loaded
    if ((window as any).twttr) {
      // If loaded, re-render widgets in case of navigation
      (window as any).twttr.widgets.load();
    } else {
      // If not loaded, create the script tag and add it to the document
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    }
  }, [embedHtml]); // Run effect whenever embedHtml changes

  return <div dangerouslySetInnerHTML={{ __html: embedHtml }} />;
};

export default EmbedRenderer;
