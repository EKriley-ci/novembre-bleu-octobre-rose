Tu veux coder un site web interactif de sensibilisation, centré sur les cancers du sein (femmes) et de la prostate (hommes), qui combine éducation, interactivité et design immersif.
Voici l’explication complète du projet que tu dois coder, étape par étape 👇

🧠 Nom du projet : “BleuRose” (ou celui que tu choisiras plus tard)
🎯 Objectif principal

Créer une plateforme web qui sensibilise le public sur les cancers du sein et de la prostate à travers une expérience interactive personnalisée et un contenu visuel éducatif.
L’utilisateur est guidé dès l’entrée et découvre des informations adaptées à son profil (homme ou femme).

💡 Fonctionnement global
1. Page d’accueil (choix du genre + intro)

Le site s’ouvre sur un écran d’accueil dynamique :
“Hey salut 👋, et bienvenue sur notre plateforme !”

Deux cartes : une représentant un homme, l’autre une femme.

L’utilisateur choisit son genre.

Si homme, le thème devient bleu.

Si femme, le thème devient rose.

Ensuite, un bouton “Commencer le tuto” apparaît.

⚙️ But technique :

Créer une animation de sélection (carte qui s’agrandit ou s’illumine).

Stocker la sélection dans le localStorage pour personnaliser la suite (couleur, contenu).

2. Page tutoriel interactif

Le tutoriel se déroule en 3 slides / étapes :

Pourquoi faire un dépistage ?

Quels sont les premiers signes ?

Que faire si je remarque quelque chose d’anormal ?

Chaque slide contient :

Un texte d’explication,

Une illustration (personnages que tu dessines),

Des boutons d’action (“Suivant”, “Revoir”, “Terminer”).

⚙️ But technique :

Créer un système de navigation par étapes avec animations douces (fade-in / slide).

Afficher le bon contenu selon le genre choisi (texte + image).

Gérer la progression (index de slide).

3. Page d’informations

Une fois le tutoriel terminé :

L’utilisateur arrive sur la page principale du site.

Elle contient :

Des informations sur le cancer de la prostate et du sein.

Une section “À propos de la journée” (explication de l’événement).

Des photos et vidéos de la journée de sensibilisation.

Un quiz rapide (facultatif) pour tester ce qu’on a appris.

⚙️ But technique :

Créer plusieurs sections / composants (infos, galerie, quiz).

Utiliser une structure claire (HTML sémantique ou composants React).

Ajouter un scroll fluide et des animations légères (framer-motion, AOS, GSAP, etc.).

4. Thématisation dynamique

Le design change selon le genre :

Homme → Thème bleu (#007BFF)

Femme → Thème rose (#E75480)

⚙️ But technique :

Utiliser des variables CSS (custom properties) pour les couleurs principales.

Modifier ces variables selon le choix stocké (bleu ou rose).

5. (Optionnel) Page de rappel santé

Petite fonctionnalité bonus :

Un mini formulaire où l’utilisateur peut entrer son âge et recevoir un conseil de dépistage ou un rappel santé.

⚙️ But technique :

Gérer un petit formulaire.

Utiliser du JS pour afficher un message personnalisé (ex. : “Vous avez 46 ans, un dépistage annuel est recommandé”).

🧩 Architecture du site

Tu peux le structurer ainsi :

/public
  ├─ images/
  ├─ illustrations/
  ├─ styles/
  └─ script.js

/index.html  → page d’accueil (choix du genre)
/tuto.html    → tutoriel interactif
/main.html    → page d’informations


Ou si tu veux faire plus moderne :
avec React/Vite, chaque page devient un composant (Accueil, Tuto, Infos, etc.) et tu gères les routes avec react-router-dom.

🛠️ Technologies possibles

Tu as deux choix selon ton niveau et celui des 1res années 👇

🔹 Option simple (HTML / CSS / JS vanilla)

HTML → structure du site

CSS → design + variables pour thème

JS → logique de sélection, changement de page, transitions

🔹 Option plus pro (React / Vite / Tailwind)

React pour les composants réutilisables (Cartes, Slides, Boutons)

Tailwind CSS pour le style rapide

Framer Motion pour les animations

💬 But final du projet

Présenter, pendant la journée de sensibilisation :

Un site interactif et éducatif créé par les étudiants.

Montrer que la technologie peut servir la santé publique.

Offrir une expérience simple, visuelle et engageante aux visiteurs.

En résumé :
Ton site BleuRose → un portail web interactif de sensibilisation où chaque utilisateur vit un petit parcours adapté à lui, apprend les bons réflexes santé, et découvre les actions de ton école.