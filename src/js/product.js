import { MessageEdit } from './message';

export default class Product {
  constructor(div, ticket) {
    this.parent = div;
    this.product = ticket;
    //this.price = price;
    this.cellProd = 0;
    this.cellPrice = 0;
    this.cellEdit = 0;
    this.edit = 0;
    this.del = 0;
    this.row = 0;
  }

  create() {    
    this.row = document.createElement('tr');
    this.parent.appendChild(this.row);
    this.cellProd = document.createElement('td');
    this.cellPrice = document.createElement('td');
    this.cellEdit = document.createElement('td');
    this.edit = document.createElement('span');
    this.del = document.createElement('span');
    this.edit.setAttribute('class', 'edit');
    this.del.setAttribute('class', 'edit');
    this.row.appendChild(this.cellProd);
    this.row.appendChild(this.cellPrice);
    this.row.appendChild(this.cellEdit);
    this.cellEdit.appendChild(this.edit);
    this.cellEdit.appendChild(this.del);
    this.cellProd.setAttribute('class', 'cell');
    this.cellPrice.setAttribute('class', 'cell');
    this.cellEdit.setAttribute('class', 'cell');
    this.inner();
    this.editLisstener();
    this.delLisstener();
  }

  inner() {
    this.cellProd.innerHTML = this.product.name;
    this.cellPrice.innerHTML = this.product.created;
    this.edit.innerHTML = '&#9998';
    this.del.innerHTML = '&#10060';
  }

  editLisstener() {
    this.edit.addEventListener('click', () => {
      const message = new MessageEdit(document.body, this);
      message.create();
    });
  }

  delLisstener() {
    this.del.addEventListener('click', () => {
      this.parent.removeChild(this.row);
    });
  }

  editing(productName, price) {
    this.cellProd.innerHTML = productName;
    //this.cellPrice.innerHTML = price;
    this.product = productName;
    this.price = Number(price);
  }
}
