// tailwind.config.js
import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
    // Material Tailwind will inject its theme extensions here
    // You can keep your 'content' array here if you prefer, or manage it via @source in CSS
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Any custom theme extensions you had previously
        },
    },
    plugins: [],
});