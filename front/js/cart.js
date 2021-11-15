let localStorageInformation = JSON.parse(localStorage.getItem('products')); // Récupération du local Storage 

    for(i=0; i < localStorageInformation.length; i++){ // Boucle qui parcourt le local Storage 
        let HTML = `<article class="cart__item" data-id="${localStorageInformation[i].idProduct}">
        <div class="cart__item__img">
          <img src="${localStorageInformation[i].imgSrcProduct}" alt="${localStorageInformation[i].imgAltProduct}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${localStorageInformation[i].titleProduct} ${localStorageInformation[i].colorsProduct}</h2>
            <p>${localStorageInformation[i].priceProduct}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageInformation[i].quantityProduct}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
      document.getElementById('cart__items').innerHTML += HTML;

    } // Fin boucle for affichage localStorage

    calculate(localStorageInformation);



function calculate(localStorageInformation){ // Fonction permettant de calculer la quantité totale et le prix total 
  let quantityTotal = 0; 
  let priceTotal = 0;
  for(i=0; i < localStorageInformation.length; i++){ // Boucle qui parcourt le Local Storage
    quantityTotal += localStorageInformation[i].quantityProduct; // Calcul de la quantité total
    priceTotal += localStorageInformation[i].priceProduct * localStorageInformation[i].quantityProduct; // Calcul du prix total
  }
  document.getElementById('totalPrice').innerHTML += priceTotal;
  document.getElementById('totalQuantity').innerHTML += quantityTotal;
}; // Fin de fonction de calcul 
   