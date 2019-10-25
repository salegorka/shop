//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150'
const cartImage = 'https://placehold.it/100x80'

const ITEMS = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad']
const PRICES = [1000, 200, 20, 10, 25, 30, 18, 24]
const IDS = [1, 2, 3, 4, 5, 6, 7, 8]

let productsDTO = createDTO () //зоздание товаров функцией
let userCart = []
//renderCatalog () //рендер товаров функцией

let btnCart = document.querySelector ('.btn-cart')
btnCart.addEventListener ('click', showCart)

function showCart () {
    document.querySelector ('.cart-block').classList.toggle ('invisible')
}

function addProduct (prod) {
    //console.log ('buy' + prod.dataset['name'])
    let find = userCart.find (el => {
        return el.id === +prod.dataset ['id']
    })
    if (find) {
        find.quantity ++
    } else {
        userCart.push ({
            name: prod.dataset ['name'],
            price: +prod.dataset ['price'],
            id: +prod.dataset ['id'],
            quantity: 1
        })
    }
    renderCart ()
}

function removeProduct (prod) {
    let find = userCart.find (el => {
        return el.id === +prod.dataset ['id']
    })
    if (find.quantity > 1) {
        find.quantity --
    } else {
        userCart.splice (userCart.indexOf (find), 1)
    }
    renderCart ()
}

function renderCart () {
    let htmlStr = ''
    userCart.forEach (el => {
        htmlStr += `
                    <div class="cart-item">
                        <div class="product-bio">
                            <img src="${cartImage}" alt="">
                            <div class="product-desc">
                                <p class="product-title">${el.name}</p>
                                <p class="product-quantity">${el.quantity}</p>
                                <p class="product-single-price">${el.price} $</p>
                            </div>
                        </div>
                        <div class="right-block">
                            <p class="product-price">${el.quantity * el.price} $</p>
                            <button class="del-btn" data-id="${el.id}">&times;</button>
                        </div>
                    </div>
                `
    })
    document.querySelector ('.cart-block').innerHTML = htmlStr
}

function createDTO () {
    let arr = []
    
    for (let i = 0; i < ITEMS.length; i++) {
        arr.push (createProduct (ITEMS[i], PRICES[i], IDS[i]))
    }
    return arr
}

function createProduct (name, price, id) {
    return {
        name: name,
        id: id,
        price: price,
        img: image,
        createTemplate: function () {
            return `
                <div class="product-item">
                    <img src="${this.img}" alt="">
                    <div class="desc">
                        <h3>${this.name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn"
                        data-id="${this.id}"
                        data-name="${this.name}"
                        data-price="${this.price}"
                        >Купить</button>
                    </div>
                </div>
            `
        }
    }
}

function renderCatalog () {
    let htmlStr = ''

    productsDTO.forEach (el => {
        htmlStr += el.createTemplate ()
    })
    document.querySelector ('.products').innerHTML = htmlStr
}

function sum () {
    let sum = 0
    productsDTO.forEach (el => {
        sum += el.price
    })
    console.log (sum)
    return sum
}

//ООП
let store = {
    catalog: [],
    cart: [],
    sum: 0,
    _init: function () {
        this.createDTO ()
        this.renderCatalog ()
    },
    createDTO: function () {
        for (let i = 0; i < ITEMS.length; i++) {
            this.catalog.push (this._createProduct (ITEMS[i], PRICES[i], IDS[i]))
        }
    },
    _createProduct: function (name, price, id) {
        return {
            name: name,
            id: id,
            price: price,
            img: image,
            createTemplate: function () {
                return `
                <div class="product-item">
                    <img src="${this.img}" alt="">
                    <div class="desc">
                        <h3>${this.name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn"
                        data-id="${this.id}"
                        data-name="${this.name}"
                        data-price="${this.price}"
                        >Купить</button>
                    </div>
                </div>
                `
            }
        }
    },
    calcSum: function () {
        for (let el of this.catalog) {
            this.sum += el.price
        }
    },
    renderCatalog: function () {
        let htmlStr = ''
    
        this.catalog.forEach (el => {
            htmlStr += el.createTemplate ()
        })
        document.querySelector ('.products').innerHTML = htmlStr
    }
}


store._init () //создание товаров + рендер из объекта

document.querySelector ('.products').addEventListener ('click', function (evt) {
    if (evt.target.classList.contains ('buy-btn')) {
        addProduct (evt.target)
    }
})

document.querySelector ('.cart-block').addEventListener ('click', function (evt) {
    if (evt.target.classList.contains ('del-btn')) {
        removeProduct (evt.target)
    }
})