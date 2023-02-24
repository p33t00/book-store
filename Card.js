const card = {}

const get = (id) => card[id]

const getAll = () => card

const set = (book) => { card[book.id] = book }

const resetBookQty = (id) => {
	if (card[id]) { card[id].qty = 0 }
	else { console.error('Cannot reset quantity on not existing book') }
}

const incrBookQty = (id) => { card[id].qty++ }

const deleteBook = (id) => { delete card[id] }

const clearCard = () => {
	for (let b in card) {
    card[b].qty = 0
    delete card[b]
  }
}

export default { get, getAll, set, incrBookQty, resetBookQty, deleteBook, clearCard }