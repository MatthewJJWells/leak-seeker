require('dotenv').config();
const express = require('express')
const router = require('./router');
const cors = require('cors');
const app = express();

const port = process.env.NODE_ENV === 'test' ? (process.env.PORT_TEST || 3001) : (process.env.PORT || 3000);

app.use(cors());
app.use(express.json())
app.use(router);

(async function bootstrap () {
  try {
    await app.listen(port);
    console.log(`Server launched on port ${port} 🚀`)
  } catch (error) {
    console.log('Cannot connect to server ->', error)
  }
})()

module.exports = app;
