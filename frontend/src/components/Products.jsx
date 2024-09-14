import axios from "axios";
import { useEffect, useState } from "react";

function Products() {
  //logic goes here
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this products")) {
      axios
        .delete(`http://localhost:5000/deleteproduct/${id}`)
        .then((res) => {
          setProducts(products.filter((products) => products._id !== id));
        })
        .catch((err) => {});
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="mt-5">Products</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Item</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/images/product-images/${item._id}.jpg`}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>{item.itemName}</td>
                    <td>{item.itemDesc}</td>
                    <td>{item.itemPrice}</td>
                    <td>
                      <a href="" className="btn btn-warning">
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-danger ms-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr colSpan="6" className="text-center">
                  No products available
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Products;
