const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Elon Musk",
  "Larry Page",
  "Sergey Brin",
  "Jeff Bezos",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Bernard Arnault & family",
  "Jensen Huang",
  "Warren Buffett",
  "Rob Walton & family",
];

const listItems = [];
let dragStartIndex;

createList();
function createList() {
  [...richestPeople].map(a=>({value:a,sort:Math.random()}))
  .sort((a, b) => a.sort - b.sort) 
  .map((a) => a.value)
  .forEach((person, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("over");
    listItem.setAttribute("data-index",index);
    

  
    
    listItem.innerHTML = `<span class="number">${index + 1}</span>
    <div class="dragabble" draggable="true">
    <p class="person-name">${person}</p>
    <i class="fa-solid fa-grip-lines"></i>
    </div>
    `;
    listItems.push(listItem);
    draggable_list.appendChild(listItem);
  });
  addEventListener();
}
function dragStart(){
  
  dragStartIndex=+this.closest("li").getAttribute("data-index");
}
function dragEnter(){

  this.classList.add("over");
}
function dragOver(e){
  e.preventDefault();
}
function dragLeave(){
  
  this.classList.remove("over");
}
function dragDrop(){
  
  const dropEndIndex=+this.getAttribute("data-index");
  swapItems(dragStartIndex,dropEndIndex);
  this.classList.remove("over");
}
function swapItems(fromIndex, toIndex){
 const currentNames=Array.from(document.querySelectorAll(".person-name")).map(p=>p.innerHTML.trim());
 const movedItem=currentNames.splice(fromIndex,1)[0];
 currentNames.splice(toIndex,0,movedItem);
 document.querySelectorAll(".person-name").forEach((p,index)=>{
    p.innerText=currentNames[index];
 });
 document.querySelectorAll(".draggable-list li").forEach(li=>{
    li.classList.remove("right","wrong");
 });
}
function checkorder(){
    const currentNamesElement=document.querySelectorAll(".person-name");
    currentNamesElement.forEach((nameElement,index)=>{
        const personName=nameElement.innerText.trim();
        const listItem=nameElement.closest("li");

          if(personName!==richestPeople[index]){
      listItem.classList.add("wrong");
      listItem.classList.remove("right");
    }
    else{
      listItem.classList.remove("wrong")
      listItem.classList.add("right")
    }
    })
  
}




function addEventListener() {
  const draggables=document.querySelectorAll(".dragabble");
  const dragListItems=document.querySelectorAll(".draggable-list li");

    draggables.forEach((draggable)=>{
      draggable.addEventListener("dragstart", dragStart);
  })


   dragListItems.forEach((item)=>{
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
  
}
check.addEventListener("click",checkorder);