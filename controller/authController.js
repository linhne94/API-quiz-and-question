var User = require('../model/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
var JWT_SECRET_KEY = 'KSHjkadhskjadhjskaduhwandskajdska1231321321';

const register = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            password: hash,
        })

        await newUser.save()

        res.status(200).json({
            success: true,
            message: 'Successfully created'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again'
        })

    }
}

const login = async (req, res) => {

    const username = req.body.username;

    try {
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        if (!checkCorrectPassword) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password'
            })
        }

        const { password, role, ...rest } = user._doc;

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET_KEY,
            { expiresIn: "15d" }
        )

        // set token in cookies
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({
            success: true,
            message: 'Successfully login',
            token: token,
            role: role,
            data: { ...rest }
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'fail to login'
        })
    }
}

module.exports = {
    register,
    login
}