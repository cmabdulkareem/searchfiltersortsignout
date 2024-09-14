import express from 'express';
import { 
    authChecking, 
    getDashboard, 
    handleRegistration, 
    handleLogin,
    handleAddProducts,
    handlegetProducts,
    handleDeleteProduct,
    handleAllProducts,
    handleAddToCart,
    handleGetCart,
    handleLogout
 } from '../controller/userController.js'

const router = express.Router()

router.get('/checkAuth', authChecking);

router.get('/', getDashboard);

router.post('/register', handleRegistration);

router.post('/login', handleLogin);

router.get('/logout', handleLogout)

router.post('/add-products', handleAddProducts)

router.get('/products', handlegetProducts)

router.delete('/deleteproduct/:id', handleDeleteProduct)

router.get('/shop', handleAllProducts)

router.get('/addtocart/:id', handleAddToCart)

router.get('/cart', handleGetCart)

export default router;