//setTimeOut()
//setTimeOut(code, delay) delay 동안 기다렸다가 code를 실행
// console.log(1)
// setTimeout(() => {
//   console.log(2)
// }, 2000)
// console.log(3)

//편의점에 들어가서 음료수를 사고 나오는 상황

function goMart() {
  console.log('마트에 가서 어떤 음료를 살지 고민한다')
}

function pickDrink(callback) {
  setTimeout(() => {
    console.log('고민끝')
    product = '제로콜라'
    price = 2000
    callback(product, price)
  }, 3000)
}

// function pay(product, price) {
//   console.log(`상품명: ${product}, 가격: ${price}`)
// }

let product
let price
goMart()
pickDrink((product, price) => {
  console.log(`상품명: ${product}, 가격: ${price}`)
})
// pay(product, price)

// function mainFunc(par1, par2, callback) {
//   console.log(par1, par2)
//   callback()
// }

// function callbackFunc(par) {
//   console.log('콜백함수임')
// }

// mainFunc(1, 2, callbackFunc)
