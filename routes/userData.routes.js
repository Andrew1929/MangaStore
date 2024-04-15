const {Router} = require ('express');
const  User = require('../Model/User');
const router = Router();

router.get(
    '/:id',
    async (req, res) => {
        try{
            const id = parseInt(req.params.id) || req.params.id
            const user = await User.findOne({id : id})
            if(!user){
                return res.status(404).json({message: 'User didn\'t found'})
            }
            res.json(user)
        } catch (e) {
            res.status(500).json({message:'Something go wrong, try again'})
        }
    }
)

module.exports = router;