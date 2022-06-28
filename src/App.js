import './App.css';

import Header from './components/DashboardHeader';
import Footer from './components/Footer';
import Body from './components/Body';
import { useState, useRef } from 'react';
import Loder from './components/Loder';

import CheckOut from './components/checkOut/Checkout.js'

const allItems = []

function App(props) {
    let action = {}
    let [items, setItems] = useState(allItems)
    let [triger, setTriger] = useState(true)
    let [cartCount, setCartCount] = useState(0)
    let [loding, setloding] = useState(false)
    let cart = []
    let allAvailableItems = []

    let itemLoader = {}

    let addToCart = {}
    addToCart.name = "Add to Cart"
    addToCart.action = (item) => {
        if (checkToken()) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            item.inCart = true;
            cart.push(item)
            localStorage.setItem('cart', JSON.stringify(cart))
            setCartCount(cart.length)
        }
        else props.auth()
    }


    let removeFromCart = {}
    removeFromCart.name = "Remove"
    removeFromCart.action = (item) => {
        if (checkToken()) {
            let cart = JSON.parse(localStorage.getItem('cart'))
            let temp = cart.length
            // cart = cart.filter((i) => { return JSON.stringify(item) != JSON.stringify(i) })
            for(let i = 0; i<cart.length; i++){
                if(JSON.stringify(item) == JSON.stringify(cart[i])){
                    cart.splice(i,1)
                    break
                }
            }

            if (cart.length == temp) window.alert(`item ${JSON.stringify(item)} could not be removed!`)
            else {
                setCartCount(cart.length)
                localStorage.setItem('cart', JSON.stringify(cart))
                let tempCart = [...cart, removeFromCart]
                window.alert(`item ${JSON.stringify(item).title ? JSON.stringify(item).title : ""} removed!`)
                setItems(tempCart);
            }
        }
        else props.auth()
    }


    let cancellOrder = {}
    cancellOrder.name = "Cancell Order"
    cancellOrder.action = async (item) => {
        let authToken = checkToken()
        if (!authToken) props.auth()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", authToken);

        console.log(item, '$$$$')
        var raw = JSON.stringify({
            "orderId": item.id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        loder.start()
        await fetch("https://e-commerce-backend-123.herokuapp.com/orders/cancel", requestOptions)
            .then(response =>{ 
                loder.stop()
                if (!response.ok) {
                    console.log(response);
                    throw new Error(`Error! status: ${response.status}`);
                  }
                return  response.json()
            })
            .then(response => {
                
                    window.alert("order cancelled successfully")
                    itemLoader.loadHistory();
                
            }).catch(error =>{ console.log('error:', error); handleError(error)})
    }

    let placeOneOrder = {}
    placeOneOrder.name = "Order Item"
    placeOneOrder.action = async function (item) {
        let authToken = checkToken()
        if (!authToken) props.auth()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", authToken);

        var raw = JSON.stringify({
            "productId": item.id //this is NOT id of the order item from order history, but one from get all products
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        loder.start()
        fetch("https://e-commerce-backend-123.herokuapp.com/orders/place", requestOptions)
            .then(response =>{
                loder.stop()
                if (!response.ok) {
                    console.log(response);
                    throw new Error(`Error! status: ${response.status}`);
                  }
                return  response.json()})
            .then(response => {
                console.log(response, 'place order req ka response');
                return response['status']
            }).catch(error =>{ console.log('error', error);handleError(error)});
    }

    let checkOut = {}
    checkOut.name = "Checkout"
    checkOut.action = async function (item) {
        let authToken = checkToken()
        if (!authToken) props.auth()

    }

    itemLoader.loadAllItems = async function () {
        if (allAvailableItems.length > 1) setItems(allAvailableItems);
        else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            // var raw = "";

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                // body: raw,
                redirect: 'follow'
            };

            loder.start()
            await fetch("https://e-commerce-backend-123.herokuapp.com/products", requestOptions)
                .then(allItems =>{
                    loder.stop()
                    if (!allItems.ok) {
                        console.log(allItems);
                        throw new Error(`Error! status: ${allItems.status}`);
                      }
                      return  allItems.json()
                })
                .then(allItems => {
                    console.log(allItems);
                    allAvailableItems = allItems.data
                    allAvailableItems.push(addToCart)
                    setItems(allAvailableItems);
                })
                .catch(error =>{ console.log('error', error);handleError(error)});
            // console.log('aaaaaaaaaa')
        }
    }

    itemLoader.loadCustomItems = async function (itemArray) {
        setItems(itemArray);
    }


    itemLoader.loadCart = async function () {
        if (!checkToken()) props.auth()
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart || !cart.length) window.alert("cart is empty!")
        else {


            let tempCart = [...cart, removeFromCart]
            // console.log(tempCart, 'lll')
            if (tempCart.length > 1) {
                setItems(tempCart);
            }
            
        }
    }

    itemLoader.placeOrders = async function () {
        if (!checkToken()) props.auth()
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (cart && cart.length > 0) {
            let status = "Failed";
            for (let i = 0; i < cart.length; i++) {
                status = await placeOneOrder.action(cart[i])
            }
            if (status == "Failed") window.alert(`no order placed!`)
            else window.alert(`Order for all items in the cart placed successfully!`)
            let user = localStorage.getItem('user')
            localStorage.clear()
            localStorage.setItem('user', user)
            itemLoader.loadHistory();
        }
        else window.alert('cart is empty! Cant place Orders')
    }

    itemLoader.loadHistory = async function () {
        let authToken = checkToken()
        if (!authToken) props.auth()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", authToken);

        // var raw = "";

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            // body: raw,
            redirect: 'follow'
        };

        loder.start()
        fetch("https://e-commerce-backend-123.herokuapp.com/orders", requestOptions)
            .then(historyItems =>{
                loder.stop()
                if (!historyItems.ok) {
                    console.log(historyItems);
                    throw new Error(`Error! status: ${historyItems.status}`);
                  }
                  return  historyItems.json()
            })
            .then(historyItems => {
                console.log(historyItems, '&&&&&&&&&&&&&&&&');
                
                    historyItems = historyItems.data
                    historyItems = historyItems.map((item) => {
                        return { ...item.product, ...item }
                    })
                    console.log(historyItems, 'opopop');
                    if(historyItems.length == 0) window.alert('No Orders Found')
                    historyItems.push(cancellOrder)
                    setItems(historyItems);
                
            })
            .catch(error =>{ console.log('error', error);handleError(error)});
    }

    let loder = {}
    let loderRef = useRef(null)
    loder.start = function(){
        loderRef.current?.start()
    }
    loder.stop = function(){
        loderRef.current?.stop()
    }

        //setTimeout(()=>loadAllItems(), 1000)
        ;
    return (
        <div className="App">
            {/* <Header />
      <Login anchorButton="buy" action="log In" /> */}
      <Loder ref={loderRef}/>
            <Header
                loder={loder}
                action={items.length > 0 ? items[items.length - 1] : addToCart}
                itemLoader={itemLoader}
                auth={() => { props.auth() }}
                items={items}
                addToCart={addToCart}
                triger={triger}
                toggleElement={props.toggleElement}
                cartCount={cartCount}
            />
            {/* <Body 
            items={items} itemLoader={itemLoader} 
            action={items.length > 0 ? items[items.length - 1] : addToCart} 
            action2={addToCart}
            auth={() => { props.auth() }} 
            /> */}
            <Footer auth={() => { props.auth() }} />
        </div>
    );
}

function checkToken() {
    console.log(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):false)
    return localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).authorization ? JSON.parse(localStorage.getItem('user')).authorization : false
}


export default App;

export function handleError(error) {
    console.log(error.message);
    window.alert(error.message+"\nPlease try again later! Mostly this is a network issue");
}