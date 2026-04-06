import React from "react";

const Navbar = () => { 
    return (
        <nav className="navbar">
            {/* Logo and Profile */}
            <div className="nav-brand">
                <div className="logo-text">
                    <span className="text-white">Act:</span>
                    <span className="text-gold">Seria+</span>
                </div>
            </div>

            {/* Right Side: Search and Navigation Links */}
            <div className="nav-menu">
                <div className="search-box">   
                    <input type="text" placeholder="Search in site" className="search-input" />
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>

                <ul>
                    <li>
                        Browse 
                        {/* SVG Dropdown Arrow */}
                        <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </li>
                    <li>About</li>
                </ul>
                <div className="profile-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
            </div>
            
        </nav>
    );
}

export default Navbar;