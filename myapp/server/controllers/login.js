const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const User = require('../models/user');

const app = express();

app.use(cookieParser());

app.use(express.json());

app.post('/logout', (req, res) => {
    res.json({ message: '로그아웃 성공' });
});

app.post('/login', async (req, res) => {
    const { log_id, log_password } = req.body;

    try {
        const foundUser = await User.findOne({ 'user_id': log_id });

        if (!foundUser) {
            return res.status(200).json({ message: '로그인 실패' });
        }

        const isPasswordMatch = await bcrypt.compare(log_password, foundUser.user_pw);

        if (!isPasswordMatch) {
            return res.status(200).json({ message: '로그인 실패' });
        }

        res.cookie('user_id', log_id, { maxAge: 900000, httpOnly: true, sameSite: 'None', secure: true });
        res.status(200).cookie('user_id', log_id).json({ message: '로그인 성공' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = app;
