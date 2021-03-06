This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# ecommerce-website-solo-project

_Flatiron School Module 5 solo project (FRONTEND)_

**An online shopping website for children innerwear. Customers can browse products and purchase.**

#### For this project, frontend and backend are now split into two repositories.

Original commits are in [this repo](https://github.com/stomg7969/ecommerce-website-solo-project)

[Link to BACKEND repo](https://github.com/stomg7969/ecommerce-solo-project-backend)

##### [Link to Demo(Heroku)](https://hidden-harbor-75858.herokuapp.com/)

### Dummy Account

**CUSTOMER**

- ID: jane
- PW: jane

**ADMIN**

- ID: admin
- PW: admin

### Language

- Javascript with React and Redux for client-side
- Rails for server-side
- Custom CSS and some implementation from open source
- Pure-React-Carousel node package
- JsonWebToken node package
- jQuery for sliding

### Features / App Description

**Users**

- Cart
  - Add products to a cart.
  - Adjust quantity of each product.
  - Delete each product.
  - Choose shipping method.
  - Check total amount.
- Full authentication & authorization
- User's ActiveRecord CRUD
- User can see all orders
- Filter by multiple categories
- Search by product name
- Sort by price (both ASC and DESC)

**Admin**

- Check total sales and number of orders to fulfill
- Check each user's orders

### What I learned 1 - _Filtering multiple attributes_

[Link to my blog about filtering](https://medium.com/@stomg7969/creating-a-multi-filter-function-to-filter-out-multiple-attributes-javascript-react-rails-5aad8e272142)

One of this application's features is my `Filter`, which took me the most time to complete. This feature lets users to filter product list by `Color, Gender, Material, and/or Category`. Because these four categories are part of attributes of Product class, I had to make some decisions on several factors:

1. state management - use just react or redux
2. whether if I should make four different functions or one universal function
3. organizing my codes (Filter.js, InputTagCollection.js)
4. managing an array inside of an array (material attribute)
5. combining search and filter into one function to pass down to child component

### What I learned 2 - _'Memory leak' warning_

Before figuring out, I had memory leak warning because I didn't understand the responsibility of `componentWillUnmount()`.
At first, I created a `scroll event` to render additional products when users reach bottom of the page. However, I didn't remove the event when users move on to other components. If there is an event for `window` only on a certain page, I must remove the event when component is being unmounted.

```
componentDidMount() {
  console.log("SCROLL EVENTLISTENER ADDED");
  window.addEventListener("scroll", this.handleScroll);
}

componentWillUnmount() {
  window.removeEventListener("scroll", this.handleScroll);
}
```

### What I learned 3 - _Updating the states_

The biggest problem I met was in the `CartProduct.js`. I had to force refresh the page when user changes the quantity of an item. Reason why it didn't automatically render the page is because the quantity attribute was deeply nested from what I stored in Redux store.

When website is loaded, get request is initiated to get all `products` and `current user`. To get the quantity, I need to get `current user`'s all orders, find an order with status of 'pending', which is `current user`'s cart, then get each product and return quantity. The Redux was not able to detect the change I made because current user's memory address didn't change.

I need to refactor the `CartContainer.js` to do fetch request for `orders`, instead of `current user`. It would've made the process easier.

### What I learned 4 - _Organizing components_

As the number of components is increasing, it would be much better to find components if related components are collected into specific directories.
