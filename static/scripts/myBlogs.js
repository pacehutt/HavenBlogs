

setTimeout(()=>
{

 
    
    const del=document.querySelectorAll(".trash");
const close=document.querySelector(".noDelete");
const modal=document.querySelector(".deleteModal");
console.log(del)
// for (e of del){
//   e.addEventListener("click",()=>
//   {
//      deleteThis()
//      {
      
//      }
      // modal.classList.remove("hide");
      // modal.showModal();
      // deleteThis(e.dataset.doc);
      // console.log(e.dataset.doc)
  
//   })

// }
 close.addEventListener("click",()=>
 {
  
     modal.classList.add("hide");
     modal.close();
})


// function deleteIt(x)
// {

  
//   const yesDel=document.querySelector(".yesDelete");
  
//   yesDel.addEventListener("click",(e)=>
// {

//   // reference to the element is yesDel.dataset.doc (which is the data-doc in the html tag attribute of the anchor tag used for yes Delete)
//   const endpoint=`/delete/${x}`;

// //   We are fetching the endpoint then in the params passing the method as delete cz it is a delete request then in the backend searching by id and deleting the blog then from there we cannot redirect directly bcz we have to send some json only bcz it is an AJAX request. In node when AJAX request is used the redirect() cannot be used and we have to send the json with the redirect property to the front-end and from herewe will parse the json object which returns a promise object which gives the actual js object. Then we are using the window.location.href and changing the location to reload the page;
//   fetch(endpoint,{

//     method:'DELETE'
//   }).then(response=>response.json())     
//   .then(data=>{
      
//     window.location.href=data.redirect;    
//     console.log(data)})
//     .catch(err=>{
      
      
//       console.log(err);
      
//     })
    
//   })
// }
  
},100);