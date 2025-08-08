# 🛒 JavaScript E-Commerce Cart & Checkout

A simple e-commerce cart and checkout system built with **HTML**, **CSS**, and **JavaScript**.  
The project demonstrates how to add items to a cart, update quantities, choose delivery options, and display a dynamic order/payment summary.



## 📌 Features
- **Add to Cart** functionality
- Dynamic **cart count** updates
- **Delete** items from the cart
- **Select delivery options** with automatic date calculation
- Automatic **price, tax, and total cost calculation**
- Responsive hover effects for buttons and icons
- Saves cart data in **localStorage** so it persists on reload


## 🛠️ Tech Stack
- **HTML5**
- **CSS3** (for layout & hover animations)
- **Vanilla JavaScript (ES6 modules)**
- **Day.js** (for date calculations)
- **localStorage API** (for persistent cart)


## 📂 Folder Structure
project-folder/
│
├── data/
│   ├── products.js          # Product data
│   ├── cart.js              # Cart functions and localStorage handling
│   ├── delivery-option.js   # Delivery options data
│
├── utility.js               # Helper functions (e.g., price formatting)
├── index.html               # Shop page
├── check-out.html           # Checkout page
├── styles.css               # Main stylesheet
├── check-out.js             # Checkout logic
├── script.js                # Shop page logic
└── README.md                # This file





## 💡 How It Works
1. **Adding Items:** Click the "Add to Cart" button on the shop page.
2. **Cart Icon Count:** Updates instantly.
3. **Checkout Page:** Lists all items, delivery dates, and prices.
4. **Delete Option:** Removes an item from the cart and updates totals.
5. **Delivery Selection:** Updates delivery fee and estimated date.
6. **Persistent Storage:** Refreshing the page keeps your cart items.


## 🎨 Hover Effects
- Add to Cart button: Smooth scale-up animation
- Cart icon: Glow effect on hover
- Navigation links: Color change & underline animation


## 📜 License
This project is for learning purposes and is not intended for production use.


## 🙌 Acknowledgements
- [Day.js](https://day.js.org/) for date handling
- YouTube & MDN Web Docs for JavaScript references
