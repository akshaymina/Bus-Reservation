# BusHub Backend API

This is the backend API for the BusHub bus booking application. It provides endpoints for user authentication, bus management, booking operations, and user profile management.

## Features

- User authentication (register, login)
- JWT-based authorization
- Bus management (CRUD operations)
- Booking management
- User profile management
- Admin functionality
- MongoDB database integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd back-end
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bus-hub
   JWT_SECRET=your_jwt_secret_key_here
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Buses

- `GET /api/buses` - Get all buses (with optional filters)
- `GET /api/buses/:id` - Get single bus by ID
- `POST /api/buses` - Create new bus (admin only)
- `PUT /api/buses/:id` - Update bus (admin only)
- `DELETE /api/buses/:id` - Delete bus (admin only)

### Bookings

- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings` - Get all bookings (admin only)
- `POST /api/bookings` - Create new booking
- `POST /api/bookings/:id/cancel` - Cancel booking
- `PATCH /api/bookings/:id/status` - Update booking status (admin only)

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users` - Get all users (admin only)
- `PATCH /api/users/:id/role` - Update user role (admin only)

## Request/Response Examples

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "busId": "bus_id_here",
  "seatNumber": 1,
  "passengerName": "John Doe",
  "passengerEmail": "john@example.com",
  "passengerPhone": "1234567890",
  "paymentMethod": "credit_card"
}
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Development

To run the server in development mode with auto-reload:
```bash
npm run dev
```

To run the server in production mode:
```bash
npm start
```

## Testing

To run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 