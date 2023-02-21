import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import * as data from '../../db.json'

const db = data.default
let card = [1,5,12,20]

// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'
// import bootstrap from 'bootstrap'

document.querySelector('#content').innerHTML = db.map(b => {
  return `<div class="item-list-card card col-auto mx-auto p-0 border border-0">
    <img src="${b.img}" class="card-img-top" data-bs-toggle="modal" data-bs-target="#staticBackdrop" alt="...">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Author: <span>${b.author}</span></li>
      <li class="list-group-item">Category: <span>${b.category}</span></li>
    </ul>
    <div class="pb-2 mt-auto">
      <button class="btn btn-outline-success col-2" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
          <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>
      </button>
      <span>$ ${b.price}</span>
    </div>
  </div>`
}).join('')

document.getElementById('shopping-list').innerHTML = db.filter(b => card.indexOf(b.id) > -1).map(b => {
  return `<li class="list-group-item text-start py-4">
    <h5 class="fw-bold">CSS for beginners beginners CSS for hi lo beginners CSS for b CSS for beginners beginners CSS for hi lo beginners CSS for b</h5>
    <div class="d-flex justify-content-between align-items-center">
      <div class="col-3"><img src="./public/img/book.jpeg" class="img-thumbnail" alt="..."></div>
      <ul class="col-8">
        <li><span>23</span> &#215; <span>34.27</span></li>
        <li>Total: <span>$ 68.55</span></li>
      </ul>
      <span class="col-1 badge bg-danger rounded-pill">X</span>
    </div>
  </li>`
}).join('')