/* global Cesium */
const defined = Cesium.defined;
const Resource = Cesium.Resource;
const DeveloperError = Cesium.DeveloperError;
const PinBuilder = Cesium.PinBuilder;
const writeTextToCanvas = Cesium.writeTextToCanvas;
const Cartesian2 = Cesium.Cartesian2;
let PinBuilderCache = {};
class CustomPinBuilder extends PinBuilder {
    constructor(id) {
        super();
        if (id) {
            if (PinBuilderCache[id]) {
                return PinBuilderCache[id];
            }
            PinBuilderCache[id] = this;
        }
    }
    /**
     * 绘制组合图形
     *
     * @param {Object} [options] 参数对象
     * @param {String} [options.url] 图片路径
     * @param {String} [options.text] 图片上需要绘制的文字
     * @param {String} [options.color] 文字的颜色
     * @param {Number} [options.fontSize=12] 字体大小
     * @param {Cartesian2} [options.pixelOffset=Cartesian2.ZERO] 文字的偏移位置
     *
     * @return
     */
    fromImageAddText(options) {
        // >>includeStart('debug', pragmas.debug);
        if (!defined(options.url)) {
            throw new DeveloperError('url is required');
        }
        if (!defined(options.text)) {
            throw new DeveloperError('text is required');
        }
        // >>includeEnd('debug');

        options.color = options.color || '#000000';
        options.fontSize = options.fontSize || 11;
        options.pixelOffset = options.pixelOffset || Cartesian2.ZERO;
        return createPin(options, this._cache);
    }

    getImage(options) {
        stringifyScratch[0] = options.url;
        stringifyScratch[1] = options.text;
        stringifyScratch[2] = options.color || '#000000';
        stringifyScratch[3] = options.fontSize;
        if (options.pixelOffset) {
            stringifyScratch[4] = options.pixelOffset.x;
            stringifyScratch[5] = options.pixelOffset.y;
        } else {
            stringifyScratch[4] = stringifyScratch[5] = 0;
        }
        let id = JSON.stringify(stringifyScratch);
        return this._cache[id];
    }
}

function drawIcon(context2D, image, color, pixelOffset) {
    // Size is the largest image that looks good inside of pin box.
    let sizeX = image.width;
    let sizeY = image.height;

    // x and y are the center of the pin box
    let x = Math.round((context2D.canvas.width - sizeX) / 2);
    let y = Math.round((context2D.canvas.height - sizeY) / 2);

    context2D.globalCompositeOperation = 'destination-out';
    context2D.drawImage(image, x - pixelOffset.x, y - pixelOffset.y, sizeX, sizeY);

    context2D.globalCompositeOperation = 'destination-over';
    context2D.fillStyle = color;
    context2D.fillRect(x - pixelOffset.x, y - pixelOffset.y, sizeX + 2, sizeY + 2);
}

let stringifyScratch = new Array(4);

function createPin(options, cache) {
    // Use the parameters as a unique ID for caching.
    stringifyScratch[0] = options.url;
    stringifyScratch[1] = options.text;
    stringifyScratch[2] = options.color;
    stringifyScratch[3] = options.fontSize;
    stringifyScratch[4] = options.pixelOffset.x;
    stringifyScratch[5] = options.pixelOffset.y;
    let id = JSON.stringify(stringifyScratch);

    let item = cache[id];
    if (defined(item)) {
        return item;
    }

    let canvas = document.createElement('canvas');

    let resource = Resource.createIfNeeded(options.url);

    let promise = resource.fetchImage().then(function(image) {
        let width = image.width;
        let height = image.height;
        canvas.width = width;
        canvas.height = height;
        let context2D = canvas.getContext('2d');
        context2D.drawImage(image, 0, 0, width, height);
        image = writeTextToCanvas(options.text, {
            font: options.fontSize + 'px Arial',
        });
        drawIcon(context2D, image, options.color, options.pixelOffset);
        cache[id] = canvas;
        return canvas;
    });
    // cache[id] = promise;
    return promise;
}

export default CustomPinBuilder;
