const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()
  


async function commence() {
  try {
    const app = express()

    app.use((req, res, next) => {
      const allowedOrigins = ['http://localhost:5174','http://localhost:5173', '*', 'http://127.0.0.1:5500'];
      const origin = req.headers.origin;

      if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      // Add other CORS headers as needed
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });

    app.use(bodyParser.json());

    app.use('/cv', require('./routes/election.route'));


    app.all('*', (req, res) => {
      res.status(404).send('Page not Found')
    })

    app.listen(5000, () => {
      console.log('App is running on port 5000')
    })
  } catch (error) {
    console.log(error)
  }
}

commence()

