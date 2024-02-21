const User = require('../models/user');

// User Details Display on Profile Page
module.exports.profile = async function(req, res){

    try {
        if(req.cookies.user_id){
            const user = await User.findById(req.cookies.user_id);
            if(user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            }
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch(err) {
        console.log('Error in finding user by ID:', err);
        return res.redirect('/users/sign-in');
    }
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

// Get the Sign Up Data
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
module.exports.createSession = async function(req, res){

    try {
        // Find the User
        const user = await User.findOne({email: req.body.email});

        // Handle User found
        if(user){
            // Handle Password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            // Handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            // Handle User not found
            return res.redirect('back');
        }
    }
    catch(err) {
        console.log('error in finding User in Signing in', err);
        return res.redirect('back');
    }
}














