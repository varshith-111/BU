'use client';

import { useEffect, useRef } from 'react';

interface TweetEmbedProps {
  html: string;
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({ html }) => {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.twttr) {
      // @ts-ignore
      window.twttr.widgets.load(tweetRef.current);
    }
  }, [html]);

  return <div ref={tweetRef} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default TweetEmbed;