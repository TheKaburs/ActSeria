import { useContext } from 'react';
import { LanguageContext } from './language-context';

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            'useLanguage harus digunakan di dalam LanguageProvider'
        );
    }

    return context;
};