import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../../pages/HomePage";
import LandingPage from "../../pages/LandingPage";
import ReaderPage from "../../pages/ReaderPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {index: true, element: <LandingPage />},
            {path: "home", element: <HomePage />},
            {path: "reader", element: <ReaderPage />}
        ]
    }
]);