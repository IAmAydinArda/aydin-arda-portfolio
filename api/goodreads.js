import { DOMParser } from 'xmldom';

// Cache for storing parsed data
let cache = new Map();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { shelf = 'all' } = req.query;
    const cacheKey = `goodreads_${shelf}`;
    
    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', 'public, max-age=900'); // 15 minutes
      return res.status(200).json(cached.data);
    }

    // Build RSS URL
    const baseUrl = '';
    let shelfParam;
    
    switch(shelf) {
      case 'all':
        shelfParam = '%23ALL%23';
        break;
      case 'currently-reading':
        shelfParam = 'currently-reading';
        break;
      case 'read':
        shelfParam = 'read';
        break;
      case 'to-read':
        shelfParam = 'to-read';
        break;
      default:
        shelfParam = '%23ALL%23';
    }
    
    const rssUrl = `${baseUrl}&shelf=${shelfParam}`;

    // Fetch RSS data
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GoodreadsReader/1.0)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlString = await response.text();
    const books = parseXML(xmlString, shelf);

    // Cache the results
    cache.set(cacheKey, {
      data: books,
      timestamp: Date.now()
    });

    // Clean old cache entries
    cleanCache();

    res.setHeader('X-Cache', 'MISS');
    res.setHeader('Cache-Control', 'public, max-age=900'); // 15 minutes
    res.status(200).json(books);

  } catch (error) {
    console.error('Goodreads API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reading data',
      message: error.message 
    });
  }
}

function parseXML(xmlString, shelf) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const items = xmlDoc.getElementsByTagName('item');
  
  const books = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    // Parse date and format it nicely
    const dateReadStr = item.getElementsByTagName('user_read_at')[0]?.textContent;
    let formattedDate = '';
    if (dateReadStr && dateReadStr.trim() !== '') {
      try {
        const date = new Date(dateReadStr);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          });
        }
      } catch (e) {
        // If date parsing fails, leave empty
      }
    }
    
    const book = {
      id: item.getElementsByTagName('book_id')[0]?.textContent || `book-${i}`,
      title: item.getElementsByTagName('title')[0]?.textContent?.trim() || 'Unknown Title',
      author: item.getElementsByTagName('author_name')[0]?.textContent?.trim() || 'Unknown Author',
      image: item.getElementsByTagName('book_image_url')[0]?.textContent?.trim() || null,
      rating: parseInt(item.getElementsByTagName('user_rating')[0]?.textContent) || 0,
      isbn: item.getElementsByTagName('isbn')[0]?.textContent?.trim() || '',
      dateRead: formattedDate,
      review: item.getElementsByTagName('user_review')[0]?.textContent?.trim() || '',
      description: item.getElementsByTagName('book_description')[0]?.textContent?.trim() || '',
      pages: item.getElementsByTagName('num_pages')[0]?.textContent?.trim() || '',
      averageRating: parseFloat(item.getElementsByTagName('average_rating')[0]?.textContent) || 0,
      link: item.getElementsByTagName('link')[0]?.textContent || '',
      shelf: shelf
    };
    
    books.push(book);
  }
  
  return books;
}

function cleanCache() {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      cache.delete(key);
    }
  }
}