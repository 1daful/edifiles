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
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import config from "../../../public/config.json";
export class SoundCloud {
    constructor(format) {
        this.client = new Axiosi();
        this.resources = [];
        /*private _filters = {
             q: '',
             tags: '',
             filter: '',
             license: '',
             bpm: '',
             duration: '',
             created_at: '',
             ids: '',
             genres: ''
         };*/
        this.BASE_URL = '';
        this.resource = [];
        this.trackRes = (format) => {
            new Resource(this, 'tracks', {
                name: 'trackReq',
                baseUrl: '/tracks',
                params: {
                    q: format.keyword,
                    tags: format.tags,
                    filter: {},
                    license: '',
                    bpm: '',
                    duration: format.length,
                    created_at: format.date,
                    created: ''
                }
            }, 'trackResp');
        };
        const apiFormat = new ApiFormat(format);
        this.trackRes(apiFormat);
    }
    /*data = {
        id: 'id',
        title: 'title',
        duration: 'duration',
        status: 'state',
        privacy: 'sharing',
        tags: 'tag_list',
        url: 'url',
        description: 'description',
        genre: 'genre',
        thumbnail: 'artwork_url',
        creator: 'user_id',
        timestamp: 'created_at',
        license: 'license',
    }*/
    /*setDataSource(data: Record<string, any>) {
        this.trackRes.response.dataSource = data.items;
    }*/
    getBaseParams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const config = await this.client.load('../config.json')
                const apiBaseParams = config.api.SoundCloud.baseParams;
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
                //const config = await this.client.load('../config.json')
                const apiBaseUrl = config.api.SoundCloud.baseUrl;
                return apiBaseUrl;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getData(resData) {
        let mData;
        let respData = [];
        for (const data of resData.dataSource) {
            mData = {
                id: data.id,
                status: '',
                privacy: '',
                tags: '',
                description: data.volumeInfo.description,
                genre: data.mainCategory,
                thumbnailSmall: data.imageLinks.thumbnail,
                thumbnailLarge: data.imageLinks.large,
                created: data.volumeInfo.publishedDate,
                license: '',
                title: data.volumeInfo.title,
                authors: data.authors,
                printType: data.printType
            };
            //this.trackRes.response.dataList.push(mData);
            respData.push(mData);
        }
        return respData;
    }
}
