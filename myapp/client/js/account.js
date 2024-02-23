document.addEventListener('DOMContentLoaded', function() {
    const deleteButton = document.getElementById('delete-account-button');

    deleteButton.addEventListener('click', function() {
        window.location.href = '/delete';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const fixButton = document.getElementById('fix-password-button');

    fixButton.addEventListener('click', function() {
        window.location.href = '/password';
    });
});