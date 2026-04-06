import React from "react";

const Footer = () => {
    return (
        <footer style={{ padding: "1rem", textAlign: "center", borderTop: "1px solid #ccc", marginTop: "2rem" }}>
            <p>&copy; {new Date().getFullYear()} Actseria. All rights reserved.</p>
        </footer>
    );
};

export default Footer;