const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const app = express();

app.use(express.json());

app.post('/change', async (req, res) => {
    const { currentUserID, originalPassword, newPassword } = req.body;

    try {
        const foundUser = await User.findOne({ 'user_id': currentUserID });

        if (!foundUser) {
            return res.status(200).json({ message: '이건 틀릴 수가 없는데..' });
        }

        const isPasswordMatch = await bcrypt.compare( originalPassword, foundUser.user_pw);

        if (!isPasswordMatch) {
            return res.status(200).json({ message: '로그인 실패' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        foundUser.user_pw = hashedPassword;
        await foundUser.save();
        

        return res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
    } catch (error) {
        console.error("비밀번호 변경 중 오류 발생:", error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
});

module.exports = app;