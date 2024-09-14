import { useState } from 'react';
import axios from 'axios';

function AddProducts() {
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('itemDesc', itemDesc);
    formData.append('itemPrice', itemPrice);
    if (image) {
      formData.append('image', image);
    }

    axios.post('http://localhost:5000/add-products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data.message);
        setItemName("")
        setItemDesc("")
        setItemPrice("")
        document.getElementById("image").value=""
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        console.log(formData);
      })
  };

  return (
    <div className="col-6">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemDesc">Item Description</label>
          <input
            type='text'
            className="form-control"
            id="itemDesc"
            value={itemDesc}
            onChange={(e) => setItemDesc(e.target.value)}
            placeholder="Enter item description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemPrice">Price</label>
          <input
            type="number"
            className="form-control"
            id="itemPrice"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            placeholder="Enter price"
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProducts;