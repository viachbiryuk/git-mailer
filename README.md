# git-mailer

## Usage
1. fill missing fields in /conf.js
2. npm install
3. npm start

## Features
1. SignUp with avatar uploading
2. SignIn
3. Serve static images: user avatars and thumbs
4. Send email to github users with some weather info

## Implementation details
- express.js is used as a API framework
- mongoose is uses as ORM for MongoDB
- request body is validated with Joi schema
- endpoints are secured with passport-http-bearer strategy
- response is optionally filtered with Transformer utility

## API Doc
* `/sign-up` (formData):
    - email (string)
    - password (sting)
    - avatar (image file) 
* `/sign-in` (application/json):
    - email (sting)
    - password (sting)
* `/message-to` (application/json):
    - users (array of strings)
    - message (sting)
    ```$json 
    EXAMPLE
    {
        "users": ["nghialv", "NghiaTranUIT", "iliakan"],
        "message": "The most arbitrary message"
    }
    ```