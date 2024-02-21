const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: "User Profile"
    })
}

// Render the Sign Up Page
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: "Codieal | Sign Up"
    })
}


// Render the Sign In Page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: "Codieal | Sign In"
    })
}

// Render the Sign In Page

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}).then(function(user){
        if(user){
            return res.redirect('back'); // User already exists, redirect back
        } else {
            // User does not exist, create a new user
            User.create(req.body).then(function(user){
                return res.redirect('/users/sign-in'); // Redirect to sign-in page after successful creation
            }).catch(function(err){
                console.log('error in creating user while signing up', err);
                return res.redirect('back'); // Redirect back if there's an error
            });
        }
    }).catch(function(err){
        console.log('error in finding user in signing up', err);
        return res.redirect('back'); // Redirect back if there's an error
    });
}




// Sign In and Create a session for the User
module.exports.createSession = function(req, res){
    // TODO later
}












// Sign In and Create a session for the User
module.exports.createSession = function(req, res){
    // TODO later
}













