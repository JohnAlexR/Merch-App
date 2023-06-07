import { inventory } from '/data.js'

const inventoryFeed = document.getElementById('inventory-feed')


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