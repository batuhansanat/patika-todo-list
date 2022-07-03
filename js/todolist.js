//! Selectors

let todoListDOM = document.querySelector("#list")
let inputTaskDOM = document.querySelector("#taskInput")
let buttonDOM = document.querySelector("#liveToastBtn")
let successAlertDOM = document.querySelector("#successToast")
let dangerAlertDOM = document.querySelector("#dangerToast")


//! Events

buttonDOM.addEventListener('click', addItem)
todoListDOM.addEventListener('click',Check)
document.addEventListener('DOMContentLoaded',GetLocalStorage)





//! Functions

//* Add Item to List
function addItem() {

    if (inputTaskDOM.value) {

         //? save localstorage
        SaveLocalStorage(inputTaskDOM.value)

        //? create a li element
        const todoLi = document.createElement('li')
        todoLi.innerHTML = inputTaskDOM.value

        //? append list
        todoListDOM.append(todoLi)

        //? clear input
        inputTaskDOM.value = ''

        //? create a remove button
        const todoRemoveButton = document.createElement('i')
        todoRemoveButton.classList.add('bi', 'bi-trash3-fill', 'float-right', 'mr-4')

        //? append list
        todoLi.append(todoRemoveButton)

        //? show success alert
        ToastAlertSuccess();


    }else{

        //? show danger alert
        ToastAlertDanger();

    }

}

//* Checked Item to List
function Check(e){
    const item = e.target;
    //? If click remove button -> remove li element
    if(item.classList[0] == 'bi'){
        const el = item.parentElement;
        DeleteLocalStorage(el.innerText) //* Fonksiyona silmek istediğimiz li elemanının text değerini gönderdik. 
        el.classList.add('animation')
        el.addEventListener("transitionend",function(){
            el.remove()
        })
        
    }
    //? If click li element -> toggle checked class -- toggle ile belirttiğimiz class elementte varsa siler, eğer yoksa ekler --
    else{
        item.classList.toggle('checked')
    }
}

//* Save Items to Storage
function SaveLocalStorage(item){
    let items;
    if(localStorage.getItem('listItem') == null){
        items = []
    }else{
        items = JSON.parse(localStorage.getItem('listItem'))
    }

    items.push(item);
    localStorage.setItem('listItem',JSON.stringify(items))
}

//* Delete Items to Storage
function DeleteLocalStorage(item){
    let items;
    if(localStorage.getItem('listItem') == null){
        items = []
    }else{
        items = JSON.parse(localStorage.getItem('listItem'))
    }
    items.splice(items.indexOf(item),1) //* Splice ile dizi içerisinden eleman silebiliyoruz. Yukarıda check fonksiyonunun içerisinde DeleteLocalStorage(el.innerText) ile gönderdiğimiz değeri burada item parametresi ile tuttuk. Ardından indexof(item) diyerek silmek istediğimiz text değerini array içerisinde bularak indeks değerine ulaştık ve bunu sildik.

    localStorage.setItem('listItem', JSON.stringify(items)) //* sildikten sonra değeri güncellemek için items arrayini tekrardan localstorage içerisine set ediyoruz.
}

//* Get Items Storage
function GetLocalStorage(){
    let items;
    if(localStorage.getItem('listItem') == null){
        items = []
    }else{
        items = JSON.parse(localStorage.getItem('listItem'))
    }

    items.forEach((item)=>{
        //? create a li element
        const todoLi = document.createElement('li')
        todoLi.innerHTML = item

        //? append list
        todoListDOM.append(todoLi)

        //? clear input
        inputTaskDOM.value = ''

        //? create a remove button
        const todoRemoveButton = document.createElement('i')
        todoRemoveButton.classList.add('bi', 'bi-trash3-fill', 'float-right', 'mr-4')

        //? append list
        todoLi.append(todoRemoveButton)
    })
}

//* Success Alerts
function ToastAlertSuccess(){
    let successToast = new bootstrap.Toast(successAlertDOM, alertOptions)
    successToast.show();
}

//* Danger Alerts
function ToastAlertDanger(){
    let dangerToast = new bootstrap.Toast(dangerAlertDOM, alertOptions)
    dangerToast.show();
}


//! alert options

let alertOptions = {
    animation: true,
    delay: 3000,
}
