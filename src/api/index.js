import myRequest from '../server';
const apiArr = require.context('./', true, /\.js/);
apiArr.keys().forEach(key => {
    if (!/index/g.test(key)) {
        myRequest.parseRouter(key.split('/')[1].replace('.js', ''), apiArr(key).default);
    }
});

export default {
    install(Vue) {
        Vue.prototype.rq = myRequest;
    },
};
