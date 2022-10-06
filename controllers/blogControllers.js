

const parse = require('node-html-parser');
console.log(parse);
const cookieParser = require("cookie-parser");
const User = require("../models/users");
const Blog = require("../models/blogs");
const auth = require("../middleware/auth");
const slugify=require("slugify");

let t=0;
const blog_home = (req, res) => {
  Blog.find().then((allBlogs) => { 
    console.log(allBlogs)

    console.log("home");
    if (req.ok == 1) {
      res.render("index", { allBlogs, Write: "Write", Logout: "LogOut" , title:"Home" });
    } else {
      
      
      res.render("index", { allBlogs, SignUp: "Sign Up", SignIn: "Sign In" , title:"Home"});
      
     
    }
    console.log("rendered!");
  });
};

const get_register = (req, res) => {
  res.render("register", { SignUp: "Sign Up", SignIn: "Sign In" , title:"Sign Up"});
  console.log("rendered!");
};

const post_register = (req, res) => {
  try {
    let password = req.body.passwd;
    let cpassword = req.body.cpasswd;
    if (password === cpassword) {
      let name = req.body.name;
      let email = req.body.email;
      const user = new User({
        name: name,
        email: email,
        password: password,
        confirm_password: cpassword,
      });
      const token = user.generateAuthToken();
       
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 40000),
        httpOnly: true,
      });

      user.save().then((result) => {
        res.status(201).redirect("/");
      });
    } else {
      res.render("register", { error: "password not matched" , title:"Sign up"});
    }
  } catch (err) {
    res.render("register", { error: "user already exists!" , title:"Sign up" });
  }
};

const get_login = (req, res) => {
  res.render("login", { SignUp: "Sign Up", SignIn: "Sign In" , title:"Sign in"});
  console.log("rendered!");
};
const post_login = (req, res) => {
  try {
    
    let email = req.body.email;
    let password = req.body.password;
 

    User.findOne({ email: email }).then((user) => {


  
      const token = user.generateAuthToken();
      //   cookie function is used to set the cookie name to cookie value
      // value param may be a string or object converted to JSON
      res.cookie("jwt", token, {
       
        expires: new Date(Date.now() + 4000000000000000),
        httpOnly: true, 
      });

      if (user.email === email && user.password === password) {
        res.status(200).redirect("/");
      } else {
        res.render("login", { error: "*Invalid email or password", SignUp: "Sign Up", SignIn: "Sign In" , title:"Sign in" });
      }
    });
  } catch (err) { 
    // res.status(400).redirect("/login");
    res.status(400).send("invalid");
  }
};
const logout = async (req, res) => {
  try {

 
    res.clearCookie('jwt');
  


    // res.clearCookie("jwt", { path: "/", domain: "localhost" });
    
    // req.user.save().then(()=>{
      
    // })
    
    t=1;
    res.json({ redirect: "/" });
    // res.redirect("/");
      console.log("logout success!!");
    

  } catch (error) {
    res.status(500).send(error);
  }
}; 

const get_myblogs = (req, res) => {
  if (req.ok != 2) {
    User.findById(req.userId).then((result1) => {
      

      Blog.find()
        .where("email")
        .in(result1.email)
        .exec((err, result) => {
          res.render("myblogs", { result, Write: "Write", Logout: "LogOut" , title:"My Blogs"});
        });
      //  res.render('myblogs',{result});
    });
  } else res.redirect("/login");

  console.log("rendered!");
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    const allBlogs = Blog.find().then((allBlogs) => {
      des=result.blogs[0].blogBody;
      let root =parse.parse(des);
      root=root.querySelectorAll("p");
      des="";
      for(i=0;i<4;i++)
      {
        if(root[i]===undefined)
        break;
        else
        des=des+root[i].structuredText; 
      }
      console.log(root[0].structuredText);
    
      if(des !== undefined) 
      des=des.slice(0,210); 
               
      res.render("blogs-main", {
        des,
        result,
         element1: allBlogs[0],
         element2: allBlogs[1], 
         element3: allBlogs[2], title:result.blogs[0].blogHeading
       });
      // res.json({data:result,redirect:"/showBlog"});
     
    });
  });

  console.log("rendered!");
};


const post_write_blog = (req, res) => {
  if (req.ok != 2) {
  console.log("okeyyyy")
    var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

const options={
  replacement:'-',
  remove:undefined,
  lower:true,
  strict:false,
  locale:'en',
  trim:true,
 }
let slug= slugify(req.body.blogHeading,options);     
console.log(slug);

newdate = day + " - " + month + " - " + year ;
console.log(1,req.body);
    User.findOne({ _id: req.userId })
    .then((result) => {
      const writing = new Blog({
        slug:slug,
        email: result.email,
        date: newdate, 
        blogs: req.body,
      });
       console.log(2,req.body);
      writing.save();
    })
    .then((result) => {
      console.log("submitted!");
      res.json({ redirect: "/write" });
    });
  } else res.json({ redirect: "/login" });



};
const get_write_blog = (req, res) => {
  if (req.ok != 2) {
    res.render("blog-write", { Write: "Write", Logout: "LogOut" , title:"Write"});

 
    console.log("write page rendered!");
  } else res.redirect("/login");
};

const delete_blog = (req, res) => {
  const id = req.params.id;
  // let data="jsjkjs";
  // console.log(data.innerText());
  if (req.ok != 2) {
    Blog.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: "/blogs/myblogs" });
      })
      .catch((err) => {
        console.log("delete in err", err);
      });
  } else {
    res.json({ redirect: "/login" });
  }
};
module.exports = {
  blog_home,
  get_register,
  post_register,

  get_login,
  post_login,
  logout,
  get_myblogs,
  blog_details,
  get_write_blog,
  post_write_blog,
  delete_blog,
};
