import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { booksData } from '../../data/booksData';
import './BookDetailModal.css';

const BookDetailModal = ({ book, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'details' | 'reviews'
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [newReview, setNewReview] = useState('');
    const [reviewsList, setReviewsList] = useState(book?.reviews || []);
    const { language } = useLanguage();
    const navigate = useNavigate();

    if (!book) return null;

    const handleStartReading = (chapterNum = 1) => {
        navigate(`/reader?bookId=${book.id}&chapter=${chapterNum}`);
    };

    const handleAddReview = (e) => {
        e.preventDefault();
        if (!newReview.trim()) return;
        const item = {
            id: Date.now(),
            user: 'You (Reader)',
            comment: newReview.trim(),
            rating: 5
        };
        setReviewsList([item, ...reviewsList]);
        setNewReview('');
    };

    const recommendedBooks = booksData.filter(b => b.id !== book.id).slice(0, 4);

    return (
        <div className="book-modal-overlay animate-fade-in">
            <div className="book-modal-container container animate-pop-in">
                {/* Back Button */}
                <button className="btn-modal-back" onClick={onClose}>
                    ← {language === 'id' ? 'Kembali' : 'Back'}
                </button>

                {/* Top Spotlight Header */}
                <div className="book-header-grid">
                    {/* Left: Book Cover */}
                    <div className="book-cover-large" style={{ background: book.coverBg }}>
                        <div className="cover-inner-border">
                            <span className="cover-big-icon">{book.icon || '🌹'}</span>
                            <h2>{book.title}</h2>
                            <p className="cover-author-sub">{book.author}</p>
                            <span className="cover-tag-badge">A MIND GAMES NOVEL</span>
                        </div>
                    </div>

                    {/* Right: Book Meta & Stats */}
                    <div className="book-meta-content">
                        <h1 className="book-main-title">{book.title}</h1>
                        <p className="book-main-author">{book.author}</p>

                        <div className="book-quick-tags">
                            <span>{book.year}</span>
                            <span className="tag-dot">•</span>
                            <span>{book.genre}</span>
                            <span className="tag-dot">•</span>
                            <span className="rating-badge">★ {book.rating}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="book-action-row">
                            <button className="btn-start-reading" onClick={() => handleStartReading(1)}>
                                ▶ {language === 'id' ? 'Mulai Membaca' : 'Start Reading'}
                            </button>
                            <button 
                                className={`btn-icon-action ${isBookmarked ? 'active' : ''}`}
                                onClick={() => setIsBookmarked(!isBookmarked)}
                                title="Bookmark"
                            >
                                {isBookmarked ? '🔖' : '🔖'}
                            </button>
                            <button className="btn-icon-action" title="Share" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                🔗
                            </button>
                        </div>

                        <p className="book-description-text">{book.description}</p>

                        {/* 4 Stat Cards */}
                        <div className="book-stats-grid">
                            <div className="stat-card">
                                <span className="stat-label">{language === 'id' ? 'Waktu Baca' : 'Reading Time'}</span>
                                <span className="stat-value">{book.readingTime}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">📖 {language === 'id' ? 'Halaman' : 'Pages'}</span>
                                <span className="stat-value">{book.pages}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">{language === 'id' ? 'Bahasa' : 'Language'}</span>
                                <span className="stat-value">{book.language}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">{language === 'id' ? 'Diterbitkan' : 'Published'}</span>
                                <span className="stat-value">{book.published}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="book-tabs-header">
                    <button 
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                    >
                        Details
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews ({reviewsList.length})
                    </button>
                </div>

                <div className="tab-divider"></div>

                {/* Tab 1: Overview */}
                {activeTab === 'overview' && (
                    <div className="tab-content overview-grid animate-fade-in">
                        {/* Left: Chapters List */}
                        <div className="chapters-column">
                            <div className="chapters-header">
                                <h3>Chapters</h3>
                                <span className="total-chapters-badge">
                                    {book.chapters?.length || 5} Total Chapters
                                </span>
                            </div>

                            <div className="chapters-list">
                                {book.chapters?.map((ch) => (
                                    <div 
                                        key={ch.num} 
                                        className={`chapter-item ${ch.isLocked ? 'locked' : ''}`}
                                        onClick={() => !ch.isLocked && handleStartReading(ch.num)}
                                    >
                                        <span className="ch-number">{ch.num}</span>
                                        <div className="ch-details">
                                            <h4>{ch.title}</h4>
                                            <p>{ch.date} • {ch.duration}</p>
                                        </div>
                                        <div className="ch-status">
                                            {ch.isLocked ? (
                                                <span className="lock-icon" title="Locked">🔒</span>
                                            ) : ch.isCompleted ? (
                                                <span className="gold-dot-icon" title="Completed">🟡</span>
                                            ) : (
                                                <span className="play-icon">▶</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Creator Info & Recommendations */}
                        <div className="overview-sidebar">
                            <div className="creator-card glass-panel">
                                <div className="creator-avatar">🎨</div>
                                <div className="creator-info">
                                    <h4>Creator</h4>
                                    <p className="creator-name">{book.creator?.name || book.author}</p>
                                    <p className="creator-update">{book.creator?.update || 'Update from creator coming soon!'}</p>
                                </div>
                            </div>

                            <div className="recommendations-box">
                                <h3>You Might Also Like</h3>
                                <div className="rec-books-grid">
                                    {recommendedBooks.map((rec) => (
                                        <div 
                                            key={rec.id} 
                                            className="rec-book-card"
                                            style={{ background: rec.coverBg }}
                                            onClick={() => {
                                                onClose();
                                                setTimeout(() => {
                                                    // Trigger opening recommended book
                                                    window.dispatchEvent(new CustomEvent('openBookModal', { detail: rec }));
                                                }, 100);
                                            }}
                                        >
                                            <span>{rec.icon}</span>
                                            <h5>{rec.title}</h5>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Details */}
                {activeTab === 'details' && (
                    <div className="tab-content details-grid animate-fade-in">
                        <div className="details-row">
                            <span className="detail-key">Title</span>
                            <span className="detail-val">{book.title}</span>
                            <span className="detail-key">Author</span>
                            <span className="detail-val">{book.author}</span>
                        </div>
                        <div className="details-row">
                            <span className="detail-key">Genre</span>
                            <span className="detail-val">{book.genre}</span>
                            <span className="detail-key">Published</span>
                            <span className="detail-val">{book.published}</span>
                        </div>
                        <div className="details-row">
                            <span className="detail-key">Publisher</span>
                            <span className="detail-val">{book.publisher}</span>
                            <span className="detail-key">Language</span>
                            <span className="detail-val">{book.language}</span>
                        </div>
                        <div className="details-row">
                            <span className="detail-key">Format</span>
                            <span className="detail-val">{book.format}</span>
                            <span className="detail-key">Reading Age</span>
                            <span className="detail-val">{book.readingAge}</span>
                        </div>
                    </div>
                )}

                {/* Tab 3: Reviews */}
                {activeTab === 'reviews' && (
                    <div className="tab-content reviews-section animate-fade-in">
                        <form className="add-review-form glass-panel" onSubmit={handleAddReview}>
                            <input 
                                type="text" 
                                placeholder={language === 'id' ? 'Tulis ulasan Anda...' : 'Write your review...'}
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                            />
                            <button type="submit" className="btn-gold">
                                {language === 'id' ? 'Kirim' : 'Post Review'}
                            </button>
                        </form>

                        <div className="reviews-list">
                            {reviewsList.map((rev) => (
                                <div key={rev.id} className="review-card glass-panel">
                                    <div className="review-header">
                                        <span className="review-user">{rev.user}</span>
                                        <span className="review-stars">{"★".repeat(rev.rating)}</span>
                                    </div>
                                    <p className="review-comment">{rev.comment}</p>
                                </div>
                            ))}
                            <div className="review-card glass-panel coming-soon-card">
                                <span className="review-user">Community Reviews</span>
                                <p className="review-comment">More reader reviews coming soon as chapters release!</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetailModal;
