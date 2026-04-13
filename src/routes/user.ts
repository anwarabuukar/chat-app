import { Router } from 'express';
import { authmiddleware } from '../middleware/outhentication';
import User from "../models/user"

const router = Router()
router.use(authmiddleware);


const one = router.route('/:userId');
one.get(async (req, res) => {
const userId = req.params.userId
if(req.payload.sub  !== userId){
  return res.status(403).json("cannot fulfill your request")
}
const user = await User.findById(userId).select("-friends -chats")
res.json(user)

});

one.post((req, res) => {
  res.json()
});

one.put((req, res) => {
  res.json()
});

one.delete((req, res) => {
  res.json()
});  



export { router as singleUserRouter };