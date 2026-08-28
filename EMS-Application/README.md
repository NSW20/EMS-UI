# Employee Management System

EMS is a standalone Angular application for managing authentication, departments, and designations. The frontend communicates with an ASP.NET-style REST API and uses JWT authentication for protected administration features.

## Implemented Features

### Authentication

- User registration with name, username, email, phone, role, password, and confirmation fields.
- Login with email and password.
- Forgot-password request flow.
- Password reset flow using the token returned by the forgot-password API.
- JWT persistence in browser `localStorage` under `authToken`.
- Logged-in user name and role read from JWT claims.
- Logout confirmation dialog that clears the stored token.
- Reactive forms with required, email, minimum-password-length, and phone-length validation.

### Authorization

- `authGuardGuard` protects the department and designation routes.
- Both management routes require the `Admin` role.
- `authTokenInterceptorInterceptor` adds `Authorization: Bearer <token>` to outgoing HTTP requests when a token exists.
- The navigation toolbar changes between logged-out and logged-in states.

### Department Management

- Material table displaying department ID, name, and description.
- Add department dialog.
- Edit department dialog.
- Delete department confirmation dialog.
- Data reload after add, edit, or delete operations.
- Success and error feedback through Material snack bars.

### Designation Management

- Material table displaying designation ID, title, department ID, and actions.
- Add designation dialog with a department dropdown populated from the department API.
- Edit designation dialog with department reassignment.
- Delete designation confirmation dialog.
- Pagination with page sizes of 5, 10, and 20.
- Data reload after add, edit, or delete operations.
- Success and error feedback through Material snack bars.

## Routes

| Path | Component | Access |
| --- | --- | --- |
| `/register` | Registration | Public |
| `/login` | Login | Public |
| `/forgotpassword` | Forgot password | Public |
| `/resetpassword` | Reset password | Public |
| `/department` | Department management | Authenticated `Admin` |
| `/designation` | Designation management | Authenticated `Admin` |
| `/logout` | Logout dialog component | Available route |
| `/` | Redirects to `/register` | Public |

## Technology Used

- Angular `22.1.x` with standalone components.
- Angular Router for navigation and route guards.
- Angular `HttpClient` and functional HTTP interceptors.
- Angular Reactive Forms and non-nullable form builders.
- Angular Material for toolbar, buttons, icons, dialogs, tables, forms, selects, paginator, tooltips, snack bars, cards, and progress indicators.
- Bootstrap `5.3.8` utility classes for layout and spacing.
- RxJS `7.8.x` for HTTP observables.
- `jwt-decode` for reading JWT claims in the browser.
- TypeScript `6.0.x`.
- Vitest through the Angular CLI for unit tests.

## Project Structure

```text
src/
	app/
		auth-component/       Registration, login, forgot password, reset password
		Department-Components/Department list and CRUD workflow
		Designation-Components/Designation list and CRUD workflow
		DialogClasses/        Add, edit, remove, and logout dialogs
		EMS_Auth_Gurd/         Authentication and role guard
		EMS_Interceptors/      JWT bearer-token interceptor
		Models/                Request, response, department, and designation models
		Services/              Authentication, department, and designation API services
		app.config.ts          Router and HTTP provider configuration
		app.routes.ts          Application route definitions
		app.html               Shared navigation toolbar and router outlet
```

## Backend Requirement

The frontend currently expects the API at:

```text
http://localhost:5103/api/V1/
```

The backend must be running at this address, and it must support the following endpoints:

### Authentication API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/Auth/RegisterUser` | Register a user |
| `POST` | `/Auth/LoginUser` | Authenticate and return a JWT |
| `POST` | `/Auth/ForgotPassword` | Request a password reset |
| `POST` | `/Auth/ResetPassword` | Set a new password using a reset token |

### Department API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/Department/GetAllDepartment` | List departments |
| `GET` | `/Department/GetADepartment?deptId={id}` | Get one department |
| `POST` | `/Department/AddNewDepartment` | Add a department |
| `PUT` | `/Department/UpdateDepartment?deptId={id}` | Update a department |
| `DELETE` | `/Department/DeleteDepartment?deptId={id}` | Delete a department |

### Designation API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/Designation/GetAllDesignations` | List designations |
| `GET` | `/Designation/GetADesignation?designationId={id}` | Get one designation |
| `POST` | `/Designation/AddDesignation` | Add a designation |
| `PUT` | `/Designation/UpdateDesignation?designationId={id}` | Update a designation |
| `DELETE` | `/Designation/DeleteDesignation?designationId={id}` | Delete a designation |

The frontend expects API responses in this general shape:

```ts
interface APIResponseWrapper<T> {
	statusCode: number;
	message: string;
	data: T;
	errors?: unknown;
}
```

## Getting Started

### Prerequisites

- Node.js and npm.
- A running EMS backend at `http://localhost:5103`.
- A browser with JavaScript enabled.

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

Open `http://localhost:4200/` in a browser. Angular automatically rebuilds when source files change.

### Build the application

```bash
npm run build
```

The compiled application is written to the Angular `dist/` directory.

### Run unit tests

```bash
npm test
```

The repository includes component, service, guard, and interceptor test files. The current tests primarily verify that these classes can be created; API behavior and complete user workflows still depend on the backend and would benefit from additional integration tests.

### Build continuously during development

```bash
npm run watch
```

## Data Models

- `Register`: name, username, email, phone, password, confirm password, and role.
- `Login`: email and password.
- `ForgotPasswordModel`: email.
- `ResetPasswordModel`: email, reset token, new password, and confirmation password.
- `DepartmentDTO`: department ID, name, and description.
- `DepartmentAddDTO`: name and description.
- `DesignationModel`: designation ID, title, and department ID.
- `DesignationAddModel`: title and department ID.

## Current Configuration Notes

- API URLs are defined directly in the authentication, department, and designation services. There is currently no environment-based API URL configuration.
- The JWT is stored in `localStorage`; clearing browser storage signs the user out.
- The guard checks both token presence and the required `Admin` role for management routes.
- The login flow navigates to `/department` after a successful login.
- Password reset tokens are temporarily stored in `localStorage` under `resetpassword`.

## Useful Angular Commands

```bash
npm run ng -- generate component component-name
npm run ng -- generate service service-name
npm run ng -- help
```

For Angular CLI documentation, see [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
