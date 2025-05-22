# Todo List Application

## Overview
This project is a Todo List web application that utilizes a PostgreSQL database for data storage, a .NET Core Web API for the backend, and React.js for the frontend. The application allows users to create, read, update, and delete Todo items.

## Project Structure
The project is organized into three main directories: `backend`, `frontend`, and `database`.

### Backend
- **TodoApi.sln**: Solution file for the .NET Core Web API project.
- **Controllers/TodoController.cs**: Handles HTTP requests related to Todo items.
- **Models/TodoItem.cs**: Defines the properties of a Todo item.
- **Data/TodoContext.cs**: Manages the database connection and sets up the DbSet for TodoItem.
- **appsettings.json**: Contains configuration settings, including the PostgreSQL connection string.
- **Program.cs**: Entry point of the application.
- **Startup.cs**: Configures services and the app's request pipeline.

### Frontend
- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **public/index.html**: Main HTML file for the React application.
- **src/App.js**: Main App component, serving as the root of the React application.
- **src/components/TodoList.js**: Displays a list of Todo items and allows user interaction.
- **src/services/api.js**: Functions for making API calls to the backend.
- **src/index.js**: Entry point for the React application.

### Database
- **init.sql**: SQL commands to initialize the database schema and seed initial data for Todo items.

## Getting Started

### Prerequisites
- .NET Core SDK
- Node.js and npm
- PostgreSQL

### Installation

1. **Clone the repository**
   ```
   git clone https://github.com/NicholasVFuller/TODO.git
   cd TODO
   ```

2. **Set up the database**
   - Create a PostgreSQL database and user.
   - Update the `appsettings.json` file in the backend with your database connection string.
   - Run the SQL commands in `database/init.sql` to initialize the database.

3. **Run the backend**
   - Navigate to the `backend/TodoApi` directory.
   - Restore the dependencies and run the application:
   ```
   dotnet restore
   dotnet run
   ```

4. **Run the frontend**
   - Navigate to the `frontend` directory.
   - Install the dependencies and start the React application:
   ```
   npm install
   npm start
   ```

## Usage
Once both the backend and frontend are running, you can access the application in your web browser at `http://localhost:3000`. You can create, view, update, and delete Todo items through the user interface.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.