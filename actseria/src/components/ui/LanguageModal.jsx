import React, { useState } from 'react';
import { useLanguage } from '../../context/useLanguage';
import './LanguageModal.css';

const LanguageModal = () => {
    const { showLanguageModal, setLanguage, language } = useLanguage();
    const [selected, setSelected] = useState(language || 'id');

    if (!showLanguageModal) return null;

    const handleConfirm = () => {
        setLanguage(selected);
    };

    return (
        <div className="lang-modal-overlay animate-fade-in">
            <div className="lang-modal-card animate-pop-in">
                <div className="lang-modal-header">
                    <div className="logo-brand">
                        <span className="logo-white">Act</span>
                        <span className="logo-colon">:</span>
                        <span className="logo-gold">Seria+</span>
                    </div>
                    <span className="lang-badge">Welcome</span>
                </div>

                <h2>Select Your Preferred Language</h2>
                <p className="lang-modal-subtitle">
                    Pilih bahasa yang ingin Anda gunakan untuk menjelajahi cerita interaktif di Act:Seria+.
                </p>

                <div className="lang-options">
                    <div 
                        className={`lang-option-card ${selected === 'id' ? 'active' : ''}`}
                        onClick={() => setSelected('id')}
                    >
                        <div className="lang-flag">🇮🇩</div>
                        <div className="lang-info">
                            <h3>Bahasa Indonesia</h3>
                            <p>Nikmati narasi interaktif dan cerita lokal dengan suasana yang imersif.</p>
                        </div>
                        <div className="radio-indicator"></div>
                    </div>

                    <div 
                        className={`lang-option-card ${selected === 'en' ? 'active' : ''}`}
                        onClick={() => setSelected('en')}
                    >
                        <div className="lang-flag">🇬🇧</div>
                        <div className="lang-info">
                            <h3>English</h3>
                            <p>Experience interactive stories and local narratives in English.</p>
                        </div>
                        <div className="radio-indicator"></div>
                    </div>
                </div>

                <button className="btn-gold btn-confirm-lang" onClick={handleConfirm}>
                    {selected === 'id' ? 'Konfirmasi & Masuk' : 'Confirm & Continue'} →
                </button>
            </div>
        </div>
    );
};

export default LanguageModal;
