const express = require('express')
const router = express.Router()
const walletController = require('../controllers/wallet')
const { ethers } = require('ethers')

router.post('/deposit', async (req, res) => {
    try {
        const { amount, account } = req.body
        console.log(amount, account)
        await walletController.deposit(amount, account)
        res.json({ success: true, message: 'Deposit successful' })
    } catch (error) {
        console.error('Deposit error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/submit', async (req, res) => {
    try {
        const { to, amount, account } = req.body
        const parsedAmount = ethers.utils.parseEther(amount.toString())
        const receipt = await walletController.submitTransaction(to, parsedAmount, account)
        res.json({ success: true, message: 'Transaction submitted', receipt })
    } catch (error) {
        console.error('Submit error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/approve', async (req, res) => {
    try {
        const { transactionId, account } = req.body
        const receipt = await walletController.approveTransaction(transactionId, account)
        res.json({ success: true, message: 'Transaction approved', receipt })
    } catch (error) {
        console.error('Approve error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/execute', async (req, res) => {
    
    try {
        const { transactionId, account } = req.body
        const receipt = await walletController.executeTransaction(transactionId, account)
        res.json({ success: true, message: 'Transaction executed', receipt })
    } catch (error) {
        console.error('Execute error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/release', async (req, res) => {
    try {
        const { account } = req.body
        

        const receipt = await walletController.releasePayments(account)
        res.json({ success: true, message: 'Payments released to all payees', receipt })
    } catch (error) {
        console.error('Release error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.get('/transactions', async (req, res) => {
    try {
        const transactions = await walletController.getTransactions()
        res.json({ success: true, transactions })
    } catch (error) {
        console.error('Get transactions error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.get('/balance', async (req, res) => {
    try {
        const balance = await walletController.getBalance()
        res.json({ success: true, balance })
    } catch (error) {
        console.error('Get balance error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.get('/pruebas', async (req, res) => {
    try {
        await walletController.pruebas()
        res.json({ success: true, message: 'Pruebas executed' })
    } catch (error) {
        console.error('Pruebas error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/addProduct', async (req, res) => {
    try {
        const { name, price, account } = req.body
        const parsedPrice = ethers.utils.parseEther(price.toString())
        const receipt = await walletController.addProduct(name, parsedPrice, account)
        res.json({ success: true, message: 'Product added', receipt })
    } catch (error) {
        console.error('Add product error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/buyProduct', async (req, res) => {
    try {
        const { productId, account } = req.body
        const receipt = await walletController.buyProduct(productId, account)
        res.json({ success: true, message: 'Product bought', receipt })
    } catch (error) {
        console.error('Buy product error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/disableProduct', async (req, res) => {
    try {
        const { productId, account } = req.body
        const receipt = await walletController.setProductActiveController(productId, false, account)
        res.json({ success: true, message: 'Product disabled', receipt })
    } catch (error) {
        console.error('Disable product error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.get('/getProducts', async (req, res) => {
    try {
        const products = await walletController.getProducts()
        res.json({ success: true, products })
    } catch (error) {
        console.error('Get products error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.get('/payeeBalance/:account', async (req, res) => {
    try {
        const { account } = req.params
        const balance = await walletController.payeeBalance(account)
        res.json({ success: true, account, balance })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/updateProduct', async (req, res) => {
    try {
        const { productId, newName, newPrice, account } = req.body
        const receipt = await walletController.updateProductController(productId, newName, newPrice, account)
        res.json({ success: true, receipt })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/setProductActive', async (req, res) => {
    try {
        const { productId, active, account } = req.body
        const receipt = await walletController.setProductActiveController(productId, active, account)
        res.json({ success: true, receipt })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/releaseToPayee', async (req, res) => {
    try {
        const { payee, amount, account } = req.body
        const receipt = await walletController.releaseToPayeeController(payee, amount, account)
        res.json({ success: true, message: `Funds released to ${payee}`, receipt })
    } catch (error) {
        console.error('Release to payee error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

module.exports = router