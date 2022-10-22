const express = require('express');
const bodyParser = require('body-parser');
var _ = require('lodash');
const blog = require("./mongoDb");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    blog.find({}, (err, data) => {
        res.render("home", { Post: data });

    });

})
app.get('/post/:titlevalue', (req, res) => {
    let titlevl = _.capitalize(req.params.titlevalue);
    blog.findOne({ title: titlevl }, (err, data) => {
        res.render("post", {
            Title: data.title,
            Blogcontent: data.blogparagraph
        });
    })

    // res.send();
    // res.end();
})
app.get('/compose', (req, res) => {
    res.render("compose");
})
app.get('/about', (req, res) => {
    res.render("about");
})
app.get('/contact', (req, res) => {
    res.render("contact");
})
app.get('/delete', (req, res) => {
    res.render("delete");
})
app.post("/", (req, res) => {

    const maindata = new blog({
        title: _.capitalize(req.body.titlee.trim()),
        blogparagraph: req.body.blogg,
    });
    blog.insertMany(maindata, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            maindata.save();
            res.redirect("/");
        }
    });
    

})

app.post("/delete", (req, res) => {
    const deletepost = _.capitalize(req.body.titlee.trim());
    blog.findOneAndRemove({ title: deletepost },(err)=>{
        if(err){
            console.log(err);
        }
    });
    res.redirect("/");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Running on port '+PORT);
})