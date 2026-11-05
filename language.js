const translations = {
    en: {
        projectTitle: "Project Norway",
        home: "Home",
        aboutSchools: "About Schools",
        educationSystem: "Education System",
        projects: "Projects",
        cultural: "Cultural",
        language: "Language",
        welcome: "Welcome to our website! Here we share our journey and our collaboration with Erasmus+. We are a group of students from Norway and a group from the Netherlands, taking turns visiting each other and learning about different cultures and education systems. Explore the pages in the navigation bar above to find out more.",
        denBosch: "Den Bosch, the Netherlands",
        norwaySchool: "Our school in Norway",
        exchange: "Our exchange",
        exchangeDescription: "Learning about each other's schools and cultures.",
        experiences: "Our experiences",
        exchangePhotos: "Photos from our exchange",
        photoSlides: "Photo slides. Use the arrow keys to browse.",
        denBoschPhoto: "Picture of the school in Den Bosch",
        norwayPhoto: "Picture of the school in Norway",
        previousPhoto: "Previous photo",
        nextPhoto: "Next photo",
        choosePhoto: "Choose a photo",
        showPhoto: "Show photo {number}",
        slidePosition: "{number} of {total}",
        carouselRole: "carousel",
        slideRole: "slide"
    },
    nl: {
        projectTitle: "Project Noorwegen",
        home: "Home",
        aboutSchools: "Over de scholen",
        educationSystem: "Onderwijssysteem",
        projects: "Projecten",
        cultural: "Cultuur",
        language: "Taal",
        welcome: "Welkom op onze website! Hier delen we onze ervaringen en onze samenwerking met Erasmus+. We zijn een groep leerlingen uit Noorwegen en een groep uit Nederland. We bezoeken elkaar om de beurt en leren over verschillende culturen en onderwijssystemen. Bekijk de pagina's via de navigatiebalk hierboven voor meer informatie.",
        denBosch: "Den Bosch, Nederland",
        norwaySchool: "Onze school in Noorwegen",
        exchange: "Onze uitwisseling",
        exchangeDescription: "Kennismaken met elkaars scholen en culturen.",
        experiences: "Onze ervaringen",
        exchangePhotos: "Foto's van onze uitwisseling",
        photoSlides: "Fotogalerij. Gebruik de pijltjestoetsen om te bladeren.",
        denBoschPhoto: "Foto van de school in Den Bosch",
        norwayPhoto: "Foto van de school in Noorwegen",
        previousPhoto: "Vorige foto",
        nextPhoto: "Volgende foto",
        choosePhoto: "Kies een foto",
        showPhoto: "Toon foto {number}",
        slidePosition: "{number} van {total}",
        carouselRole: "carrousel",
        slideRole: "dia"
    },
    nb: {
        projectTitle: "Prosjekt Norge",
        home: "Hjem",
        aboutSchools: "Om skolene",
        educationSystem: "Utdanningssystemet",
        projects: "Prosjekter",
        cultural: "Kultur",
        language: "Språk",
        welcome: "Velkommen til nettsiden vår! Her deler vi reisen vår og samarbeidet med Erasmus+. Vi er en gruppe elever fra Norge og en gruppe fra Nederland. Vi bytter på å besøke hverandre og lærer om ulike kulturer og utdanningssystemer. Bruk navigasjonsmenyen ovenfor for å finne ut mer.",
        denBosch: "Den Bosch, Nederland",
        norwaySchool: "Skolen vår i Norge",
        exchange: "Utvekslingen vår",
        exchangeDescription: "Vi lærer om hverandres skoler og kulturer.",
        experiences: "Opplevelsene våre",
        exchangePhotos: "Bilder fra utvekslingen vår",
        photoSlides: "Bildegalleri. Bruk piltastene for å bla.",
        denBoschPhoto: "Bilde av skolen i Den Bosch",
        norwayPhoto: "Bilde av skolen i Norge",
        previousPhoto: "Forrige bilde",
        nextPhoto: "Neste bilde",
        choosePhoto: "Velg et bilde",
        showPhoto: "Vis bilde {number}",
        slidePosition: "{number} av {total}",
        carouselRole: "bildekarusell",
        slideRole: "bilde"
    }
};

const languageSelect = document.querySelector("#language-select");
const languageStorageKey = "project-norway-language";

function applyLanguage(language) {
    const selectedLanguage = Object.hasOwn(translations, language) ? language : "en";
    const messages = translations[selectedLanguage];
    document.documentElement.lang = selectedLanguage;
    languageSelect.value = selectedLanguage;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = messages[element.dataset.i18n];
    });

    ["aria-label", "aria-roledescription", "alt"].forEach((attribute) => {
        document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((element) => {
            const key = element.getAttribute(`data-i18n-${attribute}`);
            const text = messages[key]
                .replace("{number}", element.dataset.number ?? "")
                .replace("{total}", element.dataset.total ?? "");
            element.setAttribute(attribute, text);
        });
    });
}

let savedLanguage = "en";
try {
    savedLanguage = localStorage.getItem(languageStorageKey) ?? "en";
} catch {
    // Language selection also works when browser storage is unavailable.
}

applyLanguage(savedLanguage);
document.querySelector(".language-selector").hidden = false;

languageSelect.addEventListener("change", () => {
    applyLanguage(languageSelect.value);
    try {
        localStorage.setItem(languageStorageKey, languageSelect.value);
    } catch {
        // Keep the selected language for the current page without storage.
    }
});
