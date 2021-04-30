# watson_token_generator
This setups a server with a cron job generating a token of IBM Watson Speech-to-Test(STT) evey hour.

Currently, this repository is under development.(29/04/2021)

## Build
1. open a terminal in the root directory 
2. and run the following to install the neccessary packages.
    ```bash
    $ npm install
    ```

## Run on local computer
1. Put your `ibm-credentials.env` on the root directory. If you don't have a credential file, please refer to [Getting credentials](https://github.com/watson-developer-cloud/node-sdk#getting-credentials).

2. Run the following command to start a server on http://localhost:30000/.
    ```bash
    $ npm start
    ```

3. You can access your token at http://localhost:30000/WatsonToken.json.

4. Here is an example (`readjson.js`) to access the token

## Run on server
1. install docker and nginx

2. modify the domain names of the `docker-compose.yml` file
    ```
      - VIRTUAL_HOST=yourdomainname.com
      - LETSENCRYPT_HOST=yourdomainname.com
    ```
3. comment out the following in the `index.js` to avoid conflicts with nginx config
    ```
    app.use(cors()); 
    ```
4. run command
    ```
    docker-compose up -d --build
    ```
5. you can access your token json file at 
    ```
    https://yourdomainname.com/WatsonToken.json
    ```