const searchParams = new URLSearchParams(window.location.search).get("name");;

fetch(`https://restcountries.com/v3.1/name/${searchParams}?fullText=true`).then((res) => {
    return res.json();
}).then((data) => {

       data.forEach(e => {
        let a = document.querySelector(".all-card");

        let b = Object.values(e.name.nativeName);
        let c = Object.values(e.currencies);
        let d = Object.values(e.languages); 



        let Card_Html = `
        <div class="col-5 ">
        <img
          src="${e.flags.svg}"
          class="coutry-img" />
      </div>
      <div class="col   ">
        <div class="d-flex  flex-column   mx-5    ">
          <div>
            <h2 class="py-4">${e.name.common}</h2>
          </div>
          <div class=" d-flex flex-column flex-wrap  card-box">
            <p><b>Native Name :</b>${b ? b[0].common : "suzair"}</p>
            <p><b>Population :</b>${e.population}</p>
            <p><b>Region :</b>${e.region}</p>
            <p><b>Sub Region :</b>${e.subregion}</p>
            <p><b>Capital :</b>${e.capital}</p>
            <p><b>Top Level Domain :</b>${e.tld.join(",         ")}</p>
            <p><b>Currencies :</b>${c ? c[0].name : "not avialable"}</p>
            <p><b>Languages :</b>${ d ? d[0] : "Not avialable"}</p>
          </div>
        </div>

        <div   class="row  footer-card ">
        <div class=" d-flex   " >

        <p class=" Border mx-5  d-flex align-items-center flex-wrap justify-content-around  "><b>Border :</b> 

        ${e.borders.map((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => {
                return res.json();
            }).then((data) => {

                 data.forEach(e => {
                    let a = document.querySelector(".Border");
                    let borderHtml = `<p class="border light mx-3 my-2  p-1 px-2 rounded"><a href="/country.html?name=${e.name.common}">${e.name.common}<a/><p/>`
                    a.insertAdjacentHTML("beforeend" , borderHtml )
                 });
                 
            })
           
        })}

         </p>
             </div>
             </div>

        `

      
   
         a.insertAdjacentHTML("beforeend" , Card_Html )
      
       });
 

})