const express = require("express");
const router = express.Router();

const Controller = require("../Controller/Controller");
const authMiddleware = require("../Middleware/authMiddleware");

router.get("/products", Controller.getAllProducts);

// router.get("/search/:keyword", Controller.searchProducts);  // Search products by keyword 06-06-26

router.get("/products/:id", Controller.getProductsById);

router.get("/shop/:keyword", Controller.getAllProductByGender);

router.get("/shop/:gender/:category", Controller.getAllProductsByCategory);

router.post("/signup", Controller.signup);

router.post("/login", Controller.login);

router.post("/orders", authMiddleware, Controller.createOrder);

router.get("/orders/my-orders", authMiddleware, Controller.getMyOrders);

module.exports = router;
