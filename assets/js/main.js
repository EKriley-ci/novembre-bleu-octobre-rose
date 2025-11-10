// Script pour la page d'informations

// Questions du quiz
const quizQuestions = [
    {
        question: "À partir de quel âge est-il recommandé de faire un dépistage du cancer de la prostate ?",
        options: ["40 ans", "45 ans", "50 ans", "55 ans"],
        correct: 1
    },
    {
        question: "Quel est le signe le plus fréquent du cancer de la prostate ?",
        options: [
            "Difficultés à uriner",
            "Douleurs au dos",
            "Fièvre",
            "Perte d'appétit"
        ],
        correct: 0
    },
    {
        question: "Quelle est la fréquence recommandée pour l'auto-examen des seins ?",
        options: [
            "Une fois par semaine",
            "Une fois par mois",
            "Une fois tous les 3 mois",
            "Une fois par an"
        ],
        correct: 1
    },
    {
        question: "Quel est le cancer le plus fréquent chez la femme ?",
        options: [
            "Cancer du poumon",
            "Cancer du sein",
            "Cancer du col de l'utérus",
            "Cancer de l'ovaire"
        ],
        correct: 1
    },
    {
        question: "Le dépistage précoce du cancer permet-il d'augmenter les chances de guérison ?",
        options: [
            "Non, cela ne change rien",
            "Oui, considérablement",
            "Seulement pour certains cancers",
            "Cela dépend du type de cancer"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let quizCompleted = false;

// Initialiser le quiz
function initQuiz() {
    if (quizCompleted) {
        return;
    }
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

// Afficher une question
function showQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionText = document.getElementById('question-text');
    const quizOptions = document.getElementById('quiz-options');
    const questionNumber = document.getElementById('question-number');
    const totalQuestions = document.getElementById('total-questions');
    const progressFill = document.getElementById('progress-fill');
    const nextButton = document.getElementById('next-question');
    const quizResult = document.getElementById('quiz-result');
    const quizFeedback = document.getElementById('quiz-feedback');

    questionText.textContent = question.question;
    questionNumber.textContent = currentQuestion + 1;
    totalQuestions.textContent = quizQuestions.length;
    progressFill.style.width = ((currentQuestion + 1) / quizQuestions.length) * 100 + '%';

    quizOptions.innerHTML = '';
    nextButton.style.display = 'none';
    quizResult.style.display = 'none';
    quizFeedback.classList.remove('show');

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectAnswer(index);
        quizOptions.appendChild(optionElement);
    });
}

// Sélectionner une réponse
function selectAnswer(selectedIndex) {
    if (quizCompleted) return;

    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const quizFeedback = document.getElementById('quiz-feedback');
    const nextButton = document.getElementById('next-question');

    options.forEach((option, index) => {
        option.onclick = null;
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });

    if (selectedIndex === question.correct) {
        score++;
        quizFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Correct ! Excellente réponse.';
        quizFeedback.className = 'quiz-feedback show correct';
    } else {
        quizFeedback.innerHTML = '<i class="fas fa-times-circle"></i> Incorrect. La bonne réponse était : ' + question.options[question.correct];
        quizFeedback.className = 'quiz-feedback show incorrect';
    }

    nextButton.style.display = 'inline-flex';
}

// Question suivante
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Afficher les résultats
function showResults() {
    quizCompleted = true;
    const quizQuestion = document.querySelector('.quiz-question');
    const quizProgress = document.querySelector('.quiz-progress');
    const nextButton = document.getElementById('next-question');
    const quizResult = document.getElementById('quiz-result');
    const resultScore = document.getElementById('result-score');
    const resultMessage = document.getElementById('result-message');

    quizQuestion.style.display = 'none';
    quizProgress.style.display = 'none';
    nextButton.style.display = 'none';
    quizResult.style.display = 'block';

    const percentage = (score / quizQuestions.length) * 100;
    resultScore.textContent = `${score}/${quizQuestions.length} (${Math.round(percentage)}%)`;

    if (percentage === 100) {
        resultMessage.innerHTML = 'Parfait ! Vous maîtrisez parfaitement le sujet. <i class="fas fa-trophy"></i>';
    } else if (percentage >= 80) {
        resultMessage.innerHTML = 'Excellent ! Vous avez de bonnes connaissances. <i class="fas fa-thumbs-up"></i>';
    } else if (percentage >= 60) {
        resultMessage.innerHTML = 'Bien joué ! Continuez à vous informer. <i class="fas fa-hand-rock"></i>';
    } else {
        resultMessage.innerHTML = 'Pas mal ! N\'hésitez pas à relire les informations. <i class="fas fa-book"></i>';
    }
}

// Redémarrer le quiz
function restartQuiz() {
    quizCompleted = false;
    currentQuestion = 0;
    score = 0;
    const quizQuestion = document.querySelector('.quiz-question');
    const quizProgress = document.querySelector('.quiz-progress');
    quizQuestion.style.display = 'block';
    quizProgress.style.display = 'block';
    showQuestion();
}

// Scroll vers une section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Appliquer le thème selon le genre sélectionné
function applyTheme() {
    const gender = localStorage.getItem('selectedGender');
    if (gender) {
        document.body.classList.add(`${gender}-theme`);
        
        // Ajuster les couleurs selon le thème
        if (gender === 'homme') {
            document.documentElement.style.setProperty('--primary-color', '#2094FF');
        } else {
            document.documentElement.style.setProperty('--primary-color', '#FF5375');
        }
    }
}

// Smooth scroll pour les liens de navigation
document.addEventListener('DOMContentLoaded', function() {
    applyTheme();
    initQuiz();

    // Gérer les clics sur les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Gestion du header au scroll
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

