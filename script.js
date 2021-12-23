const currencyEL_one = document.getElementById('CurrencyOne')
const currencyEL_two = document.getElementById('CurrencyTwo')
const fromAmount = document.getElementById('amount-one')
const toAmount = document.getElementById('convertedAmount')

const rateEl = document.getElementById('rate')
const swapEl = document.getElementById('swap')

// fetch currency rates and update DOM

function calculate(){
    const currencyOne = currencyEL_one.value
    const currencyTwo = currencyEL_two.value
    const url = `https://v6.exchangerate-api.com/v6/acf79e51c419b061cd87d907/latest/${currencyOne}`
    fetch(url)
    .then(res => res.json())
    .then((data) => {
    // console.log(data)
    const rate = data.conversion_rates[currencyTwo]
    rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`

    const conv = (fromAmount.value * rate).toFixed(0)
    const loc = conv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // console.log(loc)
    toAmount.innerText = currencyTwo +' ' + loc
})
}


currencyEL_one.addEventListener('change', calculate)
currencyEL_two.addEventListener('change', calculate)
fromAmount.addEventListener('input', calculate)
toAmount.addEventListener('input', calculate);
swapEl.addEventListener('click', ()=>{
    const temp = currencyEL_one.value
    currencyEL_one.value = currencyEL_two.value
    currencyEL_two.value = temp
    calculate()
})


calculate()