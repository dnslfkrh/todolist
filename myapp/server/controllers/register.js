const bcrypt = require('bcrypt');
const User = require('../models/user');

async function saveUser(req, res) {
  const { user_id, user_email, user_pw, confirm_pw } = req.body;
  
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  if (
    !user_id || !user_email || !user_pw || !confirm_pw
    ) {
    return res.status(400).json({ error: '유효하지 않은 데이터' });
  }
  
  if (
    user_pw.length < 8 ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(user_pw) ||
    !/\d/.test(user_pw) ||
    (!/[A-Z]/.test(user_pw) && !/[a-z]/.test(user_pw))
  ) {
    return res.status(400).json({ error: '비밀번호는 특수문자와 숫자를 포함하여 8글자 이상이어야 합니다.'});
  }
  
  
  if (user_pw !== confirm_pw) {
    return res.status(400).json({ error: '비밀번호를 다시 확인해 주십시오.'});
  }
  
  if (!validateEmail(user_email)) {
    return res.status(400).json({ error: '다른 이메일 주소를 입력해 주십시오.' });
  }

  const existingUser = await User.findOne({ user_id });
  const existingEmail = await User.findOne({ user_email });

  if (existingUser) {
      return res.status(409).json({ error: '이미 가입된 아이디입니다.' });
  }

  if (existingEmail) {
    return res.status(409).json({ error: '유효하지 않은 이메일 주소입니다.' });
  }

  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(user_pw, saltRounds);

  try {
      const newUser = new User({ user_id, user_email, user_pw: hashedPassword });
      await newUser.save();
      res.json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
      console.error('데이터 저장 오류:', error);
      res.status(500).json({ error: '서버 오류' });

      res.json({ message: 'POST 요청이 수신되었습니다.' });
  }
}

module.exports = saveUser;
