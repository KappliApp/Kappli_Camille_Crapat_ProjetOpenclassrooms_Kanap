// Récupération de l'ID dans le lien

let str = window.location
let url = new URL(str);
let id = url.searchParams.get("id");

// Chargement et affichage des données du produit

fetch("http://localhost:3000/api/products/" + id)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(resultats, id) {
      
    //Affichage informations produit

    let titlePageHTML = document.querySelector('title');
    titlePageHTML.innerHTML = `${resultats.name}`;

    let imageHTML = document.querySelector('div.item__img');
    imageHTML.innerHTML = `<img src="${resultats.imageUrl}" alt="${resultats.altTxt}">`;

    let titleHTML = document.getElementById('title');
    titleHTML.innerHTML = `${resultats.name}`;

    let priceHTML = document.getElementById('price');
    priceHTML.innerHTML = `${resultats.price}`;

    let descriptionHTML = document.getElementById('description');
    descriptionHTML.innerHTML = `${resultats.description}`;

    let colorsHTML = document.getElementById('colors');

    for(i = 0; i < resultats.colors.length; i++){
        colorsHTML.innerHTML += `<option value="${resultats.colors[i]}">${resultats.colors[i]}</option>`;
    }
    // Execution fonction addcart et passage en paramètre des informationss produits

    addcart(resultats.name, resultats.imageUrl, resultats.altTxt, resultats.price);
    

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

  // Fonction permettant l'ajout au panier

function addcart(title, imgSrc, imgAlt, price){

  //Fonction en cas de clique sur Ajouter au Panier
  document.getElementById('addToCart').addEventListener('click', function(e){
    e.preventDefault();

    // Récupération des données saisies par l'utilisateur
    let colors = document.getElementById('colors').value;
    let quantityFloat = document.getElementById('quantity').value;
    let quantity = parseInt(quantityFloat); // Transformation de la quantité en INT au cas ou l'utilisateur saisirait un chiffre à virgule

    if(colors === ""){ // Si il n'y a pas de couleur de selectionné
      alert("Veuillez selectionner une couleur");
    }
    else if(quantity <=0 || quantity >100){ // Si l'utilisateur a saisi une quantité incorrect
      alert("Veuillez ajouter une quantité correct");
    }
    else{

      //Fonction pour créer le LocalStorage du Panier
      function createLocalStorage(){
        let product = { // Objet contenant les données du produit
          idProduct : id,
          titleProduct : title,
          imgSrcProduct : imgSrc,
          imgAltProduct : imgAlt,
          colorsProduct : colors,
          quantityProduct : quantity,
          priceProduct : price
        }; // Fin Objet product

        //Chargement du Local Storage 
        let localStorageInformation = JSON.parse(localStorage.getItem('products'));
        //Fonction pour ajouter le localStorage si il n'existe pas 

        if(localStorageInformation){ // On vérifi si un localStorage existe

          for(let i = 0; i < localStorageInformation.length; i++){ // Boucle qui parcourt le Local Storage
            // Si le canapé avec la même couleur est déja dans le panier, on augmente la quantité

            if(id === localStorageInformation[i].idProduct){
              if(colors === localStorageInformation[i].colorsProduct){
                localStorageInformation[i].quantityProduct += quantity;
                localStorage.setItem('products', JSON.stringify(localStorageInformation));
                break;
              }
              else{
                localStorageInformation.push(product);
                localStorage.setItem('products', JSON.stringify(localStorageInformation));
                break;
              }
            }
            // Sinon on ajoute au panier existant
            else{
              localStorageInformation.push(product);
              localStorage.setItem('products', JSON.stringify(localStorageInformation));
              break; // On arrête la fonction car la suite n'est pas nécessaire
            }
          } // Fin boucle for
        } // Fin If verif existence Local Storage

        // Si aucun local Storage existe on le créé
        else{
          let localStorageInformation = [];
          localStorageInformation.push(product);
          localStorage.setItem('products', JSON.stringify(localStorageInformation));
        }
      }; // Fin Fonction createLocalStorage
      // Lancement de la fonction
      createLocalStorage();
      
      
    } // Fin Else (si couleur et quantité ok)
    
  }); // Fin de fonction click 
}; // Fin de la fonction add cart
      