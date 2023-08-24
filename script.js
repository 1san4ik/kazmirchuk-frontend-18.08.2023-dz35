import {
  listCategory,
  allCategory,
  listCityDelivery,
  selectPayment,
} from './product.js'

const navLinks = document.querySelectorAll('.nav-link')
const colCenter = document.querySelector('.colCenter')
const colRight = document.querySelector('.colRight')

navLinks.forEach((link, index) => {
  link.textContent = listCategory[index]

  allCategory[index].forEach((link) => {
    shortProduct(link)
  })

  link.addEventListener('click', (event) => {
    event.preventDefault()

    navLinks.forEach((link) => {
      link.classList.remove('active')
    })
    link.classList.add('active')

    while (colCenter.firstChild) {
      colCenter.removeChild(colCenter.firstChild)
    }
    allCategory[index].forEach((link) => {
      shortProduct(link)
    })
    addBorderClickListeners()
  })
})

addBorderClickListeners()

function shortProduct(link) {
  const borderDiv = document.createElement('div')
  borderDiv.classList.add('border')
  borderDiv.setAttribute('data-imgsrc', link.img)
  borderDiv.setAttribute('data-name', link.name)
  borderDiv.setAttribute('data-description', link.description)
  borderDiv.setAttribute('data-price', link.price)
  colCenter.appendChild(borderDiv)

  const wrapDiv = document.createElement('div')
  wrapDiv.classList.add('wrap')
  borderDiv.appendChild(wrapDiv)

  const productWrapDiv = document.createElement('div')
  productWrapDiv.classList.add('product-wrap')
  wrapDiv.appendChild(productWrapDiv)

  const aImg = document.createElement('a')
  aImg.href = link.img
  const imgElement = document.createElement('img')

  imgElement.src = link.img
  aImg.appendChild(imgElement)
  productWrapDiv.appendChild(aImg)

  const productInfoDiv = document.createElement('div')
  productInfoDiv.classList.add('product-info')
  borderDiv.appendChild(productInfoDiv)

  const productTitleH3 = document.createElement('h3')
  productTitleH3.classList.add('product-title')
  productTitleH3.innerText = link.name
  productInfoDiv.appendChild(productTitleH3)

  const priceDiv = document.createElement('div')
  priceDiv.classList.add('price')
  productInfoDiv.appendChild(priceDiv)
  priceDiv.innerHTML = `Ціна: ${link.price} &#8372;`
}

function addBorderClickListeners() {
  const borderProduct = document.querySelectorAll('.border')
  borderProduct.forEach((link) => {
    link.addEventListener('click', (event) => {
      colRight.style.display = 'block'
      const imgSrc = link.getAttribute('data-imgsrc')
      const productName = link.getAttribute('data-name')
      const productDescription = link.getAttribute('data-description')
      const productPrice = link.getAttribute('data-price')

      detailedProduct(imgSrc, productName, productDescription, productPrice)
    })
  })
}

function detailedProduct(
  imgSrc,
  productName,
  productDescription,
  productPrice
) {
  colRight.innerText = ''

  const productContent = document.createElement('div')
  productContent.classList.add('productContent')
  colRight.appendChild(productContent)

  const imgGallery = document.createElement('div')
  imgGallery.classList.add('imgGallery')
  productContent.appendChild(imgGallery)

  const imgProduct = document.createElement('img')
  imgGallery.appendChild(imgProduct)
  imgProduct.src = imgSrc

  const productInfo = document.createElement('div')
  productInfo.classList.add('productInfo')
  productContent.appendChild(productInfo)

  const nameProduct = document.createElement('div')
  nameProduct.classList.add('nameProduct')
  nameProduct.innerText = productName
  productInfo.appendChild(nameProduct)

  const descriptionProduct = document.createElement('div')
  descriptionProduct.classList.add('descriptionProduct')
  descriptionProduct.innerText = productDescription
  productInfo.appendChild(descriptionProduct)

  const price = document.createElement('div')
  price.classList.add('product-price')
  productInfo.appendChild(price)
  price.innerHTML = `Ціна: ${productPrice} &#8372;`

  const buttonBuy = document.createElement('button')
  buttonBuy.classList.add('buy-button')
  buttonBuy.type = 'button'
  buttonBuy.innerText = 'Купити'
  productInfo.appendChild(buttonBuy)

  buttonBuy.addEventListener('click', () => {
    createFormBuy()
    colRight.style.display = 'none'
  })
  colRight.appendChild(productContent)
  addBorderClickListeners()
}

