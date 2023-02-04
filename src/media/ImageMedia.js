var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ZerpSerp } from "../api/pic/ZernSerp";
import { Media } from "./Media";
export class ImageMedia {
    constructor() {
        this.apis = [];
        this.media = new Media("images");
    }
    readMedia(params, op) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params) {
                this.zerpSerp = new ZerpSerp(params);
                this.apis.push(this.zerpSerp);
                try {
                    return yield this.media.readItems("images", params, op);
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
    }
    getMedia(params) {
        return __awaiter(this, void 0, void 0, function* () {
            //const res = {}
            if (!this.zerpSerp) {
                if (params)
                    this.zerpSerp = new ZerpSerp(params);
                this.apis.push(this.zerpSerp);
            }
            try {
                yield this.media.load('images', this, params);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
