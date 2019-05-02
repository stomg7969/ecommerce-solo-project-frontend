This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# ecommerce-website-solo-project

Flatiron School Module 5 solo project (FRONTEND)

#### For this project, frontend and backend are now split into two repositories.

Original commits are in [this repo](https://github.com/stomg7969/ecommerce-website-solo-project)

[Link to BACKEND repo](https://github.com/stomg7969/ecommerce-solo-project-backend)

### What I learned

The biggest problem I met was in the `CartProduct.js`. I had to force refresh the page when user changes the quantity of an item. Reason why it didn't automatically render the page is because the quantity attribute was deeply nested from what I stored in Redux store.

When website is loaded, get request is initiated to get all `products` and `current user`. To get the quantity, I need to get `current user`'s all orders, find an order with status of 'pending', which is `current user`'s cart, then get each product and return quantity. The Redux was not able to detect the change I made because current user's memory address didn't change.

#### Solution options

1. I need to refactor the `CartContainer.js` to do fetch request for `orders`, instead of `current user`. It would've made the process easier.
2. Re-design Active Model Serializer in the backend.
