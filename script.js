import { listCategory, allCategory } from './product.js'

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
    const modalWindow = document.createElement('div')
    modalWindow.classList.add('modal')
    modalWindow.innerHTML = `Ви купили товар: ${productName}`
    colCenter.appendChild(modalWindow)
    setTimeout(() => {
      modalWindow.remove()
      resetCategorySelection()
    }, 3000)
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
