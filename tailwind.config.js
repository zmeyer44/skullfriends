module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./landing/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#d50000",
        dark: "#212121",
        darkText: "#212121",
        darkBlue: "#111A2C",
        darkGray: "#525C67",
        darkGray2: "#757D85",
        gray2: "#BBBDC1",
        gray3: "#CFD0D7",
        lightGray1: "#DDDDDD",
        lightGray2: "#F5F5F8",
      },
      fontFamily: {
        poppins: ["'Poppins'", "sans-serif"],
        player: ["'Press Start 2P'", "monospace"],
      },
      flexGrow: {
        2: 2,
        3: 3,
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
    },
    customGroups: {
      // For example, `row` results in `group-row-`
      names: ["avatar"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("tailwindcss-custom-groups"),
    require("tailwind-scrollbar"),
  ],
  variants: {
    scrollbar: ["dark", "rounded"],
  },
  darkMode: "class",
};
