let express=require('express')
let app=express()
let dotenv=require('dotenv')
dotenv.config()
let port=process.env.PORT || 7800
let mongo=require('mongodb')
const { query } = require('express')
let MongoClient=mongo.MongoClient
let MongoUrl=process.env.MongoUrl
let db;


// types_of_products:

app.get('/categories',(req,res)=>{
    db.collection('categories').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// list_of_products:

app.get('/products',(req,res)=>{
    db.collection('products').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// list_of_products wrt categories:

app.get('/categories/:categoriesid',(req,res)=>{
    let categoriesid = Number(req.params.categoriesid)
    db.collection('products').find({"Category_Id":categoriesid}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// list_of_products wrt categories and cost:

app.get('/categories/:categoryid',(req,res)=>{
    let query={}
    let categoryid = Number(req.params.categoryid)
    let price=Number(req.query.price)
    let price2=Number(req.query.price2)
    let price3=Number(req.query.price3)
    if(price){
        query={
            "Category_Id":categoryid,
            "Capacity.Price":price}
    }else if(price2){
        query={
            "Category_Id":categoryid,
            "Version.Price":price2}
    }else if(price3){
        query={"Category_Id":categoryid,
        "Price":price3}
    }else{
        query={"Category_Id":categoryid}
    }
    db.collection('products').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// product wrt colours:

app.get('/products/:productsid',(req,res)=>{
    let query={}
    let productsid=Number(req.params.productsid)
    let colour=Number(req.query.colour)
    if(colour){
        query={"Product_Id":productsid,
            "Color.Colour_Id":{$in:[colour]}}
    }else{
        query={"Product_Id":productsid}
    }
    db.collection('products').find(query).toArray((err,result)=>{
        if (err) throw err
        res.send(result)
    })
})

// products wrt capacity:

app.get('/products/:productsid',(req,res)=>{
    let query={}
    let productsid=Number(req.params.productsid)
    let capacity=Number(req.query.capacity)
    if(capacity){
        query={"Product_Id":productsid,
            "Capacity.Capacity_Id":{$in:[capacity]}}
    }else{
        query={"Product_Id":productsid}
    }
    db.collection('products').find(query).toArray((err,result)=>{
        if (err) throw err
        res.send(result)
    })
})

//products wrt screensizes:

app.get('/products/:productsid',(req,res)=>{
    let query={}
    let productsid=Number(req.params.productsid)
    let screen=Number(req.query.screen)
    if(screen){
        query={"Product_Id":productsid,
            "Version.Screen_Id":{$in:[screen]}}
    }else{
        query={"Product_Id":productsid}
    }
    db.collection('products').find(query).toArray((err,result)=>{
        if (err) throw err
        res.send(result)
    })
})

MongoClient.connect(MongoUrl,(err,client)=>{
    if(err) console.log("unable to connect with server")
    db=client.db('novintern')
    app.listen(port,()=>{
        console.log(`port ${port} is created`)
    })
})