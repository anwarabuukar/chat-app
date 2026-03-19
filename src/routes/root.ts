import { Router } from "express";
import  user from "../models/user";
import { jwtAudience, jwtIssuer, jwtSecret } from "../config";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/helo", (req, res) => {
  res.json("Welcome to Chat");
});

router.post("/login", async (req, res) => {
if(!req.body.username || !req.body.password){
   return  res.status(400).json("Username and password are required");
}
const User  =  await user.findOne({username: req.body.username});
if (!User) {
  return res.status(400).json("connot log in  you need to register first");
}


if(!await User.isPasswordMaching(req.body.password)){
  return res.status(400).json("cnnot log you in please  your details  and try again")
}
const token = jwt.sign({username: User.username}, jwtSecret,{
  audience: jwtAudience,
  issuer: jwtIssuer,
  subject: User.id.toString(),
  expiresIn: "30m"
});
return res.json({token})

}
);

router.post("/register", async (req, res) => {

  const User = await user.findOne().or([ { username: req.body.username },{ email: req.body.email }]);
  if (User) {
    return res.status(400).json("cannot register you");
  }
  const newUser = new user(req.body);
  await newUser.validate();
  await newUser.save();
  const token = jwt.sign(
    { username: newUser.username },
    jwtSecret,
    {
      audience: jwtAudience,
      issuer: jwtIssuer,
      subject: newUser._id.toString()
    }
  );

  res.json({ token });
});

export { router as rootRouter };
