"use client";

import { useEffect } from "react";

interface EmbedRendererProps {
  embedHtml: string;
}

const cache = {
    data: null,
    timestamp: 0,
};

const EmbedRenderer = ({ embedHtml }: EmbedRendererProps) => {
  useEffect(() => {
    // Define a type for the window object that includes twttr
    interface WindowWithTwttr extends Window {
      twttr?: {
        widgets: {
          load: () => void;
        };
      };
    }

    const windowWithTwttr = window as WindowWithTwttr;

    // Check if the Twitter widgets library has already been loaded
    if (windowWithTwttr.twttr) {
      // If loaded, re-render widgets in case of navigation
      windowWithTwttr.twttr.widgets.load();
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
