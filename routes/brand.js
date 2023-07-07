const express = require("express")
const router = express.Router()
const Brand = require("../models/brands")
const { client, ObjectId } = require("./../db")

router.post("/", async (req, res) => {
  const data = req.body

  if (!data.brand_title) {
    res.status(400).json({
      status: false,
      message: "Validation error",
      data: [
        {
          field: "brand_title",
          error: "brand_title cannot be empty",
        },
      ],
    })
  } else {
    try {
      const database = client.db("carspecs")
      const collection = database.collection("brands")

      const brand = new Brand(data)
      await collection.insertOne(brand)
      res.status(201).json({
        status: true,
        message: "Brand saved successfully",
        data: brand,
      })
    } catch (error) {
      console.error("Error occurred while saving the brand:", error)
      res.status(500).json({
        status: false,
        message: "Error occurred while saving the brand",
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
    const collection = database.collection("brands")
    const brands = await collection.find({}).toArray()

    if (!brands) {
      return res.status(404).json({
        status: false,
        message: "Brand not found",
      })
    }

    res.status(200).json(brands)
  } catch (error) {
    console.error("Error occurred while retrieving brands:", error)
    res.status(500).json({
      status: false,
      message: "Error occurred while retrieving brands",
      error: error.message,
    })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    const database = client.db("carspecs")
    const collection = database.collection("brands")
    const brand = await collection.findOne({ _id: new ObjectId(id) })

    if (!brand) {
      return res.status(404).json({
        status: false,
        message: "Brand not found",
      })
    }

    res.status(200).json(brand)
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
    const collection = database.collection("brands")

    const brandId = new ObjectId(id)
    const brand = await collection.findOne({ _id: brandId })

    if (!brand) {
      res.status(404).json({
        status: false,
        message: "Brand not found",
      })
    } else {
      await collection.updateOne({ _id: brandId }, { $set: updates })
      res.status(200).json({
        status: true,
        message: "Brand updated successfully",
      })
    }
  } catch (error) {
    console.error("Error occurred while updating the brand:", error)
    res.status(500).json({
      status: false,
      message: "Error occurred while updating the brand",
      error: error.message,
    })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const database = client.db("carspecs")
    const collection = database.collection("brands")
    const brand = await collection.findOne({ _id: new ObjectId(id) })

    if (!brand) {
      res.status(404).json({
        status: false,
        message: "Brand not found",
      })
    } else {
      await collection.deleteOne({ _id: new ObjectId(id) })
      res.status(200).json({
        status: true,
        message: "Brand deleted successfully",
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
