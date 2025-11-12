document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Efface toutes les erreurs
    const errorElements = document.querySelector(".error-message");
    errorElements.forEach(element => element.style.display = 'none');

    // Récupérer les données du formulaire
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    // Gérer les différentes validations, càd qu'on vérifie si l'input entré
    // par l'utilisateur est correct

    if (name === '') {
        document.getElementById("nameError").textContent = 'Renseigner correctement le nom';
        document.getElementById("nameError").style.display = 'block';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailRegex.test(email)) {
        document.getElementById("emailError").textContent = 'Email invalide'
        document.getElementById("emailError").style.display = 'block';
        isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (phoneRegex === '' || !phoneRegex.test(phone)) {
        document.getElementById("phoneError").textContent = 'Numéro Incorrect';
        document.getElementById("phoneError").style.display = 'block';
        isValid = false;
    }

    if (message === '') {
        document.getElementById("messageError").textContent = 'Message obligatoire';
        document.getElementById("messageError").style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        alert('Formulaire soumis avec succès!');
        // Message qui précise qu'il n'y a aucune erreur dans le formulaire
    }
    

});