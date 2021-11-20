let localStorageInformation = JSON.parse(localStorage.getItem('products')); // Récupération du local Storage 

if(localStorageInformation.length !== 0){
  displayCart(localStorageInformation);
  changeQuantity(localStorageInformation);
  deleteItem(localStorageInformation);
  calculate(localStorageInformation);
}
else{
  displayError();
}

    





function regexText(nameInput, value){
  if(!value){
    let HTML = document.getElementById(nameInput + 'ErrorMsg')
    HTML.style.display = "block";
    HTML.innerHTML = 'Veuillez saisir une valeur !';
  }
  else if(!/^[-a-zA-ZàâäéèêëïîôöùûüçÂ]{2,20}$/.test(value)){
    let HTML = document.getElementById(nameInput + 'ErrorMsg')
    HTML.style.display = "block";
    HTML.innerHTML = 'Veuillez saisir une valeur correct !';
  }
  else{
    let HTML = document.getElementById(nameInput + 'ErrorMsg')
    HTML.style.display = "none";
  }
};

function regexMail(nameInput, value){
  if(!value){
    let HTML = document.getElementById(nameInput + 'ErrorMsg')
    HTML.style.display = "block";
    HTML.innerHTML = 'Veuillez saisir une valeur !';
  }
  else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)){
    let HTML = document.getElementById(nameInput + 'ErrorMsg')
    HTML.style.display = "block";
    HTML.innerHTML = 'Veuillez saisir une valeur correct !';
  }
  else{
    let HTML = document.getElementById(nameInput + 'ErrorMsg')
    HTML.style.display = "none";
  }
};

function regexAdress(nameInput, value){
  if(!value){
    let HTML = document.getElementById(nameInput + 'ErrorMsg')
    HTML.style.display = "block";
    HTML.innerHTML = 'Veuillez saisir une valeur !';
  }
  else if(!/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(value)){
    let HTML = document.getElementById(nameInput + 'ErrorMsg')
    HTML.style.display = "block";
    HTML.innerHTML = 'Veuillez saisir une valeur correct !';
  }
  else{
    let HTML = document.getElementById(nameInput + 'ErrorMsg')
    HTML.style.display = "none";
  }
};


document.getElementById('firstName').addEventListener('input', function(e){
  regexText('firstName', e.target.value);
});
document.getElementById('lastName').addEventListener('input', function(e){
  regexText('lastName', e.target.value);
});
document.getElementById('address').addEventListener('input', function(e){
  regexAdress('address', e.target.value);
});
document.getElementById('city').addEventListener('input', function(e){
  regexText('city', e.target.value);
});
document.getElementById('email').addEventListener('input', function(e){
  regexMail('email', e.target.value);
});


document.getElementById('order').addEventListener('click', function(e){
  e.preventDefault();
  collectIdLocalStorage(localStorageInformation);

  let contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    adress : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  };

  collectIdLocalStorage(localStorageInformation);
  localStorage.setItem('contacts', JSON.stringify(contact));
});


function collectIdLocalStorage(localStorageInformation){
  let products = [];
  for(i=0; i < localStorageInformation.length; i++){
    products.push(localStorageInformation[i].id);
  } 
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!! Fonction displayCart !!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!! Affichage du panier sur la page !!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function displayCart(localStorageInformation){
  for(i = 0; i < localStorageInformation.length; i++){ // Boucle qui parcourt le local Storage 
    let HTML = `<article class="cart__item" data-id="${localStorageInformation[i].id}">
    <div class="cart__item__img">
      <img src="${localStorageInformation[i].imageUrl}" alt="${localStorageInformation[i].altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${localStorageInformation[i].name} ${localStorageInformation[i].colors}</h2>
        <p>${localStorageInformation[i].price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageInformation[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  document.getElementById('cart__items').innerHTML += HTML; 

  } // Fin boucle for affichage localStorage
} // Fin fonction displayCart

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!! Fonction displayError !!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!! Affichage d'une message panier vide !!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function displayError(){
  // Affichage du message d'erreur panier vide
  let error = document.getElementById('cart__items');
  error.innerHTML = `<p>Le panier est vide ! Rendez-vous sur notre page produit en cliquant <a href="index.html">ici</a></p>`
  error.style.textAlign = "center";
  error.style.fontSize = "18px";
  error.style.color = "white";
  error.style.fontWeight = "bold";
  error.style.borderRadius = "10px";
  error.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
  error.style.lineHeight = "30px";
  // Modification style lien vers la page produit
  let lien = document.querySelector('#cart__items a');
  lien.style.color = "white";
  // Mise des quantité total et du prix total à 0
  document.getElementById('totalPrice').innerHTML = 0;
  document.getElementById('totalQuantity').innerHTML = 0;
}; // Fin fonction displayError 

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!! Fonction changeQuantity !!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!! Pour changer la quantité d'un canapé !!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function changeQuantity(localStorageInformation){
  let itemQuantity = document.querySelectorAll('.itemQuantity'); // Selection de l'input des quantités
  itemQuantity.forEach((item, index) => { // Boucle parcourant tous les canapés
    item.addEventListener('change', function(){ // Au changement d'une quantité
      localStorageInformation[index].quantity = parseInt(itemQuantity[index].value); // On change la quantité
      localStorage.setItem('products', JSON.stringify(localStorageInformation)); // On met à jour le localStorage
      calculate(localStorageInformation); // On recalcule le prix et la quantité totale
    }); // Fin fonction click
  }); // Fin foreach
}; // Fin fonction changeQuantity

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!! Fonction deleteItem !!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!! Suppression d'un canapé !!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function deleteItem(localStorageInformation){
  let itemDelete = document.querySelectorAll('.deleteItem'); // Selection de tous les liens de suppression
  itemDelete.forEach((item, index) => { // Boucle qui parcourt tous les canapés
    item.addEventListener('click', function(){ // Au clicque sur un des lien 
      let supp = itemDelete[index].closest('.cart__item'); // On selectionne l'article 
      supp.remove(); // On le supprime 

      localStorageInformation.splice(index, 1); // On le supprime du localStorage
      localStorage.setItem('products', JSON.stringify(localStorageInformation)); // On met à jour le LocalStorage
      calculate(localStorageInformation); // On recalcule la quantité et le prix totale
      if(localStorageInformation.length === 0){ // Si il n'y a plus d'article 
        displayError(); // On affiche que le panier est vide
      }
    }); // Fin fonction click
  }); // Fin foreach
}; // Fin fonction deleteItem

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!! Fonction calculate !!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!! Permet de calculer la quantité et le prix total !!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function calculate(localStorageInformation){ 
  let quantityTotal = 0; 
  let priceTotal = 0;
  for(i=0; i < localStorageInformation.length; i++){ // Boucle qui parcourt le Local Storage
    quantityTotal += localStorageInformation[i].quantity; // Calcul de la quantité total
    priceTotal += localStorageInformation[i].price * localStorageInformation[i].quantity; // Calcul du prix total
  }
  document.getElementById('totalPrice').innerHTML = priceTotal; // Affichage du prix total
  document.getElementById('totalQuantity').innerHTML = quantityTotal; // Affichage de la quantité total
}; // Fin de fonction calculate

