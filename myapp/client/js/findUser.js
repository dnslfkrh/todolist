document.addEventListener('DOMContentLoaded', function() {
    const forgotIdButton = document.getElementById('forgot-id-button');

    forgotIdButton.addEventListener('click', function() {
        window.location.href = '/id';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const forgotEmailButton = document.getElementById('forgot-password-button');

    forgotEmailButton.addEventListener('click', function() {
        window.location.href = '/email';
    });
});