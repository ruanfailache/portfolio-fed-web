import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
