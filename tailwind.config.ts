import type {Config} from "tailwindcss";

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
                'on-primary': "#333333"
            },
            backgroundColor: {
                primary: "#C4F82A",
                screen: "#141414",
                surface: "#1F1F1F",
                button: "#333333",
            }
        },
    },
    plugins: [],
};
export default config;
