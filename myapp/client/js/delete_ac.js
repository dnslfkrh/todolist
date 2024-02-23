function parseCookies() {
    return document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookies[name] = value;
        return cookies;
    }, {});
}

const currentUserID = parseCookies()['user_id'];

document.getElementById('delete-button').addEventListener('click', function () {
    const Password = document.getElementById('password').value;
    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            currentUserID: currentUserID,
            password: Password
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }
            return response.json();
        })
        .then(data => {
            if (data.message === '비밀번호 틀림') {
                alert('비밀번호가 틀렸습니다.');
            } else if (data.message === '회원 탈퇴가 완료되었습니다.') {
                alert('탈퇴 처리가 완료되었습니다.');
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.error('POST 요청 오류:', error);
        });
});
