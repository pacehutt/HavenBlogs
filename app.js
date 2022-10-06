require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const slugify=require("slugify");
const app = express();
const path = require("path");
const port = 200;
const blogController = require("./controllers/blogControllers");
const cookieParser = require("cookie-parser");
const User = require("./models/users");
const Blog = require("./models/blogs");
const Feedback=require("./models/feedback")
const auth = require("./middleware/auth");
const db = "mongodb://localhost:27017/BlogSite";

 


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
  }) 
  .catch((err) => console.log(err));

console.log(process.env.SECRET_KEY); 

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/static", express.static('./static/'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// app.use(express.urlencoded());
// app.use(express.json())
app.use(cookieParser());
//Register User
app.post("/register", blogController.post_register);

app.post("/login", blogController.post_login);

app.get("/", auth, blogController.blog_home);
app.get("/register", blogController.get_register);
app.get("/login", blogController.get_login);

app.post("/logout", auth, blogController.logout);

app.get("/blogs/myblogs", auth, blogController.get_myblogs);

app.get("/blogs/:slug/:id", auth, blogController.blog_details);

app.get("/write", auth, blogController.get_write_blog);

app.post("/write", auth, blogController.post_write_blog);
app.get("/sitemap",((req,res)=>
  {
    const data=`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
		      <!--  created with Free Online Sitemap Generator www.xml-sitemaps.com  -->
		      <url>
		      <loc>https://havenblogs.com/</loc>
	      <lastmod>2022-07-06T11:05:19+00:00</lastmod>
		      <priority>1.00</priority>
		      </url>
		      <url>
		      <loc>https://havenblogs.com/about</loc>
		      <lastmod>2022-07-06T11:05:19+00:00</lastmod>
		      <priority>0.80</priority>
		      </url>
		      
		      <url>
		      <loc>https://havenblogs.com/blogs/trending-vs-code-extensions-for-productivity/62bb2c48f07e556ee5fe17e5</loc>
	      <lastmod>2022-07-06T11:05:19+00:00</lastmod>
		      <priority>0.80</priority>
		      </url>
		      <url>
		      <loc>https://havenblogs.com/blogs/who-are-full-stack-developer/62bb2d40f07e556ee5fe17f4</loc>
	      <lastmod>2022-07-06T11:05:19+00:00</lastmod>
		      <priority>0.80</priority>
		      </url>
		      <url>
		      <loc>https://havenblogs.com/blogs/devops-is-a-failure/62bb2e30f07e556ee5fe17fd</loc>
	      <lastmod>2022-07-06T11:05:19+00:00</lastmod>
		      <priority>0.80</priority>
		      </url>
		      <url>
		      <loc>https://havenblogs.com/blogs/web-developer-salary-in-india-for-freshers-and-experienced/62bb2fecf07e556ee5fe1819</loc>
	      <lastmod>2022-07-06T11:05:19+00:00</lastmod>
		      <priority>0.80</priority>
		      </url>
		      <url>
		      <loc>https://havenblogs.com/blogs/how-to-start-a-startup/62bd1bddf24aab592c0fbc76</loc>
	      <lastmod>2022-07-06T11:05:19+00:00</lastmod>
		      <priority>0.80</priority>
		      </url>
		      <url>
		      <loc>https://havenblogs.com/blogs/how-browsers-work/62c007b154a905597a127c28</loc>
	      <lastmod>2022-07-06T11:05:19+00:00</lastmod>
		      <priority>0.80</priority>
		      </url>
		      <url>
		      <loc>https://havenblogs.com/blogs/top-backend-frameworks-2022/62c259ccedf89da14afa3a2b</loc>
	      <lastmod>2022-07-06T11:05:19+00:00</lastmod>
		      <priority>0.80</priority>
		      </url>
		      <url>
		      <loc>https://havenblogs.com/blogs/top-frontend-frameworks-2022/62c25e75edf89da14afa3a3f</loc>
	      <lastmod>2022-07-06T11:05:19+00:00</lastmod>
		      <priority>0.80</priority>
		      </url>
		      <url>
		      <loc>https://havenblogs.com/blogs/who-are-full-stack-developer/62bb2e30f07e556ee5fe17fd</loc>
	      <lastmod>2022-07-06T11:05:19+00:00</lastmod>
		      <priority>0.64</priority>
		      </url>
		      </urlset>`
    res.header("Content-Type", "application/xml");
    res.status(200).send(data);
    // res.send(sitemap.xml);

  }))
app.delete("/delete/:id", auth, blogController.delete_blog);
app.get("/about", (req, res) => res.render("about", { Write: "Write" }));
app.get('/search',auth,(req,res)=>
{

  if (req.ok != 2) {
    res.render('search',{Logout: "LogOut"});
    
    
    console.log("write page rendered!");
  } 
  else
  res.render("search", { SignUp: "Sign Up", SignIn: "Sign In" });
})
app.post("/contact",(req,res)=>{

    console.log(req.body)
  
    const fbd = new Feedback({
      name:req.body.cname,
      email: req.body.cemail,
      feedback: req.body.feedback,
    });
     console.log(2,req.body);
    fbd.save().then((result) => {
      console.log("submitted!");
      res.redirect("/about")
    });
    
  })
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
