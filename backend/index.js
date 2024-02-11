const connectToMongo = require('./db');
const express = require('express')
require("dotenv").config();
var cors = require('cors')

connectToMongo();

const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../build')))

// avalable Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

