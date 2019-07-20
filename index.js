const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

// ------------------------------------
var cors = require('cors');
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(cors({
//   origin: 'http://localhost:5001'
// }));

// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200
// }
//
// app.get('/api/projects', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all.'})
// })
//
// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })
// ------------------------------------

const projects = [
  [
    {
      id: 1,
      name: "Placard",
      url: "https://placardny.herokuapp.com",
      img: "https://imgur.com/vMVsZuW",
      type: "dev"
    },
    {
      id: 2,
      name: "Cropscity",
      url: "http://cropscity.herokuapp.com",
      img: "https://imgur.com/2MeLsOU",
      type: "dev"
    },
    {
      id: 3,
      name: "Monk Brewsource",
      url: "https://monk-brewsource.herokuapp.com",
      img: "https://imgur.com/GYvgA07",
      type: "dev"
    }
  ],
  [
    {
      id: 1,
      name: "Batsu Poster 1",
      img: "hi",
      type: "design"
    },
    {
      id: 2,
      name: "Batsu Poster 2",
      img: "bye",
      type: "design"
    }
  ]
]

app.get('/', (req,res) => {
  res.send('Hello World')
})

// app.get('/express-backend', (req,res) => {
//   // res.send({express: 'Express backend is now connected to React frontend!'})
//   res.send(projects)
// })

app.get('/api/projects', (req,res) => {
  res.send(projects)
})

app.get('/api/projects/:id', (req,res) => {
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



// app.get('/api/posts/:year/:month', (req,res) => {
//   res.send(req.params.year)
//   // res.send(req.query)
// })


// PORT
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))
