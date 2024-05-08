const search = Vue.createApp({
    data() {
        return {
            results: [],
            searchText: ''
        }
    },
    mounted() {
        this.fetchUserX();
    },
    methods: {
        fetchUserX() {
            $.ajax({
                url: "../api/user/search_user.php",
                method: 'GET',
                dataType: 'json',
                success: (data) => {
                    this.results = data;
                },
                error: (xhr, status, error) => {
                    console.error('Error fetching data:', error);
                }
            });
        },        
        performSearch() {
            this.resultsFiltered = this.results.filter(item =>
                item.fullname.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }
    },
    computed: {
        resultsFiltered() {
            return this.results.filter(item =>
                item.fullname.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }
    }
});

search.mount('#search');
