export default {
    state: {
        checked: true,
        detailId: 0,
        fireItem: null,
        lastRefreshTime: '',
        latlngDis: {},
        fullscreenLoading: false,
    },
    getters: {
        getChecked(state) {
            return state.checked;
        },
        getDetailId(state) {
            return state.detailId;
        },
        getFireItem(state) {
            return state.fireItem;
        },
        getLastRefreshTime(state) {
            return state.lastRefreshTime;
        },
        getLatlngDis(state) {
            return state.latlngDis;
        },
        getFullScreenLoading(state) {
            return state.fullscreenLoading;
        },
    },
    mutations: {
        setChecked(state, checked) {
            state.checked = checked;
        },
        setDetailId(state, detailId) {
            state.detailId = detailId;
        },
        setFireItem(state, fireItem) {
            state.fireItem = fireItem;
        },
        setLastRefreshTime(state, lastRefreshTime) {
            state.lastRefreshTime = lastRefreshTime;
        },
        setLatlngDis(state, latlngDis) {
            state.latlngDis = latlngDis;
        },
        setFullScreenLoading(state, fullscreenLoading) {
            state.fullscreenLoading = fullscreenLoading;
        },
    },
    actions: {},
};
