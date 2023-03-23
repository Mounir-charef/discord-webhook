require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {`
    <html>
        <head><title>My App</title></head>
        <body>
            <h1>My App</h1>
            <p>My App is running</p>
        </body>
    </html>
`}