import mongoose from "mongoose"

const { Schema } = mongoose

const BrandSchema = new Schema({
  brand_name: {
    type: String,
    required: true,
  },
  brand_title: {
    type: String,
    required: false,
  },
  brand_logo: {
    type: String,
    required: true,
  },
  brand_flag: {
    type: String,
    required: true,
  },
  brand_year: {
    type: String,
    required: true,
  },
})

const Brand = mongoose.model("Brand", BrandSchema)

export default Brand
