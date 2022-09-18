const express = require('express');
require("./db/config");
const User = require('./db/User');
const Product = require('./db/Product');
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const secretKey = "SuperSecretKey";
const app = express();
const port = 5000

app.use(express.json());
app.use(cors())
app.post('/registers', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if (req.body.email == "admin") {
            let control = true;
        }
        const auth = jsonwebtoken.sign({
            "isAdmin": true,
            "email": req.body.email
        }, secretKey)
        if (user) {
            res.send({ user, auth });
        } else {
            res.send({ result: "User Not Found" });

        }
    } else {
        res.send({ result: "User Not Found" });
    }
});

app.post("/add-product",  verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No Product Found" });
    }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ "result": "No Record Found" })
    }
});


app.put("/product/:id",  verifyToken,async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key },
            },
            {
                price: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            }

        ]
    })
    res.send(result);
});



function verifyToken(req, res, next) {
    console.warn(req.headers['authorization']);
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jsonwebtoken.verify(token, secretKey, (err, valid) => {
            if (err) {
                res.status(401).send({result :"Please provide a valid token"});
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({result :"Please provide a token"});
    }
}
app.listen(port);
