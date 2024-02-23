const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const ToDoList = require('../models/list');

const app = express();

app.use(express.json());

app.post('/delete', async (req, res) => {
    const { currentUserID, password } = req.body;

    try {
        const foundUser = await User.findOne({ 'user_id': currentUserID });

        if (!foundUser) {
            return res.status(200).json({ message: '회원 정보를 찾을 수 없습니다.' });
        }

        const isPasswordMatch = await bcrypt.compare(password, foundUser.user_pw);

        if (!isPasswordMatch) {
            return res.status(200).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        await ToDoList.deleteMany({ 'writer': currentUserID });

        await User.findOneAndDelete({ 'user_id': currentUserID });
        console.log('탈퇴 완료');

        res.clearCookie('user_id');

        return res.status(200).json({ message: "회원 탈퇴가 완료되었습니다." });
    } catch (error) {
        console.error("회원 탈퇴 중 오류 발생:", error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
});

module.exports = app;
