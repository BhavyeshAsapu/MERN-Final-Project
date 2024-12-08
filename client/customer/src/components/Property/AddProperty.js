import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddProperty = ({ onPropertyAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send image and other details
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/api/properties/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onPropertyAdded(response.data.property); // Update property list
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);

      // Redirect to PropertyList after adding the property
      navigate("/properties"); // Adjust the path as necessary
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div>
      <h2>Add a New Property</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </div>
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;