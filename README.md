# AssessmentBackend

## Favs APP! 
### Setting up the app
* Clone the repository
* Use ``npm install`` to make sure to have all the dependencies
* Set up the enveironment variables, 
  **MONGO_DB_URI**= your MongoDB uri, with the user and password
  **JWT_SECRET_KEY**= the secret key for JWT this is for the token
* Use **npm start** to run the server, this will automatically use nodemon on *app.js*

### The endpoints!
* **GET/api/user** to get the entire list of users 
* **POST/api/user** to create a new user
* **GET/api/user/:id** to get an specific user
* **POST/auth/local/login** to authenticate the user and generate the token
* **GET/api/favs** to get the entire storage of lists - *this requires be authenticated*
* **POST/api/favs** to post a new list of favs - *this requires be authenticated* 
* **PATCH/api/favs/:id** to update a list of favs - *this requires be authenticated* 

### Body of requests!
* ``{
    "email": "exp@test.com",
    "password": "pass"
  }``
  **For creating user and authenticating**
* ``{
    "name": "test fav list",
    "favs": [{"title":"title", "description":"description", "link": "link"}]
  }``
  **For creating list of favs**
