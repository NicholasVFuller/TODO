# Todo List Application - Frontend

This is the frontend part of the Todo List application built using React.js. It interacts with a .NET Core Web API backend to manage Todo items.

## Project Structure

- **public/index.html**: The main HTML file that serves as the entry point for the application.
- **src/App.js**: The root component of the React application.
- **src/components/TodoList.js**: Component that displays the list of Todo items.
- **src/services/api.js**: Contains functions for making API calls to the backend.
- **src/index.js**: The entry point for the React application, rendering the App component.

## Getting Started

To get started with the frontend application, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/NicholasVFuller/TODO.git
   cd TODO/frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

## API Integration

The frontend communicates with the backend API to perform CRUD operations on Todo items. Ensure that the backend is running and accessible for the frontend to function correctly.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.