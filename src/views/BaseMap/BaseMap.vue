<template>
    <div class="base-map">
        <!-- <globe-viewer></globe-viewer> -->
    </div>
</template>

<script>
// import GlobeViewer from '@/components/GlobeViewer';
// import { MVTProvider } from 'U/mvtProvider';
/* global Cesium viewer */
export default {
    data() {
        return {};
    },
    mounted() {
        // this.addBaseMap(this.$route.query.name);
    },
    components: {
        // GlobeViewer,
    },
    methods: {
        addBaseMap(name) {
            switch (name) {
                case 'arcgis在线底图':
                    this.addArcGISMap();
                    break;
                case '加载高德地图':
                    this.addGaodeMap();
                    break;
                case '天地图':
                    this.addMapboxMap();
                    break;
                case '矢量瓦片':
                    this.addMvt();
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
        },
        addMapboxMap() {
            viewer.scene.imageryLayers.addImageryProvider(
                new Cesium.WebMapTileServiceImageryProvider({
                    url:
                        'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb',
                    layer: 'tdtBasicLayer',
                    style: 'default',
                    format: 'image/jpeg',
                    tileMatrixSetID: 'GoogleMapsCompatible',
                    show: false,
                })
            );
        },
        addMvt() {
            // viewer.scene.globe.baseColor = new Cesium.Color(1.0, 1.0, 1.0, 1.0);
            // viewer.scene.imageryLayers.addImageryProvider(
            //     new MVTProvider({
            //         url:
            //             'https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token={k}',
            //         key:
            //             'pk.eyJ1IjoibWFyc2dpcyIsImEiOiJja2Fod2xlanIwNjJzMnhvMXBkMnNqcjVpIn0.WnxikCaN2KV_zn9tLZO77A',
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
