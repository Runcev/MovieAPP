# MovieApp
test task for WebbyLab

## What you should install?

For this project, I decided to use the MERN (MongoDB, Express.js, React.js, and Node.js) technology.

Firstly, you should install

-   [Mongo](https://www.mongodb.com/) 4.0.4+
-   [ExpressJS](https://expressjs.com/) 4.16.3+
-   [ReactJS](https://reactjs.org/) 16.5.0+
-   [Node](https://nodejs.org/en/) 11.4.0+ (It's recommended to use 10.15.1 LTS)

##### Secondly, create your `.env` file in main root

Create a `.env` file in the root of your project and insert
your key/value pairs in the following format of `KEY=VALUE`:

```sh
PORT = 5000
MONGO_URI = 'mongodb://localhost/cinema'
```

## Configuring App

If you have all the prerequisites installed you should verify if your MongoDB is up.

```
$ cd movieApp
$ npm install
```

```
$ cd movieApp
$ cd client
$ npm install
```


## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.