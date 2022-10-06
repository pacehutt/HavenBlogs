console.log("inside register.js")
setTimeout(()=>
{


    const nameee = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("passwd");
    
    
    
        email.addEventListener('blur',()=>
        {
            console.log("email")
            let regex=/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
            let str=email.value;
            if(regex.test(str))
            {
                console.log(" email valid")
                
                document.querySelector(".smallCaseEmail").classList.remove('smallShow')
                email.style.border="1.5px solid #7591CF"
            }
            else
            {
                document.querySelector(".smallCaseEmail").classList.add('smallShow')
                email.style.border="1.5px solid rgb(166, 22, 22)"
            }
            console.log("email is blurred");
        })
    
        nameee.addEventListener('blur',()=>
        {

            let regex=/^([\sa-zA-Z]){5,20}$/;
            let str=nameee.value;
            if(regex.test(str))
            {
                console.log("matched")
                
                document.querySelector(".smallCaseName").classList.remove('smallShow')
                nameee.style.border="1.5px solid #7591CF"
            }
            else
            {
                document.querySelector(".smallCaseName").classList.add('smallShow')
                nameee.style.border="1.5px solid rgb(166, 22, 22)"
            }
            console.log("name is blurred");
        })

        password.addEventListener('blur',()=>
        {
            console.log("email")
            let regex=/^([@$0-9a-zA-Z]){6,10}$/;
            let str=password.value;
            if(regex.test(str))
            {
                console.log(" password valid")
                
                document.querySelector(".smallCasePassword").classList.remove('smallShow')
                password.style.border="1.5px solid #7591CF"
            }
            else
            {
                document.querySelector(".smallCasePassword").classList.add('smallShow')
                password.style.border="1.5px solid rgb(166, 22, 22)"
            }
            console.log("password is blurred");
        })
},500);

