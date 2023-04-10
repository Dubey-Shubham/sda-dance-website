const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")  //post req k through database me data save karane k liye bodyparser module install kiya
mongoose.connect(`mongodb://localhost/contactDance`, {useNewUrlParser: true})      //moongoose ko mongodb se connect kara
const port = 8000;

//require('./connection')


//define mongoose schema
var contactSchema = new mongoose.Schema({       //schema banaya jisme form k sab required block hai saare block jo ki honge
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  var Contact = mongoose.model('Contact', contactSchema);    // schema ka model bana diya contact naam ka

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())             //ye middleware, html forms ka data hame express me lane k liye use kiya jata hai

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // jo bhi template views directory me rakkhe hai unke liye path set kar dia
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{                          //contact form me jo kuch bhi likha hoga use database me post krne k liye
    var myData = new Contact(req.body);                  //variable myData me contact model ki jo info aayi hai wo save ho jayegi
    myData.save().then(()=>{                             //mydata ko database me save kar dia
    res.send("This item has been saved to the database")         //ye response send kar dia
    }).catch(()=>{                                                  //error catch karne k liye block lagaya
    res.status(400).send("item was not saved to the database")        //ye message throw hoga
});
    
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

