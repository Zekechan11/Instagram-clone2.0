$('#signupForm').submit(function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    
    $.ajax({
        url: '../api/auth/signup_auth.php',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function() {
            let op = document.getElementById('s');
            op.showModal();
            $('#signupForm')[0].reset();
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
