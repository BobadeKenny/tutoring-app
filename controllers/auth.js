const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name
  const role = req.body.role


  User.findOne({ $and: [ {role}, {email}] })
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
        role,
      });
      return user.save();
    })
    .then(() => res.status(200).send({ status: true, message: "User registered successfully" }))
    .catch(err => console.log(err));
};
 


exports.logIn = (req, res, next) => {
const email = req.body.email;
const password = req.body.password;
User.findOne({ email })
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
const accessToken = jwt.sign(
{ email: user.email, _id: user._id },
process.env.JWT_SECRET,
{ expiresIn: "1hr" }
);
User.findByIdAndUpdate(user._id, { accessToken })
res.status(200).send({
_id: user._id,
accessToken,
Role: user.role,
Email: user.email
});
});
})
.catch(err => console.log(err));
}

exports.adminSignup = (req, res, next) => {
	const email = req.body.email;
	User.findOne({$and: [ {email}, {role: 'tutor'} ]})
	.then(user => {
		if (!user) {
			return res.status(404).send("You are not authorised to access this page.")
		}
	User.updateOne({_id: user._id},  {admin: true} )
	.then(() =>{
		res.status(200).send({
		Message: "Congratulations. You are now an admin.",
		_id: user._id,
		Admin: user.admin
		 

	})
	})
	
	})
	.catch(err => console.log(err))
}

exports.adminLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({$and: [ {email}, {admin: true} ]})
	.then(user => {
		if (!user) {
			return res.status(404).send("You are not authorised to access this page.")
		}
	bcrypt.compare(password, user.password).then(valid => {
if (!valid) {
return res
.status(403)
.send(
"Incorrect username or password, please review details and try again"
);
}
const accessToken = jwt.sign(
{ email: user.email, _id: user._id },
process.env.JWT_SECRET,
{ expiresIn: "1hr" }
);
User.findByIdAndUpdate(user._id, { accessToken })
res.status(200).send({
_id: user._id,
accessToken,
Role: user.role,
Email: user.email
});
});
})
.catch(err => console.log(err));
}