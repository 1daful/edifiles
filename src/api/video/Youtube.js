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
export class Youtube {
    constructor(format) {
        this.client = new Axiosi();
        this.BASE_URL = '';
        this.apiFormat = new ApiFormat();
        this.resources = [];
        this.videoData = {};
        this.searchData = {};
        this.videoRes = (format) => {
            new Resource(this, 'video', {
                name: 'videos',
                baseUrl: '/videoRes',
                params: {
                    q: format.keyword,
                    part: {
                        snippet: 'data'
                    },
                    filters: {
                        chart: 'chart',
                        region: 'regionCode',
                        ids: ''
                    },
                }
            }, 'videoResp');
        };
        this.searchRes = (format) => {
            new Resource(this, 'video', {
                name: 'searchReq',
                baseUrl: '/search',
                params: {
                    related: 'relatedToId',
                    author: format.author,
                    televised: 'channelType',
                    broadcast: 'eventType',
                    sort: 'order',
                    q: format.keyword,
                    category: format.genre,
                    region: 'regionCode',
                }
            }, 'searchResp');
        };
        const apiFormat = new ApiFormat(format);
        this.videoRes(apiFormat);
        this.searchRes(apiFormat);
    }
    getBaseParams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const config = await this.client.load('../config.json')
                const apiBaseParams = config.api.Youtube.config.baseParams;
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
                const apiBaseUrl = config.api.Youtube.baseUrl;
                return apiBaseUrl;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getData(resp) {
        let video;
        let videoData;
        let respData = [];
        if (resp.name === 'videoResp') {
            for (videoData of resp.dataSource) {
                video = {
                    id: videoData.id,
                    title: videoData.snippet.title,
                    duration: videoData.contentDetails.duration,
                    status: videoData.snippet.liveBroadcastContent,
                    privacy: videoData.status.privacyStatus,
                    tags: videoData.snippet.tags,
                    description: videoData.snippet.description,
                    genre: videoData.snippet.categoryId,
                    thumbnailSmall: videoData.snippet.thumbnailSmall,
                    thumbnailLarge: videoData.snippet.thumbnails.high.url,
                    creator: videoData.snippet.channelId,
                    created: videoData.snippet.publishedAt,
                    license: videoData.status.license,
                    source: 'youtube'
                };
                respData.push(video);
                //this.videoRes.response.dataList.push(video);
            }
        }
        else if (resp.name === 'searchResp') {
            for (videoData of resp.dataSource) {
                video = {
                    id: videoData.id.videoId,
                    title: videoData.snippet.title,
                    //duration: videoData.contentDetails.duration,
                    status: videoData.snippet.liveBroadcastContent,
                    //privacy: videoData.status.privacyStatus,
                    //tags: videoData.snippet.tags,
                    //description: videoData.snippet.description,
                    //genre: videoData.snippet.categoryId,
                    thumbnailSmall: videoData.snippet.thumbnails.default.url,
                    thumbnailLarge: videoData.snippet.thumbnails.high.url,
                    creator: videoData.snippet.channelId,
                    created: videoData.snippet.publishedAt,
                    //license: videoData.status.license,
                    source: 'youtube'
                };
                //this.searchRes.response.dataList.push(video);
                respData.push(video);
            }
        }
        return respData;
    }
}
