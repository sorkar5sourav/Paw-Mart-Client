import { useEffect, useState } from "react";

const ThemeToggle = () => {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const stored = localStorage.getItem("theme");
		const prefersDark =
			window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
		const initial = stored || (prefersDark ? "dark" : "light");
		setTheme(initial);
	}, []);

	useEffect(() => {
		if (!theme) return;
		localStorage.setItem("theme", theme);
		const root = document.documentElement;
		root.setAttribute("data-theme", theme);
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	return (
		<button onClick={toggleTheme} className="btn btn-ghost btn-circle" aria-label="Toggle theme">
			{theme === "dark" ? (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
					<path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10-9h-2v3h2V4zm7.04-.95l-1.41-1.41-1.79 1.8 1.41 1.41 1.79-1.8zM20 11v2h3v-2h-3zm-8 9h2v-3h-2v3zm4.24-1.84l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM4.96 19.05l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8zM12 8a4 4 0 100 8 4 4 0 000-8z"/>
				</svg>
			) : (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12.74 2.01a1 1 0 00-1.23 1.23A8.01 8.01 0 0020 12a8 8 0 11-8.77-8.99 1 1 0 001.51-1z"/>
				</svg>
			)}
		</button>
	);
};

export default ThemeToggle;

