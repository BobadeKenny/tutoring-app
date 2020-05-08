
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config")
const verifyUser = require("../models/verifyUser")

exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name
  const category = req.body.category
 

  if(!email || !password || !name || !category) {
     res.status(400).send({
        status: false,
        message: "All fields are required"
})
 return;
}
if (category == 'admin'){
	User.findOne({$and: [{category:'tutor'}, {email}]})
	.then(user => {
		if (!user){
			return res
          .status(423)
          .send({status: false, message: "Unauthorized to be an admin."});
		}
	
	bcrypt
    .hash(password, 12)
    .then(password => {
      let user = new User({
        email,
        password,
        name,
        category,
      });
      return user.save();
    })
    .then(() => res.status(200).send({ status: true, message: "User registered successfully" }))
    .catch(err => console.log(err));
})
}
if(category != 'tutor' ){
	if(category != 'student'){
		if (category != 'admin'){
	res.status(400).send({
		message: "Invalid user category."
	})
	return;
}}}

User.findOne({ $and: [ {category: category}, {email}] })
		.then(user => {
      if (user) {
        return res
          .status(423)
          .send({status: false, message: "This user already exists"});
      }
    })
  bcrypt
    .hash(password, 12)
    .then(password => {
      let user = new User({
        email,
        password,
        name,
        category,
      });
      return user.save();
    })
    .then(() => res.status(200).send({ status: true, message: "User registered successfully" }))
    .catch(err => console.log(err));
};

exports.logIn = (req, res, next) => {
const email = req.body.email;
const password = req.body.password;
const category = req.body.category;
User.findOne({ $and: [ {category}, {email}] })
	.then(user => {
if (!user) {
return res
.status(404)
.send("User not found, please provide valid credentials");
}

bcrypt.compare(password, user.password).then(valid => {
if (!valid) {
return res
.status(403)
.send(
"Incorrect username or password, please review details and try again"
);
}
const token = jwt.sign(
{ email: user.email, _id: user._id },
config.secret,
{ expiresIn: 86400 }
);
res.status(200).send({
_id: user._id,
token
});
});
})
.catch(err => console.log(err));
}


exports.user = (req, res, next) => {
	var token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).send({
			status: false,
			message: "No token provided."
		})
	}
	jwt.verify(token, config.secret, function(err, decoded){
		if (err){
			return res.status(500).send({
			status: false,
			message: "Failed to authenticate token."
		})
		}
		res.status(200).send(decoded)
	})
}


exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = verifyUser.can(req.user.category)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}

exports.updateUser = async (req, res, next) => {
 try {
  const update = req.body
  const userId = req.params.userId;
  await User.findByIdAndUpdate(userId, update);
  const user = await User.findById(userId)
  res.status(200).json({
   data: user,
   message: 'User has been updated'
  });
 } catch (error) {
  next(error)
 }
}

exports.deleteUser = async (req, res, next) => {
 try {
  const userId = req.params.userId;
  await User.findByIdAndDelete(userId);
  res.status(200).json({
   data: null,
   message: 'User has been deleted'
  });
 } catch (error) {
  next(error)
 }
}

exports.getUsers = async (req, res, next) => {
 const users = await User.find({});
 res.status(200).json({
  data: users
 });
}

