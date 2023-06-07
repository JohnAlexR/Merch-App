import { inventory } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const inventoryFeed = document.getElementById('inventory-feed')


document.addEventListener('submit',(e) => {

    e.preventDefault()

    let itemInput = document.getElementById('item-input')
    let colorInput = document.getElementById('color-input')
    let sizeInput = document.getElementById('size-input')
    let qtyInput = document.getElementById('qty-input')

    pushInputsToInventory(itemInput.value,colorInput.value,sizeInput.value,qtyInput.value)

    itemInput.value = ''
    colorInput.value = ''
    sizeInput.value = ''
    qtyInput.value = ''

    toggleInventoryForm()

})

function pushInputsToInventory(itemInput,colorInput,sizeInput,qtyInput) {

    //formula to determine price/discount , to replace hardcoded '15' with variable


    let newObj = {

        item: itemInput,
        color: colorInput,
        size: sizeInput,
        qty: qtyInput,
        price: 15,
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
        }

})

function toggleInventoryForm() {
    console.log('clicked')
    document.getElementById('form-container').classList.toggle('showForm')

}


function renderInventory() {

    let innerHtml = ''

    inventory.forEach((product) => {

        innerHtml += `
        
                <div class='inventory'>
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