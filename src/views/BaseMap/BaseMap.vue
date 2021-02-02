<template>
    <div class="base-map">
        <globe-viewer></globe-viewer>
    </div>
</template>

<script>
import GlobeViewer from '@/components/GlobeViewer';
/* global Cesium viewer */
export default {
    data() {
        return {};
    },
    mounted() {
        this.addBaseMap(this.$route.query.name);
    },
    components: {
        GlobeViewer,
    },
    methods: {
        addBaseMap(name) {
            switch (name) {
                case 'arcgis在线底图':
                    this.addArcGISMap();
                    break;
                case '高德在线底图':
                    this.addGaodeMap();
                    break;
                case 'mapbox地图':
                    this.addMapboxMap();
                    break;
            }
        },
        addArcGISMap() {
            viewer.scene.imageryLayers.addImageryProvider(
                new Cesium.ArcGisMapServerImageryProvider({
                    url:
                        'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
                })
            );
        },
        addGaodeMap() {
            viewer.scene.imageryLayers.addImageryProvider(
                new Cesium.UrlTemplateImageryProvider({
                    url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                })
            );
            // viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
            // 	url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
            // 	layer: "tdtAnnoLayer",
            // 	style: "default",
            // 	format: "image/jpeg",
            // 	tileMatrixSetID: "GoogleMapsCompatible"
            // }));
        },
        addMapboxMap() {
            // viewer.scene.imageryLayers.addImageryProvider(
            //     new Cesium.WebMapTileServiceImageryProvider({
            //         url:
            //             'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb',
            //         layer: 'tdtBasicLayer',
            //         style: 'default',
            //         format: 'image/jpeg',
            //         tileMatrixSetID: 'GoogleMapsCompatible',
            //         show: false,
            //     })
            // );
        },
    },
};
</script>

<style lang="scss">
.base-map {
    width: 100%;
    height: 100%;
}
</style>
