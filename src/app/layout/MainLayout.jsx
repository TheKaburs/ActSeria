import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import LanguageModal from "../../components/ui/LanguageModal";

export default function MainLayout() {
    const location = useLocation();
    const isLanding = location.pathname === "/";

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer simple={isLanding} />
            <LanguageModal />
        </>
    );
}