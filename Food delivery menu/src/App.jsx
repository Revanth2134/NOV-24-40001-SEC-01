
import React, { useState } from "react";
import "./app.css";

// Food Menu Data
const foodItems = [
  {
    id: 1,
    name: "Classic Veg Burger",
    category: "Burgers",
    price: 99,
    description: "Crispy vegetable patty with fresh lettuce.",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800"
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burgers",
    price: 149,
    description: "Juicy burger with melted cheese.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 199,
    description: "Classic pizza with tomato and mozzarella.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800"
  },
  {
    id: 4,
    name: "Farmhouse Pizza",
    category: "Pizza",
    price: 279,
    description: "Loaded with vegetables and cheese.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"
  },
  {
    id: 5,
    name: "French Fries",
    category: "Snacks",
    price: 79,
    description: "Golden and crispy potato fries.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800"
  },
  {
    id: 6,
    name: "Veg Sandwich",
    category: "Snacks",
    price: 89,
    description: "Toasted sandwich with fresh vegetables.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800"
  },
  {
    id: 7,
    name: "Chicken Biryani",
    category: "Main Course",
    price: 220,
    description: "Aromatic biryani with delicious spices.",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800"
  },
  {
    id: 8,
    name: "Paneer Biryani",
    category: "Main Course",
    price: 180,
    description: "Fragrant biryani with spicy paneer.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800"
  },
  {
    id: 9,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 110,
    description: "Soft and delicious chocolate cake.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800"
  },
  {
    id: 10,
    name: "Chocolate Milkshake",
    category: "Drinks",
    price: 99,
    description: "Cold and creamy chocolate milkshake.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800"
  }
];

function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const categories = [
    "All",
    "Burgers",
    "Pizza",
    "Snacks",
    "Main Course",
    "Desserts",
    "Drinks"
  ];

  // Filter Food Items
  const filteredMenu =
    category === "All"
      ? foodItems
      : foodItems.filter(
          (food) => food.category === category
        );

  // Cart Count
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Cart Total
  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Add to Cart
  const addToCart = (food) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === food.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        { ...food, quantity: 1 }
      ];
    });
  };

  return (
    <div className="app">

      {/* Navbar */}
      <header className="navbar">
        <div className="nav-inner">

          <div className="brand">
            🍔 Foordie
          </div>

          <div className="cart-summary">
            🛒 Cart: {cartCount} | ₹{cartTotal}
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Delicious Food, Delivered Fast!
        </h1>

        <p>
          Order your favourite food at your doorstep.
        </p>
      </section>

      {/* Menu Section */}
      <main className="menu-section">

        <h2>Our Food Menu</h2>

        {/* Category Buttons */}
        <div className="category-list">

          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}

        </div>

        {/* Food Items */}
        <div className="food-grid">

          {filteredMenu.map((food) => (

            <div className="food-card" key={food.id}>

              <img
                src={food.image}
                alt={food.name}
                className="food-image"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/600x400?text=Food";
                }}
              />

              <div className="food-info">

                <h3>{food.name}</h3>

                <h4 className="food-price">
                  ₹{food.price}
                </h4>

                <p className="food-description">
                  {food.description}
                </p>

                <span className="food-category">
                  {food.category}
                </span>

                <button
                  className="add-button"
                  onClick={() => addToCart(food)}
                >
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Shopping Cart */}
        {cart.length > 0 && (

          <section className="cart-panel">

            <h2>Your Cart</h2>

            {cart.map((item) => (

              <div className="cart-line" key={item.id}>

                <span>
                  {item.name} × {item.quantity}
                </span>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>

              </div>

            ))}

            <div className="cart-total">

              <span>Total Amount</span>

              <strong>
                ₹{cartTotal}
              </strong>

            </div>

          </section>

        )}

      </main>

      {/* Footer */}
      <footer className="footer">
        © 2026 Foordie | Food Delivery Menu
      </footer>

    </div>
  );
}

export default App;
