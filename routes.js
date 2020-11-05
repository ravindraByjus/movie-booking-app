require('dotenv').config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//import your models
const OrderQuotation = require("./models/OrderQuotation");
const SalesPerson = require("./models/SalesPerson");


const router = express.Router();

module.exports = function(){
    router.get('/QuotationSummary/:userId', async (req, res) => {
        try{
            const { userId } = req.params;
            console.log(typeof userId)
            const checkAdmin = await SalesPerson.findOne({userId:userId});
            console.log(checkAdmin.isAdmin)
            if(checkAdmin.isAdmin){
                const adminData = await OrderQuotation.find({});
                return res.json(adminData);
            }
            else{
                const salesData = await OrderQuotation.find({createdBy:userId});
                return res.json(salesData);
            }
        }
        catch (err){
            res.status(500).json({error: err.message})
        }
    });

    router.get('/getSalesPerson', async (req, res) => {
        const data = await SalesPerson.findOne({});
        return res.send(data);
    });
    
    router.post('/login', async(req,res) => {
        try{
            const { email, password } = req.body;

            //console.log(req.body)
            //validate
            if( !email || !password)
                return res.status(400).json({msg: "Enter all the fields"})

            
            const SalesData = await SalesPerson.findOne({email: email});
            //console.log(SalesData.email)
            if(!SalesData)
                return res
                    .status(400)
                    .json({msg: `No account with this email has been registered`});
            
            const isMatch = await password === SalesData.password;
            if(!isMatch) return res.status(400).json({msg: `Invalid credentials`});

            const token = jwt.sign({ id: SalesData._id}, process.env.JWT_SECRET);
            res.json({
                token,
                SalesPerson: {
                    id: SalesData.userId,
                    displayName: SalesData.firstName
                }
            });
        }
        catch (err){
            res.status(500).json({error: err.message})
        }
    });

    router.post("/tokenIsValid", async (req, res) => {
        try{
            const token = req.header("x-auth-token");
            if(!token) return res.json(false);

            const verified = jwt.verify(token, process.env.JWT_SECRET);
            if(!verified) return res.json(false)

            const SalesData = await SalesPerson.findById(verified.id);
            if(!SalesData) return res.json(false);

            return res.json(true)
        }
        catch(err){
            res.status(500).json({error: err.message});
        }
    });
    
    router.get('/', async(req, res) => {
        try{
            const token = req.header("x-auth-token");
            if (!token)
            return res
                .status(401)
                .json({ msg: "No authentication token, authorization denied." });

            const verified = jwt.verify(token, process.env.JWT_SECRET);
            if (!verified)
            return res
                .status(401)
                .json({ msg: "Token verification failed, authorization denied." });

            const SalesData = await SalesPerson.findById(verified.id);
            res.json({
                id: SalesData.userId,
                displayName: SalesData.firstName
            });
        }
        catch (err) {
            res.status(500).json({error: err.message});
        }
    });


    return router;
}
