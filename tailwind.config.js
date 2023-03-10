/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      
        main: '#000000',
        base: '#E8F9FD',
        btn: '#433434',
        inpt: '#766C6C',
        txt: '#E8F9FD',
        auth: '#D2D2D2',
        pholder: '#B1B1B1',
        profile: '#613D2B'
       
      },
      container:{
        center: true,
        padding: '1rem'
      }
    },
    fontFamily:{
      mainFont : ['Abhaya Libre']
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
