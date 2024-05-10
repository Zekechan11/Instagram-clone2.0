$(document).ready(function() {
    $('#fileInput').change(handleFileUpload);
});

function handleFileUpload(event) {
    const files = event.target.files;
    const uid = localStorage.getItem('user_id');
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append('img[]', files[i]);
    }

    formData.append('uid', uid);

    $.ajax({
        url: '../api/content/upload_content.php',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function(data) {
            console.log(data);
            $('#imguid').val(data.img_uid);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}