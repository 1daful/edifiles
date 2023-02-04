var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import config from '../../../public/config.json';
import { ApiFormat } from 'src/apiReqFormat/ApiFormat';
import { Axiosi } from '../Axiosi';
import { Resource } from '../Resource';
import { createClient } from 'pexels';
export class Pexels {
    constructor(format) {
        this.client = new Axiosi();
        this.resources = [];
        let apiFormat = new ApiFormat(format);
        this.imageRes = this.getResource(apiFormat);
        this.cl = createClient(config.api.Pexels.config.header.Authorization);
    }
    //apiFormat: ApiFormat
    getResource(format) {
        let imageRes = new Resource(this, 'images', {
            name: "imageReq",
            baseUrl: "/search",
            params: {
                query: format.keyword,
                orientation: "",
                page: "",
                per_page: ""
            }
        }, "imageResp");
        return imageRes;
    }
    getBaseUrl() {
        const url = config.api.Pexels.baseUrl;
        return url;
    }
    getBaseParams() {
        const confi = config.api.Pexels.config;
        return confi;
    }
    getData(resData) {
        let respData = [];
        let mData;
        for (const data of resData.items) {
            mData = {
                type: "images",
                id: data.id,
                status: '',
                privacy: '',
                publisher: {
                    name: '',
                    logo: '',
                    description: ''
                },
                isbn: '',
                region: '',
                length: 0,
                keywords: [],
                topic: '',
                tags: [],
                description: data.src.alt,
                genre: '',
                thumbnailSmall: data.src.small,
                thumbnailLarge: data.src.large,
                created: null,
                license: '',
                title: '',
                authors: [data.photographer],
                orderBy: '',
                content: '',
                meta: {
                    attribution: {
                        href: config.api.Pexels.attribution.href,
                        src: config.api.Pexels.attribution.src,
                        authorSrc: data.photographer_url
                    },
                    width: data.width,
                    height: data.height,
                }
            };
            //this.volumeRes.response.dataList.push(mData);
            respData.push(mData);
        }
        return respData;
    }
    getPhotos(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let image = yield this.cl.photos.search({
                query: query
            });
            return image.photos;
        });
    }
}
