import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './LandingPage.css';

// SVG or Stylized CSS Covers for 1:1 reproduction
const bookCovers = [
    {
        id: 'blackwood',
        title: 'THE ECHOES OF BLACKWOOD MANOR',
        subtitle: 'A NOVEL OF SUPERNATURAL TERROR',
        author: 'GABRIELLA VANE',
        theme: 'cover-gothic',
        angle: '-15deg',
        top: '10%',
        left: '2%',
        bgGrad: 'linear-gradient(145deg, #1c152b, #0a0714)',
        accentColor: '#9b59b6',
        icon: '⚡'
    },
    {
        id: 'fog',
        title: 'THE WHISPERS OF FOG',
        subtitle: 'A TALE OF SHADOWS AND SECRETS',
        author: 'CLAUDE BLACKWOOD',
        theme: 'cover-gold-frame',
        angle: '8deg',
        top: '38%',
        left: '18%',
        bgGrad: 'linear-gradient(145deg, #2c1f14, #120b05)',
        accentColor: '#e9c46a',
        icon: '🌫️'
    },
    {
        id: 'shadows',
        title: 'THE WHISPERING SHADOWS',
        subtitle: 'A MIND GAMES NOVEL',
        author: 'CASSANDRA BLACKWOOD',
        theme: 'cover-crimson',
        angle: '-6deg',
        top: '40%',
        right: '18%',
        bgGrad: 'linear-gradient(145deg, #2b1115, #0f0406)',
        accentColor: '#e76f51',
        icon: '🌹'
    },
    {
        id: 'eagles',
        title: 'IRON EAGLES',
        subtitle: 'AN EPIC HISTORICAL SAGA',
        author: 'VALERIA ROMANA',
        theme: 'cover-roman',
        angle: '16deg',
        top: '8%',
        right: '2%',
        bgGrad: 'linear-gradient(145deg, #3d2210, #170b03)',
        accentColor: '#f39c12',
        icon: '🏛️'
    }
];

const LandingPage = () => {
    const { language } = useLanguage();

    const isId = language === 'id';

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="landing-hero container">
                {/* Floating Angled Book Covers */}
                <div className="floating-covers-wrapper">
                    {bookCovers.map((cover) => (
                        <div 
                            key={cover.id}
                            className={`floating-cover ${cover.theme}`}
                            style={{
                                transform: `rotate(${cover.angle})`,
                                top: cover.top,
                                left: cover.left,
                                right: cover.right,
                                background: cover.bgGrad
                            }}
                        >
                            <div className="cover-border-inner">
                                <span className="cover-icon">{cover.icon}</span>
                                <h4 style={{ color: cover.accentColor }}>{cover.title}</h4>
                                <p className="cover-sub">{cover.subtitle}</p>
                                <p className="cover-author">{cover.author}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hero Main Text Content */}
                <div className="hero-content animate-fade-in">
                    <h1 className="hero-headline">
                        {isId 
                            ? 'Rasakan Pengalaman Membaca Dengan Kedalaman & Emosi Imersif' 
                            : 'Experience Your Read With Immersive Depth & Emotion'}
                    </h1>

                    <p className="hero-subheadline">
                        {isId 
                            ? 'Jelajahi koleksi cerita interaktif dari berbagai genre yang menggugah jiwa.' 
                            : 'Explore A Vast Collection Of Interactive Stories Across Genres.'}
                    </p>

                    <Link to="/home" className="btn-gold hero-cta-btn">
                        {isId ? 'Mulai Sekarang' : 'Get Started'}
                    </Link>
                </div>
            </section>

            {/* Why Act:Seria+ Section */}
            <section className="landing-section why-section container">
                <div className="why-content">
                    <h2>Why Act:Seria+ ?</h2>
                    <p>
                        {isId 
                            ? 'Act:Seria+ hadir sebagai ruang suaka digital untuk mengatasi doomscrolling. Kami memadukan teks, ilustrasi, suara ambien, dan pilihan interaktif ringan agar setiap cerita terasa hidup dan berkesan mendalam di hati pembaca.'
                            : 'Act:Seria+ is crafted as a digital sanctuary to combat mindless doomscrolling. By blending prose, dynamic illustration, ambient audio, and choice-based interaction, we create scene-based narratives designed for emotional engagement and mindful reading.'}
                    </p>
                </div>
            </section>

            {/* Read Like You Are The Character Section */}
            <section className="landing-section character-section container">
                <div className="character-content">
                    <h2>
                        {isId ? 'Membaca Seolah Anda Adalah Karakter Utama' : 'Read Like You Are The Character'}
                    </h2>
                    <p>
                        {isId 
                            ? 'Bukan sekadar kata-kata di layar, tetapi pengalaman serasa masuk ke dalam dunia cerita. Pilihan Anda menentukan keputusan karakter, mempengaruhi alur, dan membawa dimensi baru dalam setiap bab.'
                            : 'Not just static words on a screen, but an invitation to step into the story world. Your choices guide character decisions, shape narrative outcomes, and bring a new dimension to digital storytelling.'}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;