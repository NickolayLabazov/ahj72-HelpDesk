import { MessageNew } from './message';
import Product from './product.js';

export default class Editor {
  constructor(div) {
    this.parent = div;
    this.table = 0;
    this.tickets = [];
  }

  create() {
    this.parent.innerHTML = '<div class = "name"><span class = "add">&#43</span></div>';
    this.table = document.createElement('table');
    this.table.setAttribute('class', 'tab');
    const head = document.createElement('tr');
    this.table.appendChild(head);
    this.parent.appendChild(this.table);
    this.ticketsLoad();
    this.addLisstener();
  }

  addLisstener() {
    const add = document.body.querySelector('.add');
    add.addEventListener('click', () => {
      const messageNew = new MessageNew(document.body);
      messageNew.create();
    });
  }

  content(array) {
    for (const ticket of array) {
      const row = new Product(this.table, ticket);
      row.create();
    }
  }

  ticketsLoad() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ahj71.herokuapp.com/?tickets');
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.tickets = JSON.parse(xhr.responseText);
        this.content(this.tickets);
      }
    });
  }
}
