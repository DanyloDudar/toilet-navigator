const translations = {

    en: {
        steps: [
            "Go outside the cafe and click NEXT",
            "Turn right and go to the stairs",
            "Go down the stairs and turn left",
            "Go forward until you reach the second gate on the left",
            "Go inside the gate — you will see the FREE public toilet 🎉"
        ],
        next: "➡️ Next",
        prev: "⬅️ Previous"
    },

    cz: {
        steps: [
            "Vyjděte z kavárny a klikněte na DALŠÍ",
            "Zahněte doprava a jděte ke schodům",
            "Sejděte dolů po schodech a zahněte doleva",
            "Jděte rovně, dokud nedojdete ke druhé bráně vlevo",
            "Vejděte dovnitř — uvidíte VEŘEJNÉ WC 🎉"
        ],
        next: "➡️ Další",
        prev: "⬅️ Zpět"
    },

    de: {
        steps: [
            "Gehen Sie aus dem Café und klicken Sie auf WEITER",
            "Biegen Sie rechts ab und gehen Sie zu den Treppen",
            "Gehen Sie die Treppe hinunter und biegen Sie links ab",
            "Gehen Sie geradeaus, bis Sie das zweite Tor links erreichen",
            "Gehen Sie hinein — dort ist die KOSTENLOSE Toilette 🎉"
        ],
        next: "➡️ Weiter",
        prev: "⬅️ Zurück"
    },

    it: {
        steps: [
            "Esci dal caffè e premi AVANTI",
            "Gira a destra e vai verso le scale",
            "Scendi le scale e gira a sinistra",
            "Vai dritto finché non raggiungi il secondo cancello a sinistra",
            "Entra — troverai il bagno PUBBLICO gratuito 🎉"
        ],
        next: "➡️ Avanti",
        prev: "⬅️ Indietro"
    },

    es: {
        steps: [
            "Sal del café y pulsa SIGUIENTE",
            "Gira a la derecha y ve hacia las escaleras",
            "Baja las escaleras y gira a la izquierda",
            "Sigue recto hasta llegar a la segunda puerta a la izquierda",
            "Entra — encontrarás el baño público GRATIS 🎉"
        ],
        next: "➡️ Siguiente",
        prev: "⬅️ Atrás"
    },

    fr: {
        steps: [
            "Sortez du café et appuyez sur SUIVANT",
            "Tournez à droite et allez vers les escaliers",
            "Descendez les escaliers puis tournez à gauche",
            "Allez tout droit jusqu'à la deuxième porte à gauche",
            "Entrez — vous verrez les toilettes publiques GRATUITES 🎉"
        ],
        next: "➡️ Suivant",
        prev: "⬅️ Retour"
    },

    ua: {
        steps: [
            "Вийдіть з кафе та натисніть ДАЛІ",
            "Поверніть праворуч і йдіть до сходів",
            "Спустіться сходами вниз і поверніть ліворуч",
            "Йдіть прямо, поки не побачите другі ворота зліва",
            "Зайдіть всередину — там є БЕЗКОШТОВНИЙ туалет 🎉"
        ],
        next: "➡️ Далі",
        prev: "⬅️ Назад"
    }

};

let currentLang = "en";
let step = -1;

const photos = [
    "img/top-stairs.jpg",
    "img/bottom-stairs.jpg",
    "img/gate.jpg",
    "img/toilet.jpg"
];

function chooseLanguage(lang) {

    currentLang = lang;
    step = -1;

    document.getElementById("language-screen").style.display = "none";
    document.getElementById("nav-screen").style.display = "flex";

    updateUI();
}

function nextStep() {

    step++;

    updateUI();
}

function prevStep() {

    if (step > -1) {
        step--;
        updateUI();
    }
}

function updateUI() {

    const t = translations[currentLang];

    // TEXT
    document.getElementById("step-text").innerText = t.steps[step + 1];

    // BUTTONS
    document.getElementById("nextBtn").innerText = t.next;
    document.getElementById("prevBtn").innerText = t.prev;

    // PHOTO
    const photoEl = document.getElementById("photo");

    if (step >= 0 && step < photos.length) {
        photoEl.src = photos[step];
        photoEl.style.display = "block";
    } else {
        photoEl.style.display = "none";
    }

    // FINISH (last step)
    if (step >= photos.length) {
        document.getElementById("step-text").innerText = t.steps[t.steps.length - 1];
        photoEl.style.display = "none";
    }
}