This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# ecommerce-website-solo-project

Flatiron School Module 5 solo project (FRONTEND)

#### For this project, frontend and backend are now split into two repositories.

Original commits are in [this repo](https://github.com/stomg7969/ecommerce-website-solo-project)

[Link to BACKEND repo](https://github.com/stomg7969/ecommerce-solo-project-backend)

[Link to Demo] heroku (url)

# Copy this readme also to backend readme too.

### Language

- Javascript with React and Redux fro client-side
- Rails for server-side
- Custom CSS using open source

### Features / App Description

- Cart: users can ...

  - Add products to a cart.
  - Adjust quantity of each product.
  - Delete each product.
  - Choose shipping method.
  - Check total amount.

  * Full authentication & authorization

  - Authenticate users.
  - Authorize only on intended pages.

- User's ActiveRecord CRUD

- User can see all orders

- Filter by multiple categories

- Search by product name

- Sort by price (both ASC and DESC)

### What I learned 1

[Link to my blog] - (url)

One of this application's features is my `Filter`, which took me the most time to complete. This feature lets users to filter product list by `Color, Gender, Material, and/or Category`. Because these four categories are part of attributes of Product class, I had to make some decisions on several factors:

1. state management - use just react or redux
2. whether if I should make four different functions or one universal function
3. organizing my codes (Filter.js, InputTagCollection.js)
4. managing an array inside of an array (material attribute)
5. combining search and filter into one function to pass down to child component

### What I learned 2

The biggest problem I met was in the `CartProduct.js`. I had to force refresh the page when user changes the quantity of an item. Reason why it didn't automatically render the page is because the quantity attribute was deeply nested from what I stored in Redux store.

When website is loaded, get request is initiated to get all `products` and `current user`. To get the quantity, I need to get `current user`'s all orders, find an order with status of 'pending', which is `current user`'s cart, then get each product and return quantity. The Redux was not able to detect the change I made because current user's memory address didn't change.

I need to refactor the `CartContainer.js` to do fetch request for `orders`, instead of `current user`. It would've made the process easier.
