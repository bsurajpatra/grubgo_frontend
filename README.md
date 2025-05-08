# GrubGo

GrubGo is a web application that allows users to sign up, log in, and manage their food delivery orders. The application provides a user-friendly interface for customers, restaurant owners, delivery partners, and administrators.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (Sign Up, Sign In)
- Role-based access for different users (Customer, Restaurant Owner, Delivery Partner, Admin)
- Menu management for restaurants
- Order history and recent orders tracking
- Community features for managing delivery partners and community presidents

## Technologies Used

- React.js
- Vite (for development and build)
- Axios (for API requests)
- React Router (for routing)
- CSS for styling

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/grubgo.git
   cd grubgo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Navigate to `http://localhost:3000` in your browser.
- Use the Sign Up page to create a new account.
- Log in using your credentials.
- Access the dashboard to manage your orders and view menus.

## API Endpoints

The application interacts with the following API endpoints:

- **Login**: `POST /auth/login`
- **Register**: `POST /auth/register`
- **Menu**: `GET /dashboard/menu`
- **Restaurants**: `GET /restaurants`
- **Orders**: `GET /orders`
- **Delivery History**: `GET /deliveries/history`
- **User Profile**: `GET /user/profile`
- **Forgot Password**: `POST /password/forgot`

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

```plaintext
VITE_API_BASE_URL=http://localhost:8080/api
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
