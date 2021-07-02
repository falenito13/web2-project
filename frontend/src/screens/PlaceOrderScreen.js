import React, {useEffect} from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
function PlaceOrderScreen(props){
    const cart = useSelector(state => state.cart);
    const {cartItems,shipping,payment} = cart;
    if(!shipping.address || !shipping.city || !shipping.country || !shipping.postalCode){
        props.history.push("/shipping");
    }
    const itemsPrice = cartItems.reduce((a,c) => a + c.price*c.qty,0);
    const shippingPrice = itemsPrice>100? 0: itemsPrice * 0.1;
    const taxPrice= 0.15*itemsPrice;
    const totalPrice = itemsPrice + shippingPrice+taxPrice;
    const dispatch = useDispatch();
  
    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    function getCookie(name) {
        console.log(document.cookie);
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    const placeOrderHandler = () => {

    }
    useEffect(() => {
      
    },[]);
    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }
    return (
    <div>
    <CheckoutSteps step1 step2 step3></CheckoutSteps>
    
    <div className="placeorder">
        <div className="placeorder-info">
        <div>
            <h3>Shipping</h3>
            <div>
                {localStorage.getItem('address')},{localStorage.getItem('city')},
                {localStorage.getItem('postalCode')},{localStorage.getItem('country')}

            </div>
        </div>
        <div>
<ul>
<li> <h3> Shopping Cart</h3> 
                <div> Price </div>
                </li>
                {cartItems.length ===0 ? 
                <div>Cart is empty </div> : 
                cartItems.map(item => 
                    <li>
                <div className="cart-image">                    <img src={item.image} alt="product" />  
 </div>
                <div className="cart-name"> 
                <div>
                    <Link to={"/products/" + item.product}>
                     {item.name} </Link> </div> 
                <div> Qty: {item.qty}
                    
                     </div>  
                    </div>
                    <div className="cart-price">
                        ${item.price}
                   </div>
</li>
                    )}
            
                </ul>
        </div>
        <div className="placeorder-action">
            <ul>
                <li>
                    <h3>Order Summary</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                </li>
                <li>
                    <div>Order Total</div>
                    <div>${totalPrice}</div>
                </li>
            </ul>
        </div>
               
        </div>
        <div className="cart-action">
<h3> Subtotal :{ cartItems.reduce((a,c) => a+c.qty,0)} items : {cartItems.reduce((a,c) => a+c.price * c.qty,0)} </h3>
<button className="button primary full-width" onClick={checkoutHandler} disabled={cartItems.length ===0}>Pay</button>
        </div>
    </div>
    </div>
    )
}
export default PlaceOrderScreen;
