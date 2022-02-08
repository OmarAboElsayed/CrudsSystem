let title = document.getElementById("title"),
  price = document.getElementById("price"),
  taxes = document.getElementById("taxes"),
  ads = document.getElementById("ads"),
  discount = document.getElementById("discount"),
  total = document.getElementById("total"),
  count = document.getElementById("Count"),
  catagory = document.getElementById("Category"),
  // create
  submit = document.getElementById("submit");
let input = document.getElementsByTagName("input");
let button = document.getElementsByTagName("button");
let mood="create";
let tmp;

//   dark mode
function myfunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  button.style.background = "red";
}
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.style.background = "rgb(168, 44, 13)";
  }
}
// Create product
let Datapro;
if (localStorage.product != null) {
  Datapro = JSON.parse(localStorage.product);
} else {
  Datapro = [];
}
submit.onclick = function () {
  let objpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    catagory: catagory.value,
    total: total.innerHTML,
  };
  // Count
  if(title.value !=''&&price.value!=''&&catagory.value!=''&&objpro.count<100){
  if(mood==="create"){
  if(objpro.count>1){
    for(let i=0;i<=objpro.count;i++){
      Datapro.push(objpro);
    }
  }
  else{
    Datapro.push(objpro);
  }
}else{
  Datapro[tmp]=objpro;
  mood="create";
  count.style.display="block";
  submit.innerHTML=`Create`;
}
clearInput();
  }
localStorage.setItem("product", JSON.stringify(Datapro));
  
  showdata();
};
function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  catagory.value = "";
  total.innerHTML = "";
}
function showdata() {
  let table = "";
  for (var i = 0; i < Datapro.length; i++) {
    table += `<tr>
      <td>${i+1}</td>
      <td>${Datapro[i].title}</td>
       <td>${Datapro[i].price}</td>
       <td>${Datapro[i].taxes}</td>
        <td>${Datapro[i].ads}</td>
       <td>${Datapro[i].discount}</td>
       <td>${Datapro[i].total}</td>
      
       <td>${Datapro[i].catagory}</td>
     <td><button id="update" onclick="updateData(${i})">UpDate</button></td>
    <td><button  id="delete" onclick="deleteData(${i})">Delete</button></td>
    </tr>
    `
  };

  document.getElementById("tbody").innerHTML = table;
  let btnDeleteAll = document.getElementById("deleteAll");
  if (Datapro.length > 0) {
    btnDeleteAll.innerHTML = `
    <button onclick="DeleteAll()">Delete All</button>
    `;
  } else {
    btnDeleteAll.innerHTML = ``;
  }
}
showdata();

// Delete Data
function deleteData(i) {
  Datapro.splice(i, 1);
  localStorage.product = JSON.stringify(Datapro);
  showdata();
}
// Delete All
function DeleteAll() {
  localStorage.clear();
  Datapro.splice(0);
  showdata();
}
//update data
function updateData(i){
  title.value=Datapro[i].title;
  price.value=Datapro[i].price;
  ads.value=Datapro[i].ads;
  discount.value=Datapro[i].discount;
  taxes.value=Datapro[i].taxes;
  catagory.value=Datapro[i].catagory;
  getTotal();
  count.style.display="none";
  submit.innerHTML=`Update`;
  mood="update";
  tmp=i;
  scroll({
    top:0,
    behavior:"smooth"
  })
}
// Search
let searchMood="title";
function getSearchMood(id){
  let search=document.getElementById("Search");
  if(id=="search-title"){

    searchMood="title";
    

  }else{
    searchMood="Category";
   }
   search.placeholder="Search By" +" "+searchMood;
  search.focus()
  search.value="";
  showdata();
}
function searchT(value){
  let table="";
  for(let i=0;i<Datapro.length;i++){
  if(searchMood=="title"){
    
      if(Datapro[i].title.includes(value)){
        table += `<tr>
        <td>${i}</td>
        <td>${Datapro[i].title}</td>
         <td>${Datapro[i].price}</td>
         <td>${Datapro[i].taxes}</td>
          <td>${Datapro[i].ads}</td>
         <td>${Datapro[i].discount}</td>
         <td>${Datapro[i].total}</td>
        
         <td>${Datapro[i].catagory}</td>
       <td><button id="update" onclick="updateData(${i})">UpDate</button></td>
      <td><button  id="delete" onclick="deleteData(${i})">Delete</button></td>
      </tr>
      `

      }
      
      
    }
  
  else{
    
      if(Datapro[i].catagory.includes(value)){
        table += `<tr>
        <td>${i}</td>
        <td>${Datapro[i].title}</td>
         <td>${Datapro[i].price}</td>
         <td>${Datapro[i].taxes}</td>
          <td>${Datapro[i].ads}</td>
         <td>${Datapro[i].discount}</td>
         <td>${Datapro[i].total}</td>
        
         <td>${Datapro[i].catagory}</td>
       <td><button id="update" onclick="updateData(${i})">UpDate</button></td>
      <td><button  id="delete" onclick="deleteData(${i})">Delete</button></td>
      </tr>
      `

      }
      
      
    

  }
}
  document.getElementById("tbody").innerHTML = table;

}