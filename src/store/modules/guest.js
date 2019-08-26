import Axios from "axios";

import StorageUtil from "@/common/storage-util";

import { StringUtils } from "@/common/utils";

const Storage_Key="Guest_Info"

const state = {
    info:Object.assign({
        nickname:'',
        email:'',
        website:'',
        userAgent: navigator.userAgent
    },StorageUtil.getObject(Storage_Key)||{})
}

const getters = {
   isNilInfo(state){
       let {info:{nickname,email,website}} = state;
       return StringUtils.anyEmpty(nickname,email)
   }
}

const mutations = {
    setInfo(state,info){
        StorageUtil.set(Storage_Key,info)
        this.info=info;
    }
}

const actions = {
    
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}