# Simple Calculator

## Introduction
Demo of a simple calculator Client / Server in JS ES6 : 
- The client's side is a mini React JS app of a calcutor with only addition feature. 
- The server's side is a simple Node JS Express Server

All the source code is written in Javascript ES6 (in `src` folder) and bundled with Webpack (in a `dist` folder).
The project was build on the boilerplate [create React App](https://github.com/facebook/create-react-app).

## Requirements
- NodeJS v10.* 
- Tested on MacOs & Win10

## Installation & use

```bash
# Install all npm packages
npm install
npm i -g pm2 # Used to keep alive the app

# To run the app on --> http://localhost:4000
npm run start

# To stop the app
npm run stop
```

## Development

The app uses Webpack watch feature to check on updates of the source code. 
For each client's side updates, Webpack will bundle the scss, media and source code in the `dist` folder.
Same behavior for server's side updates but Webpack also restarts the server at each update using PM2.

```bash
# To watch the app on Development mode --> http://localhost:4000
npm run dev
```
