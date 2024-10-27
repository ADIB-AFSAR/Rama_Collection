const useCart = () => {
    const calculateTotals = (items) => {
      const subTotal = items.reduce((total, item) => total + item.price * item.purchaseQuantity, 0);
      const tax = 0; // Add your tax calculation logic here if needed
      const grandTotal = subTotal + tax;
      return { subTotal, tax, grandTotal };
    };
  
    const addCart = (currentCart, product, customer, quantity = 0) => {
      const currentCartItem = [...currentCart.items];
      const productExistsIndex = currentCartItem.findIndex((item) => item.id === product.id);
  
      if (productExistsIndex >= 0) {
        // Product exists, update quantity
        currentCartItem[productExistsIndex].purchaseQuantity += quantity ? quantity : 1;
      } else {
        // Product doesn't exist, add new item
        currentCartItem.push({ ...product, purchaseQuantity: quantity ? quantity : 1 });
      }
  
      const { subTotal, tax, grandTotal } = calculateTotals(currentCartItem);
      
      return {
        ...currentCart,
        customer,
        items: currentCartItem,
        subTotal,
        tax,
        grandTotal,
      };
    };
  
    const updateCart = (currentCart, product, quantity) => {
      const currentCartItem = [...currentCart.items];
      const productExistsIndex = currentCartItem.findIndex((item) => item.id === product.id);
  
      if (productExistsIndex >= 0) {
        // Update quantity if product exists
        currentCartItem[productExistsIndex].purchaseQuantity = quantity;
      }
  
      const { subTotal, tax, grandTotal } = calculateTotals(currentCartItem);
  
      return {
        ...currentCart,
        items: currentCartItem,
        subTotal,
        tax,
        grandTotal,
      };
    };
  
    const deleteCart = (currentCart, product) => {
      const currentCartItem = currentCart.items.filter((item) => item.id !== product.id);
  
      const { subTotal, tax, grandTotal } = calculateTotals(currentCartItem);
  
      return {
        ...currentCart,
        items: currentCartItem,
        subTotal,
        tax,
        grandTotal,
      };
    };
  
    return [addCart, updateCart, deleteCart];
  };
  
  export default useCart;
  