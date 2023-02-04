var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi.js";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
/**
 * This is a concrete InternetArchive class implementation of IMedia
 */
export class InternetArchive {
    constructor() {
        this.client = new Axiosi();
        this.resources = [];
        this.BASE_URL = '';
        this.apiFormat = new ApiFormat();
        this.videoRes = new Resource(this, 'name', {
            name: 'videoReq',
            baseUrl: '/videos',
            params: {
                q: 'q',
                field: '',
                count: 100
            }
        }, 'videoResp');
        this.client.load('../config.json').then(resp => {
            if (resp) {
                this.config = resp.data;
                this.BASE_URL = this.config.api.InternetArchive.baseUrl;
                this.BASE_PARAMS = {
                    ID: this.config.api.InternetArchive.id,
                    KEY: this.config.api.InternetArchive.key
                };
            }
        });
    }
    getBaseParams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const config = yield this.client.load('../config.json');
                const apiBaseParams = config === null || config === void 0 ? void 0 : config.data.api.InternetArchive.baseParams;
                return apiBaseParams;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getBaseUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const config = yield this.client.load('../config.json');
                const apiBaseUrl = config === null || config === void 0 ? void 0 : config.data.api.InternetArchive.baseUrl;
                return apiBaseUrl;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getData(resData) {
        let respData = [];
        let video;
        for (const videoData of resData.dataSource) {
            video = {
                id: videoData.identifier,
                status: '',
                privacy: '',
                tags: videoData.subject,
                description: videoData.description,
                genre: videoData.mainCategory,
                thumbnailSmall: videoData.imageLinks.thumbnail,
                thumbnailLarge: videoData.imageLinks.large,
                created: videoData.publicDate,
                license: '',
                title: videoData.title,
                authors: videoData.creator,
                printType: videoData.printType,
                format: videoData.mediatype
            };
            respData.push(video);
            //this.videoRes.response.dataList.push(videoData);
        }
        return respData;
    }
}
