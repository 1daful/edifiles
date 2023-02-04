var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import { Axiosi } from "../Axiosi";
import { Resource } from "../Resource";
import config from "../../../public/config.json";
export class Unsplash {
    //apiFormat: ApiFormat = new ApiFormat({keyword: "rent"});
    constructor(format) {
        this.client = new Axiosi();
        this.resources = [];
        const apiFormat = new ApiFormat(format);
        this.imageRes = this.getResource(apiFormat);
    }
    getResource(apiFormat) {
        return new Resource(this, 'images', {
            name: 'imageReq',
            baseUrl: '/photos/random',
            params: {
                query: apiFormat.keyword,
                count: apiFormat.length
            }
        }, 'imageResp');
    }
    getBaseParams() {
        //const config = await this.client.load('../config.json')
        const apiBaseParams = config.api.Unsplash.config;
        return apiBaseParams;
    }
    getBaseUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const config = await this.client.load('../config.json')
                const apiBaseUrl = config === null || config === void 0 ? void 0 : config.api.Unsplash.baseUrl;
                return apiBaseUrl;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getData(resp) {
        var _a, _b, _c;
        let respData = [];
        let mData;
        //if (resp.name === 'quoteResp')
        //let respD: Record<string, any>[] = []
        if (Array.isArray(resp)) {
            //respData = resp
            for (const data of resp) {
                mData = {
                    type: "images",
                    id: data.id,
                    status: '',
                    privacy: '',
                    tags: [],
                    description: data.description,
                    genre: '',
                    created: '',
                    license: '',
                    title: '',
                    publisher_id: "",
                    isbn: "",
                    lccl: "",
                    oclc: "",
                    format: "",
                    printType: '',
                    thumbnailSmall: (_a = data.urls) === null || _a === void 0 ? void 0 : _a.regular,
                    authors: [{
                            name: (_b = data.user) === null || _b === void 0 ? void 0 : _b.name,
                            pic: ''
                        }],
                    thumbnailLarge: (_c = data.urls) === null || _c === void 0 ? void 0 : _c.full,
                    //authors: data.a,
                    //tags: []
                };
                respData.push(mData);
                //this.quoteRes.response.dataList.push(mData);
            }
        }
        return respData;
    }
}
