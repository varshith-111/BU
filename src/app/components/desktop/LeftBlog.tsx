import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from '../shared/ArticleCard';
import { NewsItem } from '@/app/types/newsItem';

const LeftBlog = () => {
    const [articles, setArticles] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = 'https://paltinumnewsapi-ayfheaamcefrgvg5.canadacentral-01.azurewebsites.net/';

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/Articles/GetAll`);
                console.log(response.data.data); // Log to debug
                setArticles(Array.isArray(response.data.data) ? response.data.data : []); // Ensure it's an array
                setLoading(false);
            } catch (err) {
                console.error('Error fetching articles:', err);
                setArticles([]); // Set to empty array on error
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div style={{ margin: '4px', padding: '8px', background: 'white' }}>
            <h3>Latest News</h3>

            {loading && <p>Loading articles...</p>}

            {!loading && (
                <>
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <ArticleCard key={index} newsItem={article} />
                        ))
                    ) : (
                        <p>No articles available.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default LeftBlog;
