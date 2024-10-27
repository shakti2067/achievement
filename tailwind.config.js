/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blackolive: "#3A3A3A",
        navyblue: "#13007C",
        antiflashwhite: "#F3F4F6",
        aurometalaaurus: "#6B7280",
        quillgrey: "#D1D5DB",
        softpeach: "#EEEEEE",
        amour: "#EAEDF0",
        stardust: "#9F9F9F",
        pinklace: "#FEE2E2",
        darkred: "#DC2626",
        cosmiclatte: "#FFFBEB",
        aliceblue: "#EFF5FF",
        ube: "#7E7CCC",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        maxXs: { max: "468px" },
        maxSm: { max: "639px" },
        maxMd: { max: "767px" },
        maxXlg: { max: "992px" },
        maxLg: { max: "1023px" },
        maxXl: { max: "1279px" },
      },
      fontFamily: {
        "inter-regular": "InterRegular",
        "inter-medium": "InterMedium",
        "inter-semibold": "InterSemiBold",
        "inter-bold": "InterBold",
        "inter-extrabold": "InterExtraBold",
      },
      boxShadow: {
        default: "0px 1px 4px 0px rgba(0, 0, 0, 0.14)",
        light: "rgba(0, 0, 0, 0.14)",
      },
    },
  },
  plugins: [],
};
