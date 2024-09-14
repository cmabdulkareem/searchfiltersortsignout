import User from "../models/userModel.js"
import Product from "../models/productModel.js"
import CartModel from "../models/cartModel.js";
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const authChecking = (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ authenticated: true });
    } else {
        res.status(200).json({ authenticated: false });
    }
}

export const getDashboard = (req, res) => {
    if (!req.session.userId) {
        res.status(401).json({ error: 'Not authenticated' });
    }
    User.findById(req.session.userId)
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ email: user.email });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Internal server error' });
        })
}

export const handleRegistration = (req, res) => {
    const {name, email, password } = req.body;
    
    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json({ error: 'Email already exists' });
            }

            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    return User.create({name, email, password: hashedPassword });
                })
                .then(newUser => {
                    if (newUser) {
                        req.session.userId = newUser._id;
                        return res.status(201).json({ message: 'User registered successfully' });
                    }
                })
                .catch(err => {
                    res.status(500).json({ error: 'Registration failed cc' });
                });
        })
        .catch(err => {
            res.status(500).json({ error: 'Registration failed' });
        });
};
  


export const handleLogin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.status(401).json({ error: 'Invalid credentials' });
                    }
                    req.session.userId = user._id;
                    res.status(200).json({ message: 'Login successful' });
                })
                .catch((error) => {
                    console.error('Error comparing passwords:', error);
                    res.status(500).json({ error: 'Login failed during password comparison' });
                });
        })
        .catch((error) => {
            console.error('Error finding user:', error);
            res.status(500).json({ error: 'Login failed during user lookup' });
        });
};

export const handleAddProducts = (req, res) => {
    const { itemName, itemDesc, itemPrice } = req.body;

    Product.create({ itemName, itemDesc, itemPrice })
        .then((product) => {
            const image = req.files.image;
            image.mv(path.join(__dirname, '../public/images/product-images', `${product._id}.jpg`))
            res.status(200).json({ message: 'New product added' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error creating new product' });
        });
};

export const handlegetProducts=(req, res)=>{
    Product.find({})
        .then((products)=>{
            res.status(200).json({message: products})
        })
        .catch((err)=>{
            res.status(500).json({ error: 'no products found' });
        })
}

export const handleDeleteProduct = (req, res)=>{
    const id = req.params.id
    console.log(id);
    Product.findByIdAndDelete(id)
        .then((product)=>{
            res.status(200).json({message: `${product.itemName} Deleted`})
        })
        .catch((err)=>{
            res.status(500).json({error: "Internal server error"})
        })
}

export const handleAllProducts = (req, res)=>{
    Product.find({})
        .then((products)=>{
            res.status(200).json({message: products})
        })
        .catch((error)=>{
            res.status(500).json({error: "Unable to find products"})
        })
}

export const handleAddToCart = (req, res)=>{
    const productId = req.params.id //to get id from parameter

    const updateOperation = {
        $addToSet: {products: productId} // to add product id if not existing in array
    }

    CartModel.findOneAndUpdate({}, updateOperation, {upsert: true, new: true})
        .then((updatedCart)=>{
            res.status(200).json(updatedCart)
        })
        .catch((err)=>{
            res.status(500).json({error: "Error Adding products"})
        })
}

export const handleGetCart = (req, res)=>{
    CartModel.find({})
        .then((items)=>{
            const product = items[0].products.length
            res.status(200).json({message: product})
        })
        .catch((err)=>{
            console.log(err)
        })
}

export const handleLogout = (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
            return res.status(500).json({error: "Internal Error"})
        }else{
            res.status(200).json({message: "Logout success"})
        }
    })
}