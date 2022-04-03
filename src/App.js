import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import { useState } from 'react'

const allItems = []

function App(props) {
    let action = {}
    let [items, setItems] = useState(allItems)
    let cart = []
    let allAvailableItems = []

    let itemLoader = {}

    let addToCart = {}
    addToCart.name = "Add to Cart"
    addToCart.action = (item) => {
        if (checkToken()) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(item)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
        else props.auth()
    }


    let removeFromCart = {}
    removeFromCart.name = "Remove"
    removeFromCart.action = (item) => {
        if (checkToken()) {
            let cart = JSON.parse(localStorage.getItem('cart'))
            let temp = cart.length
            cart = cart.filter((i) => { return JSON.stringify(item) != JSON.stringify(i) })
            if (cart.length == temp) window.alert(`item ${JSON.stringify(item)} could not be removed!`)
            else {
                localStorage.setItem('cart', JSON.stringify(cart))
                let tempCart = [...cart, removeFromCart]
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

        await fetch("https://e-commerce.urownsite.xyz/orders/cancel", requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response, 'cansell req ka response');
                if (response["status"] == "Success") {
                    window.alert("order cancelled successfully")
                    itemLoader.loadHistory();
                }
                else if(response["status"] == "Order Not Found"){
                    window.alert(`Order ${JSON.stringify(item)} Not Found`)
                }
                else {
                    window.alert(`sOME ERROR OCCURED, PLEASE login AGAIN`)
                    props.auth()
                }
            }).catch(error => console.log('error', error));
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

        fetch("https://e-commerce.urownsite.xyz/orders/place", requestOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response, 'place order req ka response');
            if (response["status"] == "Success") {
                console.log("order placed successfully")
                // itemLoader.loadHistory();
            }
            return response['status']
        }).catch(error => console.log('error', error));
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

            await fetch("https://e-commerce.urownsite.xyz/products", requestOptions)
                .then(allItems => allItems.json())
                .then(allItems => {
                    console.log(allItems);
                    allAvailableItems = allItems.data
                    allAvailableItems.push(addToCart)
                    setItems(allAvailableItems);
                })

            console.log('aaaaaaaaaa')
        }
    }

    itemLoader.loadCustomItems = async function (itemArray) {
        setItems(itemArray);
    }


    itemLoader.loadCart = async function () {
        if (!checkToken()) props.auth()
        let cart = JSON.parse(localStorage.getItem('cart'))
        let tempCart = [...cart, removeFromCart]
        console.log(tempCart, 'lll')
        if (tempCart.length > 1) {
            setItems(tempCart);
        }
        else window.alert('cart is empty!')
    }

    itemLoader.placeOrders = async function () {
        if (!checkToken()) props.auth()
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (cart.length > 0) {
            let status = "Failed";
            for (let i = 0; i < cart.length; i++) {
                status = await placeOneOrder.action(cart[i])
            }
            if (status == "Failed") window.alert(`no order placed!`)
            let user = localStorage.getItem('user')
            localStorage.clear()
            localStorage.setItem('user', user)
            itemLoader.loadHistory();
        }
        else window.alert('cart is empty!')
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

        fetch("https://e-commerce.urownsite.xyz/orders", requestOptions)
            .then(historyItems => historyItems.json())
            .then(historyItems => {
                console.log(historyItems);
                if (historyItems["status"] == "Success") {
                    historyItems = historyItems.data
                    historyItems = historyItems.map((item) => {
                        return {  ...item.product, ...item }
                    })
                    console.log(historyItems, 'opopop');
                    historyItems.push(cancellOrder)
                    setItems(historyItems);
                }
                else {
                    props.auth()
                }
            }).catch(error => console.log('error', error));
    }
        //setTimeout(()=>loadAllItems(), 1000)
        ;
    return (
        <div className="App">
            {/* <Header />
      <Login anchorButton="buy" action="log In" /> */}
            <Header 
            action={items.length > 0 ? items[items.length - 1] : addToCart}  
            itemLoader={itemLoader} auth={() => { props.auth() }} 
            items={items} 
            />
            <Body 
            items={items} itemLoader={itemLoader} 
            action={items.length > 0 ? items[items.length - 1] : addToCart} 
            action2={addToCart}
            auth={() => { props.auth() }} 
            />
            <Footer auth={() => { props.auth() }} />
        </div>
    );
}

function checkToken() {
    // console.log(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):false)
    return localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).authorization ? JSON.parse(localStorage.getItem('user')).authorization : false
}


export default App;
