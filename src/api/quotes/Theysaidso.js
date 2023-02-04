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
/*import { ApiClient } from "../../apiClient";
import { QuoteMedia } from "../../media/QuoteMedia";
import { IMedia } from "../../media/IMedia";*/
export class TheySaidSo {
    constructor() {
        this.client = new Axiosi();
        this.BASE_URL = '';
        this.apiFormat = new ApiFormat();
        this.resources = [];
        this.quoteRes = new Resource(this, 'quotes', {
            name: 'quoteReq',
            baseUrl: '/qod.json',
            params: {
                minlenght: null,
                maxlenght: null,
                start: null,
                category: '',
                author: '',
                categories: '',
                images: '',
                //authors: this.apiFormat.author,
                random: ''
            }
        }, 'quoteRes');
        /**
         * Returns quotes specified by quoteType.
         * @param quoteType The type of quotes whose BASE_URL to be returned.
         */
        /*getQuotesURL(quoteType){
            let Q_URL = this.BASE_URL + quoteType.url;
            if(quoteType === 'quote'){
                Q_URL = Q_URL + quoteType.sub_url.random;
                return Q_URL;
            }
            return Q_URL;
        }*/
        this.attribution = `<span style="z-index: 50; font-size: 0.9em;">
    <img src="https://theysaidso.com/branding/theysaidso.png"
    height="20" width="20" alt="theusaidso.com" />
    <a href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" style="color: #9fcc25; margin-left: 4px; vertical-align: middle;">
    theysaidso.com</a>
    </span>`;
        this.client.load('../config.json').then(resp => {
            if (resp) {
                this.config = resp.data;
                this.BASE_URL = this.config.api.TheySaidSo.baseUrl;
                this.BASE_PARAMS = {
                    ID: this.config.api.TheySaidSo.id,
                    KEY: this.config.api.TheySaidSo.key
                };
            }
        });
    }
    getBaseParams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const config = yield this.client.load('../config.json');
                const apiBaseParams = config === null || config === void 0 ? void 0 : config.data.api.TheySaidSo.baseParams;
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
                const apiBaseUrl = config === null || config === void 0 ? void 0 : config.data.api.TheySaidSo.baseUrl;
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
        for (const data of resp.quotes) {
            mData = {
                id: data.id,
                status: '',
                privacy: '',
                tags: data.tags,
                //description: data.description,
                genre: data.category,
                thumbnailSmall: data.background,
                //created: data.volumeInfo.publishedDate,
                license: '',
                title: data.title,
                author: data.author,
                printType: data.printType,
                content: data.quote,
                date: data.date
            };
            respData.push(mData);
            //this.quoteRes.response.dataList.push(mData);
        }
        return respData;
    }
}
