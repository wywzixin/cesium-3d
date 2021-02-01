const webpack = require('webpack');
const fs = require('fs');
console.log(fs);
module.exports = {
    entry: {
        bundle: ['cesium'],
    },
    output: {
        path: './dllBuild',
        filename: '[name].js',
        library: '[name]_library',
    },
    target: 'node',
    node: {
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        module: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    plugins: [
        new webpack.DllPlugin({
            path: './dllBuild/bundle.manifest.json',
            name: '[name]_library',
        }),
    ],
};
