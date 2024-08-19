
let listProductHTMLFood = document.querySelector("#food-container");
let listProductHTMLDrink = document.querySelector("#drink-container");
let listCartHTML = document.querySelector('.listCart');
// let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
// let body = document.querySelector('body');
let closeCart = document.querySelector('.cancle');
let products = [];
let cart = [];
function addProductTolist(products){
    for (i=0;products.length>i;i++){
        let newProduct = document.createElement('div');
                newProduct.dataset.id = products[i].id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${products[i].image}" alt="">
                <h2>${products[i].name}</h2>
                <div class="price">$${products[i].price}</div>
                <button class="addCart">Add To Cart</button>`;
            if (products[i].type == "food"){
                listProductHTMLFood.appendChild(newProduct);}

            
            else if (products[i].type == "drink"){
                listProductHTMLDrink.appendChild(newProduct);}

            };
    };
function addToCart(id){
    let positionOfProduct= cart.findIndex((value)=>{return value.product_id==String(id)});
    if (positionOfProduct !=-1 ){
        cart[positionOfProduct].quantity++; }
    else {
        cart.push({product_id:id,
            quantity:1
        })
    }
addToCartHTML()

}

function addToCartHTML(){
    let totalQuantity = 0;
    let subTotal=0;
    listCartHTML.innerHTML = '';
    for (i=0; i<cart.length; i++){
        totalQuantity = totalQuantity +  cart[i].quantity;
        
        let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = cart[i].product_id;

            let positionProduct = products.findIndex((value) => value.id == cart[i].product_id);
            let info = products[positionProduct];
            subTotal=subTotal+Number(cart[i].quantity)*Number(info.price);
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img style="" src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                
                <div class="totalPrice">$${info.price * cart[i].quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart[i].quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
    
    }
    
    document.getElementById("tax").innerHTML= `<h1>Subtotal :<span  class="left-number"> $${subTotal.toFixed(2)}</span></h1>
    <h1>Tax(2%) : <span class="left-number"> $${(subTotal*0.02).toFixed(2)}</span></h1>
    <h1>Discount(5%) : <span class="left-number"> $${(subTotal*0.05).toFixed(2)}</span></h1>
    <h1>Payable Amount :<span class="left-number"> $${((subTotal*0.05)+(subTotal*0.02)+subTotal).toFixed(2)}</span></h1>`
    document.getElementById("pay-btn").innerHTML = `Pay $${((subTotal*0.05)+(subTotal*0.02)+subTotal).toFixed(2)}`
    iconCartSpan.innerText = totalQuantity;
};
function calculateCartChange(id,calculation){
    let positionProduct = cart.findIndex((value) => value.product_id == id);

    if (calculation=="minus"){
        if(cart[positionProduct].quantity>1){
        cart[positionProduct].quantity=cart[positionProduct].quantity-1

    }
        else{
            cart.splice(positionProduct,1)
        };

}
else{

        cart[positionProduct].quantity=cart[positionProduct].quantity+1
   

}
addToCartHTML()
};

document.querySelector(".cancle").addEventListener('click', (event) => {
    cart=[]
    addToCartHTML()
    });
 document.querySelector(".checkOut").addEventListener('click', (event) => {
       document.querySelector(".box2").style.display="block"
        });

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus')){
        let id_product = positionClick.parentElement.parentElement.dataset.id;
        calculateCartChange(id_product,"minus");
    }
    else if(positionClick.classList.contains('plus')){
        let id_product = positionClick.parentElement.parentElement.dataset.id;

        calculateCartChange(id_product,"plus");
    }
})

    listProductHTMLFood.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
    listProductHTMLDrink.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    });
    document.querySelector(".cancel-btn").addEventListener('click', (event) => {
        document.querySelector(".box2").style.display="none"
         });
         document.querySelector("#pay-btn").addEventListener('click', (event) => {
            document.querySelector(".box2").style.display="none"
            alert("Payement was Successfull! Your order is on the way!")
             });
function searchDictionary() {
            const searchInput = document.getElementById('searchBar').value.toLowerCase();
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = ''; // Clear previous results

            // If the search input is empty, hide the results div
            if (searchInput === '') {
                searchResults.style.display = 'none';
                return;
            }

            // Loop through the dictionary and find matches
            for (const [key, value] of Object.entries(dictionary)) {
                if (key.toLowerCase().includes(searchInput) || value.toLowerCase().includes(searchInput)) {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    resultItem.innerHTML = `<strong>${key}</strong>: ${value}`;
                    searchResults.appendChild(resultItem);
                }
            }

            // Show the results div if any results are found
            searchResults.style.display = searchResults.innerHTML === '' ? 'none' : 'block';
        }

//search
function searchDictionary() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous results

    // If the search input is empty, hide the results div
    if (searchInput === '') {
        searchResults.style.display = 'none';
        return;
    }

    // Loop through the dictionary and find matches
    for (const [key, value] of Object.entries(products)) {
        if (key.toLowerCase().includes(searchInput) || value.toLowerCase().includes(searchInput)) {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `<strong>${key}</strong>: ${value}`;
            searchResults.appendChild(resultItem);
        }
    }

    // Show the results div if any results are found
    searchResults.style.display = searchResults.innerHTML === '' ? 'none' : 'block';
}
//Search
products = [
    {
        "id": 1,
        "name":" Eftah Hager",
        "price": 350,
        "image": "food/food1.jpg",
        "type":"food"
    },
    {
        "id": 2,
        "name":" Jambo Burger",
        "price": 360,
        "image": "food/food2.jpg",
        "type":"food"
    },
    {
        "id": 3,
        "name":"Chicken",
        "price": 690,
        "image": "food/food14.jpg",
        "type":"food"
    },
    {
        "id": 4,
        "name":" Chicken Noodle",
        "price": 480,
        "image": "food/food4.jpg",
        "type":"food"
    },
    {
        "id": 5,
        "name":" Double Burger",
        "price": 350,
        "image": "food/food13.jpg",
        "type":"food"
    },
    {
        "id": 6,
        "name":" Beyaynet",
        "price": 200,
        "image": "food/food6.jpg",
        "type":"food"
    },
    {
        "id": 7,
        "name":" Combo",
        "price": 1000,
        "image": "food/food7.jpg",
        "type":"food"
    },
    {
        "id": 8,
        "name":"Markonal Pizzaa",
        "price": 400,
        "image": "food/food20.jpg",
        "type":"food"
    },
    {
        "id": 9,
        "name":" Prime Double Burger",
        "price": 350,
        "image": "food/food9.jpg",
        "type":"food"
    },
    {
        "id": 10,
        "name":" Lale Special Fasting",
        "price": 550,
        "image": "food/food10.jpg",
        "type":"food"
    },
    {
        "id": 11,
        "name":" Full Chicken",
        "price": 750,
        "image": "food/food18.jpg",
        "type":"food"
    },
    {
        "id": 12,
        "name":" Koroso",
        "price": 450,
        "image": "food/food12.jpg",
        "type":"food"
    },
    {
        "id": 13,
        "name":" Special Juice",
        "price": 80,
        "image": "drink/drink2.jpg",
        "type":"drink"
    },
    {
        "id": 14,
        "name":" Chocolate Milkshake",
        "price": 70,
        "image": "drink/drink7.jpg",
        "type":"drink"
    },
    {
        "id": 15,
        "name":" Strawberry Mojito",
        "price": 100,
        "image": "drink/drink13.jpg",
        "type":"drink"
    },
    {
        "id": 16,
        "name":" Iceberg",
        "price": 300,
        "image": "drink/drink12.jpg",
        "type":"drink"
    },
    {
        "id": 17,
        "name":" Strawberry Milk",
        "price": 70,
        "image": "drink/drink5.jpg",
        "type":"drink"
    },
    {
        "id": 18,
        "name":" Orao",
        "price": 150,
        "image": "drink/drink14.jpg",
        "type":"drink"
    },
    {
        "id": 19,
        "name":" Smoki Blue",
        "price": 150,
        "image": "drink/drink10.jpg",
        "type":"drink"
    },
    {
        "id": 20,
        "name":" Mango Shake",
        "price": 110,
        "image": "drink/drink9.jpg",
        "type":"drink"
    },
    {
        "id": 21,
        "name":" Strawberry Mojito",
        "price": 150,
        "image": "drink/drink11.jpg",
        "type":"drink"
    },
    {
        "id": 22,
        "name":" Orange Juice",
        "price": 100,
        "image": "drink/drink6.jpg",
        "type":"drink"
    },
    {
        "id": 22,
        "name":" Hamak's Oreo",
        "price": 150,
        "image": "drink/drink1.jpg",
        "type":"drink"
    },
    {
        "id": 23,
        "name":"Chocolate",
        "price": 180,
        "image": "drink/drink4.jpg",
        "type":"drink"
    },
  


];
addProductTolist(products)
