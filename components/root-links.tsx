import Link from "next/link"; // Ensure the CSS file is imported globally

export function RootLinks() {
    const links = {
        clipboard: "/clipboard",
        jsonComparison: "/json-comparison",
    };

    return (
        <div className="root-links-container">
            <ul className="root-links-list">
                {Object.keys(links).map((key) => (
                    <li key={key} className="root-links-list-item">
                        <Link
                            href={links[key as keyof typeof links]}
                            className="root-links-link"
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
