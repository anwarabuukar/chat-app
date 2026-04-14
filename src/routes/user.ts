import { Request, Router } from 'express';
import { authmiddleware } from '../middleware/outhentication';
import User, { UpdateUserBody } from "../models/user"
import user from '../models/user';

const router = Router()
router.use(authmiddleware);


const userRoute = router.route('/:userId');
userRoute.get(async (req, res) => {
const userId = req.params.userId
if(req.payload.sub  !== userId){
  return res.status(403).json("cannot fulfill your request")
}
const user = await User.findById(userId)
res.json(user)

});

userRoute.put(async(req: Request<{userId: string}, any, UpdateUserBody>, res) => {
const userId = req.params.userId
if(req.payload.sub  !== userId){
  return res.status(403).json("cannot fulfill your request")
}

  await user.findByIdAndUpdate(userId,{

name: req.body.name,
username: req.body.username,
dataofbirth: req.body.dataofbirth
})
res.json("update your details")
});


const   friendsRoute =router.route("/:userId/friends")

friendsRoute.get(async(req,res)=>{

const userId = req.params.userId
if(req.payload.sub  !== userId){
  return res.status(403).json("cannot fulfill your request")
}
const friends = await User.findById(userId).select("friends").populate("friends", "username")
res.json(friends)
})



export { router as singleUserRouter };