// initialize
function setInputLanguageBasedOnBrowser() {
    var browserLanguage = getBrowserLanguage();
    var inputLanguage = '';
    var inputMode = 'text';
    switch (browserLanguage) {
        case 'en-US':
        case 'en':
            inputLanguage = 'en';
            inputMode = 'text';
            break;
        case 'ko-KR':
        case 'ko':
            inputLanguage = 'ko';
            inputMode = 'kr';
            break;
        default:
            inputLanguage = 'en';
            inputMode = 'text';
            break;
    }
    var inputElements = document.querySelectorAll('input, textarea');
    inputElements.forEach(function (element) {
        var inputElement = element;
        inputElement.setAttribute('lang', inputLanguage);
        inputElement.setAttribute('inputmode', inputMode);
    });
    createTextBox(browserLanguage);
}
// text box(cursor)
function createTextBox(language) {
    var existingBox = document.querySelector('.cursor-textbox');
    if (existingBox) {
        existingBox.remove();
    }
    var cursorBox = document.createElement('div');
    cursorBox.classList.add('cursor-textbox');
    var textContent = '';
    switch (language) {
        case 'en-US':
            textContent = 'EN';
            break;
        case 'ko-KR':
            textContent = 'KO';
            break;
        default:
            textContent = 'EN';
            break;
    }
    var textNode = document.createTextNode(textContent);
    cursorBox.appendChild(textNode);
    document.body.appendChild(cursorBox);
    window.addEventListener('mousemove', function (event) {
        updateCursorBoxPosition(cursorBox, event.pageX, event.pageY);
    });
}
function updateCursorBoxPosition(cursorBox, x, y) {
    cursorBox.style.left = "".concat(x + 15, "px");
    cursorBox.style.top = "".concat(y + 20, "px");
    cursorBox.style.opacity = '1';
}
function getBrowserLanguage() {
    var language = navigator.language || navigator.userLanguage;
    return language;
}
function handleMouseEnter() {
    var browserLanguage = getBrowserLanguage();
    createTextBox(browserLanguage);
}
function handleMouseLeave() {
    var existingBox = document.querySelector('.cursor-textbox');
    if (existingBox) {
        existingBox.style.opacity = '0';
    }
}
function handleLanguageToggle(event) {
    var _a;
    if (event.code === 'CapsLock' || event.code === 'HangulMode') {
        var existingBox = document.querySelector('.cursor-textbox');
        if (existingBox) {
            var currentLanguage = (_a = existingBox.textContent) === null || _a === void 0 ? void 0 : _a.trim();
            var newLanguage = 'en-US'; // 기본은 영어
            if (currentLanguage === 'EN') {
                newLanguage = 'ko-KR';
            }
            existingBox.textContent = newLanguage === 'en-US' ? 'EN' : 'KO';
        }
    }
}
window.onload = function () {
    // 페이지가 로드되면 브라우저 언어에 맞게 입력 언어 설정
    setInputLanguageBasedOnBrowser();
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('scroll', handleMouseLeave);
    document.addEventListener('keydown', handleLanguageToggle);
};
