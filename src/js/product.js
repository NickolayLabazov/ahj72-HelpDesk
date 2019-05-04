import { MessageEdit, MessageDel } from './message';

export default class Product {
  constructor(div, ticket) {
    this.parent = div;
    this.product = ticket;
    this.cellProd = 0;
    this.cellPrice = 0;
    this.cellEdit = 0;
    this.edit = 0;
    this.del = 0;
    this.row = 0;
    this.status = null;
  }

  create() {
    this.row = document.createElement('tr');
    this.row.setAttribute('class', 'row');
    this.parent.appendChild(this.row);
    this.status = document.createElement('td');
    this.cellProd = document.createElement('td');
    this.cellPrice = document.createElement('td');
    this.cellEdit = document.createElement('td');
    this.edit = document.createElement('span');
    this.del = document.createElement('span');
    this.edit.setAttribute('class', 'edit');
    this.del.setAttribute('class', 'edit');
    this.row.appendChild(this.status);
    this.row.appendChild(this.cellProd);
    this.row.appendChild(this.cellPrice);
    this.row.appendChild(this.cellEdit);
    this.cellEdit.appendChild(this.edit);
    this.cellEdit.appendChild(this.del);
    this.status.setAttribute('class', 'status');
    if (this.product.status) {
      this.status.innerHTML = '&#10003';
    } else {
      this.status.innerHTML = '&#9711';
    }
    this.cellProd.setAttribute('class', 'cell');
    this.cellPrice.setAttribute('class', 'cell');
    this.cellEdit.setAttribute('class', 'cell');
    this.inner();
    this.editLisstener();
    this.delLisstener();
    this.cellProdLisstener();
    this.statusLisstener();
  }

  inner() {
    this.cellProd.innerHTML = this.product.name;
    this.cellPrice.innerHTML = this.product.created;
    this.edit.innerHTML = '&#9998';
    this.del.innerHTML = '&#10060';
  }

  editLisstener() {
    this.edit.addEventListener('click', () => {
      const message = new MessageEdit(document.body, this, this.product);
      message.create();
    });
  }

  delLisstener() {
    this.del.addEventListener('click', () => {
      const del = new MessageDel(document.body, this, this.product);
      del.create();
      del.delMessage();
    });
  }

  cellProdLisstener() {
    this.cellProd.style.cursor = 'pointer';
    this.cellProd.addEventListener('click', () => {
      try {
        this.cellProd.querySelector('.description').parentNode.removeChild(this.cellProd.querySelector('.description'));
      } catch (e) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://localhost:7070/?tickets/:${this.product.id}`);
        xhr.send();
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const description = document.createElement('p');
            description.setAttribute('class', 'description');
            description.innerHTML = xhr.response;
            this.cellProd.appendChild(description);
          }
        });
      }
    });
  }

  statusLisstener() {
    this.status.style.cursor = 'pointer';
    this.status.addEventListener('click', () => {
      const xhr = new XMLHttpRequest();
      xhr.open('PATCH', 'http://localhost:7070');
      xhr.send(this.product.id);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          if (xhr.response === 'false') {
            this.status.innerHTML = '&#9711';
          } else {
            this.status.innerHTML = '&#10003';
          }
        }
      });
    });
  }

  editing(productName, price) {
    this.cellProd.innerHTML = productName;
    this.price = Number(price);
  }
}
