# e-commerce

#### List of Basic routes:

| Route                                                        | HTTP   | Request                                                      | On Success                                                   | On Error                                                     | Description                                    |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------- |
| <span style="color:#0000ff">/users/register</span>           | POST   | (BODY)<br />name:String(required)<br />email:String(required)<br />password:String(required)<br /> | Status: 201<br />Body: new users                             | Status: 400<br />Message: Path name/email/password is required | Register new user                              |
| <span style="color:#0000ff">/users</span>                    | GET    |                                                              | Status: 200<br />Body: all users                             | Status: 500<br />Message: internal server error              | Get all the users info                         |
| <span style="color:#0000ff">/users/find</span>               | GET    |                                                              | Status: 200<br />Body: found user                            | Status: 404<br />Message: not Found                          | Find a user with id                            |
| <span style="color:#0000ff">/users/:id</span>                | PATCH  | (HEADERS)<br />token: String(required)                       | Status: 200<br />Body: updated user                          | Status: 404<br />Message: not Found                          | Update a user                                  |
| <span style="color:#0000ff">/users/addToCart/:id</span>      | PATCH  | (HEADERS)<br />token: String(required)<br />(BODY)<br />productId: String(required) | Status:200<br />Body: updated user with new product in cart  | Status: 500<br />Message: internal server error              | Add new product to user's cart                 |
| <span style="color:#0000ff">/users/removeFromCart/:id</span> | PATCH  | (HEADERS)<br />token: String(required)<br />(BODY)<br />productId: String(required) | Status:200<br />Body: updated user with product removed from cart | Status: 500<br />Message: internal server error              | Remove a product from user's cart              |
| <span style="color:#0000ff">/products</span>                 | POST   | (HEADERS)<br />token: String(required)<br /><br />(BODY)<br />name:String(required)<br />stock:Number(required)<br />price:Number(required)<br />image:String(required)<br />brand:String(required) | Status:201<br />Body: created product                        | Status: 500<br />Message: internal server error              | Create new product                             |
| <span style="color:#0000ff">/products</span>                 | GET    |                                                              | Status: 200<br />Body: all products                          | Status: 500<br />Message: internal server error              | Get all the products                           |
| <span style="color:#0000ff">/products/:id</span>             | GET    |                                                              | Status: 200<br />Body: found product                         | Status: 404<br /><br />Message: not Found.                   | Find a product by id                           |
| <span style="color:#0000ff">/products:id</span>              | PATCH  | (HEADERS)<br />token:String<br />(BODY)<br />name:String<br />stock:Number<br />price:Number<br />image:String<br />brand:String | Status: 200<br />Body: updated product                       | Status: 404<br /><br />Message: not Found.                   | Update a product                               |
| <span style="color:#0000ff">/products/:id</span>             | DELETE | (HEADERS)<br />token:String<br />                            | Status: 200<br />Body: deleted product                       | Status: 404<br /><br />Message: not Found.                   | Delete a product                               |
| <span style="color:#0000ff">/transactions</span>             | GET    | (HEADERS)<br />token:String<br />                            | Status: 200<br />Body: all transactions                      | Status: 401<br /><br />Message: not allowed.                 | Find all transactions                          |
| <span style="color:#0000ff">/transactions/user/:id</span>    | GET    | (HEADERS)<br />token:String<br />                            | Status: 200<br />Body: found transactions                    | Status: 401<br />Message: not allowed.                       | Get transaction find by user id                |
| <span style="color:#0000ff">/transactions/delivery</span>    | POST   | (BODY)<br />province: String(required)<br />city: String(required) | Status: 201<br />Body: delivery cost                         | Status: 404<br />Message: the address you provided was not found. | Get delivery cost based from province and city |
| <span style="color:#0000ff">/transactions/:id</span>         | GET    |                                                              | Status: 200<br />Body: found transaction                     | Status: 404<br />Message: not Found.                         | Get transaction by id                          |
| <span style="color:#0000ff">/transactions/checkout/:id</span> | POST   | (HEADERS)<br />token:String<br />(BODY)<br />phone: Number(required)<br />address: String(required)<br />totalPayment: Number(required) | Status: 201<br />Body: new transaction                       | Status: 400<br />Message: Path phone/address is required     | Create new Transaction based from user's cart  |
| <span style="color:#0000ff">/transactions/:id</span>         | PATCH  | (HEADERS)<br />token:String<br />(BODY)<br />status: Boolean(required) | Status: 200<br />Body: updated transaction                   | Status: 404<br />Message: not Found.                         | Update transaction status                      |
| <span style="color:#0000ff">/transactions/:id</span>         | DELETE | (HEADERS)<br />token:String<br />                            | Status: 200<br />Body: deleted transaction                   | Status: 404<br />Message: not Found.                         | Delete a transaction                           |
| <span style="color:#0000ff">/brands</span>                   | GET    |                                                              | Status: 200<br />Body: all brands                            | Status: 500<br />Body: internal server error                 | Find all brands with products with it          |
| <span style="color:#0000ff">/brands/search/?name=[brand name]</span> | GET    | (QUERY)<br />name: String                                    | Status: 200<br />Body: found brand                           | Status: 404<br /><br />Message: not Found.                   | Get one brand with populated products          |

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

Access local Server side: 
http://localhost:3000

Access local Client side: 
http://localhost:8080


## Demo
Server side:

http://hypeleash-server.michaeltim.com

Client side:

http://hypeleash.michaeltim.com
