/* global Cesium */
const Color = Cesium.Color;
const defined = Cesium.defined;
const Cartographic = Cesium.Cartographic;
const PolylineGeometry = Cesium.PolylineGeometry;
const LabelStyle = Cesium.LabelStyle;
// const VertexFormat = Cesium.VertexFormat;
const Material = Cesium.Material;
const LabelCollection = Cesium.LabelCollection;

import ChangeableMultiplePrimitive from './ChangeableMultiplePrimitive';
import BillboardGroup from './BillboardGroup';

/* eslint-disable */
class MeasureHeight extends ChangeableMultiplePrimitive {
    constructor(options) {
        super(options);
        this.isPolygon = false;
        this.material = Material.fromType('Color', {
            color: Color.fromCssColorString(this.color),
        });
        this.labels = this._primitives.add(new LabelCollection());
    }

    setPositions(positions) {
        this.setAttribute('positions', positions);
    }
    setVerticalPositions(verticalPositions) {
        this.setAttribute('verticalPositions', verticalPositions);
    }
    setHorizonalPositions(horizonalPositions) {
        this.setAttribute('horizonalPositions', horizonalPositions);
    }
    setWidth(width) {
        this.setAttribute('width', width);
    }
    getHorizonalPositions() {
        return this.getAttribute('horizonalPositions');
    }
    getVerticalPositions() {
        return this.getAttribute('verticalPositions');
    }
    getPositions() {
        return this.getAttribute('positions');
    }

    getWidth() {
        return this.getAttribute('width');
    }

    getType() {
        return 'polyline';
    }

    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this.material && (this.material.uniforms.color = Color.fromCssColorString(value));
    }

    getGeometryInstances() {
        if (!defined(this.positions) || this.positions.length < 2) {
            return;
        }
        this.labels.removeAll();
        // addHeightLabel(this.positions, this.labels);
        let geometry = new PolylineGeometry({
            positions: this.positions,
            width: 4,
            // arcType: ArcType.RHUMB,
            // vertexFormat: VertexFormat.POSITION_AND_NORMAL,
            vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
            ellipsoid: this.ellipsoid,
        });
        // let horizonalGeometry = new PolylineGeometry({
        //     positions: this.horizonalPositions,
        //     width: 3,
        //     // arcType: ArcType.RHUMB,
        //     // vertexFormat: VertexFormat.POSITION_AND_NORMAL,
        //     vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
        //     ellipsoid: this.ellipsoid,
        // });
        // let verticalGeometry = new PolylineGeometry({
        //     positions: this.verticalPositions,
        //     width: 4,
        //     // arcType: ArcType.RHUMB,
        //     // vertexFormat: VertexFormat.POSITION_AND_NORMAL,
        //     vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
        //     ellipsoid: this.ellipsoid,
        // });
        let geometryInstances = this.createGeometryInstance(geometry, this.color);
        // let horizonalInstances = this.createGeometryInstance(horizonalGeometry, this.color);
        // let verticalInstances = this.createGeometryInstance(verticalGeometry, this.color);
        // return [geometryInstances, horizonalInstances, verticalInstances];
        return [geometryInstances];
    }

    setEditMode(position, pickedObject) {
        if (this._editing && pickedObject && pickedObject.primitive === this._primitive) {
            return;
        }
        if (!this._editing && position) {
            window.requestAnimationFrame(() => {
                let _self = this;
                let scene = this._scene;

                if (this._markers == null) {
                    let markers = new BillboardGroup(scene, undefined, this._primitives);
                    let handleMarkerChanges = {
                        dragHandlers: {
                            onDrag: function(index, position) {
                                if (
                                    defined(_self.billboards) &&
                                    index === _self.positions.length - 1
                                ) {
                                    _self.billboards._billboards[0].position = position;
                                }
                                _self.positions[index] = position;
                                _self._createPrimitive = true;
                            },
                            onDragEnd: function(index, position) {
                                _self._createPrimitive = true;
                            },
                        },
                        onDoubleClick: function(index) {
                            if (_self.positions.length < 3) {
                                return;
                            }
                            _self.positions.splice(index, 1);
                            _self._createPrimitive = true;
                            markers.removeBillboard(index);
                        },
                    };
                    markers.addBillboards(_self.positions, handleMarkerChanges);
                    this._markers = markers;
                    this._addStopEditListener();
                    markers.setOnTop();
                }
                this._editing = true;
            });
        } else {
            if (this._markers != null) {
                this._markers.remove();
                this._markers = null;
                this._removeStopEditListener();
            }
            this._editing = false;
        }
    }
}

function addHeightLabel(positions, labels) {
    let height = 0,
        text;
    for (let i = 1; i < positions.length; ++i) {
        let cartographic = Cartographic.fromCartesian(positions[i - 1]);
        let cartographic1 = Cartographic.fromCartesian(positions[i]),
            height = Math.abs(cartographic1.height - cartographic.height);
        let geodesic = new Cesium.EllipsoidGeodesic();
        geodesic.setEndPoints(cartographic, cartographic1);
        let scratch = new Cesium.Cartographic();
        let midpointCartographic = geodesic.interpolateUsingFraction(0.5, scratch);
        let midPoint = Cesium.Cartesian3.fromRadians(
            midpointCartographic.longitude,
            midpointCartographic.latitude
        );
        console.log(midPoint);
        if (height > 1000) {
            text = '高度差:' + (height / 1000).toFixed(2) + 'km ';
        } else {
            text = '高度差:' + height.toFixed(2) + 'm ';
        }
        labels.add({
            position: positions[i],
            text: text,
            pixelOffset: new Cesium.Cartesian2(0, -20), //偏移量
            font: '20px 微软雅黑',
            horizontalOrigin: -1,
            verticalOrigin: 0,
            fillColor: Color.AQUAMARINE,
            outlineColor: Color.BLACK,
            outlineWidth: 2,
            style: LabelStyle.FILL_AND_OUTLINE,
        });
    }
}
export default MeasureHeight;
