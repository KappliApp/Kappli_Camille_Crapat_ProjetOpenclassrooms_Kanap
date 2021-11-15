// Connexion API
fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  // Récupération et affichage des résultats
  .then(function(resultats) {
    let selectItems = document.getElementById('items');
    for(i = 0; i < resultats.length; i++){
      let HTML = `
      <a href="./product.html?id=${resultats[i]._id}">
            <article>
              <img src="${resultats[i].imageUrl}" alt="${resultats[i].altTxt}">
              <h3 class="productName">${resultats[i].name}</h3>
              <p class="productDescription">${resultats[i].description}</p>
            </article>
          </a>`;
      selectItems.innerHTML += HTML;
    } 
  })
  .catch(function(err) {
    // Si erreur, afficher un message d'erreur
    let error = document.getElementById('items');
    error.innerHTML = "<p>Une erreur est survenue lors de la connexion à l'API. Veuillez vérifier celle-ci !</p>"
    error.style.color = "white";
    error.style.fontWeight = "bold";
    error.style.borderRadius = "10px";
    error.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
    error.style.lineHeight = "30px";
  });