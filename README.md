# Pixisphere - Photography App

Pixisphere is a responsive photography portfolio and booking app that allows users to browse photographers, filter them by categories, and make inquiries. It is built with React and features smooth UI interactions and optimized performance techniques like debounce.

---

## Features

- Browse photographers with detailed profiles  
- Filter photographers by categories or skills  
- Debounced search input for optimized filtering performance  
- Responsive design for desktop and mobile devices  
- User inquiry functionality  

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/himanshunegi123-developer/Pixisphere.git
cd Pixisphere/photography-app
Install dependencies

Make sure you have Node.js installed. Then run:


npm install
Start the development server


npm run dev
Open your browser

Visit http://localhost:5173 (or the URL provided in the terminal) to view the app.

Important Concepts Used
Filtering
Filtering lets users narrow down the list of photographers based on categories, skills, or search terms. It dynamically updates the displayed list by checking each photographer's attributes against the selected filters.

Debounce
Debounce is used in the search input to limit the frequency of filtering operations. It waits for the user to stop typing for a short delay before executing the filter logic, improving performance by avoiding excessive re-renders.

Logic
The app uses React’s state and effect hooks to manage data and UI updates. The filtering logic combines category filters and search input to display matching photographers. Debounce is implemented to optimize filtering efficiency.

Libraries and Tools Used
React — Frontend framework for building UI components

Vite — Build tool and development server for React projects

PostCSS — CSS processing

ESLint — Code linting for consistent style

React Router  — Client-side routing

Other Dependencies

"@emotion/react"
    "@emotion/styled"
    "@mui/icons-material"
    "@mui/material"
    "@tailwindcss/postcss"
    "axios"
    "framer-motion"
    "lucide"
    "lucide-react"
    "postcss"
    "react"
    "react-dom"
    "react-router-dom"
    "tailwindcss"

e.g., debounce utility (lodash.debounce or custom)

CSS libraries or preprocessors

Project Structure
src/ — React components, pages, and assets

public/ — Static assets like images

package.json — Project dependencies and scripts

vite.config.js — Vite configuration

Author
Himanshu Negi

