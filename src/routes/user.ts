import { Request, Router } from 'express';
import { authmiddleware } from '../middleware/outhentication';
import User, { UpdateUserBody } from "../models/user";
import { IsActionForUser } from '../middleware/IsActionForUser';

const router = Router();
router.use(authmiddleware);

router.param("userId", IsActionForUser);

const userRoute = router.route('/:userId');

userRoute.get(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.json(user);
});

userRoute.put(async (req: Request<{ userId: string }, any, UpdateUserBody>, res) => {
  const userId = req.params.userId;

 const updateUser =  await User.findByIdAndUpdate(userId, {
    name: req.body.name,
    username: req.body.username,
    dateOfBirth: req.body.dataofbirth 
  }, {returnDocument: "after"});

  res.json(updateUser);
});

const friendsRoute = router.route("/:userId/friends");

friendsRoute.get(async (req, res) => {
  const userId = req.params.userId;
  const friends = await User.findById(userId).select("friends").lean().populate("friends", "username  -_id");
  res.json(friends);
});

friendsRoute.post(async(req, res)=>{
  const userId = req.params.userId;
  if(!req.body || !req.body.friendid){
    return res.status(400).json("cannot add friends");
  }

  const updatedUser = await User.findByIdAndUpdate(userId, {
    $addToSet:{friends:req.body.friendid }
  }, {returnDocument:"after"}).select("friends").lean().populate("friends", "username  -_id" );

// console.log(updatedUser)
  res.json(updatedUser?.friends); 
});

export { router as singleUserRouter };