import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../Utilities/databaseManager';
import fakeData from '../../fakeData'
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {

  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false); //default vabe false mani placedOrder btn uncliced thakle.ar state ta gif ar joonno

  //niserta number baranor jonno korsi jokhn product ekta ekta select kore pathabo check in ar jonno..
  const increment = key => {
    const p = cart.find(pd => pd.key === key)
    p.quantity=p.quantity+1;
   const q = cart.indexOf(key);
   cart[q] = p;
   setCart([...cart]);
}

//ata ekta ekta product komabe
const decrease = key =>{
  const p = cart.find(pd => pd.key === key)
  p.quantity = p.quantity - 1;
  const q = cart.indexOf(key);
  cart[q] = p;
  setCart([...cart])
  processOrder(); //click ar satehe tk tao komabe 
  //niser condision ta daoa hoise 0 quantity hoile tar nise porduct jabe na..
  if(p.quantity === 0){
    p.quantity = p.quantity + 1;
    const q = cart.indexOf(key);
    cart[q] = p;
    setCart([...cart])
  }
}
  const history = useHistory();
  const handleProceedCheckout = () => {
     history.push('/shipment');
  }

  const removeProduct = (productKey) =>{
    console.log("clicked", productKey);
    const newCart = cart.filter( pd => pd.key !== productKey ) //click kora product key ar sathe data ghular product key na mille ta nise setCart a set kore dibo..
    setCart(newCart);
    console.log(newCart);
    removeFromDatabaseCart(productKey); //reload korle dta bese product thaker karone abr ase jabe product ajjono amra database ar method use kre product ta data base tehke delect korsi..
  }

  useEffect(()=>{
    //cart
   const saveCart = getDatabaseCart(); //getDatabaseCart ekhne cart e add howa product gulo savedCart e assign krce
   const productKey = Object.keys(saveCart) //savedCart ekhne ekti object
   const cartProducts = productKey.map(key => {
     const product = fakeData.find( pd => pd.key === key);//cart e add howa key gulor sathe fakedata te thaka product r compare ..kra hcche

     product.quantity= saveCart[key] //cart e add hye jawa product gulor new property quantity add kra hcche..savedCart[key]=quantity

     return product; // product r value ta cartProducts variable e assign hcce
   })
   setCart(cartProducts);
    
  },[]);

let thankYou;
if(orderPlaced){
  thankYou = <img src={happyImg} alt=""/>
}


return (

<div className="twin-container">
  <div className="product-container">
    {/* <h1>Cart Items {cart.length}</h1>   */}
  {
    cart.map(pd => <ReviewItem 
      key={pd.key}  product={pd}  removeProduct={removeProduct} increment={increment} decrease={decrease} >     
      </ReviewItem> ) //cart e add howa shobgulo product show korar jnno pabar jnno map//
  } 

    {
      thankYou  //gif ta set korer jonno ata kra
    }
  </div>


  <div className="cart-container">
    <Cart cart={cart}>
      <button onClick={handleProceedCheckout} className="main-button">proceed Checkout</button>
    </Cart> 
    {/* cart.js theke  cart ta  nia asci review.js page a arekta shop.js a ase orthat 1ta cart 2jagay use kortesi */}
  </div>                    
</div>
);
};

export default Review;