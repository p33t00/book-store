import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Store from '../../Store.js'
import Card from '../../Card.js'

window.onload = () => {
  document.querySelector('#staticBackdrop').addEventListener('show.bs.modal', event => {
    const book = Store.getBook(event.relatedTarget.parentNode.dataset.id)
    const dataID = document.querySelector('#single-item-modal')
    const headerNode = document.querySelector('#single-item-modal .modal-header h2.modal-title span')
    const imageNode = document.querySelector('#single-item-modal .modal-body img')
    const titleNode = document.querySelector('#single-item-modal .modal-body .card-body .card-title')
    const textNode = document.querySelector('#single-item-modal .modal-body .card-body .card-text')
    const authorNode = document.querySelector('#single-item-modal .modal-body .list-group .modal-author-field')
    const categoryNode = document.querySelector('#single-item-modal .modal-body .list-group .modal-category-field')

    dataID.dataset.id = book.id
    headerNode.innerText = book.price.toFixed(2)
    imageNode.src = book.img
    titleNode.innerText = book.title
    textNode.innerText = book.description
    authorNode.innerText = book.author
    categoryNode.innerText = book.category
  })

  const buildContentDOM = (data) => {
    document.querySelector('#content').innerHTML = data.map(b => {
      return `<div class="item-list-card card col-auto mx-auto p-0 border border-0" data-id=${b.id}>
        <img src="${b.img}" class="card-img-top" data-bs-toggle="modal" data-bs-target="#staticBackdrop" alt="...">
        <div class="pb-2 mt-auto">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Author: <span>${b.author}</span></li>
            <li class="list-group-item">Category: <span>${b.category}</span></li>
          </ul>
          <button class="btn btn-outline-success btn-buy col-2 mt-3" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
          </button>
          <span>$ ${b.price.toFixed(2)}</span>
        </div>
      </div>`
    }).join('')
  }

  buildContentDOM(Store.getSortedContent())

  document.querySelector('#btn-card').addEventListener('click', event => {
    createCardNodes()
    addBadgeClickListener()
    setTotal()
  })

  document.querySelectorAll('.btn-buy').forEach(btn => btn.addEventListener('click', event => {
    const id = Number(event.target.parentNode.parentNode.dataset.id);
    if (!Card.get(id)) { Card.set(Store.getBook(id))}
    Card.incrBookQty(id)
  }))

  const createCardNodes = () => {
    let listItems = ''
    for (const [k, book] of Object.entries(Card.getAll())) {
      listItems += `<li class="list-group-item text-start py-4" data-id=${book.id}>
        <h5 class="fw-bold">${book.title}</h5>
        <div class="d-flex justify-content-between align-items-center">
          <div class="col-3"><img src="${book.img}" class="img-thumbnail" alt="..."></div>
          <ul class="col-8">
            <li><span>${book.qty}</span> &#215; <span>${book.price.toFixed(2)}</span></li>
            <li>Total: $ <span>${(book.qty * book.price).toFixed(2)}</span></li>
          </ul>
          <span class="col-1 badge bg-danger rounded-pill">X</span>
        </div>
      </li>`
    }

    document.querySelector('#shopping-list').innerHTML = listItems
  }

  const addBadgeClickListener = () => {
    document.querySelectorAll('.badge').forEach(b => b.addEventListener('click', () => {
      const parent = event.target.parentNode.parentNode
      // setting qty to 0 before delete, sice its a reference to db object
      Card.resetBookQty(parent.dataset.id)
      // Deleting card item
      Card.deleteBook(parent.dataset.id)
      parent.remove()
      setTotal()
    }))
  }

  const setTotal = () => {
    let qty = 0
    let total = 0

    for (const [k, book] of Object.entries(Card.getAll())) {
      qty += book.qty
      total += book.price * book.qty
    }

    document.querySelector('#qty').innerText = qty
    document.querySelector('#total-price').innerText = total.toFixed(2)
  }

  document.querySelector('#clear-card').addEventListener('click', () => {
    Card.clearCard()
    document.querySelector('#shopping-list').innerHTML = ''
    document.querySelector('#qty').innerText = 0
    document.querySelector('#total-price').innerText = 0    
  })

  document.querySelector('#category-select').addEventListener('change', event => {
    Store.sortByCategory(event.target.value)
    buildContentDOM(Store.getSortedContent())
  })

  document.querySelector('#sort-select').addEventListener('change', event => {
    Store.setSortField(event.target.value)
    buildContentDOM(Store.getSortedContent())
  })

  document.querySelector('#order-select').addEventListener('change', event => {
    Store.setSortAsc(event.target.value === 'asc')
    buildContentDOM(Store.getSortedContent())
  })

  document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', event => {
    event.target.style.backgroundColor = "#02A95B"
    // original btn color: #198754
    setTimeout(() => {
      event.target.style.backgroundColor = null
    }, 200)
  }))
}