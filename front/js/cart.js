let localStorageInformation = JSON.parse(localStorage.getItem('products')); // Récupération du local Storage 

if(localStorageInformation){
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

let itemQuantity = document.getElementsByClassName('itemQuantity');
for(i=0; i < itemQuantity.length; i++){
  itemQuantity[i].addEventListener('change', function(e){
    console.log("test");
  })
}

calculate(localStorageInformation);

}
else{
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
  document.getElementById('totalPrice').innerHTML += 0;
  document.getElementById('totalQuantity').innerHTML += 0;
}
    



function calculate(localStorageInformation){ // Fonction permettant de calculer la quantité totale et le prix total 
  let quantityTotal = 0; 
  let priceTotal = 0;
  for(i=0; i < localStorageInformation.length; i++){ // Boucle qui parcourt le Local Storage
    quantityTotal += localStorageInformation[i].quantity; // Calcul de la quantité total
    priceTotal += localStorageInformation[i].price * localStorageInformation[i].quantity; // Calcul du prix total
  }
  document.getElementById('totalPrice').innerHTML += priceTotal;
  document.getElementById('totalQuantity').innerHTML += quantityTotal;
}; // Fin de fonction de calcul 


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

  let contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    adress : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  };

  localStorage.setItem('contacts', JSON.stringify(contact));
});