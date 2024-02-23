function parseCookies() {
    return document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookies[name] = value;
        return cookies;
    }, {});
}
const currentUserID = parseCookies()['user_id'];

document.getElementById('my-button').addEventListener('click', function () {
    const originalPassword = document.getElementById('original-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;

    if (newPassword !== confirmNewPassword) {
        alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
        return; 
    }

    fetch('/change', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            currentUserID: currentUserID,
            originalPassword: originalPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword 
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }
            return response.json();
        })
        .then(data => {
            if (data.message === '사용자를 찾을 수 없습니다.') {
                alert('기존 비밀번호가 틀렸습니다.');
            } else if (data.message === '비밀번호가 성공적으로 변경되었습니다.') {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                fetch('/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP 오류! 상태: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        document.cookie.split(";").forEach(function (c) {
                            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/;SameSite=None;Secure");
                        });
                        window.location.href = '/login';
                    })
                    .catch(error => {
                        console.error('에러:', error);
                    });
                window.location.href = '/login';

            }
        })
        .catch(error => {
            console.error('POST 요청 오류:', error);
        });
});