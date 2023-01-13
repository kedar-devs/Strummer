import React,{useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'

function StripePaymentPage() {
    const [prod,setProd]=useState({
        name:'creator',
        email:'kedard249.kd@gmail.com',
        price:100
    })
    const makePayment=(token)=>{
        const body={
            token,
            prod
        }
        axios.post('http://localhost:5000/User/payment',body)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
        <StripeCheckout
        stripeKey="pk_test_51MOxzRSHgs3sudxeetSkWvkv7n6rPjksnAej8B4liQdNstnZWEpJ623mm3qYPcWMKUv8yR4rbf3xWYWgMz4NSWUo00GOD205wX"
        token={makePayment}
        name='Reward Creator'
        amount={100}
        key='13fw24t' 
        />
    </div>
  )
}

export default StripePaymentPage