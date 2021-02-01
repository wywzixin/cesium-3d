<template>
    <div id="ViewerContainer"></div>
</template>

<script>
import initViewer from 'U/initViewer';
export default {
    name: 'ViewerContainer',
    data() {
        return {
            latlngDis: {
                height: '',
                lon: '',
                lat: '',
                viewHeight: '',
            },
        };
    },
    mounted: function() {
        initViewer('ViewerContainer');
        // this.disLatLng();
    },
    methods: {
        disLatLng() {
            // setTimeout(() => {
            //     this.latlngDis = Cesium.C_getPickPosition(viewer);
            // }, 100);
        },
    },
};
</script>

<style scoped>
#ViewerContainer {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
