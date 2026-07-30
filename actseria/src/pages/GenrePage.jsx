import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { booksData } from '../data/booksData';
import BookDetailModal from '../components/ui/BookDetailModal';
import './GenrePage.css';

const validGenres = ['Biography', 'Fantasy', 'Romance', 'Sci-Fi', 'Thriller', 'History', 'Fiction'];

const GenrePage = () => {
    const { genreName } = useParams();
    const { language } = useLanguage();
    const navigate = useNavigate();

    // Default to 'Biography' if invalid or not specified
    const currentGenre = validGenres.find(g => g.toLowerCase() === genreName?.toLowerCase()) || 'Biography';

    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [selectedBook, setSelectedBook] = useState(null);
    const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'newest' | 'rating'

    const isId = language === 'id';

    // Filter books by genre
    let genreBooks = booksData.filter(b => b.genre.toLowerCase() === currentGenre.toLowerCase());

    // Fallback if no books in dataset match this genre specifically, show related books for demo
    if (genreBooks.length === 0) {
        genreBooks = booksData.slice(0, 5);
    }

    // Filter by search query
    if (searchQuery.trim()) {
        genreBooks = genreBooks.filter(b => 
            b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Sort books
    if (sortBy === 'rating') {
        genreBooks.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
        genreBooks.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    }

    return (
        <div className="genre-page animate-fade-in">
            {/* Hero Banner Section */}
            <div className="genre-hero-banner container">
                <button className="btn-back-home" onClick={() => navigate('/home')}>
                    ← {isId ? 'Kembali ke Beranda' : 'Back To Home'}
                </button>

                <h1 className="genre-hero-title">{currentGenre}</h1>
            </div>

            {/* Controls & Filter Bar Section */}
            <div className="genre-filter-bar container">
                <div className="filter-controls-row">
                    {/* Search Input */}
                    <div className="genre-search-box">
                        <input 
                            type="text" 
                            placeholder={isId ? `Cari di ${currentGenre}...` : `Search in ${currentGenre}`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg className="genre-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>

                    {/* Right Controls: Sort & View Mode */}
                    <div className="genre-right-controls">
                        <div className="sort-dropdown-wrapper">
                            <select 
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="popular">Most Popular ⚙️</option>
                                <option value="rating">Highest Rated ★</option>
                                <option value="newest">Newest Releases 🕒</option>
                            </select>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="view-toggle-group">
                            <button 
                                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Grid View"
                            >
                                ▦
                            </button>
                            <button 
                                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                title="List View"
                            >
                                ☰
                            </button>
                        </div>
                    </div>
                </div>

                <div className="genre-count-row">
                    <span>
                        {isId 
                            ? `Menampilkan ${genreBooks.length} Dari ${booksData.length} Buku` 
                            : `Showing ${genreBooks.length} Of ${booksData.length} Books`}
                    </span>
                </div>

                <div className="genre-divider"></div>
            </div>

            {/* Books Display Section */}
            <div className="genre-books-section container">
                {genreBooks.length === 0 ? (
                    <div className="empty-genre-box glass-panel">
                        <p>{isId ? 'Tidak ada buku yang ditemukan untuk kriteria ini.' : 'No books found for this search criteria.'}</p>
                    </div>
                ) : (
                    <div className={viewMode === 'grid' ? "genre-books-grid" : "genre-books-list"}>
                        {genreBooks.map((book) => (
                            <div 
                                key={book.id}
                                className={`genre-book-card glass-card ${viewMode === 'list' ? 'list-card' : ''}`}
                                style={{ background: book.coverBg }}
                                onClick={() => setSelectedBook(book)}
                            >
                                <div className="genre-book-cover">
                                    <div className="genre-cover-inner">
                                        <span className="genre-cover-icon">{book.icon || '📖'}</span>
                                        <h4>{book.title}</h4>
                                        <p>{book.author}</p>
                                    </div>
                                </div>

                                {viewMode === 'list' && (
                                    <div className="genre-list-info">
                                        <h3>{book.title}</h3>
                                        <p className="list-author">By {book.author}</p>
                                        <p className="list-desc">{book.description}</p>
                                        <div className="list-meta">
                                            <span className="rating-tag">★ {book.rating}</span>
                                            <span>{book.readingTime}</span>
                                            <span>{book.pages} pages</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Book Detail Overlay Modal */}
            {selectedBook && (
                <BookDetailModal 
                    book={selectedBook} 
                    onClose={() => setSelectedBook(null)} 
                />
            )}
        </div>
    );
};

export default GenrePage;
