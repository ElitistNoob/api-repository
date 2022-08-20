import { renderAPI, renderCategories } from './html.js'
import { searched, filterFunc } from './utils.js'

// const searchBar = document.getElementById('search-bar').value = ""
const modeSwitch = document.getElementById('mode')
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
if (currentMode === null || currentMode === 'dark') {
  bodyClassList.add('dark')
} else if (currentMode === 'light') {
  bodyClassList.add('light')
} 

modeSwitch.addEventListener('click', () => {
  resetTheme()
})

const resetTheme = () => {
  if (modeSwitch.checked) {
    bodyClassList.remove('dark')
    bodyClassList.add('light')
    localStorage.removeItem('mode', 'dark')
    localStorage.setItem('mode', 'light')
  } else {
    bodyClassList.remove('light')
    bodyClassList.add('dark')
    localStorage.removeItem('mode', 'light')
    localStorage.setItem('mode', 'dark')
  }
}