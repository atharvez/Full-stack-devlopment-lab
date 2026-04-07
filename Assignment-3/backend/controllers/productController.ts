import { Request, Response } from 'express';
import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    let query: any = {};

    if (category) {
      const categories = (category as string).split(',');
      query.category = { $in: categories };
    }

    if (search) {
      query.$text = { $search: search as string };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
