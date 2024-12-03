import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from '../shared/ArticleCard';
import { NewsItem } from '@/app/types/newsItem';

const LeftBlog = ({articles}: {articles: NewsItem[]}) => {
    return (
        <div style={{ margin: '4px', padding: '8px', background: 'white' }}>
            <h3>Latest News</h3>
                <>
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <ArticleCard key={index} newsItem={article} />
                        ))
                    ) : (
                        <p>No articles available.</p>
                    )}
                </>
        </div>
    );
};

export default LeftBlog;
