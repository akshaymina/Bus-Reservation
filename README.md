# Bus Reservation System

A full-stack bus reservation system built with React, Node.js, Express, and PostgreSQL, featuring authentication, seat booking, and an admin panel.

## Tech Stack

### Frontend:
- React.js
- Tailwind CSS (for styling)
- Netlify (for deployment)

### Backend:
- Node.js
- Express.js
- PostgreSQL (hosted on Supabase)
- JWT for authentication
- bcrypt.js for password hashing
- OAuth (Google, Facebook, GitHub login)
- Nodemailer for email notifications

### Hosting:
- Backend: Render (free tier)
- Database: Supabase (PostgreSQL)

## Features

### User Authentication:
- Sign up, login, and password reset
- Role-based access (Admin, User, Driver)

### Bus Management:
- CRUD operations for buses and routes
- Assign drivers to buses

### Seat Reservation:
- Real-time seat availability
- Select and book seats
- Payment integration (Stripe)

### Admin Panel:
- Manage bus schedules
- View user bookings
- Generate reports

### Additional Features:
- Email confirmations via Nodemailer
- SMS alerts using Twilio
- User reviews and ratings for bus services
- Live bus tracking with Google Maps API (optional)

## Installation

### Prerequisites:
- Node.js installed
- PostgreSQL database setup on Supabase

### Steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/bus-reservation-system.git
   ```
2. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
   ```sh
   cd frontend
   npm install
   ```
3. Setup environment variables (.env):
   ```sh
   PORT=5000
   DATABASE_URL=your_supabase_database_url
   JWT_SECRET=your_jwt_secret
   ```
4. Start backend server:
   ```sh
   cd backend
   npm start
   ```
5. Start frontend:
   ```sh
   cd frontend
   npm start
   ```

## Deployment
- **Frontend:** Deploy on Netlify
- **Backend:** Deploy on Render (free tier)
- **Database:** Hosted on Supabase






