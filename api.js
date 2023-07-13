import express from "express"
import cors from "cors"
import helmet from "helmet"

import brandRouter from "./routes/brand.js"
import modelRouter from "./routes/model.js"
const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())
app.use(helmet())

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
