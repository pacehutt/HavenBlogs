setTimeout(()=>
{

    const ham=document.getElementsByClassName('nav-toggle');
    const nav_items=document.getElementsByClassName('nav_items')
    
    let flag=0;
    
    
        ham[0].addEventListener('click',()=>
        {
            console.log("here")
          if(flag==0)
          {
           
              nav_items[0].classList.add("nav-show");
              ham[0].classList.add('ham-open');
              nav_items[0].style.transform="translate(86%,60%);";
              document.getElementsByClassName("overlap")[0].style.opacity="0.5"
              document.getElementsByClassName("overlap")[0].style.pointerEvents="none"
              
              flag=1; 
        }else

        {
            
            document.getElementsByClassName("overlap")[0].style.opacity="1"
            document.getElementsByClassName("overlap")[0].style.pointerEvents="all"
            nav_items[0].classList.remove('nav-show');
            ham[0].classList.remove('ham-open');
     
           
            
            nav_items[0].style.transform="translate(200%,60%);";
            flag=0;
            
        }
          
        })
        
   


        let media=window.matchMedia("(max-width: 700px)");

        function match(media)
        {
            
            console.log(media)
            if(media.matches)
           {
            let heading=document.querySelectorAll('.article-heading');
            let author=document.querySelectorAll(".author-name");

            let read=document.querySelectorAll(".read");
                for (i=0;i<heading.length;i++)
                {
               
                    let Hlen=  (heading[i].innerText).length;
                    let authLen=(author[i].innerText).length;
                    let readLen=(read[i].innerText).length;
                    // console.log(Hlen)
                    if(Hlen>30)
                   {
                    let str=heading[i].innerText;
                    // console.log(typeof str)
                    heading[i].innerText= str.substring(0,30).concat("...");
                       
        
                   } 
                   if(authLen>16)
                   {
                    let str=author[i].innerText;
                    author[i].innerText = str.slice(0,23).concat("..");
                   }
                   if(readLen>10)
                   {
                    let str=read[i].innerText;
                    read[i].innerText = str.slice(0,7);
                   }
        
                }
           }
        }
        
        
        setTimeout(()=>
        {
            match(media);
            media.addListener(match)

        },2000)




    let article=document.querySelectorAll(".home-article");
    function fade()
    {

        for(i=0;i<article.length;i++)
        {
            let ePos=article[i].getBoundingClientRect().top.left;
            console.log(ePos)
            let wPos=window.innerHeight;
        if(ePos<wPos)
        {
             article[i].style.opacity="1";
        }
        else if(ePos>wPos)
        {
            article[i].style.opacity="1";

        }
    }
}

// window.addEventListener("scroll",fade);


    setTimeout(()=>
    {
        console.log("innnnn")
        document.querySelector("#main-head").style.opacity="1";
         document.querySelector(".home-articles-heading").style.opacity="1";
         document.querySelector(".home-articles-heading").style.transform="translateY(0%)";

    },50)












},1000)

// setTimeout(()=>
// {

//     document.getElementById('signin').addEventListener('click',()=>
//     {

//         document.getElementById('signup').style.display="none";
//     })
// },500) 