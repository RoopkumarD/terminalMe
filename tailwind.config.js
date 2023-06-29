/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
        fontFamily: {
            jetBrain: ["jetBrain", "sans-serif"],
        },
        colors: {
            'folderColor': '#9CD9F0',
            'textColor': '#F7F7F7',
            'backgroundColor': '#070101',
            //'commandColor': '#8EB33B',
            'commandColor': '#D0B03C',
            'commandErrorColor': '#E09690',
        },
    },
  },
  plugins: [],
};
