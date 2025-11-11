// Gestion du tutoriel interactif
class Tutorial {
    constructor() {
        this.selectedGender = null;
        this.currentSlide = 0;
        this.init();
    }

    init() {
        this.setupGenderSelection();
        this.setupNavigation();
    }

    // Configuration de la sélection de genre
    setupGenderSelection() {
        const carteHomme = document.querySelector('.carte-homme');
        const carteFemme = document.querySelector('.carte-femme');

        if (carteHomme) {
            carteHomme.addEventListener('click', () => this.selectGender('homme'));
        }

        if (carteFemme) {
            carteFemme.addEventListener('click', () => this.selectGender('femme'));
        }
    }

    // Sélection du genre et affichage de la confirmation
    selectGender(gender) {
        this.selectedGender = gender;
        localStorage.setItem('selectedGender', gender);

        // Afficher l'écran de confirmation (remplace le contenu de la page)
        this.showConfirmationScreen(gender);
    }

    // Afficher l'écran de confirmation
    showConfirmationScreen(gender) {
        const main = document.querySelector('main.tuto');
        if (!main) return;

        const hommeCard = `
            <div class="confirmation-card ${gender === 'homme' ? 'active' : 'inactive'}">
                <div class="confirmation-card-img ${gender === 'homme' ? 'blue-border' : ''}">
                    <img src="assets/image/tutoman01.png" alt="un homme en bleu">
                </div>
                <h2 class="${gender === 'homme' ? 'blue-text' : 'faded-text'}">Homme</h2>
            </div>
        `;

        const femmeCard = `
            <div class="confirmation-card ${gender === 'femme' ? 'active' : 'inactive'}">
                <div class="confirmation-card-img ${gender === 'femme' ? 'pink-border' : ''}">
                    <img src="assets/image/tutowomen01.png" alt="une femme en rose">
                </div>
                <h2 class="${gender === 'femme' ? 'pink-text' : 'faded-text'}">Femme</h2>
            </div>
        `;

        const confirmationHTML = `
            <div class="confirmation-screen ${gender}-theme">
                <div class="confirmation-cards">
                    ${gender === 'homme' ? hommeCard + femmeCard : femmeCard + hommeCard}
                </div>
                <div class="confirmation-message">
                    <p class="confirmation-text">Ha ! vous être un${gender === 'femme' ? 'e' : ''}</p>
                    <p class="confirmation-gender ${gender}-text">${gender === 'homme' ? 'homme' : 'Femme'}</p>
                </div>
                <button class="btn-commencer ${gender}-btn" onclick="tutorial.startTutorial()">
                    Commencer
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;

        main.innerHTML = confirmationHTML;
        document.body.className = `${gender}-theme`;
    }

    // Démarrer le tutoriel
    startTutorial() {
        this.currentSlide = 0;
        this.showSlide(this.currentSlide);
    }

    // Afficher un slide spécifique
    showSlide(slideIndex) {
        const main = document.querySelector('main.tuto');
        if (!main) return;

        const slides = this.getSlidesForGender(this.selectedGender);
        
        if (slideIndex < 0 || slideIndex >= slides.length) {
            return;
        }

        const slide = slides[slideIndex];
        const isFirstSlide = slideIndex === 0;
        const isLastSlide = slideIndex === slides.length - 1;

        const slideHTML = `
            <div class="tutorial-slide ${this.selectedGender}-theme">
                <h1 class="slide-title">${slide.title}</h1>
                <div class="slide-illustration">
                    <img src="${slide.image}" alt="${slide.title}">
                </div>
                <div class="slide-content">
                    ${slide.content}
                </div>
                <div class="slide-navigation">
                    <button class="btn-nav btn-retour ${this.selectedGender}-theme-btn ${isFirstSlide ? 'disabled' : ''}" 
                            ${isFirstSlide ? 'disabled' : `onclick="tutorial.previousSlide()"`}>
                        retour
                    </button>
                    <button class="btn-nav btn-suivant ${this.selectedGender}-btn" 
                            onclick="tutorial.nextSlide()">
                        ${isLastSlide ? 'Terminer' : 'suivant'}
                    </button>
                </div>
            </div>
        `;

        main.innerHTML = slideHTML;
        this.currentSlide = slideIndex;
    }

    // Slide précédent
    previousSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    // Slide suivant
    nextSlide() {
        const slides = this.getSlidesForGender(this.selectedGender);
        if (this.currentSlide < slides.length - 1) {
            this.showSlide(this.currentSlide + 1);
        } else {
            // Fin du tutoriel
            this.endTutorial();
        }
    }

    // Configuration de la navigation
    setupNavigation() {
        // Cette méthode sera appelée après chaque changement de slide
    }

    // Obtenir les slides selon le genre
    getSlidesForGender(gender) {
        if (gender === 'homme') {
            return [
                {
                    title: "Pourquoi faire un dépistage ?",
                    image: "assets/image/tutoman03.png",
                    content: `
                        <p>Le <strong>cancer de la prostate</strong> est fréquent chez l'homme. 
                        <strong>Un dépistage</strong> dès 45 ans aide à le détecter tôt. 
                        Se faire suivre, c'est faire preuve de <strong>force</strong>.</p>
                    `
                },
                {
                    title: "Quels sont les premiers signes ?",
                    image: "assets/image/tutoman04.png",
                    content: `
                        <p>Le cancer de la prostate est souvent silencieux au début, mais certains signes doivent alerter : 
                        difficultés à uriner, douleurs au bas-ventre et envies fréquentes d'uriner la nuit. 
                        Il faut en parler sans gêne à un professionnel de santé.</p>
                    `
                },
                {
                    title: "Que faire si je remarque quelque chose d'anormal ?",
                    image: "assets/image/tutoman045png.png",
                    content: `
                        <p>Le dépistage est facile : un simple examen et une prise de sang suffisent. 
                        Il faut consulter un médecin ou un urologue. 
                        Le vrai courage, c'est de le faire à temps.</p>
                    `
                }
            ];
        } else {
            return [
                {
                    title: "Pourquoi faire un dépistage ?",
                    image: "assets/image/tutowomen03.png",
                    content: `
                        <p>Le <strong>dépistage précoce du cancer du sein</strong> peut sauver des vies. 
                        Plus il est découvert tôt, plus les chances de guérison sont élevées. 
                        Se faire dépister, c'est prendre soin de soi et de celles qu'on aime.</p>
                    `
                },
                {
                    title: "Quels sont les premiers signes ?",
                    image: "assets/image/tutowomen04.png",
                    content: `
                        <p>Restez à l'écoute de votre corps. 
                        Une boule dans le sein, une rougeur, une douleur inhabituelle ou un écoulement 
                        doivent toujours être pris au sérieux. L'auto-examen, une fois par mois, 
                        aide à repérer ces signes.</p>
                    `
                },
                {
                    title: "Que faire si je remarque quelque chose d'anormal ?",
                    image: "assets/image/tutowomen05.png",
                    content: `
                        <p>Ne paniquez pas, mais n'attendez pas non plus. 
                        Prenez rendez-vous avec un médecin ou une sage-femme pour un examen clinique. 
                        Plus tôt le diagnostic est posé, plus tôt le traitement peut commencer.</p>
                    `
                }
            ];
        }
    }

    // Fin du tutoriel
    endTutorial() {
        const main = document.querySelector('main.tuto');
        if (!main) return;

        const endHTML = `
            <div class="tutorial-end ${this.selectedGender}-theme">
                <h1 class="end-title">Félicitations !</h1>
                <p class="end-message">Vous avez terminé le tutoriel. Découvrez maintenant plus d'informations et testez vos connaissances.</p>
                <button class="btn-commencer ${this.selectedGender}-btn" onclick="window.location.href='main.html'">
                    Voir les Informations
                    <i class="fas fa-arrow-right"></i>
                </button>
                <button class="btn-commencer btn-secondary ${this.selectedGender}-btn" onclick="location.reload()" style="margin-top: 1rem; background: transparent; border: 2px solid;">
                    Recommencer le Tutoriel
                </button>
            </div>
        `;

        main.innerHTML = endHTML;
    }
}

// Initialiser le tutoriel quand le DOM est prêt
let tutorial;
document.addEventListener('DOMContentLoaded', () => {
    tutorial = new Tutorial();
    
    // Vérifier si un genre a déjà été sélectionné (pour rafraîchissement de page)
    const savedGender = localStorage.getItem('selectedGender');
    if (savedGender) {
        // Optionnel: restaurer l'état précédent
    }
});

// Pour gérer le loader
window.onload = function () {
    const loaderWrapper = document.getElementById("loader-wrapper");
    const content = document.querySelector(".tuto");

    setTimeout(() => {
        loaderWrapper.style.display = 'none'
        content.classList.add("show");
    },2000)
}
