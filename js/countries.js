const loadCountries = () => {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(data => displayCountries(data));
}
loadCountries();
// display Countries
const displayCountries = (countries) => {
    const countriesContainer = document.getElementById('countries');
    countries.slice(0, 20).reverse().map((country, index) => {
        const div = document.createElement('div');
        div.classList.add('country');
        div.innerHTML =
            `
    <img src="${country.flag}"><br>
    <strong>${country.name}</strong><br>
    <button onclick="loadCountryByName('${country.name}','${index}')" class="btn">Details</button>
    <div id='more-info-${index}'></div>
    `
        countriesContainer.appendChild(div);
    })
}

const loadCountryByName = (name, index) => {
    console.log(index)
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    fetch(url)
        .then((response) => response.json())
        .then(data => countryDetail(data, index));
}
// display details by Name
const countryDetail = (details, index) => {
    const moreInfo = document.getElementById(`more-info-${index}`);
    const detailContainer = document.createElement('div');
    moreInfo.textContent = ''; // clear previous value
    //or 
    //moreInfo.innerText = '';
    details.map(detail => {
        detailContainer.innerHTML =
            `
     Capital:
         ${detail.capital} <br>
     Nationality:
         ${detail.demonym} <br>
     Area:
         ${detail.area} <br>
     Population:
         ${detail.population} <br>
     Region:
         ${detail.region} <br>
     Sub-region:
         ${detail.subregion} <br>
     <div class="scroll">
         Timezones:
         ${detail.timezones}<br>
             <div>
                 `
        console.log(detail);
        moreInfo.appendChild(detailContainer);
    })


}