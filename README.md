# logistic-app-frontend
A simple React Web App that shows the list of orders from a API using pagination and filters.


## Technologies

  - NodeJS 14 (LTS)
  - React 18
  - React Router Dom v5
  - SASS

## How to run

  First of all, make sure you have the API running. You can find the API repository and setup instructions [here](https://github.com/marcossilvaxx/logistic-app-backend).


  ### Installing dependencies

  You need to have NodeJS 14 and npm/yarn installed.

  Inside of the project root directory, execute one of the following commands:

  ```bash
    # With npm
    $ npm i
  ```

  ```bash
    # With yarn
    $ yarn
  ```

  ### Setting environment variables

  - Firstly, make a copy of the .env.example file and rename it to ".env".
  - Specify your API url. Example:
    ```python
    REACT_APP_API_URL=http://localhost:5000
    ``` 

  ### Running the server

  Inside of the project root directory, execute the following command:

  ```bash
    $ npm run start
  ```

  That's all! Now the web app will open on your browser and you can use it. Thanks!