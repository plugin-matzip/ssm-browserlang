// initialize
function setInputLanguageBasedOnBrowser(): void {
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

    const inputElements = document.querySelectorAll('input, textarea');
    
    inputElements.forEach((element) => {
        const inputElement = element as HTMLInputElement | HTMLTextAreaElement;
        inputElement.setAttribute('lang', inputLanguage);
        inputElement.setAttribute('inputmode', inputMode);
    });

    createTextBox(browserLanguage);
}

// text box(cursor)
function createTextBox(language: string): void {
    const existingBox = document.querySelector('.cursor-textbox');
    if (existingBox) {
        existingBox.remove();
    }

    const cursorBox = document.createElement('div');
    cursorBox.classList.add('cursor-textbox');
    
    var textContent: string = '';
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
    
    const textNode = document.createTextNode(textContent);
    cursorBox.appendChild(textNode);
    document.body.appendChild(cursorBox);
    
    window.addEventListener('mousemove', (event: MouseEvent) => {
        updateCursorBoxPosition(cursorBox, event.pageX, event.pageY);
    });

}

function updateCursorBoxPosition(cursorBox: HTMLDivElement, x: number, y: number): void {
    cursorBox.style.left = `${x + 15}px`;
    cursorBox.style.top = `${y + 20}px`;
    cursorBox.style.opacity = '1';
}

function getBrowserLanguage(): string {
    const language = navigator.language || (navigator as any).userLanguage;
    return language;
}

function handleMouseEnter(): void {
    const browserLanguage = getBrowserLanguage();
    createTextBox(browserLanguage);
}

function handleMouseLeave(): void {
    const existingBox = document.querySelector('.cursor-textbox') as HTMLDivElement;
    if (existingBox) {
        existingBox.style.opacity = '0';
    }
}

function handleLanguageToggle(event: KeyboardEvent): void {
    if (event.code === 'CapsLock' || event.code === 'HangulMode') {
        const existingBox = document.querySelector('.cursor-textbox') as HTMLDivElement;
        if (existingBox) {
            var currentLanguage = existingBox.textContent?.trim();
            var newLanguage = 'en-US'; // 기본은 영어

            if (currentLanguage === 'EN') {
                newLanguage = 'ko-KR';
            }
            existingBox.textContent = newLanguage === 'en-US' ? 'EN' : 'KO';
        }
    }
}

window.onload = () => {
    // 페이지가 로드되면 브라우저 언어에 맞게 입력 언어 설정
    setInputLanguageBasedOnBrowser();
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('scroll', handleMouseLeave);
    document.addEventListener('keydown', handleLanguageToggle);
};