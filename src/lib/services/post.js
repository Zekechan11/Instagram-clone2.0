function clearMind() {
    $('#postForm')[0].reset();
}

$('#postForm').submit(function(event) {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');
    const formData = new FormData(this);
    formData.append('userid', userId);
    
    $.ajax({
        url: '../api/content/post_content.php',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function() {
            clearMind();
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});