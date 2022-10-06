
console.log("inside js file")

// const parser = new edjsParser(config, customParsers, embedMarkup);
window.addEventListener('load',()=>
{

 
        const data=document.getElementById('blog-body')

        console.log(data.innerText);
        data.innerHTML=data.innerText;
        let overlay=document.querySelector(".overlayy");
        overlay.style.display="none"
        let body=document.querySelector("body");
        body.style.overflow="visible";
        
        
    

    
})