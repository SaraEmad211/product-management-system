//get total
//create product  + clear form inputs
//save in local storage
//read (displat data)
//count 
//delete
//update
//search
//validation input


let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let btndelete =document.getElementById('deleteall');

let mode='Create';
let tmp;
function gettotal(){
     let result;
    if(price.value !=''){
      result= (+price.value + +taxes.value+ +ads.value)- +discount.value;
       total.innerHTML=result;
       total.style.background='rgba(11, 224, 11, 1)'
    }
    else{
        total.innerHTML='';
        total.style.background='#a00d02'
    }
   
}
let datapro=[];
if(localStorage.product!=null){
  datapro= JSON.parse(localStorage.product);
}
 

 submit.onclick =function(){

  let newpro=
  {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase()

  }
  if(title.value!='' && price.value!=''&& category.value!='' && newpro.count <100 && newpro.count>0){
      if(mode=='Create'){
  if(count.value>1){
      for(let i=0;i<count.value;i++){ datapro.push(newpro);}

  }
 else {datapro.push(newpro);}
  }
  else{
    datapro[tmp]=newpro;
    mode="Create";
    submit.innerHTML="Create";
    count.style.display='block';
   
  }
    clearform();
  }


  localStorage.setItem('product',JSON.stringify(datapro));

   gettotal();
  showdata();
 }

 function clearform(){
title.value='';
   price.value='',
   taxes.value='',
    ads.value='',
    discount.value='',
  total.innerHTML='',
  count.value='',
   category.value=''
 }
function showdata(){
let table='';
for(let i=0;i<datapro.length;i++){
  table+=`
     <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="update_pro(${i})" class="update">update</button></td>
    <td><button onclick="delete_pro(${i})" class="delete">delete</button></td>
  </tr>
  `
 

;
}
document.getElementById('tbody').innerHTML=table;
if(datapro.length>0){
  btndelete.innerHTML=`<button onclick="delete_All()">Delete All</button>`;

}
else{
    btndelete.innerHTML=``;

}
}
showdata();


function delete_pro (i){
  datapro.splice(i,1);
  localStorage.product =JSON.stringify(datapro);
  showdata();
}

function delete_All(){
  //localStorage.clear();
 // datapro.slice(0); wrong
// datapro = []; true
  localStorage.removeItem('product');
datapro.splice(0);  //true
  showdata();

}

function update_pro(i){
title.value=datapro[i].title;
   price.value=datapro[i].price;
   taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
  total.innerHTML=datapro[i].total;
  count.style.display='none';
   category.value=datapro[i].category;

gettotal();
submit.innerHTML='Update';
mode='Update';
tmp=i;
scroll({
  top:0,
  behavior:"smooth"
})
   //showdata();
}


let searchmode="title";
function get_searchmode(id){
  let search=document.getElementById('search');
if(id=="searchtitle"){
  searchmode='title';
}
else{
  searchmode='category';
}
  search.placeholder='Search By '+ searchmode;

search.focus();
search.value='';
showdata();
}

function SearchData(value){
  table='';

if(searchmode=="title"){
for(let i=0;i<datapro.length;i++)
{
  
  if(datapro[i].title.includes(value.toLowerCase())){
  table+=`
     <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="update_pro(${i})" class="update">update</button></td>
    <td><button onclick="delete_pro(${i})" class="delete">delete</button></td>
  </tr>
  `
 

;  }
}


}
else{
  for(let i=0;i<datapro.length;i++)
{
  
  if(datapro[i].category.includes(value.toLowerCase())){
  table+=`
     <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="update_pro(${i})" class="update">update</button></td>
    <td><button onclick="delete_pro(${i})" class="delete">delete</button></td>
  </tr>
  `
 

;  }
}

}
document.getElementById('tbody').innerHTML=table;

}




