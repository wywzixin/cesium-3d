import axios from 'axios';
import server from './server';
import qs from 'qs';

class MyRequest {
    constructor() {
        this.server = server;
        // this.nowHandle = null;
    }
    // v_bind(ob) {
    //     this.nowHandle = ob;
    // }
    parseRouter(name, urlOb) {
        let ob = (this[name] = {});
        Object.keys(urlOb).forEach(item => {
            ob[item] = this.sendMes.bind(this, name, item, urlOb[item]);
            ob[item].state = 'ready';
            ob[item].lastTime = 0;
            ob[item].args = null;
        });
    }
    sendMes(moduleName, name, url, config = {}) {
        let _self = this;
        let type = config.type || 'get';
        let data = config.data || null;
        let baseUrl = config.baseUrl || '';

        // let bindName = config.bindName || name;

        let debounce = !config.debounce;
        if (debounce && Date.now() - _self[moduleName][name].lastTime < 500) {
            _self[moduleName][name].lastTime = Date.now();
            return Promise.resolve();
        }
        _self[moduleName][name].lastTime = Date.now();

        let defaultBefore = function() {
            console.log('defaultBefore');
        };

        let before = config.before || defaultBefore;
        let beforeFn = function() {
            before(defaultBefore);
        };

        let defaultFn = function(res) {
            _self[moduleName][name].state = 'ready';
            _self[moduleName][name].args = null;
            _self[moduleName][name].cancelToken = null;
            // _self.nowHandle[bindName] = res.data;
            return res;
        };

        let defaultCatch = function(err) {
            _self[moduleName][name].state = 'padding';
            _self[moduleName][name].args = null;
            _self[moduleName][name].cancelToken = null;
            return err;
        };

        // let success = config.success || defaultFn;

        // let callback = function(res) {
        //     if (typeof success === 'function') {
        //         success(res, defaultFn);
        //     } else {
        //         defaultFn(res);
        //     }
        // };
        // let rqConfig = null;
        // if (config.config) {
        //     config.config.cancelToken = new axios.CancelToken(c => {
        //         _self[moduleName][name].cancelToken = c;
        //     });
        //     rqConfig = config.config;
        // } else {
        //     rqConfig = {
        //         cancelToken: new axios.CancelToken(function executor(c) {
        //             _self[moduleName][name].cancelToken = c;
        //         }),
        //     };
        // }
        const state = {
            get: function() {
                let urlQs = data ? url + '?' + qs.stringify(data) : url;
                // server.get(baseUrl + urlQs).then(callback);
                return server
                    .get(baseUrl + urlQs, {
                        cancelToken: new axios.CancelToken(function executor(c) {
                            _self[moduleName][name].cancelToken = c;
                        }),
                    })
                    .then(defaultFn)
                    .catch(defaultCatch);
            },
            post: function() {
                // server.post(baseUrl + url, data).then(callback);
                return server
                    .post(baseUrl + url, data, {
                        cancelToken: new axios.CancelToken(function executor(c) {
                            _self[moduleName][name].cancelToken = c;
                        }),
                    })
                    .then(defaultFn)
                    .catch(defaultCatch);
            },
        };
        beforeFn();
        if (
            _self[moduleName][name].state === 'ready' ||
            _self[moduleName][name].args !== JSON.stringify(data)
        ) {
            _self[moduleName][name].cancelToken && _self[moduleName][name].cancelToken();
            _self[moduleName][name].state = 'padding';
            _self[moduleName][name].args = JSON.stringify(data);
            return state[type]();
        } else {
            return Promise.resolve();
        }
    }
}

export default new MyRequest();
