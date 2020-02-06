const PORT = 3000;
const URI = 'localhost:'+PORT+'/';
const app = new Vue({
    el: '#app',
    data: {
        search: '',
        notes: []
    },
    methods: {
        createNote(){
            if(!this.isAnyNewNote) {
                this.search = '';
                this.clearEditing();
                this.notes.push({
                    title: '',
                    editing: true,
                    subject: '',
                    category: 'normal',
                    content: '',
                    created: true,
                })
            }
        },
        saveNote(note){
            if(note.created){
                if(note.title) {
                    this.clearEditing();
                    axios.post('/note', {
                        title: note.title,
                        subject: note.subject,
                        content: note.content,
                        category: note.category,
                    })
                        .then(res => {
                            console.log(note);
                            note._id = res.data._id;
                            toastr.success('Note saved');
                        })
                        .catch(err => {
                            console.warn(err);
                            toastr.error(err.message);
                        });
                }
            } else {
                this.updateNote(note);
            }
        },
        updateNote(note){
            this.clearEditing();
            axios.patch(`/note/${note._id}`, {
                title: note.title,
                subject: note.subject,
                content: note.content,
                category: note.category
            }).then(res => {
                toastr.success('Note saved');
            }).catch(err => {
                console.warn(err);
                toastr.error(err.message);
            });
        },
        deleteNote(note){
            this.notes = this.notes.filter( i => note._id !== i._id);
            axios.delete(`/note/${note._id}`)
                .then(res => {
                    toastr.success("Note deleted");
                }).catch(err => {
                    console.warn(err);
                    toastr.error(err.message);
                });
        },
        editNote(note){
            this.clearEditing();
            note.editing=true;
        },
        clearEditing(){
            this.notes.forEach(note => { note.editing=false; note.created=false });
        },
        isInCategory(note, catName){
            return note.category === catName;
        }
    },
    computed: {
        notesToDisplay: function() {
            if(this.search === ''){
                return this.notes;
            }else{
                return this.notes.filter(note => note.title.includes(this.search) || note.subject.includes(this.search) || note.subject.includes(this.content));
            }
        },
        isAnyNewNote: function () {
            return this.notes.some(note => note.created === true);
        }
    },
    mounted: function () {
        axios.get('/note')
            .then(res => {
                res.data.forEach(el => {
                    el.created = false;
                    el.editing = false;
                });
                this.notes = res.data;
            })
            .catch(err => console.warn(err));
    }
});