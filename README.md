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