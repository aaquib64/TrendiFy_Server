const AllProducts = require("../Models/Model");
const User = require ("../Models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// For All Products

// exports.getAllProducts = (req, res) => {
//   // Query the database to fetch all Products
//   AllProducts.find()
//       .then((Products) => {
//           console.log("Product--->>>>",Products)
//           // Check if Products are found and return them
//           if (Products && Products.length > 0) {
//               res.status(200).json(Products);  // Send the Product data in the response
//           } else {
//               res.status(404).json({ message: 'No Products found' });
//           }
//       })
//       .catch((error) => {
//           console.error('Error fetching Products:', error);
//           res.status(500).json({ message: 'Error fetching Products', error: error.message });
//       });
// };

exports.getAllProducts = async (req, res) => {
  try {
    const products = await AllProducts.find();
    // console.log("Products--->>>>", products);

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'No Products found' });
    }
  } catch (error) {
    console.error('Error fetching Products:', error);
    res.status(500).json({ message: 'Error fetching Products', error: error.message });
  }
};


// Product By Id
exports.getProductsById = async (req, res) => {
  console.log("Params:", req.params);

  const ProductId = req.params.id;

  try {
      const Product = await AllProducts.findOne( {id: parseInt(ProductId)});
      
      if (Product) {
          res.status(200).json({ Product: Product });
      } else {
          res.status(404).json({
              message: "Product not found"
          });
      }
  } catch (error) {
      console.error('Error fetching Products by ID:', error);
      res.status(500).json({
          message: 'Error fetching Products by ID',
          error: error.message
      });
  }
};

// Products By Name
exports.getAllProductstByName = async (req, res) => {
  try {
    const name = req.params.name;
    const ProductsByName = AllProducts.filter(
      (product) => product.name === name
    );

    if (ProductsByName.length === 0) {
      return res.status(404).json({ message: "Please provide valid name" });
    }

    res.status(200).json(ProductsByName);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error filtering products by name" });
  }
};


//  Products By gender

exports.getAllProductByGender = async (req, res) => {
  try {
    const gender = req.params.gender;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Case-insensitive match for gender
    const query = { gender: { $regex: `^${gender}$`, $options: 'i' } };

    const total = await AllProducts.countDocuments(query);
    const products = await AllProducts.find(query).skip(skip).limit(limit);

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
    });
  } catch (error) {
    console.error('Error fetching products by gender:', error);
    res.status(500).json({
      message: 'Error fetching products by gender',
      error: error.message,
    });
  }
};

// exports.getAllProductByGender = (req, res) => {
//   const gender = req.params.gender;

//   // Query the database for Products that match the gender
//   AllProducts.find({ gender: { $regex: `^${gender}$`, $options: 'i' } })  // This uses case-insensitive regex to match gender
//       .then((ProductsBygender) => {
         

//           if (ProductsBygender.length > 0) {
//               res.status(200).json({ AllProducts: ProductsBygender });
//           } else {
//               res.status(404).json({
//                   message: "No products found for the provided gender"
//               });
//           }
//       })
//       .catch((error) => {
//           console.error('Error fetching products by gender:', error);
//           res.status(500).json({
//               message: 'Error fetching products',
//               error: error.message
//           });
//       });
// };


// Products By category
exports.getAllProductsByCategory = (req, res) => {
  const category = req.params.category;
  const gender = req.params.gender;

  // Query the database for products that match the category
  AllProducts.find({ 
    gender: { $regex: `^${gender}$`, $options: 'i' }, 
    category: { $regex: `^${category}$`, $options: 'i' } 
  })  // This uses case-insensitive regex to match gender
      .then((ProductsByCategory) => {
         

          if (ProductsByCategory.length > 0) {
              res.status(200).json({ AllProducts: ProductsByCategory });
          } else {
              res.status(404).json({
                  message: "No products found for the provided category"
              });
          }
      })
      .catch((error) => {
          console.error('Error fetching products by category:', error);
          res.status(500).json({
              message: 'Error fetching products',
              error: error.message
          });
      });
};

// Signup
exports.signup = async (req, res) => {
  try {
    console.log('Signup body:', req.body);
    const { name, email, address, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, address, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
    
  } catch (error) {
    console.error('Signup error:', error);            // This shows the real error
    res.status(500).json({ message: "Server error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




