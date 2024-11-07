export class BookForm {
    constructor() {
        this.formContainer = document.getElementById("book-form");
        this.isEditing = false;
    }

    render(onSubmit, book = null) {
        this.isEditing = book !== null;
        this.formContainer.innerHTML = `
            <div class="card form-card glassy">
                <div class="card-body">
                    <h2 class="h4 mb-3">${this.isEditing ? 'Edit Buku' : 'Tambah Buku'}</h2>
                    <form id="book-form">
                        <div class="mb-3">
                            <label for="title" class="form-label">Judul Buku</label>
                            <input type="text" class="form-control rounded-pill" id="title" placeholder="Judul Buku" required>
                        </div>
                        <div class="mb-3">
                            <label for="author" class="form-label">Penulis</label>
                            <input type="text" class="form-control rounded-pill" id="author" placeholder="Nama Penulis" required>
                        </div>
                        <div class="mb-3">
                            <label for="year" class="form-label">Tahun Terbit</label>
                            <input type="number" class="form-control rounded-pill" id="year" placeholder="Tahun" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 rounded-pill shadow-neumorphic">${this.isEditing ? 'Update Buku' : 'Simpan Buku'}</button>
                    </form>
                </div>
            </div>
        `;

        const formElement = this.formContainer.querySelector("form");
        formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;
            const year = document.getElementById("year").value;
            onSubmit({ title, author, year });
            this.resetForm();
        });

        if (this.isEditing) {
            this.fillForm(book);
        }

        document.getElementById("title").focus();
    }

    fillForm(book) {
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("year").value = book.year;
    }

    resetForm() {
        const confirmReset = confirm("Apakah Anda yakin ingin menghapus semua data?");
        if (confirmReset) {
            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            document.getElementById("year").value = "";
            this.isEditing = false;
        }
    }
}
