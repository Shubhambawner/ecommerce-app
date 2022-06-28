import { handleError } from '../../App'

let placeOneOrder = async function (item) {
    let authToken = checkToken()
    if (!authToken) {
        window.alert('unauthorised! please login from the store first')
        window.location.href = '/';
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authToken);

    var raw = JSON.stringify({
        "productId":(item.productId)?item.productId:item.id //this is NOT id of the order item from order history, but one from get all products
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    console.log(item, raw, '55555555')

    fetch("https://e-commerce-backend-123.herokuapp.com/orders/place", requestOptions)
    .then(response =>{
        if (!response.ok) {
            console.log(response);
            throw new Error(`Error! status: ${response.status}`);
        }
        response.json()
    })
    .then(response => {
        return "Success"
    }).catch(error =>{ console.log('error', error);handleError(error)});
}

const placeOrders = async function () {
    let authToken = checkToken()
    if (!authToken) {
        window.alert('unauthorised! please login from the store first')
        window.location.href = '/';
    }    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart && cart.length > 0) {
        let status = "Failed";
        for (let i = 0; i < cart.length; i++) {
            status = await placeOneOrder(cart[i])
        }
        if (status == "Failed") window.alert(`no order placed!`)
        else{
            window.alert(`Order for all items in the cart placed successfully!`)
            localStorage.removeItem('cart')
        }
        
    }
    else window.alert('cart is empty! please add items to cart first')
}

function checkToken() {
    // console.log(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):false)
    return localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).authorization ? JSON.parse(localStorage.getItem('user')).authorization : false
}

export default placeOrders;