var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import { ApiClient } from "../../apiClient";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import { Axiosi } from "../Axiosi";
import { Resource } from "../Resource";
import config from "../../../public/config.json";
export class ZerpSerp {
    constructor(apiFormat) {
        this.client = new Axiosi();
        this.resources = [];
        this.apiFormat = new ApiFormat();
        this.searchRes = new Resource(this, "images", {
            name: "searchRes",
            baseUrl: "/search",
            params: {
                q: this.apiFormat.keyword,
                tbm: this.apiFormat.format
            }
        }, "searchResp");
        this.apiFormat = apiFormat;
    }
    getBaseUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const config = yield this.client.load('../config.json');
                const apiBaseUrl = config === null || config === void 0 ? void 0 : config.data.api.ZerpSerp.baseUrl;
                return apiBaseUrl;
            }
            catch (err) {
                console.log(err);
            }
            /*.then(resp => {
                if (resp) {
                    this.config = resp.data;
                    console.log('axios load working', this.config.api.GoogleBooks.baseUrl)
                    this.BASE_URL = this.config.api.GoogleBooks.baseUrl;
                    this.BASE_PARAMS =  {
                        ID: this.config.api.GoogleBooks.id,
                        KEY: this.config.api.GoogleBooks.key
                    }
                }
            })*/
        });
    }
    getBaseParams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const config = await this.client.load('../config.json')
                const apiBaseParams = config === null || config === void 0 ? void 0 : config.api.zenserp.config.baseParams;
                return apiBaseParams;
            }
            catch (err) {
                console.log(err);
            }
        });
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
                tags: [],
                description: "",
                genre: "",
                thumbnailSmall: data.thumbnail,
                thumbnailLarge: data.sourceUrl,
                created: '',
                license: '',
                title: data.title,
                authors: data.source,
                printType: "" //book or magazine
            };
            //this.volumeRes.response.dataList.push(mData);
            respData.push(mData);
        }
        return respData;
    }
}
