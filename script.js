const languages = {

    en: {
        start: "Go outside the cafe and click NEXT",
        next: "Next →",
        prev: "← Previous",
        finish: "🎉 Congrats! Enjoy!"
    },

    cz: {
        start: "Vyjděte z kavárny a klikněte na DALŠÍ",
        next: "Další →",
        prev: "← Zpět",
        finish: "🎉 Gratulujeme!"
    },

    de: {
        start: "Gehen Sie aus dem Café und klicken Sie auf WEITER",
        next: "Weiter →",
        prev: "← Zurück",
        finish: "🎉 Viel Spaß!"
    },

    it: {
        start: "Esci dal caffè e premi AVANTI",
        next: "Avanti →",
        prev: "← Indietro",
        finish: "🎉 Buon divertimento!"
    },

    es: {
        start: "Salga del café y presione SIGUIENTE",
        next: "Siguiente →",
        prev: "← Atrás",
        finish: "🎉 Disfruta!"
    },

    fr: {
        start: "Sortez du café et cliquez sur SUIVANT",
        next: "Suivant →",
        prev: "← Retour",
        finish: "🎉 Profitez!"
    },

    ua: {
        start: "Вийдіть з кафе та натисніть ДАЛІ",
        next: "Далі →",
        prev: "← Назад",
        finish: "🎉 Гарного дня!"
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

    document.getElementById("language-screen").style.display = "none";
    document.getElementById("nav-screen").style.display = "block";

    document.getElementById("step-text").innerHTML = languages[lang].start;

}

function nextStep() {

    step++;

    if(step >= photos.length){

        document.getElementById("step-text").innerHTML =
            languages[currentLang].finish;

        document.getElementById("photo").style.display = "none";
        return;
    }

    document.getElementById("photo").src = photos[step];
    document.getElementById("photo").style.display = "block";

}

function prevStep(){

    if(step > 0){
        step--;
        document.getElementById("photo").src = photos[step];
    }

}