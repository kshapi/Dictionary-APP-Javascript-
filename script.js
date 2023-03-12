const audio = document.querySelector('audio');
const word = document.querySelector('.word h3');
const meaning = document.querySelector('.meaning h3');
const search = document.querySelector('.search input');
const playBtn = document.querySelector('.icon');
const btn = document.querySelector('.btn');

let src = null;

btn.addEventListener('click',dictionary);
playBtn.addEventListener('click',play);


async function dictionary () {
  //when response not came
  word.innerText = 'Searching'
  meaning.innerText = '...?'
  
  //use try catch when using fetch
  try {
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+ search.value;
    const response = await fetch(url);
    //Error Handling 
    if (!response.ok) {
      //if response.ok is false than throw a error
      throw new Error('Try Again !');
     };
     //convert response to json format
    const data = await response.json();
    //Show data to User
    word.innerText = data[0].word.toUpperCase();
    meaning.innerText = data[0].meanings[0].definitions[0].definition;
    //Audio source 
    src = data[0].phonetics[0].audio;
    
    if (src) {
      audio.src = src;
      document.querySelector('.fa-solid').style.color = 'black';
      document.querySelector('.audio span').innerText = 'Audio';
    };
    
    search.value = '';
  }catch (err) {
    //Showing Error to user
    word.innerText = 'Error !';
    meaning.innerText = `Somthing Wrong Try Again`;
  };
  
}

search.addEventListener('input',()=> {
  src = null;

});

function play (e){
  const text = e.target.innerText;
  const clas = e.target.classList[0];
    //When someone click on icon play audio
    if (src) {
       if (text == 'Audio' ||
         clas == 'fa-solid') {
         audio.play();
       };
    }else {
      //if no audio src no availble
      document.querySelector('.fa-solid').style.color = 'red';
      document.querySelector('.audio span').innerText = 'Audio Not Availble';
    };
    
}

//kshapi