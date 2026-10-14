
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },

    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    items: [
      {
        productId: mongoose.Schema.Types.Mixed,
        name: { type: String, required: true },
        brand: String,
        image: String,
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        selectedColor: String,
        selectedSize: String,
      },
    ],

    customer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      mobile: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },

    subtotal: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    total: { type: Number, required: true },

    status: {
      type: String,
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
