const app = Vue.createApp({
    data() {
        return {
            comments: [],
            owner: ""
        }
    },
    mounted() {
        this.fetchComment();
        this.owner = localStorage.getItem('user_id');
    },
    methods: {
        fetchComment() {
            const postId = new URLSearchParams(window.location.search).get('post');
        
            $.ajax({
                url: `../api/comment/get_comment.php?postid=${postId}`,
                dataType: 'json',
                success: (data) => {
                    this.comments = data.map(comment => ({
                        ...comment,
                        isEditing: false,
                        editedComment: comment.comment_text
                    }));
                    console.log(data);
                },
                error: (xhr, status, error) => {
                    console.error('Error fetching data:', error);
                }
            });
        },
        editComment(id){
            this.comments = this.comments.map(comment => ({
                ...comment,
                isEditing: comment.comment_id === id
            }));
        },

        cancelEdit(item) {
            item.isEditing = false;
            item.editedComment = item.comment_text;
        },

        saveEditedComment(item) {
            $.ajax({
                url: `../api/comment/edit_comment.php?cid=${item.comment_id}&comment=${item.editedComment}`,
                success: () => {
                    location.reload();
                },
                error: (xhr, status, error) => {
                    console.error("Error saving edited comment:", error);
                }
            });
        },
        
        deleteComment(id) {
            $.ajax({
                url: `../api/comment/delete_comment.php?cid=${id}`,
                success: () => {
                    location.reload();
                },
                error: (xhr, status, error) => {
                    console.error("Error deleting comment:", error);
                }
            });
        }        
    }
});

app.mount('#comment');