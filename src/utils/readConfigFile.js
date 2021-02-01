function readConfigFile(filePath) {
    if (!filePath || typeof filePath !== 'string') {
        throw new Error('请输入正确的配置文件路径');
    }
    let xhr = new XMLHttpRequest();
    xhr.open('get', filePath + '?' + Date.now(), false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let config = JSON.parse(xhr.responseText);
            window.$config = config;
        }
    };
    xhr.send();
}
/* global CONFIG_PATH */
readConfigFile(CONFIG_PATH);

export default {
    install(Vue) {
        Vue.prototype.$config = window.$config;
    },
};
