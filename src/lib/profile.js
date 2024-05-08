const app = Vue.createApp({
    data() {
        return {
            items: [],
            mepost: [],
            following: "",
            cuser: false,
        }
    },
    mounted() {
        const suid = localStorage.getItem('user_id');
        const uid = new URLSearchParams(window.location.search).get('uid');

        if(uid == suid) {
            this.cuser = true;
        }

        this.fetchMePost();

        $.ajax({
            url: `../api/follow/get_follow.php?uid=${uid}`,
            dataType: 'json',
            success: (data) => {
                this.items = data[0];
            },
            error: (xhr, status, error) => {
                console.error("Error fetching data:", error);
            }
        });
        
        $.ajax({
            url: `../api/follow/get_follow.php?uid=${suid}`,
            dataType: 'json',
            success: (data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].following_id == uid) {
                        this.following = true;
                        console.error(data);
                        break;
                    }
                }
            },
            error: (xhr, status, error) => {
                console.error("Error fetching data:", error);
            }
        });        
    },
    methods: {
        followToggle() {
            const fsuid = localStorage.getItem('user_id');
            const fuid = new URLSearchParams(window.location.search).get('uid');
        
            if (this.following) {
                $.ajax({
                    url: `../api/follow/remove_follow.php?uid=${fsuid}&suid=${fuid}`,
                    dataType: 'json',
                    success: () => {
                        this.following = false;
                    },
                    error: (xhr, status, error) => {
                        console.error("Error removing follow:", error);
                    }
                });
            } else {
                $.ajax({
                    url: `../api/follow/user_follow.php?uid=${fsuid}&suid=${fuid}`,
                    dataType: 'json',
                    success: () => {
                        this.following = true;
                    },
                    error: (xhr, status, error) => {
                        console.error("Error following user:", error);
                    }
                });
            }            
        },

        fetchMePost() {
            const muid = new URLSearchParams(window.location.search).get('uid');
        
            $.ajax({
                url: `../api/content/get_content.php?cuid=${muid}`,
                dataType: 'json',
                success: (data) => {
                    this.mepost = data;
                },
                error: (xhr, status, error) => {
                    console.error("Error fetching data:", error);
                }
            });
        }        
    }
});

app.mount('#profile');
