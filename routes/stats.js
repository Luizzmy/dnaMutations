const Router=require('express')
const router=Router()

const{
  getStats
}=require('../controllers/stats')

router.get('/', getStats)

module.exports = router;