import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { booksData, continueReadingData, genresData } from '../data/booksData';
import BookDetailModal from '../components/ui/BookDetailModal';
import './HomePage.css';

const HomePage = () => {
    const { language } = useLanguage();
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState('All');
    const navigate = useNavigate();

    const isId = language === 'id';

    // Listen for custom openBookModal event (from recommendations inside modal)
    useEffect(() => {
        const handleOpenBook = (e) => {
            if (e.detail) {
                setSelectedBook(e.detail);
            }
        };
        window.addEventListener('openBookModal', handleOpenBook);
        return () => window.removeEventListener('openBookModal', handleOpenBook);
    }, []);

    const filteredBooks = selectedGenre === 'All' 
        ? booksData 
        : booksData.filter(b => b.genre.toLowerCase() === selectedGenre.toLowerCase());

    const archivistBook = booksData[0]; // The Whispering Shadows

    return (
        <div className="home-page">
            {/* 1. Hero Spotlight: The Archivist's Choice */}
            <section className="archivist-hero container">
                <div className="archivist-banner glass-panel">
                    <div className="archivist-content">
                        <span className="archivist-tag">The Archivist's Choice</span>
                        <h1 className="archivist-title">A Whispering Shadows</h1>
                        <p className="archivist-desc">
                            {isId 
                                ? 'Di lorong sunyi Perpustakaan Agung, naskah tertentu bernapas. Elias Vance menemukan manuskrip yang tidak hanya bercerita—tetapi menulis ulang realitasnya.'
                                : 'In The Silent Corridors Of The Great Library, Certain Books Breathe. Elias Vance Discovers A Manuscript That Doesn\'t Just Tell A Story—It Rewrites His Reality.'}
                        </p>

                        <div className="archivist-btn-group">
                            <button 
                                className="btn-gold"
                                onClick={() => navigate(`/reader?bookId=${archivistBook.id}&chapter=1`)}
                            >
                                {isId ? 'Mulai Membaca 📖' : 'Start Reading 📖'}
                            </button>
                            <button 
                                className="btn-secondary"
                                onClick={() => setSelectedBook(archivistBook)}
                            >
                                {isId ? 'Lihat Detail →' : 'View Details →'}
                            </button>
                        </div>
                    </div>

                    {/* Right Book Cover */}
                    <div className="archivist-cover-wrapper" onClick={() => setSelectedBook(archivistBook)}>
                        <div className="archivist-3d-cover" style={{ background: archivistBook.coverBg }}>
                            <div className="cover-inner-border">
                                <span className="cover-icon">🌿</span>
                                <h3>BEORK NOTIULL</h3>
                                <p className="cover-sub">ARCHIVIST EDITION</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Continue Reading Section */}
            <section className="home-section container">
                <div className="section-header">
                    <h2>{isId ? 'Lanjutkan Membaca' : 'Continue Reading'}</h2>
                    <span className="section-sub">{isId ? 'Lanjutkan di mana Anda berhenti. Tinta belum mengering.' : 'Pick Up Where You Left. The Ink Drying.'}</span>
                </div>

                <div className="continue-reading-grid">
                    {continueReadingData.map((item) => (
                        <div key={item.id} className="continue-card glass-card">
                            <div className="continue-thumb" style={{ background: item.color }}>
                                <span>{item.icon}</span>
                            </div>
                            <div className="continue-info">
                                <h3>{item.title}</h3>
                                <p>{item.chapterInfo}</p>
                                <button 
                                    className="btn-resume"
                                    onClick={() => navigate(`/reader?bookId=whispering-shadows&chapter=1`)}
                                >
                                    RESUME &gt;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Trending Now Section */}
            <section className="home-section container">
                <div className="section-header flex-between">
                    <div>
                        <h2>{isId ? 'Sedang Tren Saat Ini' : 'Trending Now'}</h2>
                        <span className="section-sub">{isId ? 'Cerita interaktif paling populer minggu ini.' : 'Most read interactive stories this week.'}</span>
                    </div>
                    {selectedGenre !== 'All' && (
                        <button className="btn-secondary btn-sm" onClick={() => setSelectedGenre('All')}>
                            Show All ({selectedGenre}) ✕
                        </button>
                    )}
                </div>

                <div className="trending-grid">
                    {filteredBooks.map((book) => (
                        <div 
                            key={book.id} 
                            className="trending-card glass-card"
                            style={{ background: book.coverBg }}
                            onClick={() => setSelectedBook(book)}
                        >
                            <div className="trending-card-inner">
                                <span className="trending-icon">{book.icon}</span>
                                <h3>{book.title}</h3>
                                <p className="trending-author">{book.author}</p>
                                <span className="trending-rating">★ {book.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Literary Classics Curated Banner */}
            <section className="classics-banner-section container">
                <div className="classics-banner glass-panel">
                    <div className="classics-content">
                        <span className="classics-curated">CURATED COLLECTION</span>
                        <h2>{isId ? 'Karya Klasik Sastra' : 'Literary Classics'}</h2>
                        <p>
                            {isId 
                                ? 'Mahakarya abadi yang telah membentuk khazanah sastra dan terus menginspirasi pembaca lintas generasi.'
                                : 'Timeless masterpieces that have shaped literature and continue to inspire readers across generations.'}
                        </p>
                        <span className="classics-meta">247 Books • Updated Weekly</span>

                        <button 
                            className="btn-gold classics-cta"
                            onClick={() => setSelectedBook(booksData[2])}
                        >
                            {isId ? 'Jelajahi Koleksi >' : 'Explore Collection >'}
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. Browse By Genre Section */}
            <section className="home-section container">
                <div className="section-header flex-between">
                    <h2>{isId ? 'Jelajahi Berdasarkan Genre' : 'Browse By Genre'}</h2>
                    <button className="btn-link-all" onClick={() => setSelectedGenre('All')}>
                        {isId ? 'Semua Genre >' : 'All Genres >'}
                    </button>
                </div>

                <div className="genres-grid">
                    {genresData.map((genre) => (
                        <div 
                            key={genre.id} 
                            className={`genre-card ${selectedGenre === genre.name ? 'active' : ''}`}
                            style={{ background: genre.bg }}
                            onClick={() => navigate(`/genre/${genre.name.toLowerCase()}`)}
                        >
                            <span className="genre-icon">{genre.icon}</span>
                            <span className="genre-name">{genre.name}</span>
                        </div>
                    ))}
                </div>
            </section>

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

export default HomePage;