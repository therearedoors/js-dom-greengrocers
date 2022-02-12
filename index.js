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

function renderStore(){
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
  
  state.cart.push(item)
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
    const li = getCartListItem(state.cart[i])
    cart.appendChild(li)
  }
}

function getCartListItem(item){
  const li = document.createElement("li")
  li.append(getImage(item), getParagraph(item.name), getRemoveButton(), getSpan(),getAddButton())
  return li
}

function getParagraph(text){
  const p = document.createElement('p')
  p.innerText = text
  return p
}

function getRemoveButton(){
  const button = document.createElement('button')
  button.classList.add("quantity-btn","remove-btn","center")
  button.innerText = "-"
  return button
}

function getAddButton(){
  const button = document.createElement('button')
  button.classList.add("quantity-btn","add-btn","center")
  button.innerText = "+"
  return button
}

function getSpan(){
  const span = document.createElement('span')
  span.classList.add("quantity-text","center")
  span.innerText = 1
  return span
}

renderStore()