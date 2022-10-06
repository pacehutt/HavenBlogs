setTimeout(()=>
{
    console.log("Inside base script")



    const activePage = window.location.pathname;
    console.log(activePage)
    const navLinks = document.getElementsByTagName('a')
   
    for(let i=0;i<navLinks.length;i++)
    if(navLinks[i].href.includes(`${activePage}`))
    {
        navLinks[i].classList.add('current');
    }
    
    const ham=document.getElementsByClassName('nav-toggle');
    const nav_items=document.getElementsByClassName('nav_items')
    
    let flag=0;
    
    
        ham[0].addEventListener('click',()=>
        {
          if(flag==0)
          {
              ham[0].classList.toggle('active');
              nav_items[0].classList.add("nav-hidden");
              flag=1; 
        }else

        {
            // ham[0].classList.toggle.remove('active')
            nav_items[0].classList.remove('nav-hidden')
            
        }
          
        })
        
   

















},100)

// setTimeout(()=>
// {

//     document.getElementById('signin').addEventListener('click',()=>
//     {

//         document.getElementById('signup').style.display="none";
//     })
// },500) 




