const completeButton = document.getElementById('complete-button');

        completeButton.addEventListener('click', function (e) {
            e.preventDefault();

            const user_id = document.getElementById('user_id').value;
            const user_email = document.getElementById('user_email').value;
            const user_pw = document.getElementById('user_pw').value;
            const confirm_pw = document.getElementById('confirm_pw').value;

            if (!user_id || !user_email || !user_pw || !confirm_pw) {
                alert('모든 항목을 전부 입력해 주십시오.');
                return;
            }

            if (user_pw !== confirm_pw) {
                alert('비밀번호를 다시 확인해 주십시오.');
                return;
            }

            fetch('/saveuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id, user_email, user_pw, confirm_pw }),
            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.error);
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                alert(data.message);
                if (data.message === '회원가입이 완료되었습니다.') {
                    window.location.href = '/login';
                }
            })
            .catch((error) => {
                console.error('POST 요청 오류:', error);
                alert(error.message);
            });
        });
