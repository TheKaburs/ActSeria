import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import { booksData } from '../data/booksData';
import BookDetailModal from '../components/ui/BookDetailModal';
import './ReaderPage.css';

const storyContent = {
    'whispering-shadows': {
        chapter1: {
            title: 'Magic All Does',
            chapterInfo: 'Chapter 4 | The Whispering Shadows',
            paragraphs: [
                'Lorem ipsum dolor sit amet consectetur. Pellentesque pharetra cursus neque condimentum dui viverra gravida. Morbi turpis tempor eget nisi. Cum vitae vestibulum sit suspendisse quam fermentum turpis. Sollicitudin non semper euismod sit.',
                'Ac nibh elementum integer eu. Sed aliquam sed elementum porta at rhoncus eget. Id tellus id sed pharetra sit lectus tellus non mus. Pellentesque et eu mi tincidunt duis quam in vitae. Mattis semper volutpat maecenas amet orci dictum. Rhoncus blandit aliquam elit risus fermentum. Egestas eu vitae ut eget. Nec mauris at mi eleifend pellentesque nulla quis. Malesuada dignissim et hendrerit lobortis arcu aliquam natoque. Libero mi praesent adipiscing donec eget. Nascetur donec ipsum facilisis tellus. Luctus sagittis tellus habitasse orci malesuada vel.',
                'Lorem ipsum dolor sit amet consectetur. Pellentesque pharetra cursus neque condimentum dui viverra gravida. Morbi turpis tempor eget nisi. Cum vitae vestibulum sit suspendisse quam fermentum turpis. Sollicitudin non semper euismod sit.'
            ],
            highlightQuote: {
                title: "But At The End, There's no way out.",
                text: "They vanish the villages without any empathy. Soldiers who company the witch stunned for a while, watching them turned to dust."
            },
            postHighlightText: 'Lorem ipsum dolor sit amet consectetur. Pellentesque pharetra cursus neque condimentum dui viverra gravida. Morbi turpis tempor eget nisi. Cum vitae vestibulum sit suspendisse quam fermentum turpis. Sollicitudin non semper euismod sit.',
            choices: [
                {
                    id: 'confront',
                    text: '🗡️ Hadapi prajurit sihir di depan gerbang desa',
                    outcome: 'Elias mencabut pedang perak leluhurnya. Kilatan cahaya membakar bayangan penyihir, membuat prajurit mundur berhamburan.'
                },
                {
                    id: 'escape',
                    text: '🕯️ Selamatkan penduduk melalui lorong rahasia perpustakaan',
                    outcome: 'Elias memutar lentera tua. Pintu rahasia di balik rak buku terbuka, memberikan jalan keluar bagi warga desa.'
                }
            ]
        }
    }
};

const ReaderPage = () => {
    const [searchParams] = useSearchParams();
    const bookId = searchParams.get('bookId') || 'whispering-shadows';
    const { language } = useLanguage();
    const navigate = useNavigate();

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [fontSize, setFontSize] = useState(18);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [showOverviewModal, setShowOverviewModal] = useState(false);

    const book = booksData.find(b => b.id === bookId) || booksData[0];
    const chapterData = storyContent[bookId]?.chapter1 || storyContent['whispering-shadows'].chapter1;

    const isId = language === 'id';

    return (
        <div className="merged-reader-page animate-fade-in">
            {/* Merged Header Controls Bar */}
            <div className="reader-header-bar container">
                {/* Left: Back to Overview */}
                <div className="reader-header-left">
                    <button className="btn-capsule-nav" onClick={() => setShowOverviewModal(true)}>
                        {isId ? 'Kembali ke Ikhtisar' : 'Back To Overview'}
                    </button>
                </div>

                {/* Center: Chapter Titles & Previous Chapter Pill */}
                <div className="reader-header-center">
                    <h1 className="reader-main-heading">{chapterData.title}</h1>
                    <span className="reader-sub-heading">{chapterData.chapterInfo}</span>
                    <button className="btn-prev-chapter">
                        {isId ? 'Bab Sebelumnya' : 'Previous Chapter'}
                    </button>
                </div>

                {/* Right: Ambient Sound & Font Size Controls */}
                <div className="reader-header-right">
                    <button 
                        className="btn-font-ctrl" 
                        onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                        title="Decrease Font Size"
                    >
                        A-
                    </button>
                    <button 
                        className="btn-font-ctrl" 
                        onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                        title="Increase Font Size"
                    >
                        A+
                    </button>

                    <button 
                        className={`btn-ambient-ctrl ${isAudioPlaying ? 'active' : ''}`}
                        onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                    >
                        {isAudioPlaying ? '🔊 Ambient ON' : '🔇 Ambient OFF'}
                    </button>
                </div>
            </div>

            {/* Main Reading Canvas */}
            <main className="reader-content-canvas container">
                <article className="reader-paper-article" style={{ fontSize: `${fontSize}px` }}>
                    {chapterData.paragraphs.map((p, idx) => (
                        <p key={idx} className="reader-p-block">{p}</p>
                    ))}

                    {/* Highlighted Motion Text Quote Section */}
                    {chapterData.highlightQuote && (
                        <div className="highlight-quote-box">
                            <h2>{chapterData.highlightQuote.title}</h2>
                            <p>{chapterData.highlightQuote.text}</p>
                        </div>
                    )}

                    <p className="reader-p-block">{chapterData.postHighlightText}</p>

                    {/* Interactive Choice Component */}
                    <div className="reader-choice-container">
                        <h3>{isId ? 'Tentukan Alur Cerita Anda:' : 'Shape Your Narrative:'}</h3>
                        <div className="choice-btns-row">
                            {chapterData.choices.map((ch) => (
                                <button 
                                    key={ch.id}
                                    className={`choice-pill-btn ${selectedChoice?.id === ch.id ? 'active' : ''}`}
                                    onClick={() => setSelectedChoice(ch)}
                                >
                                    {ch.text}
                                </button>
                            ))}
                        </div>

                        {selectedChoice && (
                            <div className="choice-feedback-card animate-pop-in">
                                🌟 <strong>{isId ? 'Dampak Pilihan:' : 'Choice Impact:'}</strong>
                                <p>{selectedChoice.outcome}</p>
                            </div>
                        )}
                    </div>

                    {/* Bottom Chapter Navigation */}
                    <div className="reader-bottom-chapter-nav">
                        <button className="btn-capsule-nav" onClick={() => navigate('/home')}>
                            ← {isId ? 'Beranda' : 'Home'}
                        </button>
                        <span className="ch-prog-text">{isId ? 'Bab 4 dari 32' : 'Chapter 4 of 32'}</span>
                        <button className="btn-gold" onClick={() => alert(isId ? 'Bab 5 akan rilis segera!' : 'Chapter 5 releasing soon!')}>
                            {isId ? 'Bab Selanjutnya →' : 'Next Chapter →'}
                        </button>
                    </div>
                </article>
            </main>

            {/* Overview Pop-Up Modal */}
            {showOverviewModal && (
                <BookDetailModal 
                    book={book} 
                    onClose={() => setShowOverviewModal(false)} 
                />
            )}
        </div>
    );
};

export default ReaderPage;