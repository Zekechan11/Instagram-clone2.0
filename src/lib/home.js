const app = Vue.createApp({
    data() {
        return {
            contents: [],
            curuser: ""
        };
    },
    mounted() {
        this.fetchPost();
        this.curuser = localStorage.getItem('user_id');
    },
     methods: {
        fetchPost() {
            const cuid = localStorage.getItem('user_id');
            $.ajax({
                url: `../api/content/get_content.php?fuid=${cuid}&cuid=${cuid}`,
                method: 'GET',
                dataType: 'json',
                success: (data) => {
                    this.contents = data.map(content => ({
                        ...content,
                        isEditing: false,
                        editedContent: content.content
                    }));
                },
                error: (xhr, status, error) => {
                    console.error("Error fetching data:", error);
                }
            });
        },        
        editContent(id){
            this.contents = this.contents.map(content => ({
                ...content,
                isEditing: content.post_id === id
            }));
        },
        cancelEditContent(item) {
            item.isEditing = false;
            item.editedContent = item.content;
        },

        saveEditedContent(item) {
            $.ajax({
                url: `../api/content/edit_content.php?postid=${item.post_id}&content=${item.editedContent}`,
                success: () => {
                    location.reload();
                },
                error: (xhr, status, error) => {
                    console.error("Error saving edited content:", error);
                }
            });
        },
        
        deletePost(id) {
            $.ajax({
                url: `../api/content/delete_content.php?post_id=${id}`,
                success: () => {
                    location.reload();
                },
                error: (xhr, status, error) => {
                    console.error("Error deleting post:", error);
                }
            });
        }
        
  }
});

app.mount("#homepage");
