const express = require('express');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

app.post('/findPs', async (req, res) => {
    const { email } = req.body;
    try {
        const foundUser = await User.findOne({ 'user_email': email });

        if (!foundUser) {
            return res.status(200).json({ message: '이메일 없음' });
        }

        res.status(200).json({ message: '이메일 있음'});

        const randomPassword = Math.random().toString(36).slice(-8);
        console.log(randomPassword);

        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        foundUser.user_pw = hashedPassword;

        await foundUser.save();

        const mailOptions = {
            from: '', // 작성자
            to: `${email}`, // 수신자
            subject: 'Here is your New To Do List Password', // 메일 제목
            text: `Your new password : [${randomPassword}]\nYou must change your password!!` // 메일 내용
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = app;