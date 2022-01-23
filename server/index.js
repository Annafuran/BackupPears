const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//POST

//create new product
app.post("/products", async(req, res) => {
    try {
        const {id, product_name, price} = req.body;
        const newProduct = await pool.query("INSERT INTO products (id, product_name, price) VALUES($1, $2, $3) RETURNING *", [id, product_name, price]);
        res.json(newProduct.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//create new storae
app.post("/newStorage", async(req, res) => {
    try {
        const { city } = req.body;
        const newStorage = await pool.query("INSERT INTO storagecities (city) VALUES($1) RETURNING *", [city]);
        res.json(newStorage.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});


//new delivery
app.post("/delivery", async(req, res) => {
    try {
        const { storage_adjustment, product_id, city, quantity } = req.body;
        const newDelivery = await pool.query("INSERT INTO storagedelivery (storage_adjustment, product_id, city, quantity) VALUES($1, $2, $3, $4) RETURNING *"
        , [storage_adjustment, product_id, city, quantity]);   
        res.json(newDelivery.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});



//register balance in storage
app.post("/storagebalanceupdate", async(req, res) => {
    try {
        const {storage_balance, product_id, city} = req.body;
        const newStorageUpdate = await pool.query("INSERT INTO storagebalance (storage_balance, product_id, city) VALUES($1, $2, $3) RETURNING *",
        [storage_balance, product_id, city])
        res.json(newStorageUpdate.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//PUT

//register balance in storage
app.put("/storagebalanceupdate", async(req, res) => {
    try {
        const { storage_balance, product_id, city} = req.body;
        await pool.query("UPDATE storagebalance SET storage_balance = storage_balance + $1 WHERE product_id = $2 AND city = $3",
        [storage_balance, product_id, city])
        res.json("Storage was updated!");
    } catch (error) {
        console.error(error.message)
    }
});

//GET 

//get registred products
app.get("/products", async(req, res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM products");
        res.json(allProducts.rows);
    } catch (error) {
        console.error(error.message)      
    }
});

//get registred storage cities
app.get("/cities", async(req, res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM storagecities");
        res.json(allProducts.rows);
    } catch (error) {
        console.error(error.message)      
    }
});

//get current storagebalance 
app.get("/storagebalance", async(req, res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM storagebalance, products WHERE product_id = id");
        res.json(allProducts.rows);
    } catch (error) {
        console.error(error.message)
        
    }
});

//get current deliverys
app.get("/deliverys", async(req, res) => {
    try {
        const allDeliverys = await pool.query("SELECT * FROM storagedelivery, products WHERE product_id = id");
        res.json(allDeliverys.rows);
    } catch (error) {
        console.error(error.message)
        
    }
});


//DELETE 

//delete product
app.delete("/products", async (req, res) => {
    try {
      const { id } = req.body;
      await pool.query("DELETE FROM products WHERE id = $1", [id]);
      res.json("Product was deleted!");
    } catch (err) {
      console.error(err.message);
    }
});

//delete product in storage balance
app.delete("/productstoragebalance", async (req, res) => {
    try {
      const { id } = req.body;
      await pool.query("DELETE FROM storagebalance WHERE product_id = $1", [id]);
      res.json("Product was deleted from storagebalance!");
    } catch (err) {
      console.error(err.message);
    }
});

//delete storage 
app.delete("/storage", async (req, res) => {
    try {
      const { city } = req.body;
      await pool.query("DELETE FROM storagecities WHERE city = $1", [city]);
      res.json("Storage was deleted!");
    } catch (err) {
      console.error(err.message);
    }
});

//delete storage in storage balance 
app.delete("/storagebalanceupdate", async (req, res) => {
    try {
      const { city } = req.body;
      await pool.query("DELETE FROM storagebalance WHERE city = $1", [city]);
      res.json("Storage was deleted from storagebalance!");
    } catch (err) {
      console.error(err.message);
    }
});

//delete product

app.listen(5000, () => {
    console.log("server has started on port 5000");
});