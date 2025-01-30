import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProducts } from '../Redex/ProductSlice';

const AddProducts = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Price: '',
    Description: '',
    Brand: '',
    Weight: '',
    Stock: '',
    Category: '',
    Image: null,
  });
  const [ingredients, setIngredients] = useState([]); // State for ingredients
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.Products);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value || '',  // Make sure to set an empty string if value is falsy
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevData => ({ ...prevData, Image: file }));
  };

  const handleAddIngredient = () => {
    if (formData.Ingredients.trim()) {
      setIngredients(prev => [...prev, formData.Ingredients]);
      setFormData(prev => ({ ...prev, Ingredients: '' })); // Clear input field after adding
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(prev => prev.filter((_, i) => i !== index)); // Removes the ingredient by index
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.Name) newErrors.Name = 'Name is required';
    if (!formData.Price) newErrors.Price = 'Price is required';
    if (!formData.Description) newErrors.Description = 'Description is required';
    if (!formData.Image) newErrors.Image = 'Image is required';
    if (!formData.Stock) newErrors.Stock = 'Stock is required';
    setErrors(newErrors);
    return (Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const form = new FormData();
    form.append('Name', formData.Name);
    form.append('Price', formData.Price);
    form.append('Description', formData.Description);
    form.append('Brand', formData.Brand);
    form.append('Weight', formData.Weight);
    form.append('Stock', formData.Stock);
    form.append('Category', formData.Category);
    console.log(ingredients)
    form.append('Ingredient', JSON.stringify(ingredients)); // Send ingredients as JSON array

    if (formData.Image) {
      form.append('Image', formData.Image);
    }

    try {
       dispatch(postProducts(form));
      setIsSubmitting(false);
      setFormData({
        Name: '',
        Price: '',
        Description: '',
        Brand: '',
        Weight: '',
        Stock: '',
        Category: '',
        Image: null,
      });
      setIngredients([]); // Reset ingredients after successful submit
    } catch (error) {
      console.error("Error submitting product:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="Name"
            onChange={handleChange}
            value={formData.Name}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.Name && <div className="text-red-500">{errors.Name}</div>}
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="Price"
            onChange={handleChange}
            value={formData.Price}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.Price && <div className="text-red-500">{errors.Price}</div>}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="Description"
            onChange={handleChange}
            value={formData.Description}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.Description && <div className="text-red-500">{errors.Description}</div>}
        </div>

        {/* Brand Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Brand</label>
          <input
            type="text"
            name="Brand"
            onChange={handleChange}
            value={formData.Brand}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Weight Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Weight</label>
          <input
            type="text"
            name="Weight"
            onChange={handleChange}
            value={formData.Weight}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Stock Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="text"
            name="Stock"
            onChange={handleChange}
            value={formData.Stock}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.Stock && <div className="text-red-500">{errors.Stock}</div>}
        </div>

        {/* Ingredients Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Ingredients</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="Ingredients"
              onChange={handleChange}
              value={formData.Ingredients || ''} 
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
          <div className="mt-2">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-gray-700">{ingredient}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Category Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <select
            name="Category"
            onChange={handleChange}
            value={formData.Category}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            <option value="Cat">Cat Food</option>
            <option value="Dog">Dog Food</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            name="Image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.Image && <div className="text-red-500">{errors.Image}</div>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
