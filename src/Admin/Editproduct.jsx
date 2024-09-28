import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Pascomponent } from '../App';

const EditProduct = () => {
  // accessing contaxt
  const { products, setProducts, showModal, setShowModal,productdelete } = useContext(Pascomponent);
  const [selectedProduct, setSelectedProduct] = useState(null); // editing product state

  // formik setting
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: selectedProduct || {
      name: '',
      price: '',
      description: '',
      brand: '',
      weight: '',
      category: '',
      image: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      price: Yup.number().required('Price is required').min(0, 'Price cannot be negative'),
      description: Yup.string().required('Description is required'),
      brand: Yup.string().required('Brand is required'),
      weight: Yup.string().required('Weight is required'),
      category: Yup.string().required('Category is required'),
      image: Yup.string().url('Invalid URL').required('Image URL is required')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.patch(`http://localhost:3000/Prudocts/${selectedProduct.id}`, values);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProduct.id ? response.data : product
          )
        );
        setShowModal(false);
        setSelectedProduct(null);
        formik.resetForm();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  });

  // editing function
  const handleEditClick = (item) => {
    setSelectedProduct(item); // set editing product
    //formik setting values
    formik.setValues({
      name: item.name,
      price: item.price,
      description: item.description,
      brand: item.brand,
      weight: item.weight,
      category: item.category,
      image: item.image
    });
    setShowModal(true); // editing form showing set
  };

  // product details set
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Prudocts");
        setProducts(response.data); //upadate products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [setProducts]);

  return (
    <div className='flex flex-wrap justify-center gap-5'>
      {products.map((item) => (
        <div 
          key={item.id} 
          className='w-full sm:w-[300px] md:w-80 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:scale-105'>
          
          {/* Product Image */}
          <div className='flex justify-center items-center bg-gray-100 p-4'>
            <div className='w-32 h-32 overflow-hidden rounded-full'>
              <img className='object-cover w-full h-full' src={item.image} alt={item.name} />
            </div>
          </div>
          
          {/* Product Details */}
          <div className='p-4'>
            <h1 className='text-lg font-bold text-gray-800 text-center mb-2'>{item.name}</h1>
            <h2 className='text-md text-gray-600 text-center'>Price: <span className='font-semibold'>${item.price}</span></h2>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-around p-4 border-t border-gray-200'>
            <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors' onClick={() => handleEditClick(item)}>Edit</button>
            <button className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'  onClick={() => productdelete(item)} >Delete</button>
          </div>
        </div>
      ))}

      {/* editing form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

            <form onSubmit={formik.handleSubmit}>
              {/* Form fields for product details */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <input  type="text"  name="name"  value={formik.values.name}  onChange={formik.handleChange}  className="w-full p-2 border border-gray-300 rounded"/>
                {formik.touched.name && formik.errors.name ? <div className="text-red-500">{formik.errors.name}</div> : null}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Price</label>
                <input  type="number"  name="price"  value={formik.values.price}  onChange={formik.handleChange}  className="w-full p-2 border border-gray-300 rounded"/>
                {formik.touched.price && formik.errors.price ? <div className="text-red-500">{formik.errors.price}</div> : null}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea  name="description"  value={formik.values.description}  onChange={formik.handleChange}  className="w-full p-2 border border-gray-300 rounded"/>
                {formik.touched.description && formik.errors.description ? <div className="text-red-500">{formik.errors.description}</div> : null}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Brand</label>
                <input  type="text"  name="brand"  value={formik.values.brand}  onChange={formik.handleChange}  className="w-full p-2 border border-gray-300 rounded"/>
                {formik.touched.brand && formik.errors.brand ? <div className="text-red-500">{formik.errors.brand}</div> : null}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Weight</label>
                <input  type="text"  name="weight"  value={formik.values.weight}  onChange={formik.handleChange}  className="w-full p-2 border border-gray-300 rounded"/>
                {formik.touched.weight && formik.errors.weight ? <div className="text-red-500">{formik.errors.weight}</div> : null}
              </div>
               <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <select name="category" onChange={formik.handleChange} value={formik.values.category} className="w-full p-2 border border-gray-300 rounded" >
            <option value="Cat Food">Cat Food</option>
            <option value="Dog Food">Dog Food</option>
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500">{formik.errors.category}</div>
          ) : null}
        </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Image URL</label>
                <input  type="text"  name="image"  value={formik.values.image}  onChange={formik.handleChange}  className="w-full p-2 border border-gray-300 rounded"/>
                {formik.touched.image && formik.errors.image ? <div className="text-red-500">{formik.errors.image}</div> : null}
              </div>

              {/* Cancel and Save buttons */}
              <div className="flex justify-end space-x-4">
                <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
