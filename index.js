const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json())


const projects = [
  {
    id: 1,
    name: "Placard",
    url: "https://placardny.herokuapp.com"
  },
  {
    id: 2,
    name: "Cropscity",
    url: "http://cropscity.herokuapp.com"
  },
  {
    id: 3,
    name: "Monk Brewsource",
    url: "https://monk-brewsource.herokuapp.com"
  }
]

// app.get('/', (req,res) => {
//   res.send('Hello World')
// })

app.get('/express-backend', (req,res) => {
  res.send({express: 'Express backend is now connected to React frontend!'})
})

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
