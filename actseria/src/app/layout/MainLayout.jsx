import { Outlet } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}