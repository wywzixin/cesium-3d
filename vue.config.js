const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === 'production';
module.exports = {
    publicPath: isProd ? '  ./' : '/',
    devServer: {
        open: true,
    },
    configureWebpack: config => {
        config.module.unknownContextCritical = false;
        config.resolve.alias = {
            '@': resolve('src'),
            V: resolve('src/views'),
            C: resolve('src/components'),
            U: resolve('src/utils'),
        };
        config.entry = isProd
            ? {
                  app: resolve('./src/main.js'),
              }
            : {
                  Cesium: resolve('./ThirdParty/CesiumSource.js'),
                  app: resolve('./src/main.js'),
              };

        config.plugins.push(
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('./Cesium/'),
                CONFIG_PATH: JSON.stringify('./config.json'),
            }),
            new CopyWebpackPlugin([
                {
                    from: './node_modules/cesium/Build/Cesium',
                    to: 'Cesium',
                },
            ]),
            new HtmlWebpackPlugin({
                title: 'cesium-3d',
                filename: './index.html',
                template: './public/index.html',
            }),
            new HtmlWebpackTagsPlugin({
                append: false,
                links: './Cesium/Widgets/widgets.css',
            }),
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
            })
        );
        if (isProd) {
            // 为生产环境修改配置...
            config.optimization = {
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            warnings: false,
                            compress: {
                                drop_debugger: true,
                                drop_console: true,
                                pure_funcs: ['console.log'],
                            },
                            output: {
                                comments: false,
                            },
                        },
                        sourceMap: false,
                        parallel: true,
                    }),
                ],
                splitChunks: {
                    chunks: 'all',
                    minSize: 300000,
                    maxSize: 10000000,
                    cacheGroups: {
                        vendors: {
                            test: /[\\/]node_modules[\\/]/, // 匹配node_modules目录下的文件
                            priority: -10, // 优先级配置项
                        },
                        default: {
                            minChunks: 2,
                            priority: -20, // 优先级配置项
                            reuseExistingChunk: true,
                        },
                    },
                },
            };
            config.plugins.push(
                new HtmlWebpackTagsPlugin({
                    append: false,
                    scripts: 'Cesium/Cesium.js',
                }),
                new CompressionPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.js$|\.css$|\.html$/,
                    threshold: 102400,
                    minRatio: 0.8,
                    deleteOriginalAssets: true,
                })
            );
        } else {
            // 为开发环境修改配置...
            config.devtool = 'eval-source-map';
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store;
        oneOfsMap.forEach(item => {
            item.use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: './src/style/preDefinedVariable.scss',
                })
                .end();
        });
        return config;
    },
};
