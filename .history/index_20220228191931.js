console.log("Index.js");

const cities = [];

const searchBtn = document.querySelector(".searchBtn");
const clearBtn = document.querySelector(".clearBtn");
const input = document.querySelector(".input");
input.addEventListener("change", val);
let inpVal="";
function val() {
    inpVal = input.value;
    console.log(inpVal);
}
function findmatches(word, cities) {
    return cities.filter(place => {
        const regex = new RegExp(word, 'gi');
        return place.city.match(regex);
    });
}
searchBtn.addEventListener("click", display);
clearBtn.addEventListener("click", reset);
function display() {
    console.log("in dispaly func");

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json`, true);
    // xhr.open("GET","https://countriesnow.space/api/v0.1/countries",true);
   
    xhr.onprogress = function () {
        console.log("on Progress")
    }

    xhr.onload = function () {
        console.log("in dispaly func");
      
        
        if (this.status == 200) {
            // console.log(this.responseText);
            let obj = JSON.parse(this.responseText);
            // console.log(obj);
            cities.push(...obj);
            const match = findmatches(inpVal, obj);
            let list = document.querySelector(".content");
            let str = "";
            if (inpVal.length > 0) {
                if (match.length > 0) {
                    for (key in match) {
                        // const regex = new RegExp(inpVal, 'gi');
                        // const cityname= match[key].city.replace(regex,`<span class="h1">${inpVal}</span>`);
                        str += `<li style="color:white;
                            background-color: #ff1212;">City: ${match[key].city}<span>State : ${match[key].state}</span></li>
                                <li>Growth Rate : ${match[key].growth_from_2000_to_2013}<span>Population : ${match[key].population}</span></li>
                                <li style="margin-bottom:7px;">Latitude: ${match[key].latitude}<span>Longitude : ${match[key].longitude}</span></li>
                               `;
                    }
                    console.log(key+1);
                }
                else {
                    str += `<li>Sorry Not found</li>`;
                }
            }
            else { 
                str += `<li>Enter the city name for preview</li>`; 
            }
            list.innerHTML = str;  
        }
        else
           console.log("error");
    }
    xhr.send();
}
function reset() {
    let list = document.querySelector(".content");
    let str = "";
    list.innerHTML = str;
    let inp = document.querySelector(".input");
    inpVal="";
    inp.value = "";
}
