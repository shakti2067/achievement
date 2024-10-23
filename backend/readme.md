<!-- start backend server -->

json-server --watch db.json

npx json-server-auth db.json

json-server db.json -m ./node_modules/json-server-auth

<!-- for product api -->
<!-- https://fakestoreapi.com/docs -->
<!-- https://dummyjson.com/  -->
