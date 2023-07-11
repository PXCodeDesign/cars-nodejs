const express = require("express")
const app = express()
const PORT = 3000
const cors = require("cors")
const helmet = require("helmet")

app.use(express.json())
app.use(cors())
app.use(helmet())

require("dotenv").config()

const brandRouter = require("./routes/brand")
const modelRouter = require("./routes/model")

app.get("/", (req, res) => {
  res.send("CarSpecs Api")
})
try {
  app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`)
  })
} catch (e) {
  console.log(e)
}

app.use("/brands", brandRouter)
app.use("/models", modelRouter)

module.exports = app
