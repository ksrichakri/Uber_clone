# API Documentation

---

# User Registration Endpoint Documentation

## Endpoint
**POST** `/user/register`

## Description
This endpoint registers a new user.  
It validates the incoming request and creates a new user in the database.  
- Returns a 201 status code along with an auth token on successful registration.
- Returns appropriate error codes if validations fail or if the email is already in use.

## Request Data

### Body Parameters (JSON)
- **fullName** (object):  
  - **firstName** (string): Required. Minimum 3 characters.
  - **lastName** (string): Optional.
- **email** (string): Required. Must be a valid email address and at least 5 characters long.
- **password** (string): Required. Minimum 6 characters.

### Example Request Body
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "mypassword123"
}
```

### Responses
- **Success Response:**
  - **Status Code:** 201 - Created  
  - **Body Example:**
  ```json
  {
    "statusCode": 200,
    "data": {
      "registerUser": { /* user details */ },
      "token": "generated_auth_token"
    },
    "message": "User registered succesfully",
    "success": true
  }
  ```

- **Error Responses:**
  - **409 - Conflict:** User with this email already exists.
  - **400 - Bad Request:** Validation errors.

---

# User Login Endpoint Documentation

## Endpoint
**POST** `/user/login`

## Description
This endpoint authenticates an existing user.  
It verifies the provided email and password, and returns an authentication token if the credentials are valid.

## Request Data

### Body Parameters (JSON)
- **email** (string): Required. Must be a valid email address.
- **password** (string): Required. Minimum 6 characters.

### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "mypassword123"
}
```

### Responses

#### Success Response
- **Status Code:** 200 - OK  
- **Body Example:**
```json
{
  "statusCode": 200,
  "data": {
    "user": { /* user details */ },
    "token": "generated_auth_token"
  },
  "message": "User logged in succesfully",
  "success": true
}
```

#### Error Responses
- **400 - Bad Request:** Email or password is missing, or user does not exist.
- **401 - Unauthorized:** Invalid password or unauthorized access.

---

# User Profile Endpoint Documentation

## Endpoint
**GET** `/user/profile`

## Description
This endpoint retrieves the profile of the authenticated user.  
- Requires a valid authentication token passed either as a cookie or in the Authorization header.
- The authentication middleware verifies and attaches the user object to the request.

## Authentication
- Ensure that the request contains a valid token.

## Example Request
Set the request header:
```
Authorization: Bearer <generated_auth_token>
```
Or ensure that the token is available as a cookie.

### Responses

#### Success Response
- **Status Code:** 200 - OK  
- **Body Example:**
```json
{
  "statusCode": 200,
  "data": {
    "user": { /* authenticated user details */ }
  },
  "message": "",
  "success": true
}
```

#### Error Responses
- **401 - Unauthorized:** If token is missing, invalid, or blacklisted.

---

# User Logout Endpoint Documentation

## Endpoint
**POST** `/user/logout`

## Description
This endpoint logs out an authenticated user.  
- It clears the authentication token cookie.
- It blacklists the token used, ensuring that it cannot be used again.

## Authentication
- A valid token must be provided via cookie or Authorization header.

## Example Request
Ensure the token is provided in the cookie or header:
```
Authorization: Bearer <generated_auth_token>
```

### Responses

#### Success Response
- **Status Code:** 200 - OK  
- **Body Example:**
```json
{
  "message": "Logged Out Successfully!"
}
```

#### Error Responses
- **401 - Unauthorized:** If token is missing, invalid, or