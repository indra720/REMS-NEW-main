// Debug script to test the property creation API
const axios = require('axios');
const FormData = require('form-data');

const testPropertyCreation = async () => {
  try {
    const formData = new FormData();
    
    // Required fields based on Django model
    formData.append('title', 'Test Property');
    formData.append('description', 'Test description');
    formData.append('property_type', '1'); // ID of property type
    formData.append('category', 'Sale');
    formData.append('location', 'Test Location, City, State, Country');
    formData.append('latitude', '12.971600');
    formData.append('longitude', '77.594600');
    formData.append('area_sqft', '1000');
    formData.append('price', '1000000');
    formData.append('price_per_sqft', '1000');
    formData.append('bedrooms', '2');
    formData.append('bathrooms', '2');
    formData.append('balconies', '1');
    formData.append('furnishing', 'Furnished');
    formData.append('floor_no', '1');
    formData.append('total_floors', '5');
    formData.append('availability_status', 'Ready to Move');
    formData.append('possession_date', '2025-12-01');
    formData.append('age_of_property', '5 years');
    formData.append('ownership_type', 'Freehold');
    formData.append('rera_approved', 'false');
    formData.append('maintenance_cost', '5000');
    
    const response = await axios.post('http://127.0.0.1:8000/api/properties/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer YOUR_TOKEN_HERE' // Replace with actual token
      }
    });
    
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};

testPropertyCreation();
