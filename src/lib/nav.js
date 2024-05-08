const nav = Vue.createApp({
    data() {
        return {
            uid: ""
        }
    },
    created() {
        this.uid = localStorage.getItem('user_id');
    }
});

nav.mount('#nav');