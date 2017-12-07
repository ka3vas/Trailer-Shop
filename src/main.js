require('./app.scss');

// Save promise???
let promiseProductList = []; 

// FOCUS ON PRODUCT /////////////////////////////////////////////////////////////////////////////////////////////////////////

// Could live in another file, product "focus" page
function buildProductPage(singleProductData) {
  
  // Grab .offer-panel
  let offerPanel = document.querySelector('.offer-panel');
  console.log(singleProductData);
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
  
  // Create Block .product-card
  let productCard = document.createElement('div');
  productCard.className = "offer-panel__product product-card";

  // Check if featured, set class for Block
  if (singleProductData.variants[0].featured_image !== null) {
    productCard.className += " product-card_featured";
  } 

  //Build .product-card Block
  let element = ``;

    // Check if product have any image for it, if yes add it
    if (singleProductData.images.length !== 0) {
      element += `<img class="product-card__image" src="${singleProductData.images[0].src}">`
    }

      element +=  `
                  <h2>${singleProductData.title}</h2>
                  <div class="product-card__info">`

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

document.querySelector('.alert__button_close').addEventListener('click', (e) => {
  // Should move it to separate function
  // Fade out the alert
  e.target.parentNode.style.opacity = '0';
  console.log(e.target.parentNode);
  // Remove it
  setTimeout(() => {
    const removeThis = e.target.parentNode;
    removeThis.parentNode.removeChild(removeThis);
  }, 2000)

  // ninja code at work (i know)
  const test = document.querySelector('h1');
  test.style.paddingTop = "16px";
});
