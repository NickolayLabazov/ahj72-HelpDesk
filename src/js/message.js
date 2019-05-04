import Product from './product.js';

const moment = require('moment');

moment.locale('ru');

class Message {
  constructor(div) {
    this.parent = div;
    this.form = 0;
    this.inputName = 0;
    this.inputCost = 0;
    this.buttonSave = 0;
    this.buttonCanc = 0;
    this.labelName = null;
    this.labelCost = null;
  }

  create() {
    this.form = document.createElement('form');
    this.parent.appendChild(this.form);
    this.form.setAttribute('class', 'message');
    this.labelName = document.createElement('label');
    this.labelCost = document.createElement('label');
    this.inputName = document.createElement('input');
    this.inputName.setAttribute('class', 'input');
    this.inputCost = document.createElement('input');
    this.inputCost.setAttribute('class', 'input');
    const buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('class', 'buttonDiv');
    this.buttonSave = document.createElement('button');
    this.buttonCanc = document.createElement('button');
    this.form.appendChild(this.labelName);
    this.form.appendChild(this.inputName);
    this.form.appendChild(this.labelCost);
    this.form.appendChild(this.inputCost);
    this.form.appendChild(buttonDiv);
    buttonDiv.appendChild(this.buttonSave);
    buttonDiv.appendChild(this.buttonCanc);
    this.labelName.innerHTML = 'Краткое описание';
    this.labelCost.innerHTML = 'Полное описание';
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
    this.buttonCanc.addEventListener('click', (event) => {
      event.preventDefault();
      this.removeMes();
    });
  }

  removeMes() {
    this.form.parentNode.removeChild(this.form);
  }
}

export class MessageEdit extends Message {
  constructor(div, prod, ticked) {
    super(div);
    this.product = prod;
    this.ticked = ticked;
  }

  saveLisstener() {
    this.buttonSave.addEventListener('click', (event) => {
      event.preventDefault();
      const ticked = { name: this.inputName.value, description: this.inputCost.value };
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `https://ahj71.herokuapp.com/?tickets/:${this.ticked.id}`);
      xhr.send(JSON.stringify(ticked));
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          this.product.editing(this.inputName.value, this.inputCost.value);
        }
      });
      this.removeMes();
    });
  }
}

export class MessageNew extends Message {
  constructor(div) {
    super(div);
  }

  saveLisstener() {
    this.buttonSave.addEventListener('click', (event) => {
      event.preventDefault();
      const day = moment().format('D MMMM YYYY');
      const ticked = {
        id: null, name: this.inputName.value, description: this.inputCost.value, status: false, created: day,
      };
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://ahj71.herokuapp.com');
      xhr.send(JSON.stringify(ticked));
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const parent = document.body.querySelector('.tab');
          ticked.id = JSON.parse(xhr.responseText);
          const product = new Product(parent, ticked);
          product.create();
        }
      });
      this.removeMes();
    });
  }
}

export class MessageDel extends Message {
  constructor(div, prod, ticked) {
    super(div);
    this.product = prod;
    this.ticked = ticked;
  }

  delMessage() {
    this.inputName.style.display = 'none';
    this.inputCost.style.display = 'none';
    this.labelName.innerHTML = 'Удалить тикет';
    this.labelCost.innerHTML = 'Вы уверены?';
  }

  saveLisstener() {
    this.buttonSave.addEventListener('click', (event) => {
      event.preventDefault();
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `https://ahj71.herokuapp.com/?tickets/:${this.ticked.id}`);
      xhr.send();
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          this.product.parent.removeChild(this.product.row);
        }
      });
      this.removeMes();
    });
  }
}
