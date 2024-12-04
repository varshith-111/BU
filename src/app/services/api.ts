import axios from 'axios';
import https from 'https';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const agent = new https.Agent({ rejectUnauthorized: false });

const api = axios.create({
  baseURL: baseUrl,
  httpsAgent: agent
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache: { [key: string]: any } = {}; // Cache object to store fetched data


export const articlesApi = {
  getByCategory: async (category: string) => {
    if (cache[category]) { // Check if data is already cached
      return cache[category]; // Return cached data
    }
    try {
      const response = await api.get(`/Articles/GetByCategory/${category}`);
      cache[category] = response.data?.data || []; // Store data in cache
      return cache[category];
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      throw error;
    }
  },

  getAll: async () => {
    if (cache['all']) { // Check if all articles data is already cached
      return cache['all']; // Return cached data
    }
    try {
      const response = await api.get('/Articles/GetAll');
      cache['all'] = response.data?.data || []; // Store data in cache
      return cache['all'];
    } catch (error) {
      console.error('Error fetching all articles:', error);
      throw error;
    }
  }
}; 