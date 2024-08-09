

const darktheme = document.querySelector(".dark_mode");



darktheme.addEventListener("click", () => {
    
       let a =  document.body.classList.toggle("dark")
       if(a){
           localStorage.setItem("theme", "dark")
           let LightHtML  = `<b><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
           <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
         </svg>&nbsp;Light Mode</b>` 
          localStorage.setItem("themeHTML" , LightHtML  ) 
          darktheme.innerHTML = `${LightHtML}`
       }
       else{
        localStorage.removeItem("theme")

        let DarkHTML = `<b><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-moon"
        viewBox="0 0 16 16">
        <path
          d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
      </svg>&nbsp;Dark Mode</b>`
        localStorage.setItem("themeHTML" , DarkHTML  )
        darktheme.innerHTML = `${DarkHTML}`
      }
          
})



let all_card_apidata;

fetch('https://restcountries.com/v3.1/all').then((res) => {
  return res.json()
}).then((data) => {
         if(localStorage.getItem("theme") === "dark"){
           document.body.classList.add("dark") 
           }

          if(!localStorage.getItem("theme")){
            // darktheme.innerHTML = `${localStorage.getItem("themeHTML")}`
          }else{
            darktheme.innerHTML = `${localStorage.getItem("themeHTML")}`
          }
          
          HtmlCard(data);
        all_card_apidata = data
})

const filetvalue = document.querySelector(".form-select");

filetvalue.addEventListener("change", (e) => {
  let al = document.querySelector(".all-card-container");
  al.innerHTML = ``
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then((res) => {
    return res.json();
  }).then((data) => {
        HtmlCard(data)
  })

})

const search_value = document.querySelector(".search-input");
search_value.addEventListener("input" , (e) => {
  let al = document.querySelector(".all-card-container");
  al.innerHTML = ``
   const filter_data =  all_card_apidata.filter((e) => {
         return e.name.common.toLowerCase().includes(search_value.value.toLowerCase())
    })

    HtmlCard(filter_data)
})

function HtmlCard(apidata){
  
   apidata.forEach((e) => {
     
     const a = document.querySelector(".all-card-container");
  
     let cardHTML = `
 <div class="card countries  shadow-sm"  >
         <a href="./country.html?name=${e.name.common}" class="text-decoration-none anchor">
           <img src="${e.flags.svg}"
             class="card-img-top"  alt="img" height="150" width="100%">
           <div class="card-body">
             <h5 class="card-title fw-bolder mb-4">${e.name.common}</h5>
             <p class="card-text"><b>Population : </b>${e.population}</p>
             <p class="card-text"><b>Region : </b>${e.region}</p>
             <p class="card-text"><b>capital : </b>${e.capital?.[0]}</p>
           </div>
         </a>
       </div>
 `
 
     a.insertAdjacentHTML("beforeend", cardHTML);
   }); 
 }

