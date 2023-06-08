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

    let newObj = {

        item: itemInput,
        color: colorInput,
        size: sizeInput,
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
        }
})

function toggleInventoryForm() {
    document.getElementById('form-container').classList.toggle('showForm')

}

function removeFromCart(cartId) {

    const targetCartObj = cart.filter((product) => {

        return product.uuid === cartId

    })[0]


    const targetInventoryObj = inventory.filter((product) => {

        return product.uuid === cartId

    })[0]

    targetInventoryObj.qtyInCart --

    const index = cart.indexOf(targetCartObj)

    if(index > -1) {
        cart.splice(index, 1)
    }

    renderCart()

}


function addInventoryToCart(inventoryId) {

    const targetInventory = inventory.filter((product) => {
        return product.uuid === inventoryId
    })[0]


    if(targetInventory.qtyInCart < targetInventory.qty){

        console.log(targetInventory)

        cart.push(targetInventory)

        targetInventory.qtyInCart++

        renderCart()

    }

}


function renderCart() {

    const cartEl = document.getElementById('cart')

    let innerCartHtml = ''
    let sum = 0

    cart.forEach((product) => {
        innerCartHtml += `
                <div class='cart-product' id="cart-product" data-cart="${product.uuid}">
                    <div class='cart-product-size'>
                        <li>${product.size}</li>
                    </div>
                    <div class='cart-product-info'>
                        <li>${product.color} ${product.item}</li>
                    </div>
                    <div class='cart-product-price'>
                        <li>$${product.price}</li>
                    </div>
                </div>`

        sum += product.price
            
            })


    cartEl.innerHTML = innerCartHtml

    document.getElementById('sum').innerText = `Total: $${sum}`

}


function finalizeOrder() {

    cart.forEach((product) => {

        sold.push(product)

        const inventoryItemToUpdate = inventory.filter((inventoryItem)=> {

            return inventoryItem.uuid === product.uuid

        })[0]

        inventoryItemToUpdate.qty --
        inventoryItemToUpdate.qtyInCart = 0

    })

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
        
                <div class='inventory' data-inventory="${product.uuid}">
                    <div class='inventory-item'>
                        <p>${product.item}</p>
                    </div>
                    <div class='inventory-price'>
                        <p>$${product.price}</p>
                    </div>
                    <div class='inventory-qty'>
                        <p>qty: ${product.qty}</p>
                    </div>
                </div>
             `
    })

    inventoryFeed.innerHTML = innerHtml

}

renderInventory()