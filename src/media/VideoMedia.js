import { Youtube } from "../api/video/Youtube";
export class VideoMedia {
    constructor(format) {
        this.apis = [];
        this.mediaItems = [];
        this.youtube = new Youtube(format);
        //this.media = new Media(type);
        this.apis.push(this.youtube);
    }
}
