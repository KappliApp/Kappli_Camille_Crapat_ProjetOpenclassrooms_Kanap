// Récupération de l'ID dans le lien

let str = window.location
let url = new URL(str);
let id = url.searchParams.get("id");

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!! Fetch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!! Récupération des données du canapé et affichage !!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

fetch("http://localhost:3000/api/products/" + id)
.then(function(res) {
    if (res.ok) { // Vérification si des résultats sont présents
      return res.json();
    }
  })
  .then(function(resultats, id) { // Fonction récupérant les données 
      
    //Affichage informations produit

    let titlePageHTML = document.querySelector('title'); 
    titlePageHTML.innerHTML = `${resultats.name}`; // Affichage du titre du canapé dans le titre de la page

    let imageHTML = document.querySelector('div.item__img');
    imageHTML.innerHTML = `<img src="${resultats.imageUrl}" alt="${resultats.altTxt}">`; // Affichage de l'image

    let titleHTML = document.getElementById('title');
    titleHTML.innerHTML = `${resultats.name}`; // Affichage du titre du canapé

    let priceHTML = document.getElementById('price');
    priceHTML.innerHTML = `${resultats.price}`; // Affichage du prix

    let descriptionHTML = document.getElementById('description');
    descriptionHTML.innerHTML = `${resultats.description}`; // Affichage de la description
 
    let colorsHTML = document.getElementById('colors'); 

    for(i = 0; i < resultats.colors.length; i++){ // Affichage des différentes couleurs
        colorsHTML.innerHTML += `<option value="${resultats.colors[i]}">${resultats.colors[i]}</option>`;
    }

    listener(resultats.name, resultats.imageUrl, resultats.altTxt, resultats.price); // 
    

  })
  .catch(function(err) {
    // Fonction en cas d'erreur
    let error = document.getElementById('title');
    error.innerHTML = "<p>Une erreur est survenue lors de la connexion à l'API. Veuillez vérifier celle-ci !</p>"
    error.style.textAlign = "center";
    error.style.fontSize = "18px";
    error.style.color = "white";
    error.style.fontWeight = "bold";
    error.style.borderRadius = "10px";
    error.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
    error.style.lineHeight = "30px";
  }); // Fin Fetch

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!! Fonction listener !!!!!!!!!!!!!!!!!!!!!!
// !!!!! Ecoute du clique sur le bouton ajouter au panier !!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function listener(name, imageUrl, altTxt, price){
  document.getElementById('addToCart').addEventListener('click', function(e){
    e.preventDefault();

    recoveryData(name, imageUrl, altTxt, price);
  });
}; // Fin fonction listener

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!! Fonction recoveryData !!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!! récupération des différentes données !!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function recoveryData(name, imageUrl, altTxt, price){
  let colors = document.getElementById('colors').value;
  let quantityFloat = document.getElementById('quantity').value;
  let quantity = parseInt(quantityFloat); // Transformation de la quantité en INT au cas ou l'utilisateur saisirait un chiffre à virgule
  
  verifForm(name, imageUrl, altTxt, price, colors, quantity);
}; // Fin fonction recoveryData;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!! Fonction verifForm !!!!!!!!!!!!!!!!!!!!!!
// !!!! vérification des données entrées par l'utilisateur !!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function verifForm(name, imageUrl, altTxt, price, colors, quantity){
  if(colors === ""){
    console.log("Veuillez choisir une couleur");
  }
  else if(quantity <= 0){
    console.log("Veuillez saisir une quantité");
  }
  else if(quantity > 100){
    console.log("Veuillez saisir une quantité inférieur à 100");
  }
  else{
    initLocalStorage(name, imageUrl, altTxt, price, colors, quantity);
  }
}; // Fin fonction verifForm

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!! Fonction initLocalStorage !!!!!!!!!!!!!!!!!!!
// !!!!! Initie le Local Storage et vérifie son existance !!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function initLocalStorage(name, imageUrl, altTxt, price, colors, quantity){
  let product = { // Objet contenant les données du produit
    id : id,
    name : name,
    imageUrl : imageUrl,
    altTxt : altTxt,
    colors : colors,
    quantity : quantity,
    price : price
  }; // Fin Objet product

  let localStorageInformation = JSON.parse(localStorage.getItem('products'));

  if(localStorageInformation){
    verifIdAndColors(product, localStorageInformation);
  }
  else {
    createLocalStorage(product, localStorageInformation);
  }
}; // Fin fonction initLocalStorage

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!! Fonction createLocalStorage !!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!! créer le Local Storage !!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function createLocalStorage(product){
  console.log("Aucun Local Storage n'existe, création");
          let localStorageInformation = [];
          localStorageInformation.push(product);
          localStorage.setItem('products', JSON.stringify(localStorageInformation));
          console.log(localStorageInformation);
}; // Fin fonction createLocalStorage

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!! Fonction verifIdAndColors !!!!!!!!!!!!!!!!!!!
// !!! vérifier si le canapé est déjà dans le Local Storage !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function verifIdAndColors(product, localStorageInformation){
  localStorageInformation.forEach(products =>{
    if((product.id === products.id) && (product.colors === products.colors)){
      modifQuantity(localStorageInformation, products, product);
    }
    else{
      addLocalStorage(product, localStorageInformation);
    }
  }); // Fin Foreach
}; // Fin Fonction verifIdAndColors

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!! Fonction modifQuantity !!!!!!!!!!!!!!!!!!!!!
// !!!!! Modification de la quantité dans le Local Storage !!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function modifQuantity(localStorageInformation, products, product){
  console.log("un canapé avec le même id et la même couleur est déjà dans le Local Storage, changement de la quantité");
  products.quantity += product.quantity;
  localStorage.setItem('products', JSON.stringify(localStorageInformation));
  console.log(localStorageInformation);
}; // Fin fonction modifQuantity

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!! Fonction addLocalStorage !!!!!!!!!!!!!!!!!!!!
// !!!!!! ajoute le canapé au localStorage déjà existant !!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function addLocalStorage(product, localStorageInformation){
  console.log("un canapé avec le même id est déjà dans le local Storage, mais il n'a pas la même couleur");
  localStorageInformation.push(product);
  localStorage.setItem('products', JSON.stringify(localStorageInformation));
}; // Fin de la fonction addLocalStorage
