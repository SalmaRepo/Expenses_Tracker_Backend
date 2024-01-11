import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/* import nodemailer from "nodemailer" */

export const register = async (req, res, next) => {
  let sampleFile;
  let uploadPath;
console.log(req.files)
  if (req.files) {
    sampleFile = req.files.userImage;
  } else {
    sampleFile = "";
  }
  console.log(sampleFile)
  const imagePath = Date.now() + "_" + sampleFile.name;
  uploadPath = "assets/" + Date.now() + "_" + sampleFile.name;
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    console.log(hashedPassword);
    sampleFile.mv(uploadPath, async function(err) {
    //const getImage = await ImageModel.find()

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      userImage: imagePath
      
    });
    res.status(200).send(newUser);
})  
 
};


export const login = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      email: req.body.email,
      /*  password: req.body.password, */
    });

    console.log(foundUser)

    if (foundUser) {
      /*   const hashedPassword=bcrypt.hashSync(req.body.password,10); */
      const check = await bcrypt.compare(req.body.password, foundUser.password); //112346, $2b$10$2t.KTg7xcf5XOBK5YeeYq.fNHq8cTh1B2xi8VgSxxjkU2qkrw5ci6
      console.log(check)
      if (check) {
        //authentication process
        //jwt.sign(payload,secretkey,options)
        const token = jwt.sign(
          { _id: foundUser._id, email: foundUser.email },
          process.env.SECRET_KEY,
          { issuer: "TeamExpenses", expiresIn: "5h" }
        );

        console.log(token);
        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViNjMwZDY3OGYxMWI0ZDFmYjUxMDgiLCJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIiwiaWF0IjoxNzAwNDg3OTkwLCJleHAiOjE3MDA0OTE1OTAsImlzcyI6Ik5hcXZpIn0.7gTRNYIRHsFx3wGakdIgmuWgYOev95bYN42ErvfHLyA
        /*       res.send({msg: "welcome back", foundUser, token}); */
        res
          .header("token", token)
          .send({
            success: true,
/*             data: foundUser.populate("expenses").populate("incomes"), */
           data: foundUser
          });
        /* res.cookie("token",token).send({msg: "welcome back", foundUser}); */
      } else {
        res
          .status(401)
          .send({ success: false, message: "password doesn't match!" });
      }
    } else {
      // if there is no user found, then send this response
      res.send({ success: false, message: "Make sure your email is correct!" });
      /* res.json("Make sure your email is correct!") */
    }
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const getAll = await User.find();
    console.log(getAll)
    res.send({ success: true, data: getAll });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const getSingleUser = await User.findById(req.params.id);
    if (getSingleUser) {
      res.send({ success: true, data: getSingleUser });
    } else {
      res.send({ success: false, msg: "user not found" });
    }
  } catch (err) {
    next(err);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const updateSingleUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.send({ success: true, data: updateSingleUser });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    res.send({ success: true, msg: "user deleted" });
  } catch (err) {
    next(err);
  }
};
