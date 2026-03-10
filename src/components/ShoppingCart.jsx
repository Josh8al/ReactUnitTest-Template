import { useState } from "react";

/**
 * ShoppingCart Component - Complex state management with items
 */
function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [error, setError] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    setError("");

    if (!productName.trim()) {
      setError("Product name is required");
      return;
    }

    const price = parseFloat(productPrice);
    if (isNaN(price) || price <= 0) {
      setError("Price must be a positive number");
      return;
    }

    const existingItem = items.find(
      (item) => item.name.toLowerCase() === productName.trim().toLowerCase(),
    );

    if (existingItem) {
      setItems(
        items.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      const newItem = {
        id: Date.now(),
        name: productName.trim(),
        price: price,
        quantity: 1,
      };
      setItems([...items, newItem]);
    }

    setProductName("");
    setProductPrice("");
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setItems(
      items
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>

      <form onSubmit={addItem} data-testid="add-item-form">
        <div className="form-row">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product name"
            data-testid="product-name-input"
          />
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Price"
            step="0.01"
            min="0"
            data-testid="product-price-input"
          />
          <button type="submit" data-testid="add-item-btn">
            Add Item
          </button>
        </div>
        {error && (
          <div className="error" data-testid="form-error">
            {error}
          </div>
        )}
      </form>

      {items.length === 0 ? (
        <p data-testid="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items" data-testid="cart-items">
            {items.map((item) => (
              <li key={item.id} data-testid={`cart-item-${item.id}`}>
                <span
                  className="item-name"
                  data-testid={`item-name-${item.id}`}
                >
                  {item.name}
                </span>
                <span
                  className="item-price"
                  data-testid={`item-price-${item.id}`}
                >
                  ${item.price.toFixed(2)}
                </span>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    data-testid={`decrease-${item.id}`}
                  >
                    -
                  </button>
                  <span data-testid={`quantity-${item.id}`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    data-testid={`increase-${item.id}`}
                  >
                    +
                  </button>
                </div>
                <span
                  className="item-total"
                  data-testid={`item-total-${item.id}`}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                  data-testid={`remove-${item.id}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div data-testid="total-items">Items: {totalItems}</div>
            <div data-testid="subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
            <div data-testid="tax">Tax (10%): ${tax.toFixed(2)}</div>
            <div data-testid="total" className="total">
              Total: ${total.toFixed(2)}
            </div>
          </div>

          <button onClick={clearCart} data-testid="clear-cart-btn">
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