function resetCategorySelection() {
  navLinks.forEach((link) => {
    link.classList.remove('active')
  })

  while (colCenter.firstChild) {
    colCenter.removeChild(colCenter.firstChild)
  }

  allCategory.forEach((category) => {
    category.forEach((link) => {
      shortProduct(link)
    })
  })

  addBorderClickListeners()
}

function createFormBuy() {
  const backgroundModal = document.createElement('div')
  backgroundModal.classList.add('backgroundModal')
  colCenter.appendChild(backgroundModal)

  const modalWindow = document.createElement('div')
  modalWindow.classList.add('modal')
  colCenter.appendChild(modalWindow)

  const modalDiv = document.createElement('div')
  modalDiv.classList.add('modalDiv')
  modalDiv.innerText = 'Для оформлення замовлення, заповніть наступні поля:'
  modalWindow.appendChild(modalDiv)
  // ==============================================================
  const labelinputFio = document.createElement('label')
  labelinputFio.innerText = '* Введіть ФІО: '
  modalWindow.appendChild(labelinputFio)

  const inputFio = document.createElement('input')
  inputFio.classList.add('inputFio')
  inputFio.type = 'text'
  inputFio.placeholder = "Прізвище, ім’я, по батькові (обов'язково*)"
  labelinputFio.appendChild(inputFio)
  // ==============================================================
  const labelTelephone = document.createElement('label')
  labelTelephone.innerText = '* Введіть телефон: '
  modalWindow.appendChild(labelTelephone)

  const inputTelephone = document.createElement('input')
  inputTelephone.classList.add('inputTelephone')
  inputTelephone.type = 'tel'
  inputTelephone.placeholder = "Введіть телефон (обов'язково*)"
  inputTelephone.pattern = '[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}'
  labelTelephone.appendChild(inputTelephone)
  // ==============================================================
  const labelinputCity = document.createElement('label')
  labelinputCity.innerText = 'Виберіть місто: '
  const selectCity = document.createElement('select')
  selectCity.classList.add('selectCityId')

  listCityDelivery.forEach((elem) => {
    const option = document.createElement('option')
    option.innerText = elem
    option.value = elem
    selectCity.appendChild(option)
  })

  labelinputCity.appendChild(selectCity)
  modalWindow.appendChild(labelinputCity)
  // ==============================================================
  const labelSklad = document.createElement('label')
  labelSklad.innerText = 'Склад Нової пошти для надсилання: '
  modalWindow.appendChild(labelSklad)

  const inputSklad = document.createElement('input')
  inputSklad.classList.add('inputSklad')
  inputSklad.type = 'number'
  inputSklad.placeholder = 'Введіть номер складу'
  labelSklad.appendChild(inputSklad)
  // ==============================================================
  const labelOplata = document.createElement('label')
  labelOplata.innerText = 'Виберіть спосіб оплати: '
  const selectOplata = document.createElement('select')
  selectOplata.classList.add('selectOplata')

  selectPayment.forEach((elemPay) => {
    const optionPay = document.createElement('option')
    optionPay.innerText = elemPay
    optionPay.value = elemPay
    selectOplata.appendChild(optionPay)
  })
  labelOplata.appendChild(selectOplata)
  modalWindow.appendChild(labelOplata)
  // ==============================================================
  const labelQuantity = document.createElement('label')
  labelQuantity.innerText = 'Змініть кількість, якщо треба: '
  modalWindow.appendChild(labelQuantity)

  const inputQuantity = document.createElement('input')
  inputQuantity.classList.add('inputQuantity')
  inputQuantity.type = 'number'
  inputQuantity.placeholder = '1'
  inputQuantity.value = 1
  labelQuantity.appendChild(inputQuantity)
  // ==============================================================
  const labelComent = document.createElement('label')
  labelComent.innerText = 'Коментар до замовлення: '
  modalWindow.appendChild(labelComent)

  const inputComent = document.createElement('input')
  inputComent.classList.add('inputComent')
  inputComent.type = 'text'
  inputComent.placeholder = 'Ваш коментар...'
  labelComent.appendChild(inputComent)
  // ==============================================================
  const buttonListBuy = document.createElement('button')
  buttonListBuy.classList.add('buttonListBuy')
  buttonListBuy.type = 'button'
  buttonListBuy.innerText = 'Замовити'
  modalWindow.appendChild(buttonListBuy)
}
