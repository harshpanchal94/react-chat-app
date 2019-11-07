const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:84e32cd1-d29d-437e-8c50-45f4b6a0ee33',
  key: '1321f264-048c-4d2f-91ca-c42156606667:RFe/vjI+9wZ9QRAXUWI8sM+czFwXPcAEKf/3dATT1bU='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { userName } = req.body;

  chatkit.createUser({
    name: userName,
    id: userName
  })
    .then(() => res.send(201))
    .catch(error => {
      if(error.error_type === 'services/chatkit/user/user_already_exists') {
        
      }
    })
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
