# Full stack Pseudo testing bank app for practice

# Setting up of mySQL

## Setting up of mySQL workbench

1. Can attempt using this link (https://dev.mysql.com/downloads/file/?id=516926) to download the community edition (done on 08 Feb 2023)
2. Alternatively can use this website https://www.mysql.com/products/workbench/
3. Things were set up as per standard. (REMEMBER YOUR ROOT PASSWORD)
4. After installing everything open up mySQL Workbench
5. Create a new schema, name it however you want. (here I named it 'bank-app-schema')
6. Click onto the 'schemas' tab on the left to see your newly created schema, connect to it via double clicking, create a new table.
7. Following you may try to attempt to make a connection from express to mySQL database but may encounter an error like "sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',"
8. Create a new view in the schema created, paste the following line and run the view : `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password2@';`
9. Attempt the connection from express again and you should be able to connect.

# Setting up of Express for API

1. Create a new folder (perhaps called 'main-backend' or something)
2. cd into the folder via terminal
3. Run `npm init` to create a new application
4. Run `npm i express mysql cors body-parser`
5. Start the server via `node index.js` or whatever you declared as the main file during npm init
