const Mutation=require('../models/Mutation.model')

exports.getStats=async (req,res)=>{
  const has_mutation = await Mutation.collection.count({"mutation":true})
  const count_no_mutations = await Mutation.collection.count({"mutation":false})
  const ratio= has_mutation/count_no_mutations
  res.status(200).json({has_mutation, count_no_mutations, ratio})

}