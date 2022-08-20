const searchBar = document.getElementById('search-bar')
const navHeight = document.querySelector('.sidebar').offsetHeight
const toggle = document.getElementById('mode')
let currentCategory = ""
searchBar.value = ""

document.documentElement.style.setProperty('--nav-padding', navHeight + 1 + "px")

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

// Returns API Html
const getAPIHtml = (api) => {
  const { API, Description, Auth, HTTPS, Cors, Link, Category} = api
  return `
    <a href="${Link}" target="_blank">
      <div class="api__card">
          <h3 class="api__title">${API}</h3>
          <p class="api__desc">${Description}</p>
          <div class="wrapper">
            <p class="api__auth ${Auth ? "show" : "hide"}" style="background-color: #224431;">${Auth}</p>
            <p class="api__https ${HTTPS ? "show" : "hide"}" style="background-color: #315E44;":>HTTPS</p>
            <p class="api__cors ${Cors ? "show" : "hide"}" style="background-color: #417B5A;">Cors</p>
          </div> 
          <p class="api__category">${Category}</p>
      </div>
    </a>
  `
}

// Render Api on page
const renderAPI = (api) => {
  const dataMap = api.entries.map(getAPIHtml).join('')
  document.getElementById('apis-list').innerHTML = `
    <div class="api-container">
     <h2 class="api-container-h1">${currentCategory ? currentCategory : "All APIs"}</h2>
      ${dataMap}
    </div>
  `
}

// Returns Category Html
const getCategoryHtml = (categories) => {
    return `<div class="category">${categories}</div>`
}

// render Category Html
const renderCategories = (categories) => {
  const categoryMap = categories.categories.map(getCategoryHtml).join('')
  document.querySelector('.categories-menu').innerHTML += `
  <div class="category">All</div>
      ${categoryMap}
    `
}

// Seach Bar
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

getAPIList().then(renderAPI)

getAPICategories().then(categories => {
  renderCategories(categories)
  document.getElementById('search-bar').addEventListener('keyup', searched)
  filterFunc()
})

toggle.addEventListener('click', () => {
  document.body.classList.toggle('light')
})