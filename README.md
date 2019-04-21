# e-commerce

#### List of Basic routes:

| Route                                                    | HTTP   | Request                                                      | On Success                            | On Error                                        | Description                       |
| -------------------------------------------------------- | ------ | ------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------- | --------------------------------- |
| <span style="color:#0000ff">/users</span>                | GET    |                                                              | Status: 200<br />Body: all users      | Status: 500<br />Message: internal server error | Get all the users info            |
| <span style="color:#0000ff">/users/find</span>           | GET    |                                                              | Status: 200<br />Body: found user     | Status: 404<br />Message: not Found             | Find a user with id               |
| <span style="color:#0000ff">/users/:id</span>            | PATCH  | (HEADERS)<br />token: String(required)                       | Status: 200<br />Body: updated user   | Status: 404<br />Message: not Found             | Update a user                     |
| <span style="color:#0000ff">/users/:id</span>            | DELETE | (BODY)<br />username:String(required)<br />email:String(required)<br />passsword:String(required) | "user successfully registered"        |                                                 | Register a user                   |
| <span style="color:#0000ff">/users/addToCart</span>      | POST   | (BODY)<br />productId:String(required)                       | "product successfully added"          |                                                 | Add a Product to user's cart      |
| <span style="color:#0000ff">/users/deleteFromCart</span> | PUT    | productId:String(required)                                   | "product deleted successfully"        |                                                 | Delete a Product from user's cart |
| <span style="color:#0000ff">/users/checkout</span>       | DELETE |                                                              | "successfully emptied user's cart"    |                                                 | Empty user's cart                 |
| <span style="color:#0000ff">/products</span>             | GET    |                                                              | "successfully get all products data." |                                                 | Get all the products              |
| <span style="color:#0000ff">/products</span>             | POST   | name:String(required)<br />price:Number(requied)<br />stock:Number(required)<br />photo:File(required) | "successfully created new product"    |                                                 | Create new product                |
| <span style="color:#0000ff">/products</span>             | PUT    | name:String<br />price:Number<br />stock:Number<br />photo:File | "update product success."             |                                                 | Update a product                  |
| <span style="color:#0000ff">/products</span>             | DELETE |                                                              | "delete product success"              |                                                 | Delete a new product              |
| <span style="color:#0000ff">/products/find</span>        | GET    |                                                              | "product found"                       |                                                 | Find a product by id              |
|                                                          |        |                                                              |                                       |                                                 |                                   |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run this commands in both client and server folders:

```
$npm install
```

Run this command in server folder:

```
$nodemon app
```

Run this command in client folder: 

```
$npm run serve
```

 Access the Server side via http://localhost:3000/.

Access the Client side via http://localhost:8080/.