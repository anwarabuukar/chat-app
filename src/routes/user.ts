import { Router } from 'express';
import { authmiddleware } from '../middleware/outhentication';

const router = Router()
router.use(authmiddleware);

const all = router.route('/');

all.get((req, res) => {
  res.json([])
});

all.post((req, res) => {
 res.json([])
});


const one = router.route('/:id');
one.get((req, res) => {
  res.json()
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



export { router as userRouter };