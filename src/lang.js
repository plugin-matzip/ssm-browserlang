const languageElement = document.getElementById("language");
const browserLang = navigator.language;

if(browserLang == "en-US"){
    languageElement.textContent = "EN";
} else if(browserLang == "ko-KR"){
    languageElement.textContent = "KO";
}
