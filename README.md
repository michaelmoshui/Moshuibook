# moshuiBook
A Facebook clone created using the MERN stack

How to run the app:
1. Download repository

2. Run "npm install" to download Node modules.

3. Set up credentials in Google Cloud APIs and Services
  - Authorized JavaScript origins: your frontend url
  - Authorized redirect URIs: https://developers.google.com/oauthplayground

4. Get Access Token and Refresh Token from https://developers.google.com/oauthplayground/
  - Select "Use your own OAuth credentials" in settings
  - Select "https://mail.google.com/" and authorize API
  - get access token and refresh token

5. Sign up for mongoDB Atlas

6. Create .env files:
   - In the frontend folder
    REACT_APP_BACKEND_URL= # your backend url

   - In the backend folder
    PORT= # your port
    MONGODBURL= # your MongoDB url
    TOKEN_SECRET= # any string
    BASE_URL= # your frontend url
    EMAIL= # a gmail address
    MAILING_ID= # client ID from Google Cloud credentials
    MAILING_SECRET= # client secret from Google Cloud credentials
    MAILING_REFRESH= # refresh token from OAuth playground
    MAILING_ACCESS= # access token from OAuth playground

7. Run "npm start" in the frontend folder to run frontned on localhost:3000

8. Run "nodemon server.js" in the backend folder to run backend on localhost:8000

Current functionalities:
- User Interface
- Login and register
- Email activation and verification
- Cookies session
- Logout




