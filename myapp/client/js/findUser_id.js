const confirmButton = document.getElementById('confirm-button');

confirmButton.addEventListener('click', function () {
    const emailInput = document.getElementById('email-input').value;

    fetch('/findId', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailInput })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 상태가 좋지 않습니다.');
            }
            return response.json();
        })
        .then((data) => {
            if (data.message === '이메일 있음') {
                alert('이메일을 전송했습니다.');
            } else if (data.message === '이메일 없음') {
                alert('이메일을 확인해 주십시오.');
            }
        })
        .catch(error => {
            console.error('에러 발생:', error);
        });
});
