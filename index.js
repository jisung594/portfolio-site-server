const express = require('express');
const Joi = require('joi');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})


const projects = [
  [
    {
      id: 1,
      name: "PLACARD",
      url: "https://placardny.herokuapp.com",
      img: "https://i.imgur.com/5Gf1TbN.png",
      type: "dev",
      stack: "React/Redux | Ruby on Rails | PostgreSQL"
    },
    {
      id: 2,
      name: "Interactive Periodic Table",
      url: "http://iptable.herokuapp.com/",
      img: "https://i.imgur.com/V2wO2DM.png",
      type: "dev",
      stack: "React | Express | MongoDB"
    },
    {
      id: 3,
      name: "Cropscity",
      url: "http://cropscity.herokuapp.com",
      img: "https://i.imgur.com/CnxrZTJ.png",
      type: "dev",
      stack: "React | Ruby on Rails | PostgreSQL"
    },
    {
      id: 4,
      name: "Monk Brewsource",
      url: "https://monk-brewsource.herokuapp.com",
      img: "https://i.imgur.com/u2j4Xsp.png",
      type: "dev",
      stack: "Javascript | Ruby on Rails | PostgreSQL"
    }
  ],
  [
    {
      id: 5,
      name: "Batsu (Promotional Poster)",
      img: "https://i.imgur.com/KwcAQXA.jpg",
      type: "design"
    },
    {
      id: 6,
      name: "Batsu (Promotional Poster)",
      img: "https://i.imgur.com/YbWPXP9.jpg",
      type: "design"
    },
    {
      id: 7,
      name: "Batsu (Promotional Poster)",
      img: "https://i.imgur.com/xK7T4qn.jpg",
      type: "design"
    },
    {
      id: 8,
      name: "Batsu (Promotional Poster)",
      img: "https://i.imgur.com/sh3etG0.jpg",
      type: "design"
    },
    {
      id: 9,
      name: "5A Roasting Company (Branding & Identity)",
      img: "https://i.imgur.com/24vmolS.jpg",
      type: "design"
    },
    {
      id: 10,
      name: "5A Roasting Company (Branding & Identity)",
      img: "https://i.imgur.com/Bsd4cZE.jpg",
      type: "design"
    },
    {
      id: 11,
      name: "5A Roasting Company (Branding & Identity)",
      img: "https://i.imgur.com/gklKPFn.jpg",
      type: "design"
    },
    {
      id: 12,
      name: "5A Roasting Company (Branding & Identity)",
      img: "https://i.imgur.com/MwBNzIX.jpg",
      type: "design"
    },
    {
      id: 13,
      name: "EIS Housing (PSA)",
      img: "https://i.imgur.com/DlZG7hn.jpg",
      type: "design"
    },
    {
      id: 14,
      name: "EIS Housing (PSA)",
      img: "https://i.imgur.com/xN4T9xK.jpg?1",
      type: "design"
    },
    {
      id: 15,
      name: "EIS Housing (PSA)",
      img: "https://i.imgur.com/iGDdcgU.jpg?1",
      type: "design"
    },
    {
      id: 16,
      name: "Monk Brewery (Branding & Identity)",
      img: "https://i.imgur.com/jOe9UAL.jpg",
      type: "design"
    },
    {
      id: 17,
      name: "Monk Brewery (Branding & Identity)",
      img: "https://i.imgur.com/XZxOEKL.jpg",
      type: "design"
    },
    {
      id: 18,
      name: "Joy (Essay by Zadie Smith)",
      img: "https://i.imgur.com/cyLfraF.jpg",
      type: "design"
    },
    {
      id: 19,
      name: "Fictional BBC Magazine Spread",
      img: "https://i.imgur.com/M5PmDsu.jpg",
      type: "design"
    }
  ],
  [
    {
      id: 20,
      name: "Tracer SCFX",
      url: "https://tracerscfx.herokuapp.com",
      img: "https://i.imgur.com/aLHRrLH.jpg",
      type: "wip",
      stack: "React | Flask | Finnhub.io"
    }
  ]
]


app.get('/', (req,res) => {
  res.send('Hello World')
})

app.get('/express-backend', (req,res) => {
  res.send({express: 'Express backend is now connected to React frontend!'})
  // res.send(projects)
})

app.get('/api/projects', (req,res) => {
// app.get('https://jonathanchoi-api.herokuapp.com/api/projects', (req,res) => {
  res.send(projects)
})

app.get('/api/projects/:id', (req,res) => {
// app.get('https://jonathanchoi-api.herokuapp.com/api/projects/:id', (req,res) => {
  let project = projects.find(projectObj => {
    return projectObj.id === parseInt(req.params.id)
  })

  if (!project) {
    res.status(404).send("The project with the given ID was not found.")
  }

  res.send(project)
})

app.post('/api/projects', (req,res) => {
  // ** USING JOI TO VALIDATE **
  const schema = {
    name: Joi.string().min(3).required()
  }

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    res.status(400).send(result.error)
    return
  }
  // ** --------------------- **

  // (validating w/o Joi)
  // if (!req.body.name || req.body.name.length < 3) {
  //   res.status(400).send('Name is required and should be a minimum of 3 characters')
  //   return;
  // }

  let newProject = {
    id: projects.length + 1,
    name: req.body.name,
    url: req.body.url
  }

  projects.push(newProject)
  res.send(newProject)
})



// PORT
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))



// // Import Body parser
// let bodyParser = require('body-parser');
// // Import Mongoose
// let mongoose = require('mongoose');
// // Configure bodyparser to handle post requests
// app.use(bodyParser.urlencoded({
//    extended: true
// }));
// app.use(bodyParser.json());
// // Connect to Mongoose and set connection variable
// // Deprecated: mongoose.connect('mongodb://localhost/resthub');
// mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
// var db = mongoose.connection;


module.exports = app;
