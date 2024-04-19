const inputf = document.querySelector('.input-text')
const typingText = document.querySelector('.type-text')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistakes span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const button = document.querySelector('button')


let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;


function loadParagraph(){
    const paragraph = ["A quick brown fox jumps over the lazy dog","Lorem ipsum dolor sit amet, consectetur adipisicing elit.","Rem at, sit eveniet officia laudantium hic. Pariatur,","Assumenda eveniet natus labore accusamus nisi?","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum","The standard chunk of Lorem Ipsum used since the 1500s is reproduced below","Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum","Various versions have evolved over the years, sometimes by accident, sometimes on purpose","But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system,"];

    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML="";
    for(const char of paragraph[randomIndex]){
        console.log(char)
        typingText.innerHTML+=`<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>
        inputf.focus()
    );
    typingText.addEventListener("click",()=>inputf.focus())
}

function initTyping(){
    const char = typingText.querySelectorAll("span")
    const typedChar = inputf.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }
        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct')
            console.log("correct")
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect')
            console.log("incorrect")
        }
        charIndex++;
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }
    else{
        clearInterval(timer);
        inputf.value='';    
    }
}

function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        var wpm1 = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
        wpm.innerText = wpm1;
    }
    else{

        clearInterval(timer);
    }
    
}
function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
    time.innerText = 60;
}
inputf.addEventListener("input",initTyping);
button.addEventListener("click",reset);
loadParagraph();
