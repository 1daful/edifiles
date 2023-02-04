import { GoogleBooks } from "../api/book/GoogleBooks";
export class BookMedia {
    constructor(format) {
        //publisher!: string;
        //subtitle!: string;
        //pageCount!: number;
        this.apis = [];
        this.googleBooks = new GoogleBooks(format);
        //this.media = new Media(type);
        this.apis.push(this.googleBooks);
    }
}
