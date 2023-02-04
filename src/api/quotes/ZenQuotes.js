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
export class ZenQuotes {
    constructor(format) {
        this.client = new Axiosi();
        this.BASE_URL = '';
        this.resources = [];
        this.apiFormat = new ApiFormat();
        this.quoteRes = (format) => {
            new Resource(this, 'quotes', {
                name: 'quoteReq',
                baseUrl: '/quotes',
                params: {
                    categories: '',
                    images: '',
                    authors: '',
                    random: '',
                    tags: format.tags,
                    quotes: format.keyword
                }
            }, 'quoteResp');
        };
        this.qod = (format) => {
            new Resource(this, 'quote', {
                name: 'qodReq',
                baseUrl: '/random',
                params: format
            }, 'qodResp');
        };
        const apiFormat = new ApiFormat(format);
        this.quoteRes(apiFormat);
        this.qod(apiFormat);
    }
    /*data = {
        quote: 'quote',
        author: 'author',
        tags: [],
        image: 'image'
    }*/
    getBaseParams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const config = await this.client.load('../config.json')
                const apiBaseParams = config === null || config === void 0 ? void 0 : config.api.ZenQuotes.baseParams;
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
                const apiBaseUrl = config === null || config === void 0 ? void 0 : config.api.ZenQuotes.baseUrl;
                return apiBaseUrl;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getData(resp) {
        const respData = [];
        let mData;
        //if (resp.name === 'quoteResp')
        for (const data of resp) {
            mData = {
                //id: new Date().toJSON(),
                type: "quotes",
                //_id: new Date().toJSON(),
                status: '',
                privacy: '',
                tags: [],
                description: data.q,
                genre: "",
                inserted_at: new Date().toJSON(),
                license: '',
                orderby: "",
                content: "",
                topic: "",
                meta: "",
                region: "",
                duration: 0,
                keywords: [],
                title: '',
                publisher: {
                    name: "",
                    logo: "",
                    description: ""
                },
                isbn: "",
                //lccl: "",
                //oclc: "",
                //format: "",
                //printType: '',
                thumbnailsmall: '',
                authors: [
                    data.a
                ],
                thumbnaillarge: '',
                //tags: []
            };
            respData.push(mData);
            //this.quoteRes.response.dataList.push(mData);
        }
        return respData;
    }
}
