document.getElementById('login-button').addEventListener('click', function (e) {
    e.preventDefault();
    const log_id = document.getElementById('log_id').value;
    const log_pw = document.getElementById('log_pw').value;
    const data = {
        log_id: log_id,
        log_password: log_pw
    };
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }
            return response.json();
        })
        .then((data) => {
            if (data.message === '로그인 성공') {
                alert('로그인 성공');
                window.location.href = '/main';
            } else if (data.message === '로그인 실패') {
                alert('아이디 또는 비밀번호를 확인해 주십시오');
            }
        })
        .catch((error) => {
            console.error('POST 요청 오류:', error);
        });
});

const signupbutton = document.getElementById('signup-button');
signupbutton.addEventListener('click', function () {
    window.location.href = '/register';
});

const forgotPasswordLink = document.getElementById('forgot-password');
forgotPasswordLink.addEventListener('click', function () {
    window.location.href = '/find';
});