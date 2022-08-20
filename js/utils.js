import { renderAPI } from './html.js'

const searchBar = document.getElementById('search-bar')
searchBar.value = ""
let currentCategory = "" 

// RETURNS MENU's HEIGHT AS A PROPERTY
const navHeight = document.querySelector('.sidebar').offsetHeight
document.documentElement.style.setProperty('--nav-padding', navHeight + 1 + "px")

// SEARCH BAR - filters through categories and hides irrelevant categories
const searched = (e) => {
  let searchCategories = e.target.value.toLowerCase()
  let allCategories = document.querySelectorAll('.category')

  Object.keys(allCategories).map(e => {
    const currentSearch = allCategories[e].textContent.toLowerCase()

    currentSearch.includes(searchCategories) ?
      allCategories[e].style.display = "block" :
      allCategories[e].style.display = "none"
    
      allCategories[0].style.display = "block"
  })
}

const filterFunc = () => {
  document.querySelectorAll('.category').forEach(i => {
    i.addEventListener('click', async () => {
      currentCategory = i.textContent
      if (currentCategory === "All") {
        searchBar.value = ""
        location.reload()
      } else {
        const res = await fetch(`https://api.publicapis.org/entries?category=${currentCategory}`)
        const filteredAPI = await res.json()
        renderAPI(filteredAPI)
      }
    })
  })
}

export { searched, filterFunc, currentCategory } 