const Router=require('express')
const router=Router()

const {
  verifMutation
}=require('../controllers/mutations')

/* GET home page */
router.post('/', verifMutation);

module.exports = router;
