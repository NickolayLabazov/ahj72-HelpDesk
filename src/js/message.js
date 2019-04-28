import Product from './product.js';

class Message {
  constructor(div) {
    this.parent = div;
    this.form = 0;
    this.inputName = 0;
    this.inputCost = 0;
    this.buttonSave = 0;
    this.buttonCanc = 0;
  }

  create() {
    this.form = document.createElement('form');
    this.parent.appendChild(this.form);
    this.form.setAttribute('class', 'message');
    const labelName = document.createElement('label');
    const labelCost = document.createElement('label');
    this.inputName = document.createElement('input');
    this.inputName.setAttribute('class', 'input');
    this.inputCost = document.createElement('input');
    this.inputCost.setAttribute('class', 'input');
    const buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('class', 'buttonDiv');
    this.buttonSave = document.createElement('button');
    this.buttonCanc = document.createElement('button');
    this.form.appendChild(labelName);
    this.form.appendChild(this.inputName);
    this.form.appendChild(labelCost);
    this.form.appendChild(this.inputCost);
    this.form.appendChild(buttonDiv);
    buttonDiv.appendChild(this.buttonSave);
    buttonDiv.appendChild(this.buttonCanc);
    labelName.innerHTML = 'Краткое описание';
    labelCost.innerHTML = 'Полное описание';
    this.buttonSave.innerHTML = 'Ок';
    this.buttonCanc.innerHTML = 'Отмена';
    try {
      this.inputName.value = this.product.cellProd.innerHTML;
      this.inputCost.value = this.product.product.description;
    } catch (e) {}
    this.saveLisstener();
    this.cancLisstener();
  }

  cancLisstener() {
    this.buttonCanc.addEventListener('click', () => {
      event.preventDefault();
      this.removeMes();
    });
  }

  removeMes() {
    document.body.removeChild(this.form);
  }
}

export class MessageEdit extends Message {
  constructor(div, prod) {
    super(div);
    this.product = prod;
  }

  saveLisstener() {
    this.buttonSave.addEventListener('click', () => {
      event.preventDefault();

     /*  let id = this.product.product.id;


      var xhr = new XMLHttpRequest();
      xhr.open("PUT", `http://localhost:7070/${id}`);
      xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
     
      xhr.send('text');

      xhr.addEventListener('load', () => {        
        if (xhr.status === 200) { 
          console.log(xhr.responseText);       
          //this.content(this.tickets);         
        } 
        });   
 */




      this.product.editing(this.inputName.value, this.inputCost.value);
      this.removeMes();
    });
  }
}

export class MessageNew extends Message {
  constructor(div) {
    super(div);
  }

  saveLisstener() {
    this.buttonSave.addEventListener('click', () => {
      event.preventDefault();
      
        
        let ticked = {id: null, name: this.inputName.value, description: this.inputCost.value, status: false, created: '1.01.01' }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:7070');
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  
        xhr.send(JSON.stringify(ticked)); 
      
        
           
      // event listener here
      xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const parent = document.body.querySelector('.tab');
            const product = new Product(parent, ticked);
            product.create();

              console.log('1');
          console.log(JSON.parse(xhr.responseText));
          } 
          });
      this.removeMes();
    });
  }
}
