# Todo List Application - Backend

This is the backend part of the Todo List application, built using .NET Core Web API and PostgreSQL.

## Project Structure

- **TodoApi.sln**: Solution file that organizes the project and its dependencies.
- **Controllers**: Contains the `TodoController.cs` which handles HTTP requests related to Todo items.
- **Models**: Contains the `TodoItem.cs` which defines the properties of a Todo item.
- **Data**: Contains the `TodoContext.cs` which manages the database connection and sets up the DbSet for TodoItem.
- **appsettings.json**: Configuration settings for the application, including the PostgreSQL database connection string.
- **Program.cs**: Entry point of the application that configures and runs the web host.
- **Startup.cs**: Configures services and the app's request pipeline, setting up dependency injection, middleware, and routing.

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd todo-list-app/backend
   ```

2. **Set up the database**:
   Ensure you have PostgreSQL installed and running. Update the connection string in `appsettings.json` with your database credentials.

3. **Run the application**:
   Use the following command to run the application:
   ```
   dotnet run
   ```

4. **API Endpoints**:
   The backend exposes several RESTful API endpoints for managing Todo items:
   - `GET /api/todos`: Retrieve all Todo items.
   - `GET /api/todos/{id}`: Retrieve a specific Todo item by ID.
   - `POST /api/todos`: Create a new Todo item.
   - `PUT /api/todos/{id}`: Update an existing Todo item.
   - `DELETE /api/todos/{id}`: Delete a Todo item.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.