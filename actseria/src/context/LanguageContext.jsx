import { useState } from 'react';
import { LanguageContext } from './language-context';

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('actseria_lang') ?? 'en';
    });

    const [showLanguageModal, setShowLanguageModal] = useState(() => {
        return localStorage.getItem('actseria_lang') === null;
    });

    const changeLanguage = (lang) => {
        setLanguageState(lang);
        localStorage.setItem('actseria_lang', lang);
        setShowLanguageModal(false);
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage: changeLanguage,
                showLanguageModal,
                setShowLanguageModal,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};