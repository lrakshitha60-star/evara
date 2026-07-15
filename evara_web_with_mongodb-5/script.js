const products = [
    {id:1, name: "Colorful Pattern Shirts", price: 238.85, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-1-2.jpg"},
    {id:2, name: "Picture Shirts", price: 588, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-2-2.jpg"},
    {id:3, name: "Shoes", price: 600.90, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-3-2.jpg"},
    {id:4, name: "Pant for women", price: 300, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-4-2.jpg"},
    {id:5, name: "Hats", price: 200, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-5-2.jpg"},
    {id:6, name: "Floral Shirt", price: 400, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-6-2.jpg"},
    {id:7, name: "Kalamkari top", price:  800, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-7-2.jpg"},
    {id:8, name: "Sweat shirt", price: 1200, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-8-2.jpg"},
    {id:9, name: "Beach Shirt", price: 500, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-9-2.jpg"},
    {id:10, name: "Sandals", price: 350, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-10-2.jpg"},
    {id:11, name: "Bag", price: 3000, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-11-2.jpg"},
    {id:12, name: "Casual Top", price: 250, category:"Cloting", img:"https://billalben.github.io/evara-ecommerce/assets/img/product-12-2.jpg"},
]

//Render Products

function renderProducts(products,productList){
    const container = document.getElementById(productList);
    container.innerHTML="";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML = `
        <img src="${product.img}"/>
        <p>${product.category}</p>
        <h3>${product.name}</h3>
        <h2>Rs. ${product.price}</h2>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        `
        container.appendChild(productDiv);
    })
}

//Searh Products
function searchProducts(query){
    const filteredProducts = products.filter(product => 
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    renderProducts(filteredProducts,"productList");
}
//Event listner to search button
 document.getElementById("searchButton")?.addEventListener("click",() => {
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
 })

 function sortProducts(criteria){
    if(criteria === "price"){
        return products.sort((a,b) => a.price-b.price);
    }                                                                        
    return products;
}

//Adding Event Listeners
document.getElementById("sortOptions")?.addEventListener("change" , (event) => {
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList");
})

//Add to Cart
function addToCart(productId){
    const product = products.find(p => p.id ==productId);
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${product.name} is added to the cart`);
    renderCart();

}

//Render products in cart page

function renderCart(){
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length === 0){
        container.innerHTML = "<h1>Your Cart is Empty</h1>"
    }
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML = `
        <img src = "${item.img}"/>
        <p>${item.category}</p>
        <h3>${item.name}</h3>
        <h2>Rs. ${item.price}</h2>
        <button onclick = "removeFromCart(${item.id})">Remove from cart</button>
        `;
        container.appendChild(cartDiv);
    })
    renderSubtotal(cart);
}
//Remove from cart

function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart = cart.filter(item => item.id !== productId); //removing the item from cart list
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`product removed Successfully`)
    renderCart();
}

//calculate the subtotal

function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total+item.price ,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    }
}
//Initialize pages
if (document.getElementById("productList")) renderProducts(products,"productList");
if(document.getElementById("cartItems")) renderCart();
