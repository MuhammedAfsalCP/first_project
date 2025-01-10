import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts, fetchSpesificProduct, updateProduct } from '../Redex/ProductSlice';

const EditProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ Ingredients: '' });
  const [ingredients, setIngredients] = useState([]);
  const { products, loading, error, selectedProduct,previous,next } = useSelector(state => state.Products);

  const dispatch = useDispatch();
console.log(formData)
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        ...selectedProduct,
        Ingredients: selectedProduct.Ingredient.join(', ') || '',
      });
      setIngredients(selectedProduct.Ingredient);
    }
  }, [selectedProduct]);

  const productdelete = (productid) => {
    
    dispatch(deleteProduct(productid));
  };

  const handleEditClick = (productId) => {
    setShowModal(true);
    dispatch(fetchSpesificProduct(productId));
  };

 

  const handleAddIngredient = () => {
    if (formData.Ingredients.trim()) {
      setIngredients(prev => [...prev, formData.Ingredients]);
      setFormData(prev => ({ ...prev, Ingredients: '' })); // Clear input field after adding
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      // Update Image with the selected file
      setFormData((prevData) => ({ ...prevData, Image: file }));
    } else if (e.target.value === "") {
      // Handle case where the input is cleared (no file selected)
      setFormData((prevData) => ({ ...prevData, Image: selectedProduct.Image }));
    }
  };
  
  

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productid = selectedProduct.id;
    console.log(productid) // Assuming selectedProduct is the product being edited
    dispatch(updateProduct({ formData, productid }));
  };

  if (loading) {
    return (
      <div className="hourglassBackground">
        <div className="hourglassContainer">
          <div className="hourglassCurves"></div>
          <div className="hourglassCapTop"></div>
          <div className="hourglassGlassTop"></div>
          <div className="hourglassSand"></div>
          <div className="hourglassSandStream"></div>
          <div className="hourglassCapBottom"></div>
          <div className="hourglassGlass"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error?.detail || error?.message || 'An unknown error occurred'}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full sm:w-[300px] md:w-80 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:scale-105"
        >
          {/* Product Image */}
          <div className="flex justify-center items-center bg-gray-100 p-4">
            <div className="w-32 h-32 overflow-hidden rounded-full">
              <img className="object-cover w-full h-full" src={product.Image} alt={product.Name} />
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4">
            <h1 className="text-lg font-bold text-gray-800 text-center mb-2">{product.Name}</h1>
            <h2 className="text-md text-gray-600 text-center">
              Price: <span className="font-semibold">${product.Price}</span>
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-around p-4 border-t border-gray-200">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => handleEditClick(product.id)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              onClick={() => productdelete(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Editing Form */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Form fields for product details */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="Price"
            value={formData.Price || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="Description"
            value={formData.Description || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Weight</label>
          <textarea
            name="Weight"
            value={formData.Weight || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Stock</label>
          <textarea
            name="Stock"
            value={formData.Stock || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Ingredients */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            name="Ingredients"
            value={formData.Ingredients || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter an ingredient"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>

        {/* Image upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            name="Image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}
<div className="flex justify-center items-center mt-6 gap-4">
            <button
              disabled={!previous} // Disable if no previous page
              onClick={() => dispatch(fetchProducts({ url: previous }))}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              disabled={!next} // Disable if no next page
              onClick={() => dispatch(fetchProducts({ url: next }))}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Next
            </button>
          </div>

    </div>
  );
};

export default EditProduct;
