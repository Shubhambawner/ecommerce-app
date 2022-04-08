# Routes:
'/'  --> <Auth>
'/placeorder' --> <Checkout>

# element Hirarky:
<Auth> -> <App> ->  <DashboardHeader> -> <Body> -> <Card>
                                      -> <AutocompleteSearch>
                ->  <Footer>
       -> <LoginSide>

<Checkout> -> <AddressForm>
           -> <PaymentForm>
           -> <Review> <- placeOrder.js



# Functions: Auth Hirarky
1. Auth:
    - switch Theme
    - login/signUp
2. App:
    - addToCart
    - removeFromCart
    - cancellOrder
    [functions to load items in Body]
    - loadAllItems(in store)
    - loadCart(load items of cart)
    - loadHistory
    - loadCustomItems(itemArray)
3. DashboardHeader
    - LogOut

# Functions: Checkout Hirarky
1. Checkout:
    - handleNext
    - handleBack
    - setActiveStep
    - getStepContent
2. placeOrder:
    - checkToken
    - placeOrders
    - placeOneOrder

