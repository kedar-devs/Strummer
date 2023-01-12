
const stripe=require('stripe')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
const key=process.env.STRIP_PAYMENT_KEY
const Stripe=new stripe(`${key}`)
exports.chargeNewuser=async(req,res)=>{
    try{
    console.log('in here')
    const {email,amount}=req.body
    const idempotencyKey=uuidv4()
    const customer=await Stripe.customers.create(
        {email: email},{
            timeout: 10000
          }
      );
    const Transaction=await Stripe.charges.create({
        amount:amount*100,
        currency:'usd',
        customer:customer.id
    },{idempotencyKey})
    if(Transaction){
        return res.status(200).send(Transaction)
    }
    else{
        return res.status(400).send('transaction failed')
    }
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}