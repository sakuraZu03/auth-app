const express = require('express')

const cors = require("cors")
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const db = require('./database/db')
dotenv.config()

const api = require('./api/index')

const corsOptions = {
  exposedHeaders: '*',
  origin: 'http://localhost:3000',
  methods: 'GET, PUT, POST',
  credentials: true,
}

const app = express()
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions))
app.use(`/api`,api)

app.use((err, req, res, next) => {
  const status = err.status
  if (status !== undefined) {
    delete err.status
    res.status(status).json(err )
    return
  }
  console.log(err);
  res.status(500).json({error:"Something went wrong"})
})

const port = process.env.apiPort || 8000

const server = app.listen(port, async () => {
  console.log(`http://localhost:${port}/${process.env.apiKey}`, process.env.apiPort)
  console.log(`Example app listening on port ${port}`)
})


module.exports = server