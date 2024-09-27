import axios from 'axios'; 
import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
import { Pascomponent } from '../App'; 

const AddProducts = () => {
  const { setProducts,products } = useContext(Pascomponent); // contaxt access

  // formic setup
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      rating: '',
      description: '',
      brand: '',
      weight: '',
      ingredients: '',
      category: '',
      image: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      price: Yup.number().required('Price is required').min(0, 'Price cannot be negative'),
      rating: Yup.number().required('Rating is required').min(1, 'Minimum rating is 1').max(5, 'Maximum rating is 5'),
      description: Yup.string().required('Description is required'),
      brand: Yup.string().required('Brand is required'),
      weight: Yup.string().required('Weight is required'),
      ingredients: Yup.string().required('Ingredients are required'),
      category: Yup.string().required('Category is required'),
      image: Yup.string().url('Invalid URL').required('Image URL is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      const id = String(products.length+1); // create id
      const submit = { ...values, id }; // all details raping

      try {
        await axios.post('http://localhost:3000/Prudocts', submit); // upload to server
        resetForm(); // form resetting
      
      } catch (error) {
        console.error('Error adding product:', error); 
      }
    }
  });

  // rendering time data storing
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Prudocts");
        setProducts(response.data); // products setting
      } catch (error) {
        console.error("Error fetching products:", error); 
      }
    };
    fetchProducts(); // calling fetch
  }, [setProducts]); 

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={formik.handleSubmit}>
     
        
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input type="text" name="name"  onChange={formik.handleChange}  value={formik.values.name}  className="w-full p-2 border border-gray-300 rounded"/>
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Price</label>
          <input type="number" name="price" onChange={formik.handleChange}  value={formik.values.price}  className="w-full p-2 border border-gray-300 rounded"/>
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500">{formik.errors.price}</div>
          ) : null}
        </div>

        {/* Product Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Rating</label>
          <input type="number" name="rating" onChange={formik.handleChange}  value={formik.values.rating}  max='5'  className="w-full p-2 border border-gray-300 rounded"/>
          {formik.touched.rating && formik.errors.rating ? (
            <div className="text-red-500">{formik.errors.rating}</div>
          ) : null}
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" onChange={formik.handleChange} value={formik.values.description} className="w-full p-2 border border-gray-300 rounded"/>
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500">{formik.errors.description}</div>
          ) : null}
        </div>

        {/* Product Brand */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Brand</label>
          <input type="text" name="brand" onChange={formik.handleChange} value={formik.values.brand} className="w-full p-2 border border-gray-300 rounded"/>
          {formik.touched.brand && formik.errors.brand ? (
            <div className="text-red-500">{formik.errors.brand}</div>
          ) : null}
        </div>

        {/* Product Weight */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Weight</label>
          <input type="text" name="weight" onChange={formik.handleChange}  value={formik.values.weight}  className="w-full p-2 border border-gray-300 rounded"/>
          {formik.touched.weight && formik.errors.weight ? (
            <div className="text-red-500">{formik.errors.weight}</div>
          ) : null}
        </div>

        {/* Product Ingredients */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Ingredients</label>
          <input type="text" name="ingredients" onChange={formik.handleChange}  value={formik.values.ingredients}  className="w-full p-2 border border-gray-300 rounded"/>
          {formik.touched.ingredients && formik.errors.ingredients ? (
            <div className="text-red-500">{formik.errors.ingredients}</div>
          ) : null}
        </div>

        {/* Product Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <input type="text" name="category" onChange={formik.handleChange} value={formik.values.category} className="w-full p-2 border border-gray-300 rounded"/>
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500">{formik.errors.category}</div>
          ) : null}
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Image URL</label>
          <input type="text" name="image" onChange={formik.handleChange}  value={formik.values.image}  className="w-full p-2 border border-gray-300 rounded"/>
          {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500">{formik.errors.image}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
