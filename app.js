
const userInput = document.querySelector('.input-box input');
const searchBtn = document.querySelector('button');
const showContainer = document.querySelector('.main-container');


const getWord =  async (userWord) => {
     try{
          const Wordsdata = `https://api.dictionaryapi.dev/api/v2/entries/en/${userWord}`;
          const res = await fetch(Wordsdata)
          const data = await res.json()
          showWorddata(data,userWord);
     }
     catch{
          showContainer.innerHTML = "<h2>Server Error?</h2>"
     }
}

const showWorddata = (word_data,userWord) => {
     console.log(word_data);
     showContainer.innerHTML = "<h2>Finding Word...</h2>"
     setTimeout(() => {
               if(word_data.title == "No Definitions Found"){
                      showContainer.innerHTML = "<h2>Word not found</h2>"
                      return false;
               }
             showContainer.innerHTML = `

               <div class='word-container'>
               <p>Word : ${word_data[0].word}</p>
                <div class='mic'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
                </div>
               </div>


               <p>PartofSpeech : ${word_data[0].meanings[0].partOfSpeech}</p>
               <p>Definiton : ${word_data[0].meanings[0].definitions[0].definition}</p>
               <p>More About ${word_data[0].word}? <a href=${word_data[0].sourceUrls[0]}>Click Here!!</a></p>
             `
             const wordSay = document.querySelector('.mic svg');
             wordSay.addEventListener('click',() => {
               SayWord(userWord,word_data);
             })
     }, 2000);
     
}

const SayWord = (word,word_data) => {
     const utter = new window.SpeechSynthesisUtterance(word_data[0].meanings[0].definitions[0].definition);
     utter.lang = "en-US"
     window.speechSynthesis.speak(utter)
     console.log(utter);
}

searchBtn.addEventListener('click',() => {
     if(!userInput.value == ''){
          getWord(userInput.value)
          setTimeout(() => {
               userInput.value = ''
          }, 1000);
     }
     else{
          alert('Enter word in this input box.')
     }
})


const greetingVoice = () => {
     const greetMsg = new window.SpeechSynthesisUtterance("Initializing Dictionary")
     greetMsg.lang = "en-US"
     window.speechSynthesis.speak(greetMsg)
}

greetingVoice();

