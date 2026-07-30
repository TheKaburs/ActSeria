import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [showLanguageModal, setShowLanguageModal] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('actseria_lang');
        if (savedLang) {
            setLanguage(savedLang);
            setShowLanguageModal(false);
        } else {
            // First time opening the web
            setShowLanguageModal(true);
        }
    }, []);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('actseria_lang', lang);
        setShowLanguageModal(false);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, showLanguageModal, setShowLanguageModal }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
