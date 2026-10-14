const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true
  },
  rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
  },
  comment: {
      type: String,
      required: true
  }
});

const ProductSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: { type: [String], required: true 
    
  },
  material: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  reviews: {
    type: [reviewSchema], // Array of review objects
    default: []
}
});

const Product = mongoose.model('Ecommerce', ProductSchema, 'products');   // Collection name products

module.exports = Product;