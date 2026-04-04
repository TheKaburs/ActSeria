export default function Button({ children, onClick, type="button",  }) {
    return (
        <button 
        type={type}
        onClick={onClick}
        style={{
            padding: "12px 18px",
            borderRadius: "999px",
            border: "1px solid var(--color-border)",
            background: "var(--color-primary)",
            color: "white",
            cursor: "pointer"
        }}
        >{children}</button>
    );
}