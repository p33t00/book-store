import * as data from './db.json'

const db = data.default
let contentState = db
let sortField = 'title'
let sortAsc = true

const getBook = (bookID) => {
  return db.find(b => b.id == bookID)
}

const sortByCategory = (cat) => {
  contentState = cat === 'all' ? db : db.filter(i => i.category.toLowerCase() === cat)
  // return contentState
}

const getSortedContent = () => sortContent(sortField, contentState, sortAsc)

const sortContent = (sortField, data, asc) => {
  contentState = data.sort(_sortAlgo(sortField, asc))
  return contentState
}

const setSortField = (val) => { sortField = val }

const setSortAsc = (val) => {
  if (typeof val !== "boolean") {
    sortAsc = null
    console.error("Attempt to store invalid value type to setSortAsc") 
  } else {
    sortAsc = val
  }
}

const _sortAlgo = (sortField, asc) => {
  let ra = 1 
  let rb = 1

  if (asc) rb *= -1
  else ra *= -1

  return (a,b) => a[sortField] > b[sortField] ? ra : rb
}

export default { getBook, getSortedContent, sortByCategory, setSortField, setSortAsc }