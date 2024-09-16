import express, {Router} from 'express'
import multer from 'multer'
import User from '../schema/category-schema.js'


const router = express.Router()

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads')
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage : storage})

router.post('/add', upload.single('image'), async (req,res) =>{
    const user = new User()
    user.name = req.body.name
    user.mobile = req.body.mobile
    user.image = req.file.originalname

    user.save()
    res.status(201).json('Data Successfully Inserted')
})

export default router