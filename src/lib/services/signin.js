const suid = localStorage.getItem('user_id');
if (suid) {
    window.location.href = 'index.html';
}

$('#loginForm').submit(function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    
    $.ajax({
        url: '../api/auth/login_auth.php',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.success) {
                localStorage.setItem('user_id', data.user_id);
                $('#loginForm')[0].reset();
                window.location.href = 'index.html';
            } else {
                alert(data.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});