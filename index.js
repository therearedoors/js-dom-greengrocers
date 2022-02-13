const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

const store = document.querySelector(".store--item-list")
const cart = document.querySelector(".cart--item-list")
const total = document.querySelector(".total-number")
const sorter = document.querySelector("#sorter")
sorter.addEventListener("click", renderSorting)

function renderSorting(){
  if (sorter.innerText == "SORT A-Z")
  {
  state.items.sort((a,b)=> alphabeticly(a,b))
  sorter.innerText = "SORT Z-A"
  }
  else if (sorter.innerText == "SORT Z-A"){
    state.items.reverse()
    sorter.innerText = "SORT A-Z"
  }
  renderStore()
}

function alphabeticly(a,b){
  if (a.name < b.name) return -1
  if (a.name == b.name) return 0
  if (a.name > b.name) return 1
}

function renderStore(){
  store.innerHTML = ""
  for(let i=0;i<state.items.length;i++){
    store.append(getStoreListItem(state.items[i]))
  }
}

function getStoreListItem(item){
  const li = document.createElement("li")
  const div = getDiv()
  div.append(getImage(item))
  li.append(div)
  li.append(getStoreButton(item))
  return li
}

function getDiv(){
  const div = document.createElement("div")
  div.className = "store--item-icon"
  return div
}

function addToCart(item){
  const cartItem = state.cart.find(e => e.name == item.name)
  if (cartItem) cartItem.quantity++
  else {
    item.quantity = 1
    state.cart.push(item)
  }
  renderCart()
}

function getStoreButton(item){
  const button = document.createElement("button")
  button.innerText = "Add to cart"
  button.addEventListener("click", function() {addToCart(item)})
  return button
}

function getImage(item){
  const img = document.createElement('img')
  img.setAttribute('src', `assets/icons/${item.id}.svg`)
  img.setAttribute('alt', item.name)
  return img
}

function renderCart() {
  cart.innerHTML = ""
  for(let i=0;i<state.cart.length;i++){
    refreshCart()
    const li = getCartListItem(state.cart[i])
    cart.appendChild(li)
    updateTotal()
  }
}

function updateTotal() {
  total.innerText = '£' + calcTotal().toFixed(2)
}

function calcTotal(){
 return state.cart.reduce((a,b)=> {
   return (a+(b.price*b.quantity))
  }, 0.00)
}

function refreshCart(){
  state.cart = state.cart.filter(e => e.quantity > 0)
}

function getCartListItem(item){
  const li = document.createElement("li")
  li.append(getImage(item), getParagraph(item.name), getRemoveButton(item), getSpan(item.quantity),getAddButton(item))
  return li
}

function getParagraph(text){
  const p = document.createElement('p')
  p.innerText = text
  return p
}

function getRemoveButton(item){
  const button = document.createElement('button')
  button.classList.add("quantity-btn","remove-btn","center")
  button.innerText = "-"
  button.addEventListener('click', function(){decreaseQuantityofCart(item)})
  return button
}

function decreaseQuantityofCart(item){
  item.quantity--
  renderCart()
}

function getAddButton(item){
  const button = document.createElement('button')
  button.classList.add("quantity-btn","add-btn","center")
  button.innerText = "+"
  button.addEventListener("click", function(){increaseQuantityOfCart(item)})
  return button
}

function increaseQuantityOfCart(item){
  item.quantity++
  renderCart()
}

function getSpan(quantity){
  const span = document.createElement('span')
  span.classList.add("quantity-text","center")
  span.innerText = quantity
  return span
}

renderStore()