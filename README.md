# PayNotes
This is for paypal

  - Since 75% of users are on 2g network, a progressive web app was the way to go.
  - Uses a node js backend (using express.js)
  - The resources are cached by use of service workers.
  - Minimilastic UI
  - Hosted on AWS
  - MongoDb backend to store credentials and notes. This is sourced from the cloud.

# What could not be done

  - Maintaining session in a secure way. Due to lack of time, a token based authentication could not be achieved
  

### Installation


Install the dependencies and devDependencies and start the server.

```sh
$ npm install -d
$ node start
```
