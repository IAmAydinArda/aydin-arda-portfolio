import React, { useState, useEffect } from 'react';
import personalData from '../config/personalData';

// BookCard component for reusability
const BookCard = ({ book, index, theme }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xs ${i < rating ? 'text-purple-400' : 'text-gray-300 dark:text-gray-600'}`}
      >
        ★
      </span>
    ));
  };

  const getShelfStyle = (shelf) => {
    switch(shelf) {
      case 'currently-reading':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'read':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'to-read':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getShelfLabel = (shelf) => {
    switch(shelf) {
      case 'currently-reading':
        return 'Reading';
      case 'read':
        return 'Read';
      case 'to-read':
        return 'To Read';
      default:
        return shelf;
    }
  };

  return (
    <article
      className="mx-auto w-full max-w-4xl group hover:shadow-xl hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 sm:p-4 md:p-5 rounded-[12px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className='flex flex-row w-full gap-2 sm:gap-3 md:gap-4'>
        {/* Book Cover Container - Smaller */}
        <div className='w-12 sm:w-14 md:w-16 lg:w-18 flex-shrink-0'>
          <div className='aspect-[2/3] bg-gray-100 dark:bg-gray-800 rounded-[4px] md:rounded-[6px] overflow-hidden group-hover:shadow-md transition-shadow duration-300'>
            {book.image ? (
              <img 
                src={book.image} 
                alt={book.title}
                className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                <span className="text-xs text-center">📚</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div className='flex flex-col flex-1 justify-between min-w-0'>
          <div className='flex flex-col gap-0.5 sm:gap-1'>
            {/* Title and Shelf */}
            <div className="flex items-start justify-between gap-2">
              <h3 className={`${theme.fonts.heading} text-sm sm:text-base md:text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-purple-500 transition-colors duration-300 line-clamp-2 flex-1`}>
                {book.title}
              </h3>
              {/* Shelf Badge */}
              <div className="flex-shrink-0">
                <span className={`inline-block px-1.5 sm:px-2 py-0.5 text-xs font-medium rounded-full ${getShelfStyle(book.shelf)}`}>
                  {getShelfLabel(book.shelf)}
                </span>
              </div>
            </div>
            
            {/* Author */}
            <p className={`${theme.fonts.body} text-xs sm:text-sm font-normal text-gray-700 dark:text-gray-300 transition-colors duration-200`}>
              by {book.author}
            </p>
            
            {/* Rating and Date */}
            <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
              {book.rating > 0 && (
                <div className="flex items-center gap-1">
                  {renderStars(book.rating)}
                  <span className={`${theme.fonts.body} text-xs text-gray-600 dark:text-gray-400`}>
                    ({book.rating}/5)
                  </span>
                </div>
              )}
              
              {book.dateRead && (
                <span className={`${theme.fonts.body} text-xs text-gray-500 dark:text-gray-400`}>
                  {book.dateRead}
                </span>
              )}
            </div>
            
            {/* Review Preview - Only if short */}
            {book.review && book.review.length < 100 && (
              <p className={`${theme.fonts.body} text-xs text-gray-600 dark:text-gray-400 line-clamp-1 mt-1`}>
                "{book.review}"
              </p>
            )}
          </div>
          
          {/* Action Button */}
          {book.link && (
            <div className='mt-1'>
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
              >
                View on Goodreads →
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const GoodreadsBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShelf, setSelectedShelf] = useState(null); // null means show all sections
  const [cache, setCache] = useState({});
  const [allBooksData, setAllBooksData] = useState([]); // Store all books for sectioned view

  const { theme } = personalData;

  const fetchBooks = async (shelf = 'all') => {
    try {
      // Check cache first
      if (cache[shelf]) {
        if (shelf === 'all') {
          setAllBooksData(cache[shelf]);
          organizeBooksByShelf(cache[shelf]);
        } else {
          setBooks(cache[shelf]);
          setFilteredBooks(cache[shelf]);
        }
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      // Use local API endpoint or fallback to development URL
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? '/api/goodreads' 
        : 'http://localhost:3000/api/goodreads';
      
      const response = await fetch(`${baseUrl}?shelf=${encodeURIComponent(shelf)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        // Fallback to old method if API fails
        return await fetchBooksLegacy(shelf);
      }
      
      const books = await response.json();
      
      // Cache the results
      setCache(prevCache => ({
        ...prevCache,
        [shelf]: books
      }));
      
      if (shelf === 'all') {
        setAllBooksData(books);
        organizeBooksByShelf(books);
      } else {
        setBooks(books);
        setFilteredBooks(books);
      }
    } catch (err) {
      console.warn('API fetch failed, falling back to legacy method:', err);
      // Fallback to legacy method
      return await fetchBooksLegacy(shelf);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch all three shelves in parallel
  const fetchAllShelves = async () => {
    try {
      setLoading(true);
      setError(null);

      const shelves = ['currently-reading', 'to-read', 'read'];
      const allBooksPromises = shelves.map(async (shelf) => {
        // Check cache first
        if (cache[shelf]) {
          return cache[shelf];
        }

        // Use local API endpoint or fallback to development URL
        const baseUrl = process.env.NODE_ENV === 'production' 
          ? '/api/goodreads' 
          : 'http://localhost:3000/api/goodreads';
        
        try {
          const response = await fetch(`${baseUrl}?shelf=${encodeURIComponent(shelf)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const books = await response.json();
          
          // Cache the results
          setCache(prevCache => ({
            ...prevCache,
            [shelf]: books
          }));
          
          return books;
        } catch (err) {
          console.warn(`API fetch failed for ${shelf}, falling back to legacy method:`, err);
          return await fetchShelfLegacy(shelf);
        }
      });

      // Wait for all shelves to be fetched
      const allShelvesData = await Promise.all(allBooksPromises);
      
      // Flatten and organize the books
      const allBooks = allShelvesData.flat();
      setAllBooksData(allBooks);
      organizeBooksByShelf(allBooks);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function for legacy fetch of individual shelf
  const fetchShelfLegacy = async (shelf) => {
    const rssUrl = buildRssUrl(shelf);
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlString = await response.text();
    return parseXML(xmlString, rssUrl);
  };

  // Function to organize books by shelf for sectioned view
  const organizeBooksByShelf = (allBooks) => {
    const currentlyReading = allBooks.filter(book => book.shelf === 'currently-reading');
    const toRead = allBooks.filter(book => book.shelf === 'to-read');
    const read = allBooks.filter(book => book.shelf === 'read');
    
    // Combine in the desired order
    const organizedBooks = [...currentlyReading, ...toRead, ...read];
    setBooks(organizedBooks);
    setFilteredBooks(organizedBooks);
  };

  // Legacy fallback method
  const fetchBooksLegacy = async (shelf = 'all') => {
    try {
      setError(null);
      
      const rssUrl = buildRssUrl(shelf);
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const xmlString = await response.text();
      const parsedBooks = parseXML(xmlString, rssUrl);
      
      // Cache the results
      setCache(prevCache => ({
        ...prevCache,
        [shelf]: parsedBooks
      }));
      
      if (shelf === 'all') {
        setAllBooksData(parsedBooks);
        organizeBooksByShelf(parsedBooks);
      } else {
        setBooks(parsedBooks);
        setFilteredBooks(parsedBooks);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const parseXML = (xmlString, rssUrl) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const items = xmlDoc.getElementsByTagName('item');
    
    const parsedBooks = [];
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
      
      // Determine shelf from the current URL
      let currentShelf = 'unknown';
      if (rssUrl.includes('shelf=read')) currentShelf = 'read';
      else if (rssUrl.includes('shelf=currently-reading')) currentShelf = 'currently-reading';
      else if (rssUrl.includes('shelf=to-read')) currentShelf = 'to-read';
      else currentShelf = 'all';
      
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
        shelf: currentShelf
      };
      
      parsedBooks.push(book);
    }
    
    return parsedBooks;
  };

  const buildRssUrl = (shelf) => {
    const baseUrl = 'https://www.goodreads.com/review/list_rss/67134247?key=5dLzS4o6CpcT4zXwroSQU_sUIaGzjN53IEZMw7MKb_EwEI8J';
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
    
    return `${baseUrl}&shelf=${shelfParam}`;
  };

  useEffect(() => {
    if (selectedShelf === null) {
      fetchAllShelves(); // Fetch all three shelves for sectioned view
    } else {
      fetchBooks(selectedShelf);
    }
  }, [selectedShelf]);

  const handleShelfChange = (shelf) => {
    // If clicking the same shelf, unselect it (return to sectioned view)
    if (shelf === selectedShelf) {
      setSelectedShelf(null);
      
      // For sectioned view, check if we have all three shelves cached
      const shelves = ['currently-reading', 'to-read', 'read'];
      const allCached = shelves.every(s => cache[s]);
      
      if (allCached) {
        const allBooks = shelves.flatMap(s => cache[s]);
        setAllBooksData(allBooks);
        organizeBooksByShelf(allBooks);
        setLoading(false);
      } else {
        setLoading(true);
      }
      return;
    }
    
    setSelectedShelf(shelf);
    
    if (shelf === null) {
      // For sectioned view, check if we have all three shelves cached
      const shelves = ['currently-reading', 'to-read', 'read'];
      const allCached = shelves.every(s => cache[s]);
      
      if (allCached) {
        const allBooks = shelves.flatMap(s => cache[s]);
        setAllBooksData(allBooks);
        organizeBooksByShelf(allBooks);
        setLoading(false);
      } else {
        setLoading(true);
      }
    } else {
      // For individual shelf view
      if (cache[shelf]) {
        setBooks(cache[shelf]);
        setFilteredBooks(cache[shelf]);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
  };

  const filterOptions = [
    { value: "currently-reading", label: "Currently Reading" },
    { value: "to-read", label: "To Read" },
    { value: "read", label: "Read" },
  ];

  // BookCard skeleton component
  const BookSkeleton = () => (
    <article
      className="mx-auto w-full max-w-4xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 sm:p-4 md:p-5 rounded-[12px] animate-pulse"
    >
      <div className='flex flex-row w-full gap-2 sm:gap-3 md:gap-4'>
        {/* Book Cover Skeleton */}
        <div className='w-12 sm:w-14 md:w-16 lg:w-18 flex-shrink-0'>
          <div className='aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-[4px] md:rounded-[6px]'></div>
        </div>

        {/* Content Skeleton */}
        <div className='flex flex-col flex-1 justify-between min-w-0 space-y-2'>
          <div className='flex flex-col gap-2'>
            {/* Title and badge skeleton */}
            <div className="flex items-start justify-between gap-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
              <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            
            {/* Author skeleton */}
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            
            {/* Rating skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          
          {/* Action button skeleton */}
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </article>
  );

  if (loading) {
    return (
      <main className="flex flex-col max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`${theme.fonts.heading} text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4`}>
            Reading
          </h1>
          <p className={`${theme.fonts.body} text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
            Books I'm reading, have read, and want to read from my Goodreads library.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <div
                key={option.value}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 animate-pulse"
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton Books */}
        <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
          {Array.from({ length: 6 }, (_, index) => (
            <BookSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 dark:text-red-400 mb-4">
          <h3 className="text-lg font-semibold">Error loading books</h3>
          <p>{error}</p>
        </div>
        <button
          onClick={() => fetchBooks(selectedShelf)}
          className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="flex flex-col max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`${theme.fonts.heading} text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4`}>
          Reading
        </h1>
        <p className={`${theme.fonts.body} text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
          Books I'm reading, have read, and want to read from my Goodreads library.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleShelfChange(option.value)}
              disabled={loading && selectedShelf === option.value}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 relative ${
                selectedShelf === option.value
                  ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              } ${loading && selectedShelf === option.value ? 'opacity-75' : ''}`}
            >
              {loading && selectedShelf === option.value && !cache[option.value] && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                </span>
              )}
              <span className={loading && selectedShelf === option.value && !cache[option.value] ? 'opacity-0' : ''}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Books List */}
      {selectedShelf === null ? (
        // Sectioned view when no filter is selected
        <div className="max-w-5xl mx-auto w-full">
          {/* Currently Reading Section */}
          {allBooksData.filter(book => book.shelf === 'currently-reading').length > 0 && (
            <section className="mb-12">
              <h2 className={`${theme.fonts.heading} text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6`}>
                Currently Reading
              </h2>
              <div className="flex flex-col gap-6">
                {allBooksData.filter(book => book.shelf === 'currently-reading').map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} theme={theme} />
                ))}
              </div>
            </section>
          )}

          {/* To Read Section */}
          {allBooksData.filter(book => book.shelf === 'to-read').length > 0 && (
            <section className="mb-12">
              <h2 className={`${theme.fonts.heading} text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6`}>
                To Read
              </h2>
              <div className="flex flex-col gap-6">
                {allBooksData.filter(book => book.shelf === 'to-read').map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} theme={theme} />
                ))}
              </div>
            </section>
          )}

          {/* Read Section */}
          {allBooksData.filter(book => book.shelf === 'read').length > 0 && (
            <section className="mb-12">
              <h2 className={`${theme.fonts.heading} text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6`}>
                Read
              </h2>
              <div className="flex flex-col gap-6">
                {allBooksData.filter(book => book.shelf === 'read').map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} theme={theme} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        // Filtered view when a specific shelf is selected
        <section 
          className="flex flex-col gap-6 max-w-5xl mx-auto w-full"
          aria-label="Reading list"
        >
          {filteredBooks.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} theme={theme} />
          ))}
        </section>
      )}

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No books found in this category.
          </p>
        </div>
      )}
      
      {/* Book Count */}
      <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
        Showing {filteredBooks.length} of {books.length} books
      </div>
    </main>
  );
};

export default GoodreadsBooks;