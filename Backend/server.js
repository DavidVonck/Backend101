const express = require('express')
var cors = require('cors')
const { loginUser, registerUser } = require('./login/auth')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use(cors())

app.post('/auth/login', loginUser)
app.post('/auth/register', registerUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})