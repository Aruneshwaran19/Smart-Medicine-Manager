# Smart Medicine Manager

A responsive medicine scheduling web application designed to help caretakers manage patient medications efficiently.

---

## Overview

Smart Medicine Manager allows users to:

- Add, edit, and delete medicines
- Automatically sort medicines by time
- Mark medicines as completed
- Detect overdue medicines based on real-time comparison
- Highlight the next upcoming dose
- Filter medicines by patient name
- Persist data using localStorage
- View optimized layouts on both desktop and mobile

This project demonstrates practical frontend engineering concepts including dynamic DOM manipulation, state management, responsive design, and time-based logic handling.

---

## Features

### Core Functionality
- Full CRUD operations
- Time-based sorting algorithm
- Automatic overdue status calculation
- Live clock integration
- Upcoming medicine highlighting

### User Experience
- Custom toast notifications
- Animated modal component
- Disabled action states
- Responsive mobile card layout
- Clean dashboard UI

### Data Persistence
- Browser localStorage integration
- State restoration on reload

---

## Tech Stack

- HTML5
- CSS3 (Flexbox, Media Queries, Animations)
- JavaScript (ES6+)
- LocalStorage API

---

## Architecture Highlights

- State-driven rendering using a centralized `medicines` array
- Separation of UI rendering and business logic
- Real-time time comparison using JavaScript `Date` object
- Dynamic table rendering with conditional styling
- Responsive design using breakpoint-based media queries

---

## Screenshots

![image alt](https://github.com/Aruneshwaran19/Smart-Medicine-Manager/blob/eca51da256892b2f88b6825f389d0e229a8e7a0d/Screenshot%20(158).png)
---

## How to Run Locally

1. Clone the repository
2. Open `index.html` in your browser
3. No additional dependencies required

---

## Future Improvements

- Authentication system
- Backend integration with database
- Notification system with service workers
- Export data to CSV
- Role-based user system

---

## Author

Aruneshwaran - Frontend Developer  
Focused on building real-world practical web applications.
