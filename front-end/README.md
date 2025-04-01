# BusHub Frontend

A modern web application for booking bus tickets, built with React and Material-UI.

## Features

- User authentication (register, login, logout)
- Bus search with filters (from, to, date)
- Featured bus routes
- Bus booking with multi-step form
- Booking confirmation and ticket printing
- User profile management
- Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend server running on http://localhost:5000

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bushub-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following:
```
REACT_APP_API_URL=http://localhost:5000
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

## Project Structure

```
src/
  ├── components/         # Reusable UI components
  ├── context/           # React context providers
  ├── services/          # API services
  ├── utils/             # Utility functions
  ├── App.jsx           # Main application component
  └── index.jsx         # Application entry point
```

## Dependencies

- React
- Material-UI
- React Router
- Axios
- Date-fns
- And more (see package.json)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
