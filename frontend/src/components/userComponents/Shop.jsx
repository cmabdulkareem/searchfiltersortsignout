import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MyContext } from "./Home";

function Shop() {
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(0);
  const { cartCount, updateValue } = useContext(MyContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetching products from the server when the component is first rendered ([])
  useEffect(() => {
    axios
      .get("http://localhost:5000/shop")
      .then((res) => {
        setProducts(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // This effect runs whenever `searchQuery` or `products` changes
  // It filters the product list based on the search query to create a list of suggestions
  useEffect(() => {
    if (searchQuery.length > 0) {
      // Filter products that match the search query (ignoring case)
      const filteredSuggestions = products
        .filter((product) =>
          product.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((product) => product.itemName); // Get just the item names for the suggestions
      setSuggestions([...new Set(filteredSuggestions)]); // Remove duplicates
    } else {
      setSuggestions([]); // Clear suggestions when search query is empty
    }
  }, [searchQuery, products]);

  // Filter and sort products based on search query and selected sort order
  const filteredProducts = products
    .filter((product) =>
      product.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Sort the filtered products based on price, either ascending or descending
      if (sortOrder === "asc") {
        return a.itemPrice - b.itemPrice;
      } else {
        return b.itemPrice - a.itemPrice;
      }
    });

  // Function to handle adding a product to the cart
  function handleAddToCart(id) {
    axios
      .get(`http://localhost:5000/addtocart/${id}`)
      .then((res) => {
        // Update the cart count in the global context based on the server's response
        updateValue(res.data.products.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6 position-relative">
            {/* Input field for searching products by name */}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Display suggestions dropdown when there are matching results */}
            {suggestions.length > 0 && (
              <ul
                className="list-group position-absolute w-100"
                style={{ zIndex: 1000 }}
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    className="list-group-item list-group-item-action"
                    key={index}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Dropdown to select the sort order of products by price */}
        <div className="row">
          <select
            className="form-select mt-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            {/* Option to sort from high to low price */}
            <option value="asc">Sort by Price: High to Low</option>
            {/* Option to sort from low to high price */}
            <option value="desc">Sort by Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-between">
          {/* Render the filtered and sorted products if any */}
          {filteredProducts.length > 0
            ? filteredProducts.map((item, index) => (
                <div className="card" key={index} style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:5000/images/product-images/${item._id}.jpg`}
                    className="card-img-top"
                    alt={item.itemName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.itemName}</h5>
                    <p className="card-text">{item.itemDesc}</p>
                    <p className="card-text">Price: {item.itemPrice}</p>
                    {/* Button to add the product to the cart */}
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      className="btn btn-primary"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
            : // If no products are found, show a message
              "No products found"}
        </div>
      </div>
    </>
  );
}

export default Shop;
