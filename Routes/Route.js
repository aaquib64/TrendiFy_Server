const express = require("express");
const router = express.Router();

const Controller = require("../Controller/Controller");

router.get("/products", Controller.getAllProducts);

router.get("/products/:id", Controller.getProductsById);

router.get("/shop/:gender", Controller.getAllProductByGender);

router.get("/shop/:gender/:category", Controller.getAllProductsByCategory);

router.post("/signup", Controller.signup);

router.post("/login", Controller.login);

module.exports = router;
