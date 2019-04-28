//console.log('it works!');

import Editor from './editor.js';

const editor = new Editor(document.body);
editor.create();

/* const subscribeWidget = document.querySelector('[data-widget=subscribe]');
const subscribeForm = subscribeWidget.querySelector('[data-id=subscribe-form]');
const nameInput = subscribeWidget.querySelector('[data-id=name]');
const phoneInput = subscribeWidget.querySelector('[data-id=phone]');


const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:7070');
xhr.open('GET', `http://localhost:7070/?tickets`);
xhr.send();

xhr.addEventListener('load', () => {
    //console.log(xhr.responseText);
    if (xhr.status === 200) {
    //    console.log('1');
    console.log(JSON.parse(xhr.responseText));
    } else {
        console.log('2');
    }
    });
    xhr.addEventListener('error', () => {
    console.log('3');
    })
    xhr.addEventListener('loadend', () => {
    
    });


    subscribeForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        
        let ticked = {id: 4, name: 'text4'}
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:7070');
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  
        xhr.send(JSON.stringify(ticked)); 
      
        
           
      // event listener here
      xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
              console.log('1');
          console.log(JSON.parse(xhr.responseText));
          } else {
              console.log('2');
          }
          });
          xhr.addEventListener('error', () => {
          console.log('3');
          })
          xhr.addEventListener('loadend', () => {
          
          });
      
      }); */

/* subscribeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const params = new URLSearchParams();
  Array.from(subscribeForm.elements)
  .filter(({ name }) => name)
  .forEach(({ name, value }) => params.append(name, value));
  const xhr = new XMLHttpRequest();
  //xhr.open('POST', 'http://localhost:7070');
 // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  
 // xhr.send(params); 

  xhr.open('GET', 'http://localhost:7070');
  xhr.open('GET', `http://localhost:7070/?${params}`);
  xhr.send();
     
// event listener here
xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
        console.log('1');
    console.log(xhr.responseText);
    } else {
        console.log('2');
    }
    });
    xhr.addEventListener('error', () => {
    console.log('3');
    })
    xhr.addEventListener('loadend', () => {
    
    });

}); */
       
       
       
       
 
       
    