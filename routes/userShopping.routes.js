const {Router} = require ('express')
const UserShopping = require('../Model/UserShopping')
const router = Router()

router.post(
    '/cart',
    async(req,res) => {
        try{
            const { userId, mangaId, quantity } = req.body
            const userCart = await UserShopping.findOne({user : userId})
            if(userCart){
                const itemIndex = userCart.cart.findIndex(item => item.manga === mangaId)
                if (itemIndex > -1) {
                    userCart.cart[itemIndex].quantity += quantity
                } else {
                    userCart.cart.push({ manga:mangaId, quantity })
                }
                await userCart.save()
            }else{
                const newUserCart = new UserShopping({
                    user: userId,
                    cart: [{ manga:mangaId, quantity }]
                })
                await newUserCart.save()
            }
            res.status(201).json({ message: 'Product added to cart' })
        }catch(e){
            res.status(500).json({message:'Something go wrong, try again'})
        }
    }
)

router.patch(
    '/cart',
    async (req,res) => {
        try{
            const {userId, mangaId, quantity} = req.body
            const userCart = await UserShopping.findOne({user: userId})
            if(!userCart){
                return res.status(404).json({message: 'Cart not found'})
            }
            const itemIndex = userCart.cart.findIndex(item => item.manga.toString() === mangaId.toString())
            if (itemIndex >= 0) {
                userCart.cart[itemIndex].quantity = quantity
            } else {
                return res.status(404).json({ message: 'Product not found in cart' })
            }
            await userCart.save()
            res.status(200).json({ message: 'Cart updated successfully' })
        } catch (e) {
            res.status(500).json({message:'Something go wrong, try again'})
        }
    }
)

router.get(
    '/cart', 
    async (req, res) => {
    try {
        const userId = req.query.userId
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' })
        }
        const cartItems = await UserShopping.find({ user: userId })
        res.json(cartItems)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again later.' })
    }
})

router.delete(
    '/cart',
    async(req,res)=>{
        try{
            const { userId, mangaId } = req.body
            const userCart = await UserShopping.findOne({ user: userId })
            if (userCart) {
                userCart.cart = userCart.cart.filter(item => item.manga !== mangaId);
                await userCart.save();
                res.status(200).json({ message: 'Product removed from cart' });
            } else {
                res.status(404).json({ message: 'Cart not found' });
            }
        }catch(e){
            res.status(500).json({message:'Something go wrong, try again'})
        }
    }
)

router.post(
    '/wishlist', 
    async(req,res) => {
        try{
            const { userId, mangaId, quantity } = req.body
            const userWishlist = await UserShopping.findOne({user : userId})
            if(userWishlist){
                const itemIndex = userWishlist.wishlist.findIndex(item => item.manga === mangaId)
                if (itemIndex > -1) {
                    userWishlist.wishlist[itemIndex].quantity += quantity
                } else {
                    userWishlist.wishlist.push({ manga:mangaId, quantity })
                }
                await userWishlist.save()
            }else{
                const newUserWishlist = new UserShopping({
                    user: userId,
                    wishlist: [{ manga:mangaId, quantity }]
                })
                await newUserWishlist.save()
            }
            res.status(201).json({ message: 'Product added to wishlist' })
        }catch(e){
            res.status(500).json({message:'Something go wrong, try again'})
        }
    }
)

router.delete(
    '/wishlist', 
    async (req, res) => {
    try {
        const { userId, mangaId } = req.body
        const userWishlist = await UserShopping.findOne({ user: userId })
        if (userWishlist) {
            userWishlist.wishlist = userWishlist.wishlist.filter(item => item.manga !== mangaId)
            await userWishlist.save()
            res.status(200).json({ message: 'Product removed from wishlist' })
        } else {
            res.status(404).json({ message: 'Wishlist not found' })
        }
    } catch(e) {
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})

router.get(
    '/wishlist', 
    async (req, res) => {
    try {
        const userId = req.query.userId
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' })
        }
        const wishlistItems = await UserShopping.find({ user: userId })
        res.json(wishlistItems)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again later.' })
    }
})

router.patch(
    '/wishlist',
    async (req,res) => {
        try{
            const {userId, mangaId, quantity} = req.body
            const userWishlist = await UserShopping.findOne({user: userId})
            if(!userWishlist){
                return res.status(404).json({message: 'Wishlist not found'})
            }
            const itemIndex = userWishlist.wishlist.findIndex(item => item.manga.toString() === mangaId.toString())
            if (itemIndex >= 0) {
                userWishlist.wishlist[itemIndex].quantity = quantity
            } else {
                return res.status(404).json({ message: 'Product not found in wishlist' })
            }
            await userWishlist.save()
            res.status(200).json({ message: 'Wishlist updated successfully' })
        } catch (e) {
            res.status(500).json({message:'Something go wrong, try again'})
        }
    }
)

module.exports = router