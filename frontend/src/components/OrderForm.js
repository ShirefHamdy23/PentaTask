import React, { useState } from "react";
import axios from "axios";

function OrderForm() {
  const [order, setOrder] = useState({
    productId: "",
    quantity: "",
    price: "",
    Temp: "",
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/orders", {
      ...order,
      date: new Date().toISOString(),
    });
    setOrder({ productId: "", quantity: "", price: "", temp: "" });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "1rem",
          padding: "1rem",
          border: "10px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
          overflow: "auto",
        }}
      >
        <h2>Add New Order</h2>
        <input
          style={{
            margin: "0.20rem",
            padding: "0.20rem",
            border: "2px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            overflow: "auto",
          }}
          type="text"
          name="productId"
          value={order.productId}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          style={{
            margin: "0.20rem",
            padding: "0.20rem",
            border: "2px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            overflow: "auto",
          }}
          type="number"
          name="quantity"
          value={order.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <input
          style={{
            margin: "0.20rem",
            padding: "0.20rem",
            border: "2px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            overflow: "auto",
          }}
          type="text"
          name="temp"
          value={order.temp}
          onChange={handleChange}
          placeholder="Temp"
          required
        />
        <input
          style={{
            margin: "0.20rem",
            padding: "0.20rem",
            border: "2px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            overflow: "auto",
          }}
          type="number"
          name="price"
          value={order.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <button
          style={{
            margin: "1rem",
            padding: "0.20rem",
            border: "2px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            cursor: "pointer",
            overflow: "auto",
          }}
          type="submit"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
