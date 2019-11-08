const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:84e32cd1-d29d-437e-8c50-45f4b6a0ee33',
  key: '1321f264-048c-4d2f-91ca-c42156606667:RFe/vjI+9wZ9QRAXUWI8sM+czFwXPcAEKf/3dATT1bU=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body;

  chatkit.createUser({
    name: username,
    id: username
  })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.sendStatus).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
  const { grant_type } = req.body;
  res.json(chatkit.authenticate({ grant_type, userId: req.query.user_id }))
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
