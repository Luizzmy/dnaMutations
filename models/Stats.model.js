const {Schema, model} = require('mongoose')

const Stats= new Schema({
  count_mutations:Number,
  count_no_mutations:Number,
  ratio:{
    type:Number
  },
},{
  timestamps:true
})

module.exports = model("Stats", Stats)