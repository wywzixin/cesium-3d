/* global Cesium */
import dayjs from './ThirdParty/dayjs.min';
export default {
    install() {
        if (typeof Cesium === 'undefined') {
            window.Cesium = {};
        }
        Cesium['C_dayjs'] = dayjs;
    },
};
