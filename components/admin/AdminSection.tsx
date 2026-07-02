interface AdminSectionProps {
    title: string;
    buttonText: string;
    onClick: () => void;
    children: React.ReactNode;
}

export default function AdminSection({
    title,
    buttonText,
    onClick,
    children,
}: AdminSectionProps) {
    return (
        <>
            <div className="page-title">
                <h2>{title}</h2>

                <button
                    className="btn-action success"
                    onClick={onClick}
                >
                    {buttonText}
                </button>
            </div>

            {children}

            <div style={{ height: 30 }} />
        </>
    );
}