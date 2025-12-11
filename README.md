# Dashboard Pilet - Senior React Developer Take-Home Test

A professional microfrontend dashboard module built with React, TypeScript, and Piral. This pilet provides a dashboard interface for managing and viewing posts with real-time updates, pagination, and modal detail views.

## Features

### Completed Requirements
- **Piral Integration**: Registered route `/dashboard` and menu item
- **Data Display**: Fetches posts from JSONPlaceholder API
- **Pagination**: 8 items per page with navigation controls
- **Add New Items**: Form with title and body fields (local state)
- **Detail Views**: Click any post to see details in a modal
- **Reusable Components**: 5+ reusable, composable components
- **Professional Styling**: Clean, responsive UI with CSS Modules

### Bonus Features
- **Optimistic UI**: New posts appear immediately
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Loading States**: Smooth loading animations
- **Character Counter**: Real-time feedback for post content
- **Interactive Elements**: Hover effects, transitions, and animations
- **Unit Testing**: Comprehensive test coverage for core components
- **Lazy Loading**: Detail modal loads on-demand for better performance

## Technology Stack
- **Framework**: React 18 with TypeScript
- **Microfrontend**: Piral (Pilet architecture)
- **Styling**: CSS Modules
- **Testing**: Jest + React Testing Library
- **Build Tool**: Webpack 5 (via Piral CLI)
- **API**: JSONPlaceholder (REST API)
- **State Management**: React hooks (useState, useEffect)

## Installation

```bash
# Clone the Repository
git clone https://github.com/Dayveesptf/Pilet-Dashboard.git
cd dashboard-pilet

# Install Piral CLI globally
npm install -g piral-cli

# Navigate to project directory
cd dashboard-pilet

# Install dependencies
npm install

# Start development server
npm start