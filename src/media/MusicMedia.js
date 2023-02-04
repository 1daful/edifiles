import { SoundCloud } from "../api/music/SoundCloud";
//import { Axiosi } from "src/api/Axiosi.js";
export class MusicMedia {
    constructor(format) {
        this.apis = [];
        this.soundCloud = new SoundCloud(format);
        //this.media = new Media(type);
        this.apis.push(this.soundCloud);
    }
}
