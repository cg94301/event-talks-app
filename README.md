# TechTalk 2026 - Event Schedule Website

A modern, responsive single-page application (SPA) to display a 1-day technical event schedule. This project features a Node.js/Express backend and a Vanilla JavaScript frontend with dynamic schedule calculation and real-time search functionality.

## 🚀 Features

- **Automatic Schedule Calculation**: Generates a precise timeline starting at 10:00 AM.
- **Dynamic Content**: Handles 6 technical talks, each 1 hour long.
- **Smart Breaks**: Automatically inserts a 1-hour lunch break after the 3rd talk and 10-minute transitions between all other sessions.
- **Real-time Search**: Instantly filter talks by category or title as you type.
- **Responsive Design**: Mobile-first, card-based layout using CSS Grid and Flexbox.
- **Lightweight Architecture**: No heavy frontend frameworks—built with standard HTML5, CSS3, and ES6+ JavaScript.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Data**: JSON-based storage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## 🔧 Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://github.com/cg94301/event-talks-app.git
   cd event-talks-app
   ```

2. **Install local dependencies**:
   ```bash
   npm install
   ```

## 🏃 Running the Application

1. **Start the local server**:
   ```bash
   node server.js
   ```

2. **Access the website**:
   Open your browser and navigate to:
   `http://localhost:3000`

## 📁 Project Structure

```text
tech-event-site/
├── public/             # Frontend assets
│   ├── index.html      # Main entry point
│   ├── style.css       # Custom styles
│   └── app.js          # Client-side logic & rendering
├── data.json           # Talk metadata (title, speakers, categories)
├── server.js           # Express.js backend script
├── package.json        # Project metadata and dependencies
└── .gitignore          # Files to exclude from Git
```

## 📅 Schedule Logic

The application follows a strict 1-day track:
- **Start Time**: 10:00 AM
- **Talk Duration**: 60 minutes
- **Transition**: 10 minutes between talks
- **Lunch Break**: 1 hour (scheduled after the 3rd talk)
- **Total Sessions**: 6 technical talks

## 🔍 How to Use Search

Simply start typing in the search bar at the top of the page. The schedule will automatically filter to show only the talks that match your query in either the **title** or the **categories** tags.

---
*Created for the TechTalk 2026 Initiative.*
