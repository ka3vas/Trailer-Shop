// Import test function
import {growl} from './01-bem/Alert/alert.js';

console.log(growl());

// Save promise???
let promiseProductList = []; 

// FOCUS ON PRODUCT /////////////////////////////////////////////////////////////////////////////////////////////////////////

// Could live in another file, product "focus" page
function buildProductPage(singleProductData) {
  
  // Grab .offer-panel
  let offerPanel = document.querySelector('.offer-panel');
  let productTemplate = singleProductData.body_html;

  offerPanel.innerHTML = productTemplate;
}

// END:FOCUS ON PRODUCT /////////////////////////////////////////////////////////////////////////////////////////////////////////

// Make a Promise
function getProductsList() {
    return new Promise((resolve, reject) => {
        const data = fetch('https://www.everyonedoesit.ca/products.json')
        if (data) {
            resolve(data);
        } else {
            reject(Error('Nothing here!'));
        }
    });
}

// This could probably live in another file (?)
function buildProductCard(singleProductData) {
  
  // Create .product-card Block
  let productCard = document.createElement('div');
  productCard.className = "offer-panel__product product-card";

  //////////////////////////////////////
  
  let element = `<div class="product-card__preview">`;

    // Check if product is featured
    if (singleProductData.variants[0].featured_image !== null) {
      
      productCard.className += " product-card_featured";
      element += `<img class="product-card__image" src="${singleProductData.variants[0].featured_image.src}">`
    } else {
      
      // If not add normal images (if there is any)
      if (singleProductData.images.length !== 0) {
        element += `<img class="product-card__image" src="${singleProductData.images[0].src}">`
      }
    }

      element += `<div class="center">
                    <h2 class="center__header">${singleProductData.title}</h2>
                  </div>

                  </div>`
  // end: <div class="product-card__preview">

      element +=  `<div class="product-card__info">`

      // Check for compare
      // Remove duplicate code!!! Only need to add one span or ignore it
      if (singleProductData.variants[0].compare_at_price !== null) {
        element += `<div class="price">
                      Price: <span class="price_compare">C$${singleProductData.variants[0].compare_at_price}</span>
                      <span>C$${singleProductData.variants[0].price}</span>
                    </div> `
      } else {
        element += `<div class="price">
                      Price: <span>C$${singleProductData.variants[0].price}</span>
                    </div>`
      }
      
      // If featured highlight button
      if (singleProductData.variants[0].featured_image !== null) {
        element += `<button class="button button_warning_yellow">More Info</button>`
      } else {
        element += `<button class="button">More Info</button>`
      }
                    
      element +=`</div>`;
      // end: <div class="product-card__info">

  //////////////////////////////////////
  productCard.innerHTML = element;
  // Add event to the button, that will build product 'page'
  productCard.querySelector('.button').addEventListener('click', () => {
    console.log('hi');
    buildProductPage(singleProductData);
  });
  
  // Add Block to the Page
  document.querySelector('.offer-panel').insertAdjacentElement('beforeend', productCard);
}

getProductsList()
  .then(productsStream => productsStream.json())
  .then(productsList => {

        // TEST VARIABLE
        promiseProductList = [...productsList.products];
        
        productsList.products
          .map(product => buildProductCard(product) );
  });

document.querySelector('.alert__button_right_remove').addEventListener('click', (e) => {
  // Should move it to separate function
  // Fade out the alert
  const removeThis = e.target.parentNode;
  removeThis.style.opacity = '0';
  
  // Remove it from document
  setTimeout(() => {
    removeThis.parentNode.removeChild(removeThis);
  }, 2000)

  // when alert gets added its height should be added to the padding-top of the first element so it wont hide it
  // ninja code at work (i know)
  const test = document.querySelector('h1');
  test.style.paddingTop = "64px";
});
