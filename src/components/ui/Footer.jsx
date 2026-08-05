import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import "./Footer.css";

const Footer = ({ simple = false }) => {
    const { language } = useLanguage();

    if (simple) {
        return (
            <footer className="footer-simple">
                <div className="container footer-simple-content">
                    <div className="footer-logo">
                        <span className="text-white">Act</span>
                        <span className="text-gold">:</span>
                        <span className="text-gold">Seria+</span>
                    </div>
                    <div className="footer-simple-links">
                        <Link to="#">{language === 'id' ? 'Bantuan' : 'Help'}</Link>
                        <Link to="#">{language === 'id' ? 'Aksesibilitas' : 'Accessibility'}</Link>
                        <Link to="#">{language === 'id' ? 'Syarat & Ketentuan' : 'Terms'}</Link>
                        <span>© Act:seria+ 2026</span>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="footer-full">
            <div className="container footer-grid">
                <div className="footer-brand-col">
                    <div className="footer-logo">
                        <span className="text-white">Act</span>
                        <span className="text-gold">:</span>
                        <span className="text-gold">Seria+</span>
                    </div>
                    <p className="footer-tagline">
                        {language === 'id' 
                            ? 'Platform penceritaan interaktif untuk membaca secara bijak & bermakna.' 
                            : 'Interactive storytelling platform for mindful & immersive reading.'}
                    </p>
                </div>

                <div className="footer-col">
                    <h4>{language === 'id' ? 'Jelajahi' : 'Explore'}</h4>
                    <ul>
                        <li><Link to="/home">{language === 'id' ? 'Rilis Terbaru' : 'New Releases'}</Link></li>
                        <li><Link to="/home">Fantasy</Link></li>
                        <li><Link to="/home">Romance</Link></li>
                        <li><Link to="/home">Sci-Fi</Link></li>
                        <li><Link to="/home">Drama</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>{language === 'id' ? 'Dukungan' : 'Support'}</h4>
                    <ul>
                        <li><Link to="#">{language === 'id' ? 'Kebijakan Privasi' : 'Privacy & Policy'}</Link></li>
                        <li><Link to="#">{language === 'id' ? 'Syarat Layanan' : 'Terms Of Service'}</Link></li>
                        <li><Link to="#">{language === 'id' ? 'Panduan Kreator' : 'Creator Guide'}</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>{language === 'id' ? 'Hubungi Kami' : 'Connect'}</h4>
                    <ul>
                        <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
                        <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
                        <li><a href="https://x.com" target="_blank" rel="noreferrer">Twitter / X</a></li>
                        <li><a href="https://discord.com" target="_blank" rel="noreferrer">Discord Community</a></li>
                    </ul>
                </div>
            </div>

            <div className="container footer-bottom">
                <p>© Act:seria+ 2026. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;