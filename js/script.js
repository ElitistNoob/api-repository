import { renderAPI, renderCategories } from './html.js'
import { searched, filterFunc } from './utils.js'

// const searchBar = document.getElementById('search-bar').value = ""
const clickHandler = document.getElementById('mode')
const bodyClassList = document.body.classList
let currentMode = localStorage.getItem('mode')

const getAPICategories = async () => {
  const res = await fetch('https://api.publicapis.org/categories')
  const categories = await res.json()
  return categories
}

const getAPIList = async () => {
  const res = await fetch(`https://api.publicapis.org/entries`)
  const api = await res.json()
  return api
}

getAPIList().then(renderAPI)

getAPICategories().then(categories => {
  renderCategories(categories)
  document.getElementById('search-bar').addEventListener('keyup', searched)
  filterFunc()
})


// SAVES THEME PREFERENCE TO LOCAL STORAGE IF  NO PREFERENCE WILL DEFAULT TO DARK
clickHandler.addEventListener('click', () => {
  resetTheme()
})

if (currentMode === 'light') {
  bodyClassList.add('light')
} else if (currentMode === null && bodyClassList.contains('')) {
  bodyClassList.removeAttribute('class')
}

const classSwitch = () => {
  if (bodyClassList.contains('light')) {
    bodyClassList.remove('light')
  } else {
    bodyClassList.add('light')
  } 
}

const resetTheme = () => {
  classSwitch()
  if (clickHandler.checked) {
    localStorage.removeItem('mode', 'light')
  } else {
    localStorage.setItem('mode', 'light')
  }
}
