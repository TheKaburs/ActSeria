import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
    const { language, setLanguage } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [showBrowseMenu, setShowBrowseMenu] = useState(false);
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (onSearch) {
                onSearch(searchQuery);
            }
            navigate('/home');
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'id' ? 'en' : 'id');
    };

    return (
        <header className="navbar-header">
            <div className="navbar-container container">
                {/* Brand Logo */}
                <Link to="/home" className="nav-brand">
                    <span className="brand-white">Act</span>
                    <span className="brand-colon">:</span>
                    <span className="brand-gold">Seria+</span>
                </Link>

                {/* Right Controls: Search, Navigation, Language Switch, Profile */}
                <div className="nav-actions">
                    {/* Search Box */}
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder={language === 'id' ? "Cari di situs..." : "Search in site..."}
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearchSubmit}
                        />
                        <button className="search-btn" onClick={handleSearchSubmit} aria-label="Search">
                            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="nav-links">
                        <div 
                            className="nav-dropdown"
                            onMouseEnter={() => setShowBrowseMenu(true)}
                            onMouseLeave={() => setShowBrowseMenu(false)}
                        >
                            <span className="nav-link">
                                {language === 'id' ? 'Jelajahi' : 'Browse'}
                                <svg className={`chevron-icon ${showBrowseMenu ? 'rotate' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </span>
                            {showBrowseMenu && (
                                <div className="dropdown-menu animate-pop-in">
                                    <Link to="/genre/biography" onClick={() => setShowBrowseMenu(false)}>Biography</Link>
                                    <Link to="/genre/fantasy" onClick={() => setShowBrowseMenu(false)}>Fantasy</Link>
                                    <Link to="/genre/romance" onClick={() => setShowBrowseMenu(false)}>Romance</Link>
                                    <Link to="/genre/sci-fi" onClick={() => setShowBrowseMenu(false)}>Sci-Fi</Link>
                                    <Link to="/genre/thriller" onClick={() => setShowBrowseMenu(false)}>Thriller</Link>
                                    <Link to="/genre/history" onClick={() => setShowBrowseMenu(false)}>History</Link>
                                    <Link to="/genre/fiction" onClick={() => setShowBrowseMenu(false)}>Fiction</Link>
                                </div>
                            )}
                        </div>

                        <Link to="/" className="nav-link">
                            {language === 'id' ? 'Tentang' : 'About'}
                        </Link>
                    </nav>

                    {/* Language Switch Button */}
                    <button className="lang-switch-btn" onClick={toggleLanguage} title="Switch Language">
                        <span>{language.toUpperCase()}</span>
                        <span className="flag">{language === 'id' ? '🇮🇩' : '🇬🇧'}</span>
                    </button>

                    {/* Profile Icon */}
                    <button className="profile-icon" title="User Profile">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;