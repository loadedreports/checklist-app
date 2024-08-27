# Checklist App UI

This is the UI application for the Checklist App. It is a React + TypeScript + Vite project.

## Getting Started

_When developing the UI application you will need to run the API service first.
You can find the API service in the [`Api`](../Api) folder._

The API service will build the UI each time it is built, but for UI development
purposes you most likely want to run the UI application separately so that you
can immediately see the changes you make to the UI. This avoids having to rebuild
the API service each time you make a change to the UI.

You can run the UI application locally by following these steps:

1. Clone the repository.
2. Open the `ui` folder in your terminal.
3. Run the following command to restore the project's dependencies:

```bash
npm install
```

4. Run the following command to build and run the application:

```bash
npm run dev
```

5. The application UI will be running on [`http://localhost:5174`](http://localhost:5174).
Any changes you make to the UI will be automatically reflected in the browser via Vite's
Hot Module Replacement (HMR).

## Libraries In Use

The UI app uses two main libraries to supports the functionality.

[MUI](https://mui.com/material-ui/all-components/) - This is a React UI library that provides
a set of React components that can be used to build user interfaces.

[React Query](https://tanstack.com/query/latest) - This is
a library that provides a mechanism for fetching data from APIs and caching the results in the
browser. Via React hooks the data can be accessed and used when rendering the UI.
