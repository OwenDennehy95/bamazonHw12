const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const Table = require("cli-table");


 
figlet('httbs||www.SCAMA~ZON.com', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
//creating the connection
var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password:"root",
    database:"bamazon_db",
 })
 
 connection.connect(function(err) {
 console.log("connected as id:", connection.threadId);
  // run the start function after the connection is made to prompt the user
 })
 var purchaseTotal = 0;
 var deptStats = " ";
 
 function createTable() {
 var table = new Table({
 head: ["ID","Name","Department","Price","Quantity"]
 });
 connection.query("select * from products", function(err,res){
    if(err) throw err;
    for (var i = 0; i< res.length; i++){
        table.push(
        [res[i].item_ID,res[i].product_Name, res[i].department_name, res[i].price, res[i].stock_quantity],
        );
    }
    console.log(table.toString());
       console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
       start();
   })
 }
 createTable()
 function start() {
 inquirer.prompt([{
       name: "addToCart",
       message: "Type the ID number of the item you would like to add to the cart"
   }, {
       name: "quantity",
       message: "How many would you like to purchase?"
   }, ]).then(function (answer) {
       var selectQuant = answer.stock_quantity;
       var selectItem = answer.addToCart;
       connection.query("SELECT * FROM products WHERE item_id =?", [selectItem], function (err, res) {
 
 
        if (err) throw err;
            if (selectQuant < res[0].stock_quantity) {
               var newStock = res[0].stock_quantity -= selectQuant;
               deptStats = res[0].department_name;
               purchaseTotal += (res[0].price * selectQuant)
               console.log("You have purcahsed", selectQuant, res[0].product_Name);
               console.log("So Far, you have spent $" + purchaseTotal, "in total.")
               console.log('selectItem',selectItem);
               console.log('newStock',newStock);
               connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newStock, selectItem],
                   function (err, res) {
                       if (err) throw err;
                       connection.query("SELECT * FROM departments",
 function (err, res) {
                        if (err) throw err;
                        var profit1 = res[0].profit += purchaseTotal;
                        var sales1 = res[0].sales += purchaseTotal;
                        connection.query("UPDATE departments SET ? WHERE ?", 
                        [{
                                sales: sales1,
                            },
                            {
                                dept_name: deptStats
                            },
                            {
                                profit: profit1
                            },
                        ], function (err, res) {
                            if (err) throw (err)
                            inquirer.prompt({
                                type: 'confirm',
                                name: "continue",
                                message: "Would you like to add another item?"
                            }).then(function (answer) {
                                if (answer.continue === true) {
                                    createTable();
                                } else {
                                    console.log("Your total cost for the goods comes to:")
                                    console.log("Total($)" + purchaseTotal)
                                    console.log("Thanks for shopping at Scama~zon!")
                                    connection.end();
                                }
                            })
                        })
                    })
                   });
 
 
           } else {
               console.log("There is not enough stock on hand to add to your cart.");
               inquirer.prompt({
                   type: 'confirm',
                   name: "continue",
                   message: "Would you like to add a different item to your cart?"
               }).then(function (answer) {
                   if (answer.continue === true) {
                       createTable();
                   } else {
                       console.log("Thanks for shopping by!")
                      //connection.end();
                   }
               })
           }
       })
   })
 }