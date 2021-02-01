export default {
    // 限定命名空间
    namespaced: true,
    // 1. state
    state: {
        panelInf: null,
        changeCode: true,
        testRouteUrl: 'loca',
        missionPlanList: [],
        missionPlanListHide: false,
        screenshots: {
            isShowScreenshots: false,
            updateId: '',
        },
    },

    // // 2. getters
    getters: {
        getMissionPlanListFn(state) {
            return state.missionPlanList;
        },
        getPanelInfFn(state) {
            return state.panelInf;
        },
        getChangeCodeFn(state) {
            return state.changeCode;
        },
        screenshots: state => {
            return state.screenshots;
        },
    },
    // 3. mutations
    mutations: {
        setMissionPlanList(state, arr) {
            state.missionPlanList = arr;
        },
        setPanelInfFn(state, name) {
            state.panelInf = name;
        },
        setChangeCodeFn(state, name) {
            state.changeCode = name;
        },
        set_screenshots(state, load) {
            state.screenshots = load;
        },
    },
};
