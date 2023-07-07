const express = require("express")
const router = express.Router()
const Model = require("../models/models")
const { client, ObjectId } = require("./../db")

router.post("/", async (req, res) => {
  const data = req.body

  if (!data.model_title) {
    res.status(400).json({
      status: false,
      message: "Validation error",
      data: [
        {
          field: "model_title",
          error: "model_title cannot be empty",
        },
      ],
    })
  } else {
    try {
      const database = client.db("carspecs")
      const collection = database.collection("models")

      const model = new Model(data)
      await collection.insertOne(model)
      res.status(201).json({
        status: true,
        message: "Model saved successfully",
        data: model,
      })
    } catch (error) {
      console.error("Error occurred while saving the model:", error)
      res.status(500).json({
        status: false,
        message: "Error occurred while saving the model",
        error: error.message,
      })
    } finally {
      client.close()
    }
  }
})

router.get("/", async (req, res) => {
  try {
    const database = client.db("carspecs")
    const collection = database.collection("models")
    const models = await collection.find({}).toArray()

    if (!models) {
      return res.status(404).json({
        status: false,
        message: "model not found",
      })
    }

    res.status(200).json(models)
  } catch (error) {
    console.error("Error occurred while retrieving models:", error)
    res.status(500).json({
      status: false,
      message: "Error occurred while retrieving models",
      error: error.message,
    })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    const database = client.db("carspecs")
    const collection = database.collection("brands")
    const model = await collection.findOne({ _id: new ObjectId(id) })

    if (!model) {
      return res.status(404).json({
        status: false,
        message: "model not found",
      })
    }

    res.status(200).json(model)
  } catch (error) {
    console.error("Error occurred while retrieving the brand:", error)
    res.status(500).json({
      status: false,
      message: "Error occurred while retrieving the brand",
      error: error.message,
    })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const updates = req.body
    const database = client.db("carspecs")
    const collection = database.collection("models")

    const modelId = new ObjectId(id)
    const model = await collection.findOne({ _id: modelId })

    if (!model) {
      res.status(404).json({
        status: false,
        message: "model not found",
      })
    } else {
      await collection.updateOne({ _id: modelId }, { $set: updates })
      res.status(200).json({
        status: true,
        message: "Model updated successfully",
      })
    }
  } catch (error) {
    console.error("Error occurred while updating the Model:", error)
    res.status(500).json({
      status: false,
      message: "Error occurred while updating the Model",
      error: error.message,
    })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const database = client.db("carspecs")
    const collection = database.collection("models")
    const model = await collection.findOne({ _id: new ObjectId(id) })

    if (!model) {
      res.status(404).json({
        status: false,
        message: "Model not found",
      })
    } else {
      await collection.deleteOne({ _id: new ObjectId(id) })
      res.status(200).json({
        status: true,
        message: "Model deleted successfully",
      })
    }
  } catch (error) {
    console.error("Error occurred while deleting the brand:", error)
    res.status(500).json({
      status: false,
      message: "Error occurred while deleting the brand",
      error: error.message,
    })
  }
})

module.exports = router
