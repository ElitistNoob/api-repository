import {currentCategory} from './utils.js'

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

export {renderCategories, renderAPI}