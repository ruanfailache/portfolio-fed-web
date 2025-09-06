import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/entrypoint/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#C4F82A",
                screen: "#1C1C1F",
                surface: "#2C2C2F",
                button: "#4C4C4F",
                "on-primary": "#333333",
            },
        },
    },
    plugins: [],
};
export default config;
