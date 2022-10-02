const todoinput=document.querySelector("#todo");
const todoform=document.querySelector("#todo-form");
const todolist=document.querySelector(".list-group ");
const firstcardbody=document.querySelectorAll(".card-body")[0];
const secondcardbody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearbutton=document.querySelector("#clear-todos");

eventlistener();
function eventlistener(){
    todoform.addEventListener("submit",addtoodo);
    document.addEventListener("DOMContentLoaded",datayazici);
    secondcardbody.addEventListener("click",deleteder);
    filter.addEventListener("keyup",filters);
    clearbutton.addEventListener("click",hepsinisil);


}
function hepsinisil(){
    if(confirm("listeyi temizlemek istediğinize eminmisiniz")){
        // todolist.innerHTML="";
        while(todolist.firstElementChild != null){
            todolist.removeChild(todolist.firstElementChild);
        }
        localStorage.removeItem("todos");
        alerter("success","tum liste temizlendi");
    }





}
function deleteder(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        alerter("success","başarıyla silindi");
        tododatasilme(e.target.parentElement.parentElement.textContent);
        
        

    }

}
function filters(e){
    const filtervalue=e.target.value.toLowerCase();
    const listitem=document.querySelectorAll(".list-group-item")
    listitem.forEach(function(item){
        const text=item.textContent.toLowerCase();
        
        if(text.indexOf(filtervalue) === -1){
            item.setAttribute("style","display : none  !important")

        }else{
            item.setAttribute("style","display : block")
        }
    });


}
function tododatasilme(input){
    let todos;
    todos=todoal();
    todos.forEach(function(todo,index){
        if(todo===input){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addtoodo(e){
    const newtodo = todoinput.value.trim() ;
    
    if (newtodo === ""){
        alerter("danger","lütfen bir deger giriniz");
    }
    else{
        listeyeekle(newtodo);
        alerter("success","işlem başarılı");
        depoyatodoekle(newtodo);
        todoinput.value="";
    }

    e.preventDefault();
}

function datayazici(){
    let todos= todoal();
    todos.forEach(function(todo){
        listeyeekle(todo);
    })
}
function depoyatodoekle(input){
    let todos=todoal();
    todos.push(input);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function todoal(){
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];

    } else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
    return todos;


}

function alerter(type,message){
    const alertt=document.createElement("div");
    alertt.className="alert alert-"+type;
    alertt.textContent=message;
    alertt.style.marginTop="15px";
    
    firstcardbody.appendChild(alertt);  
    setTimeout(function(){
        // firstcardbody.removeChild(alertt);
        alertt.remove();

    },1000);

}

function listeyeekle(value){
    const listitem=document.createElement("li");
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class='fa fa-remove'></i>";
    listitem.className="list-group-item d-flex justify-content-between";
    
    listitem.appendChild(document.createTextNode(value));
    listitem.appendChild(link);

    todolist.appendChild(listitem);
}