let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let listBasket = JSON.parse(localStorage.getItem("listData")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x; // destructing
      let search = basket.find((x) => x.id === id) || [];
      return `        
        <div id=product-id-${id} class="item">
            <img width="227" src="${img}" alt="">
            <div class="details">
                <div class="details-title">
                  <h3>${name}</h3>
                  <i onclick="addList(${id})" class="bi bi-heart"></i>
                </div>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2 class="pro-price">$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>`;
    })
    .join(""));
};
generateShop();

// increment********************
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

// decrement ******************
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined || search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0); // this function removes the item which has 0 value init.
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket
    .map((x) => x.item)
    .reduce((acc, item) => acc + item, 0);
};
calculation();

let addList = (id) => {
  let selectedId = id;
  let search = listBasket.find((x) => x.id === selectedId.id);

  if (search === undefined) {
    listBasket.push({
      id: selectedId.id,
      item: 1,
    });
  } else {
    listBasket.pop({
      id: selectedId.id,
      item: "",
    });
  }
  console.log(listBasket);
  listCalculation();
  localStorage.setItem("listData", JSON.stringify(listBasket));
};

let listCalculation = () => {
  let listIcon = document.getElementById("wishlist-Amount");
  listIcon.innerHTML = listBasket
    .map((x) => x.item)
    .reduce((acc, item) => acc + item, 0);
};

listCalculation();
