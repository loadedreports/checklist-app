# Checklist App API Service

This is the API service for the Checklist App. It is a ASP.NET Core Web API project that uses Entity Framework Core to interact with a SQLite database.

## Prerequisites

In order to run this application you'll need to have the following tools
installed on your machine:

- [.NET 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node|NPM](https://nodejs.org/en/download/)

## Getting Started

You can run the service locally by following these steps:

1. Clone the repository.
2. Open the `Api` folder in your terminal.
3. Run the following command to restore the project's dependencies:

```bash
dotnet restore
```

4. Run the following command to build and run the application:

```bash
dotnet run --interactive
```

Note that the first time you run the application it'll do a complete build
which also includes installing and building the UI application. This can take
a while depending on your machine / internet connection. The build output will
be displayed in the terminal so you can see the progress.

5. The application UI will be running on [`https://localhost:7263`](https://localhost:7263). You can access the Swagger UI by navigating to [`https://localhost:7263/swagger`](https://localhost:7263/swagger) in your web browser.

## Database

The application uses a SQLite database to store the data. The database is created automatically when the application starts.

### Migrations

The application uses Entity Framework Core to manage the database schema. Changes to the database schema are managed using migrations, these will be automatically applied when the application starts.

## Endpoints

The application endpoints are documented using Swagger. You can access the Swagger UI by navigating to [`https://localhost:7263/swagger`](https://localhost:7263/swagger) in your web browser.
