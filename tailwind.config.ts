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
                primary: {
                    DEFAULT: "#C4F82A",
                    dark: "#A8D926",
                    light: "#D6FA4E",
                },
                "on-primary": "#333333",
                
                dark: {
                    screen: "#1C1C1F",
                    surface: "#2C2C2F",
                    "surface-light": "#3C3C3F",
                    "surface-dark": "#1A1A1D",
                    button: "#4C4C4F",
                    "button-hover": "#5C5C5F",
                    "button-active": "#3C3C3F",
                    "on-surface": "#FFFFFF",
                    "on-button": "#FFFFFF",
                    "text-primary": "#FFFFFF",
                    "text-secondary": "#B0B0B0",
                    "text-muted": "#808080",
                    border: "#4C4C4F",
                    "border-light": "#5C5C5F",
                    "border-dark": "#3C3C3F",
                    scrollbar: "#4B5563",
                    "scrollbar-hover": "#6B7280",
                    "scrollbar-track": "transparent",
                },
                
                light: {
                    screen: "#FFFFFF",
                    surface: "#F8F9FA",
                    "surface-light": "#FFFFFF",
                    "surface-dark": "#E9ECEF",
                    button: "#E9ECEF",
                    "button-hover": "#DEE2E6",
                    "button-active": "#CED4DA",
                    "on-surface": "#212529",
                    "on-button": "#212529",
                    "text-primary": "#212529",
                    "text-secondary": "#6C757D",
                    "text-muted": "#ADB5BD",
                    border: "#DEE2E6",
                    "border-light": "#E9ECEF",
                    "border-dark": "#CED4DA",
                    scrollbar: "#ADB5BD",
                    "scrollbar-hover": "#6C757D",
                    "scrollbar-track": "transparent",
                },
                
                success: "#10B981",
                warning: "#F59E0B",
                error: "#EF4444",
                info: "#3B82F6",
            },
        },
    },
    plugins: [],
};
export default config;
