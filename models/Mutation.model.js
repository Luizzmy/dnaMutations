const {Schema, model} = require('mongoose')

const mutationSchema= new Schema({
  dna:[String],
  mutation:Boolean,
},{
  timestamps:true
})

module.exports = model("Mutation", mutationSchema)