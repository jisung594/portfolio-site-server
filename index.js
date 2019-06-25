var express = require('express');
const app = express();

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

app.get('/', (req,res) => {
  res.send('Hello World')
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

  // res.send(req.params.id)
})



// app.get('/api/posts/:year/:month', (req,res) => {
//   res.send(req.params.year)
//   // res.send(req.query)
// })


// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
