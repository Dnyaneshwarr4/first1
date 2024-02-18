const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  const dropdowns = document.querySelectorAll(".dropdown select")
  const btn = document.querySelector("form button")
  const fromcurr= document.querySelector(".from select");
  const tocurr= document.querySelector(".to select");
  const msg = document.querySelector(".msg")

for (select of dropdowns){
  for(currcode in countryList){
    

    let newopt = document.createElement("option");
    newopt.innerText = (currcode);
    newopt.value = (currcode);
    if(select.name === "From" && currcode === "USD"){
      newopt.selected="selected";
    }else if(select.name === "To" && currcode === "INR"){
      newopt.selected = "selected";
    }
    select.append(newopt);

  }
  select.addEventListener("change", (evt)=>{
    updflag(evt.target);
  })
  
}

const updflag = (element) =>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    console.log(countrycode);
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    console.log(newsrc);
    let img = element.parentElement.querySelector("img");
    img.src=newsrc;
};

btn.addEventListener("click" , async(evt) =>{
  evt.preventDefault();
  let amt = document.querySelector(".Amount input");
  let val = amt.value;
  if(val === "" || val < 1){
    val = 1;
    amt.value ="1";
  }

  // console.log(fromcurr.value,tocurr.value)
  const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[tocurr.value.toLowerCase()]
  console.log(rate)

  let finalamt = val * rate;
  msg.innerText = `${val}${fromcurr.value} = ${finalamt}${tocurr.value}`;
})
