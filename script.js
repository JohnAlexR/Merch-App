import { inventory, sold } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const inventoryFeed = document.getElementById('inventory-feed')
const cart = []


document.addEventListener('submit',(e) => {

    e.preventDefault()

    let itemInput = document.getElementById('item-input')
    let colorInput = document.getElementById('color-input')
    let sizeInput = document.getElementById('size-input')
    let qtyInput = document.getElementById('qty-input')
    let priceInput = document.getElementById('price-input')

    pushInputsToInventory(itemInput.value,colorInput.value,sizeInput.value,qtyInput.value,priceInput.value)

    itemInput.value = ''
    colorInput.value = ''
    sizeInput.value = ''
    qtyInput.value = ''
    priceInput.value = ''

    toggleInventoryForm()

})

function pushInputsToInventory(itemInput,colorInput,sizeInput,qtyInput,priceInput) {

    const existingItem = inventory.filter((product)=>{

        if(product.item === itemInput && product.color === colorInput && product.size === sizeInput) {
            return true
        }

    })


    if(existingItem.length > 0) {

        existingItem[0].qty += parseInt(qtyInput)

        renderInventory()

    } else {

    let newObj = {

        item: itemInput.toLowerCase(),
        color: colorInput.toLowerCase(),
        size: sizeInput.toUpperCase(),
        qty: qtyInput,
        qtyInCart: 0,
        price: parseInt(priceInput),
        uuid: uuidv4(),
        discount: 0,
        img: '/Images/black-demo-shirt.png'
    }

    inventory.push(newObj)

    renderInventory()
}

}

// event listener for all button clicks

document.addEventListener('click', (e)=> {


        if(e.target.id === 'add-inventory-btn') {
            toggleInventoryForm()
        } else if(e.target.id === 'exit-form-btn') {
            toggleInventoryForm()
        } else if(e.target.dataset.inventory) {
            addInventoryToCart(e.target.dataset.inventory)
        } else if (e.target.id === 'confirm-order-btn') {
            finalizeOrder()
        } else if (e.target.dataset.cart) {
            removeFromCart(e.target.dataset.cart)
        } else if (e.target.id === 'hamburger-menu') {
            toggleDataPage()
        } else if (e.target.id === 'close-data') {
            toggleDataPage()
        }
})

function toggleInventoryForm() {
    document.getElementById('form-container').classList.toggle('show')

}

function toggleDataPage() {
    console.log('clicked')
    document.getElementById('data-container').classList.toggle('show')
    renderData()
}

function renderData() {

    let totalProductsSold = 0
    let totalRevenueGenerated = 0

    sold.forEach((product)=> {

        totalProductsSold += product.qty
        totalRevenueGenerated += parseInt(product.price)*parseInt(product.qty)

    })

    document.getElementById('products-sold').innerText = `Total Products Sold: ${totalProductsSold}`
    document.getElementById('revenue-generated').innerText = `Total Revenue Generated: $${totalRevenueGenerated}`
}

function removeFromCart(cartId) {

    const targetCartObj = cart.filter((product) => {

        return product.uuid === cartId

    })[0]


    const targetInventoryObj = inventory.filter((product) => {

        return product.uuid === cartId

    })[0]

    if(targetCartObj.qtyInCart > 1) {
        targetInventoryObj.qtyInCart --
    } else {

        targetInventoryObj.qtyInCart --
        const index = cart.indexOf(targetCartObj)

    if(index > -1) {
        cart.splice(index, 1)
    }}

    renderCart()

}


function addInventoryToCart(inventoryId) {


    const targetInventory = inventory.filter((product) => {
        return product.uuid === inventoryId
    })[0]


    if(targetInventory.qtyInCart < targetInventory.qty){

        cart.push(targetInventory)

        targetInventory.qtyInCart++

        renderCart(targetInventory.qtyInCart)

    }

}


function renderCart(qtyInCart) {

    console.log(qtyInCart)

    const cartEl = document.getElementById('cart')

    if(qtyInCart > 1) {
        cart.pop()
    }

    let innerCartHtml = ''
    let sum = 0

    cart.forEach((product) => {

        
        innerCartHtml += `
                <div class='cart-product' id="cart-product" data-cart="${product.uuid}">
                    <div class='cart-product-size' data-cart="${product.uuid}">
                        <li data-cart="${product.uuid}">${product.size} -</li>
                    </div>
                    <div class='cart-product-info' data-cart="${product.uuid}">
                        <li data-cart="${product.uuid}">${product.color} ${product.item}</li>
                    </div>
                    <div class='cart-product-price' data-cart="${product.uuid}">
                        <li data-cart="${product.uuid}">- $${product.price}</li>
                    </div>
                    <div data-cart="${product.uuid}">
                        <li data-cart="${product.uuid}">x${product.qtyInCart}</li>
                    </div>
                </div>`

        sum += product.price*product.qtyInCart
            
            })


    cartEl.innerHTML = innerCartHtml

    document.getElementById('sum').innerText = `Total: $${sum}`

    console.log(cart)

}


function finalizeOrder() {

    cart.forEach((product) => {

        const date = new Date()
        product.timeStamp = date.toLocaleDateString()
        product.qty = product.qtyInCart + 1
        product.qtyInCart = 'n/a'

        sold.push(product)

        const inventoryItemToUpdate = inventory.filter((inventoryItem)=> {

            return inventoryItem.uuid === product.uuid

        })[0]

        inventoryItemToUpdate.qty --
        inventoryItemToUpdate.qtyInCart = 0

    })

    console.log(sold)

    clearCart()

    renderInventory()

}

function clearCart() {

    cart.length = 0
    renderCart()


}


function renderInventory() {

    let innerHtml = ''

    inventory.forEach((product) => {

        innerHtml += `
        
                <div class='inventory' data-inventory="${product.uuid}" 
                style='background-image: url(${product.img}); background-size: cover'>
                    <div class='inventory-item' data-inventory="${product.uuid}">
                        <p class='inventory-size' data-inventory="${product.uuid}">${product.size}</p>
                    </div>
                    <div class='inventory-price' data-inventory="${product.uuid}">
                        <p data-inventory="${product.uuid}">$${product.price}</p>
                    </div>
                    <div class='inventory-qty' data-inventory="${product.uuid}">
                        <p data-inventory="${product.uuid}">qty: ${product.qty}</p>
                    </div>
                </div>
             `
    })

    inventoryFeed.innerHTML = innerHtml

}

renderInventory()