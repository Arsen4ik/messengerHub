import * as dotenv from 'dotenv'
dotenv.config()

import app from './server'

const PORT = 8787

app.listen(PORT, () => {
  console.log(`hello on http://localhost:${PORT}`)
})