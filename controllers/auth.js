
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Admin = require("../models/admin");
const User = require("../models/user");

userCategories = ['admin', 'student', 'tutor']

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
if(!(userCategories.includes(category))){
	res.status(400).send({
		message: "Invalid user category."
	})
	return;
}
User.find({ category })
	.then(User.findOne({ email })
		.then(user => {
      if (user) {
        return res
          .status(423)
          .send({status: false, message: "This user already exists"});
      }
    }))
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
User.find({ category })
.then(User.findOne({ email })
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
"somesecretkey",
{ expiresIn: "1hr" }
);
res.status(200).send({
_id: user._id,
token
});
});
}))
.catch(err => console.log(err));
}
