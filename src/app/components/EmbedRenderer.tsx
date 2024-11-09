// components/EmbedRenderer.tsx
"use client";

import { useEffect } from "react";

interface EmbedRendererProps {
  embedHtml: string;
}

const EmbedRenderer = ({ embedHtml }: EmbedRendererProps) => {
  useEffect(() => {
    if (window && !(window as any).twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    }
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: embedHtml }} />;
};

export default EmbedRenderer;
