import NewsList from "@/app/components/newslist";
import React from "react";
import https from "https";
import { request } from "https";
import { NewsItem } from "@/app/types/newsItem";
import TopStories from "@/app/components/TopStories";

const fetchArticlesByCategory = async (
  category: string,
  id: string
): Promise<NewsItem[]> => {
  const baseUrl = `https://thepostnews-aycjeyh6ffbaa5dm.canadacentral-01.azurewebsites.net`;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  return new Promise((resolve, reject) => {
    const req = request(
      `${baseUrl}/api/Articles/GetByCategory/${category}`,
      { agent },
      (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          const jsonData = JSON.parse(data);
          if (!jsonData.data?.length || jsonData.data.length <= 1) {
            // If no articles found for category or only one article, fetch all articles
            request(`${baseUrl}/api/Articles/GetAll`, { agent }, (allRes) => {
              let allData = "";

              allRes.on("data", (chunk) => {
                allData += chunk;
              });

              allRes.on("end", () => {
                const allJsonData = JSON.parse(allData);
                const filteredData =
                  allJsonData.data?.filter(
                    (article: NewsItem) => article.id !== id
                  ) || [];
                resolve(filteredData);
              });
            }).end();
          } else {
            const filteredData = jsonData.data.filter(
              (article: NewsItem) => article.id !== id
            );
            resolve(filteredData);
          }
        });
      }
    );

    req.on("error", (e) => {
      reject(e);
    });

    req.end();
  });
};

export default async function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const category = params.slug[1];
  const id = params.slug[0];
  const relatedArticles: NewsItem[] = await fetchArticlesByCategory(
    category,
    id
  );

  return (
    <>
      <main>
        {children}
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: "500",
            margin: "1rem 0 0.5rem 0",
            padding: "0 1.5rem",
            color: "#333",
            borderLeft: "4px solid #3b82f6",
            paddingLeft: "1rem",
          }}
        >
          More For You
        </h2>
        <NewsList news={relatedArticles} />
      </main>
    </>
  );
}
