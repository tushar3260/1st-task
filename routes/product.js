
const express = require('express');
const router = express.Router();
const Product = require('./product'); 


//create a new product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price } = req.body;

   
    const newProduct = await Product.create({
      name,
      description,
      price,
    });

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Fetch all products
router.get('/products', async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Fetch a single product by ID
router.get('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Update a product by ID
router.put('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedData = req.body; // Assuming you send the updated data in the request body
  
      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
        new: true, // Return the updated product
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//delete a product
  
router.delete('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//  


module.exports = router;

