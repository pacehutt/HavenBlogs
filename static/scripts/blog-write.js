
const editor = new EditorJS(
    {
        holder:'editorjs',
        tools:{
            // placeholder: 'Let`s write an awesome story!',
            header:{

                class:Header,
                inlineToolbar:['link','bold']
            },
            list:{
                class:List,
                inlineToolbar:['link','bold']
            },
            embed:{
                class:Embed,
                inlineToolbar:false,
                config:{
                    services:{
                        youtube:true,
                        coub:true,
                        facebook:true,
                        instagram:true,
                        twitter:true,
                        twitch:true,
                        codepen:true,
                        pinterest:true
                        
                    }
                },
            },
             
                
                  
                 
                  quote: {
                    class: Quote,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+O',
                    config: {
                      quotePlaceholder: 'Enter a quote',
                      captionPlaceholder: 'Quote\'s author',
                    }
                   
                        
            }, 
            linkTool: {
                class: LinkTool,
                // config: {
                //   endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
                // }

        },
        image: SimpleImage
    }

}
)


 const config={
    embed:{
        useProvidedLength:true,
    },
    quote:{
        applyAlignment:true,
    }
   
 }
 const parser = new edjsParser(config);

let output,blogDetails;


  

 

document.querySelector('#p-button').addEventListener('click',postWrite)

const endpoint= "/write"
async function postWrite(e)
{
    
    
     e.preventDefault();
    editor.save().then((outputData) => {
        const markup = parser.parse(outputData);
        console.log(markup);
        outputData=markup;
        blogDetails={
         
            blogBody:outputData,
            blogHeading:document.querySelector('#bHeading').value,
            
            blogTopic:document.querySelector('#bTopic').value,
            
            blogReadTime: document.querySelector('#readTime').value,
            
            blogAuthor:document.querySelector('#author').value
        }
        console.log('Article data: ', outputData)
        
         blogDetails.blogBody=markup;
        console.log(blogDetails)
    }).catch((error) => {
        console.log('Saving failed: ', error)
    });
     
    //  JSON.stringify(blogDetails.blogMody);
    setTimeout(()=>
    {
           
        fetch(endpoint,{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify(blogDetails)
        }).then((res)=>
        {
            return res.json()
        })
        .then((data)=>
        {
            window.location.href=data.redirect;
        })

        // const res= await fetch(endpoint,{
            
        //     method:"POST",
        //     headers:{
        //         "Content-Type":'application/json'
        //     },
        //     body:JSON.stringify(blogDetails)
        // })
        // const res2=await res.json();
        // window.location.href=res2.redirect;
    },2000)
    }
   














    setTimeout(()=>
    { 
    
    let binput= document.getElementsByClassName("b-input");

    binput[0].addEventListener("click",()=>
    {
           
        let label=document.getElementsByClassName("label");
        // let focus=(document.activeElement === binput)
        label[0].style.top="0px"
         
        label[0].style.backgroundColor="white"
    
    })

},500)


setTimeout(()=>
{

let binput= document.getElementsByClassName("b-input");

binput[1].addEventListener("click",()=>
{
       
    let label=document.getElementsByClassName("label");
    // let focus=(document.activeElement === binput)
    label[1].style.top="0px"
        
        label[1].style.backgroundColor="white"
})

},500)


setTimeout(()=>
{

let binput= document.getElementsByClassName("b-input");

binput[2].addEventListener("click",()=>
{
       
    let label=document.getElementsByClassName("label");
    // let focus=(document.activeElement === binput)
    label[2].style.top="0px"
        
    label[2].style.backgroundColor="white"

})

},500)


setTimeout(()=>
{

let binput= document.getElementsByClassName("b-input");

binput[3].addEventListener("click",()=>
{
       
    let label=document.getElementsByClassName("label");
    // let focus=(document.activeElement === binput)
    label[3].style.top="0px"
        
    label[3].style.backgroundColor="white"
})
 
},500)
 