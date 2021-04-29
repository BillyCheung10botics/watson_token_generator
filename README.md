# watson_token_generator
This setups a server with a cron job generating a token of IBM Watson STT evey hour.

Currently, this repository is under development. 

## Build
1. open a terminal in the root directory 
2. and run the following to install the neccessary packages.
    ```bash
    $ npm install
    ```

## Run
1. Put your `ibm-credentials.env` on the root directory. If you don't have a credential file, please refer to [Getting credentials](https://github.com/watson-developer-cloud/node-sdk#getting-credentials).

2. Run the following command to start a server on http://localhost:30000/.
    ```bash
    $ npm start
    ```

3. You can access your token at http://localhost:30000/WatsonToken.json.

4. Here is an example (`readjson.js`) to access the token
