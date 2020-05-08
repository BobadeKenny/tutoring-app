
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config")


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
if(category != 'tutor' ){
	if(category != 'student'){
	res.status(400).send({
		message: "Invalid user category."
	})
	return;
}}

User.findOne({ $and: [ {category}, {email}] })
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
{ email, _id: User._id },
config.secret,
{ expiresIn: "1hr" }
);
res.status(200).send({
_id: User._id,
token,
email,
category
});
});
})
.catch(err => console.log(err));
}

