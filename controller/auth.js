// import con from '../dbConfig.js';
import jwt from 'jsonwebtoken';
// import uniqueId from '../helpers/uniqueId.js';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Category from '../models/Category.js';

export async function register(req, res) {
    try {
        let { fullName, email, password } = req.body;
        //todo: validating password;
        email = email.toLowerCase();
        const hash = bcrypt.hashSync(password, 10);
        const user = new User({ fullName, email, username: email, password_hash: hash });
        await user.save();
        // store default category;
        await new Category({ userId: user._id, title: 'Default' }).save();

        // // If every validation passes
        const token = generateToken(user._id, fullName, email);
        // // Store the token in the cookie for 30days;
        res.cookie('token', token, { maxAge: 2592000000, httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(201).json({ success: true, message: 'signed-in' });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (MongoDB error code 11000)
            return res.status(400).json({ error: true, message: 'Email or username already exists' });
        }
        res.status(400).json({ error: true, message: error.message });
    }
}

export async function login(req, res) {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        // Check if email exists and match passwords
        const user = await User.findOne({ username: email });
        if (!user) {
            return res.status(400).json({ error: true, email: 'email is not found.' });
        }

        const isAuth = bcrypt.compareSync(password, user.password_hash);
        if (!isAuth) {
            return res.status(400).json({ error: true, password: 'password is not correct.' });
        }

        // // If every validation passes
        const token = generateToken(user._id, user.fullName, user.username);
        // // Store the token in the cookie for 30days;
        res.cookie('token', token, { maxAge: 2592000000, httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ success: true, message: 'logged-in' });
    } catch (err) {
        // console.log(err);
        res.status(400).json({ error: true, message: err.message });
    }
}

export async function logout(req, res) {
    res.clearCookie('token');
    res.redirect(302, '/login');
}

export function me(req, res) {
    res.json(req.user);
}

export function authenticate(req, res, next) {
    const authCookie = req.cookies['token'];

    // If there is no cookie, redirect;
    if (authCookie == null) return res.redirect(302, '/login');

    // If there is a cookie, verify it
    jwt.verify(authCookie, process.env.JWT_SECRET_KEY, (err, user) => {
        // If there is an error, return an error
        if (err) {
            res.clearCookie('token');
            return res.redirect(302, '/login');
        }
        const { id, fullName, email } = user;

        // If there is no error, continue the execution
        req.user = { id, fullName, email };
        next();
    })
}



function generateToken(id, fullName, email) {
    return jwt.sign({ id, fullName, email }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

}

// function isValidData(full_name, email, pass) {
//     const message = { error: false };
//     if (full_name.length < 3) {
//         message.error = true;
//         message.name = "Name must be greater than 3 character.";
//     }
//     if (email.length < 6 || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
//         message.error = true;
//         message.name = "Please Provide correct email.";
//     }
//     if (
//         pass.search(/[A-Z]/) === -1 ||
//         pass.search(/[a-z]/) === -1 ||
//         pass.search(/[0-9]/) === -1 ||
//         pass.search(/[`~!@#$%^&*)(?.><]/) === -1 ||
//         pass.length < 8
//     ) {
//         message.error = true;
//         message.name = "Please Provide correct password.";
//     }
//     return message;
// }