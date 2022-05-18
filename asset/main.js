let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Grey Caliendi T-Shirt',
        tag: 'caliendi_tshirt',
        price: 15000,
        image: './asset/images/caliendi_tshirt.png',
        inCart: 0
    },
    {
        name: 'Rolex Wine',
        tag: 'rolexwine',
        price: 45000,
        image: './asset/images/rolexwine.png',
        inCart: 0
    },
    {
        name: 'Caliendi Black Pullover',
        tag: 'caliendi_black_pullover',
        price: 20000,
        image: './asset/images/caliendi_black_pullover.jpg',
        inCart: 0
    }
];
    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', ()=>{
            cartNumbers(products[i]);
            totalCost(products[i]);
        })
    }


function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if ( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
} 

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log("working")

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else {
        product.inCart = 1;
        cartItems = {
        [product.tag]: product
    }
        }
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        console.log(product.tag, 'is added to cart');
} 

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayShopItems() {
    let shopItemsContainer = document.querySelector(".shop-items-container");
    
    if (shopItemsContainer) {
        shopItemsContainer.innerHTML = '';
        Object.values(products).map(item => {
            shopItemsContainer.innerHTML += `
            <div class="shop-item">
            <img src="${item.image}" alt="${item.tag}">
            <h3>${item.name}</h3>
            <h3>${item.price} XOF</h3>
            <a class="add-cart itemCart">Add To Cart</a>
            <input type="hidden" value="${item.price}">
        </div>
            `
        });
        
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");


    if (cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <img src="${item.image}" alt="">
                <span>${item.name}</span>
            </div>
                <div class="price">${item.price} XOF</div>
                <div class="quantity">${item.inCart}</div>
                <div class="total">${item.inCart * item.price} XOF</div>
             
            `
            
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
            Basket Total
            </h4>
            <h4 class="basketTotal">
             ${cartCost} XOF
            </h4>
        </div>

        `;
    }
}

//displayShopItems();
onLoadCartNumbers();
displayCart();