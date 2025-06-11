document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const header = document.getElementById('main-header');
    const body = document.body;
    const searchBox = document.getElementById('search-box');
    const drugInfoContainer = document.getElementById('drug-info-container');
    const langEnBtn = document.getElementById('lang-en');
    const langFaBtn = document.getElementById('lang-fa');

    // --- Dummy Database ---
    const dummyDB = {
        "aspirin": {
            "name": "Aspirin",
            "description_en": "Used to reduce pain, fever, or inflammation. It is also used as a blood thinner.",
            "description_fa": "برای کاهش درد، تب یا التهاب استفاده می‌شود. همچنین به عنوان رقیق کننده خون نیز به کار می‌رود."
        },
        "ibuprofen": {
            "name": "Ibuprofen",
            "description_en": "A nonsteroidal anti-inflammatory drug (NSAID) used for treating pain, fever, and inflammation.",
            "description_fa": "یک داروی ضدالتهاب غیراستروئیدی است که برای درمان درد، تب و التهاب استفاده می‌شود."
        },
        "paracetamol": {
            "name": "Paracetamol (Acetaminophen)",
            "description_en": "A common medication used to treat pain and fever.",
            "description_fa": "یک داروی رایج برای درمان درد و تب."
        }
    };
    
    let currentLang = 'en';

    // --- Theme Switcher ---
    header.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
    });

    // --- Language Switcher ---
    const updateLanguage = (lang) => {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.dataset[lang];
        });
        
        // Update placeholder text
        searchBox.placeholder = lang === 'en' ? 'Search for a drug...' : 'یک دارو را جستجو کنید...';
    };

    langEnBtn.addEventListener('click', () => updateLanguage('en'));
    langFaBtn.addEventListener('click', () => updateLanguage('fa'));


    // --- Search Functionality ---
    searchBox.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        drugInfoContainer.innerHTML = ''; // Clear previous results

        if (query.length === 0) {
            return; // Do nothing if search box is empty
        }

        const drug = dummyDB[query];

        if (drug) {
            const description = currentLang === 'fa' ? drug.description_fa : drug.description_en;
            drugInfoContainer.innerHTML = `
                <h2>${drug.name}</h2>
                <p>${description}</p>
            `;
        } else {
            const notFoundText = currentLang === 'fa' ? `دارویی با نام "${query}" یافت نشد.` : `No drug found for "${query}".`;
            drugInfoContainer.innerHTML = `<p>${notFoundText}</p>`;
        }
    });

    // Initialize with default language
    updateLanguage('en');
});
