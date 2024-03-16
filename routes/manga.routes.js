const {Router} = require ('express')
const Manga = require ('../Model/Manga')
const {check, validationResult} = require ('express-validator')
const router = Router()

router.post(
    '/manga',
    [
        check('id','must be a positive number').isNumeric().custom(value => value > 0),
        check('title','Title is required').not().isEmpty(),
        check('author','Author is required').not().isEmpty(),
        check('cover','Cover URL is required').isURL(),
        check('price','Wrong price').isFloat({min:0}),
        check('genre','Genre is required').not().isEmpty(),
        check('status','Status is required').not().isEmpty()
    ],
    async (req, res) => {
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array(),
                message:'Wrong data'
            })
        }
        const {id,title,author,cover,price,genre,status} = req.body
        const isExist =  await Manga.findOne({title})
        if(isExist){
            return res.status(400).json({message:'Such title already exist'})
        }
        const manga = new Manga({id,title,author,cover,price,genre,status})
        await manga.save()
        res.status(201).json({ message: 'Manga successfully added' })
    } catch (e) {
        res.status(500).json({message:'Something go wrong, try again'})
    }
})

router.get(
    '/manga/:id',
    async (req,res) => {
        try{
            const id = parseInt(req.params.id) || req.params.id
            const manga = await Manga.findOne({id: id})
            if(!manga){
                return res.status(404).json({message: 'Manga didn\'t found'})
            }
            res.json(manga)
        } catch (e) {
            res.status(500).json({message:'Something go wrong, try again'})
        }
    }
)

router.get(
    '/search/manga',
    async (req,res) => {
        try{
            const mangas = await Manga.find({})
            res.json(mangas)
        } catch (e) {
            res.status(500).json({message:'Something go wrong, try again'})
        }
    }
)

router.put(
    '/manga/:id',
    [
        check('id','must be a positive number').isNumeric().custom(value => value > 0),
        check('cover','Cover URL is required').isURL(),
        check('price','Wrong price').isFloat({min:0}),
        check('status','Status is required').not().isEmpty()
    ],
    async (req, res) => {
    try{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array(),
                message:'Wrong data'
            })
        }
        const {id} =req.params
        const allowedUpdates = [ 'price',  'status', 'cover']
        const updateData = {}
        for (let key of allowedUpdates) {
            if (req.body.hasOwnProperty(key)) {
                updateData[key] = req.body[key]
            }
        }
        const updatedManga = await Manga.findByIdAndUpdate(id,updateData, { new: true })
        if(!updatedManga){
            return res.status(404).json({message: 'Such title didn\'t exist'})
        }
        res.status(200).json(updatedManga);
    } catch (e) {
        res.status(500).json({message:'Something go wrong, try again'})
    }
})

module.exports = router