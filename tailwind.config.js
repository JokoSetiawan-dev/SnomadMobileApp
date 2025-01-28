/** @type {import('tailwindcss').Config} */
import { platformSelect } from "nativewind/theme";

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"], 
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'poppins-black': 'Poppins-Black',
        'poppins-black-italic': 'Poppins-BlackItalic',
        'poppins-bold': 'Poppins-Bold',
        'poppins-bold-italic': 'Poppins-BoldItalic',
        'poppins-extrabold': 'Poppins-ExtraBold',
        'poppins-extrabold-italic': 'Poppins-ExtraBoldItalic',
        'poppins-extralight': 'Poppins-ExtraLight',
        'poppins-extralight-italic': 'Poppins-ExtraLightItalic',
        'poppins-italic': 'Poppins-Italic',
        'poppins-light': 'Poppins-Light',
        'poppins-light-italic': 'Poppins-LightItalic',
        'poppins-medium': 'Poppins-Medium',
        'poppins-medium-italic': 'Poppins-MediumItalic',
        'poppins': 'Poppins-Regular',
        'poppins-semibold': 'Poppins-SemiBold',
        'poppins-semibold-italic': 'Poppins-SemiBoldItalic',
        'poppins-thin': 'Poppins-Thin',
        'poppins-thin-italic': 'Poppins-ThinItalic',
        'space-mono': 'SpaceMono-Regular',
      },
    },
  },
  plugins: [],
};