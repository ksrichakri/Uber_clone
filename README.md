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

## Responses

### Success Response
- **Status Code:** 200 - OK  
- **Body Example:**
```json
{
  "statusCode": 200,
  "data": {
    "user": { 
        /* user details */
    },
    "token": "generated_auth_token"
  },
  "message": "User logged in succesfully",
  "success": true
}
```

### Error Responses
- **Status Code:** 400 - Bad Request  
  **Description:** Email or password is missing, or user does not exist.
- **Status Code:** 401 - Unauthorized  
  **Description:** Invalid password or unauthorized access.