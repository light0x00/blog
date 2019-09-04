

import axios, { AxiosResponse, Method, ResponseType } from "axios";
// import apiUtil from "source/apiUtil";
const apiName = "blog-api";
const contextPath = "/blog-api";
export { apiName, contextPath }

export interface VueResourceOpt {
    url?: string
    responseType?: string
    headers?: any
    params?: any
    credentials?: boolean
    emulateHTTP?: boolean
    emulateJSON?: boolean
}

import urljoin from 'url-join';

const apiUtil = {
    getConfigUrl(path: string, appName: string) {
        let base_url = window['APP_CONFIG'].BASE_URL_MAP[apiName]
        return urljoin(base_url, path)
    }
}

export enum ResponseStatus {
    Success = 0, Warn = 100, Error = 200, NotLogin = 101
}

export class MsgCommentVo {
    articleKey: string;
    content: string;
    email: string;
    id: number;
    isDeleted: boolean;
    nickname: string;
    postDate: Date;
    ref: MsgCommentVo;
    refId: number;
    userAgent: string;
    website: string;
}
export class OutputModelMsgCommentVo {
    code: number;
    data: MsgCommentVo;
    exp: Throwable;
    msg: string;
}
export class OutputModelstring {
    code: number;
    data: string;
    exp: Throwable;
    msg: string;
}
export class PageVo {
    index: number;
    size: number;
    total: number;
}
export class PagingOutputModelMsgCommentVo {
    code: number;
    data: Array<MsgCommentVo>;
    exp: Throwable;
    msg: string;
    pageInfo: PageVo;
}
export class StackTraceElement {
    className: string;
    fileName: string;
    lineNumber: number;
    methodName: string;
    nativeMethod: boolean;
}
export class Throwable {
    cause: Throwable;
    localizedMessage: string;
    message: string;
    stackTrace: Array<StackTraceElement>;
    suppressed: Array<Throwable>;
}

export class QueryCommentsVo {
    articleKey: string;
    index: number;
    size: number;
    repliesPageInfo: PageVo;
}

export class QueryRepliesVo {
    rootId: number;
    index: number;
    size: number;
}


export class MsgCommentControllerApi {

    public static addUsingPOST(payload: MsgCommentVo, _opt?: VueResourceOpt)
        : Promise<{ body: OutputModelMsgCommentVo; }> {
        const localVarPath = apiUtil.getConfigUrl('/mc/add', apiName);
        let queryParameters: any = payload;
        let headerParams: any = {};

        let config = {
            url: localVarPath,
            method: <Method>'POST',
            params: queryParameters,
            headers: headerParams,
            responseType: <ResponseType>'json',
        };
        let promise = axios.request(config).then((res) => ({ body: res.data, data: res.data, response: res }))
        return promise as Promise<{ body: OutputModelMsgCommentVo, response: AxiosResponse }>
    }

    public static queryUsingPOST(payload: QueryRepliesVo, _opt?: VueResourceOpt)
        : Promise<{ body: PagingOutputModelMsgCommentVo; }> {
        const localVarPath = apiUtil.getConfigUrl('/mc/query', apiName);
        let queryParameters: any = payload;
        let headerParams: any = {};

        let config = {
            url: localVarPath,
            method: <Method>'POST',
            // params: queryParameters,
            data: queryParameters,
            headers: headerParams,
            responseType: <ResponseType>'json',
        };
        let promise = axios.request(config).then((res) => ({ body: res.data, data: res.data, response: res }))
        return promise as Promise<{ body: PagingOutputModelMsgCommentVo, response: AxiosResponse }>
    }

    public static queryRepliesUsingPOST(payload: QueryCommentsVo, _opt?: VueResourceOpt)
        : Promise<{ body: PagingOutputModelMsgCommentVo; }> {
        const localVarPath = apiUtil.getConfigUrl('/mc/queryReplies', apiName);
        let queryParameters: any = payload;
        let headerParams: any = {};

        let config = {
            url: localVarPath,
            method: <Method>'POST',
            // params: queryParameters,
            data: queryParameters,
            headers: headerParams,
            responseType: <ResponseType>'json',
        };
        let promise = axios.request(config).then((res) => ({ body: res.data, data: res.data, response: res }))
        return promise as Promise<{ body: PagingOutputModelMsgCommentVo, response: AxiosResponse }>
    }

    public static countByArticle ( articleKey)
    : Promise<{ body: number;  }> {
        const localVarPath =  apiUtil.getConfigUrl( '/mc/countByArticle' , apiName);
        let queryParameters: any = {articleKey};
        let config = {
            url: localVarPath,
            method: 'GET',
            params: queryParameters,
            responseType: 'json',
        };
        let promise = axios.request(config).then((res)=>({body:res.data,data:res.data,response:res}))
        return promise as  Promise<{ body: number ,response:AxiosResponse }>
    }

}

export class MusicVo {
    artist: string;
    cover: string;
    id: string;
    name: string;
    url: string;
}
export class OutputModelListMusicVo {
    code: number;
    data: Array<MusicVo>;
    exp: Throwable;
    msg: string;
}
export class MusicControllerApi {

    /**
    * 
        * @summary get
    * @param {*} [options] Override http request option.
    * @throws {RequiredError}
    */
    public static getUsingGET ( )
    : Promise<{ body: OutputModelListMusicVo;  }> {
        const localVarPath =  apiUtil.getConfigUrl( '/music/list' , apiName);
        let queryParameters: any = {};
        let headerParams: any = {};
        let config = {
            url: localVarPath,
            method: 'GET',
            params: queryParameters,
            headers: headerParams,
            responseType: 'json',
        };
        let promise = axios.request(config).then((res)=>({body:res.data,data:res.data,response:res}))
        return promise as  Promise<{ body: OutputModelListMusicVo ,response:AxiosResponse }>
    }
}

