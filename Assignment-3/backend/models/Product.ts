import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
    rarity: {
      type: String,
      required: true,
    },
    rarityScale: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
    description: {
      type: String,
    },
    expansion: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: 'text', description: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
