const User = require('../models/user');
const Subject = require('../models/subjects');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name
  const role = req.body.role

  if(!email || !password || !name || !role){
  	return res.status(400).send("All fields are required.")
  }
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
{ expiresIn: 86400 }
);
User.findByIdAndUpdate(user._id, { accessToken })
.then(() => {
	res.status(200).send({
_id: user._id,
accessToken,
Role: user.role,
Email: user.email
});
})
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
	User.findByIdAndUpdate( user._id,  {admin: true} )
	.then(() =>{
		res.status(200).send({
		Message: "Congratulations. You are now an admin.",
		_id: user._id,
		 

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
{ expiresIn: 86400 }
);
User.findByIdAndUpdate(user._id, { accessToken })
.then(() => {
		res.status(200).send({
_id: user._id,
accessToken,
Role: user.role,
Email: user.email
});

})
});
})
.catch(err => console.log(err));
}

exports.getSubjectByCategory = (req, res, next) => {
	const category = req.params.category;
	const accessToken = req.headers['access-token'];
	User.findOne({accessToken})
	.then((user) => {
		if (!user){
			return res.status(400).send("You must be logged in.")
		}
		Subject.find({category})
		.then(subjects => {
			res.status(200).send({
				Category: subjects.category,
				Subjects: subjects.name

			})
		})
	})
	.catch(err => console.log(err))

}

exports.getAllCategories = (req, res, next) => {
	const accessToken = req.headers['access-token'];
	User.findOne({accessToken})
	.then((user) => {
		if (!user){
			return res.status(400).send("You must be logged in.")
		}
		Subject.find({})
		.then(subject => {
			res.status(200).send({
				Categories: subject.category,
				

			})
		})
	})
	.catch(err => console.log(err))

}

exports.createSubject = (req,res,next) => {
	const accessToken = req.body.token;
	const name = req.body.name;
	const category = req.body.category;
	User.findOne({$and: [ {accessToken}, {admin: true} ]})
	.then((user) => {
		if (!user){
			return res.status(400).send("Not authorised.")
		}
		Subject.findOne({$and: [{name}, {category}]})
		.then(subject => {
			if (subject){
				res.status(400).send({
				Message: 'Subject already exists.'
				})}
		let subjects = new Subject({
        name,
        category
   
      });
      return subjects.save();
		})
		.then(() => res.status(200).send({ status: true, message: "Subject created successfully" }))
	})
	.catch(err => console.log(err))

}

exports.getTutors = (req, res, next) => {
	const accessToken = req.headers['access-token'];
	User.findOne({$and: [ {accessToken}, {admin: true} ]})
	.then((user) => {
		if (!user){
			return res.status(400).send("Not authorised.")
		}
		User.find({role: 'tutor'})
		.then((user) => {
			res.status(200).send({
				user

			})
		})
		})
	.catch(err => console.log(err))

}

exports.getTutor = (req, res, next) => {
	const accessToken = req.headers['access-token'];
	const id = req.params.id
	User.findOne({$and: [ {accessToken}, {admin: true} ]})
	.then((user) => {
		if (!user){
			return res.status(400).send("Not authorised.")
		}
		User.findById(id)
		.then((user) => {
			if (!user){
				return res.status(400).send("Tutor not found")
			}
			res.status(200).send({
				user

			})
		})
		})
	.catch(err => console.log(err))

}

exports.deleteTutor = (req, res, next) => {
	const accessToken = req.headers['access-token'];
	const id = req.params.id
	User.findOne({$and: [ {accessToken}, {admin: true} ]})
	.then((user) => {
		if (!user){
			return res.status(400).send("Not authorised.")
		}
		User.findByIdAndDelete(id)
		.then((user) => {
			if (!user){
				return res.status(400).send("Tutor not found")
			}
			res.status(200).send({
			Message: 'User has been deleted.'

			})
		})
		})
	.catch(err => console.log(err))

}