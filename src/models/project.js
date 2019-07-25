import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: String,
  url: String,
  img: {
    type: String,
    required: true,
  },
  project_type: {
    type: String,
    required: true,
  }
})

const Project = mongoose.model('Project', projectSchema)

export default Project
