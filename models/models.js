const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ModelSchema = new Schema({
  _brandId: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  model_name: {
    type: String,
    required: true,
  },
  model_full_name: {
    type: String,
    required: false,
  },
  model_title: {
    type: String,
    required: false,
  },
  model_year: {
    type: String,
    required: true,
  },
  model_image: {
    type: String,
    required: true,
  },
  model_segment: {
    type: String,
    required: true,
  },
  cylinders: {
    type: String,
    required: false,
  },
  displacement: {
    type: String,
    required: false,
  },
  power: {
    type: String,
    required: false,
  },
  torque: {
    type: String,
    required: false,
  },
  fuel_system: {
    type: String,
    required: false,
  },
  fuel: {
    type: String,
    required: false,
  },
  fuel_capacity: {
    type: String,
    required: false,
  },
  top_speed: {
    type: String,
    required: false,
  },
  acceleration: {
    type: String,
    required: false,
  },
  drive_type: {
    type: String,
    required: false,
  },
  gearbox: {
    type: String,
    required: false,
  },
  front: {
    type: String,
    required: false,
  },
  rear: {
    type: String,
    required: false,
  },
  length: {
    type: String,
    required: false,
  },
  width: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  front_track: {
    type: String,
    required: false,
  },
  rear_track: {
    type: String,
    required: false,
  },
  wheelbase: {
    type: String,
    required: false,
  },
  ground_clearance: {
    type: String,
    required: false,
  },
  cargo_volume: {
    type: String,
    required: false,
  },
  turning_circle: {
    type: String,
    required: false,
  },
})

const Model = mongoose.model("Model", ModelSchema)

module.exports = Model
