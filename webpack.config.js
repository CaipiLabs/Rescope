/*
 * Copyright (c)  2017 Caipi Labs .
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs      = require("fs")
var webpack = require("webpack")


var production    = process.argv.indexOf("--production") > -1
    || process.argv.indexOf("-p") > -1;
var nodeExternals = require('webpack-node-externals');
module.exports    = [
    {
        entry    : {
            "Rescope": "./src/Rescope.js",
            
        },
        devtool  : !production ? 'inline-source-map' : 'source-map',
        output   : {
            path         : __dirname,
            filename     : production ? "dist/[name].nodeps.min.js" : "dist/[name].nodeps.js",
            publicPath   : "/",
            libraryTarget: 'commonjs2'
        },
        target   : 'node', // in order to ignore built-in modules like path, fs, etc.
        externals: [nodeExternals()],
        resolve  : {
            extensions: [
                "",
                ".js",
                ".json",
            ],
        },
        
        module : {
            loaders: [
                {
                    test   : /\.js$/,
                    exclude: /node_modules/,
                    loader : 'babel-loader',
                    query  : {
                        
                        presets: [
                            'babel-preset-react',
                            'babel-preset-es2015',
                            'babel-preset-stage-0'
                        ].map(require.resolve),
                        plugins: [
                            "babel-plugin-add-module-exports",
                        ].map(require.resolve)
                    }
                },
                {
                    test   : /\.json$/,
                    loaders: [
                        "json",
                    ],
                },
                {
                    test   : /\.(html|txt)$/,
                    loaders: [
                        "file-loader?name=[path][name].[ext]&context=./src",
                    ],
                },
            ],
        },
        plugins: (
            [
                new webpack.BannerPlugin(fs.readFileSync("./LICENCE.HEAD.MD").toString()),
                
                new webpack.DefinePlugin({
                                             __PROD__: production
                                         }),
                production ? new webpack.optimize.UglifyJsPlugin(
                    {
                        compress: {
                            screw_ie8   : true, // React doesn't support IE8
                            warnings    : false,
                            drop_console: true
                        },
                        mangle  : {
                            screw_ie8: true
                        },
                        output  : {
                            comments : false,
                            screw_ie8: true
                        }
                    }) : p => false,
            
            ]
        ),
        
    },
    {
        entry    : {
            "ReactTools": "./src/ReactTools.js",
            
        },
        devtool  : !production ? 'inline-source-map' : 'source-map',
        output   : {
            path         : __dirname,
            filename     : production ? "dist/[name].min.js" : "dist/[name].js",
            publicPath   : "/",
            libraryTarget: 'commonjs2'
        },
        target   : 'node', // in order to ignore built-in modules like path, fs, etc.
        externals: [nodeExternals()],
        resolve  : {
            extensions: [
                "",
                ".js",
                ".json",
            ],
        },
        
        module : {
            loaders: [
                {
                    test   : /\.js$/,
                    exclude: /node_modules/,
                    loader : 'babel-loader',
                    query  : {
                        
                        presets: [
                            'babel-preset-react',
                            'babel-preset-es2015',
                            'babel-preset-stage-0'
                        ].map(require.resolve),
                        plugins: [
                            "babel-plugin-add-module-exports",
                        ].map(require.resolve)
                    }
                },
                {
                    test   : /\.json$/,
                    loaders: [
                        "json",
                    ],
                },
                {
                    test   : /\.(html|txt)$/,
                    loaders: [
                        "file-loader?name=[path][name].[ext]&context=./src",
                    ],
                },
            ],
        },
        plugins: (
            [
                new webpack.BannerPlugin(fs.readFileSync("./LICENCE.HEAD.MD").toString()),
                
                new webpack.DefinePlugin({
                                             __PROD__     : production,
                                             'process.env': {
                                                 NODE_ENV: JSON.stringify(production ? 'production' : 'development'),
                                             }
                                         }),
                production ? new webpack.optimize.UglifyJsPlugin(
                    {
                        compress: {
                            screw_ie8   : true, // React doesn't support IE8
                            warnings    : false,
                            drop_console: true
                        },
                        mangle  : {
                            screw_ie8: true
                        },
                        output  : {
                            comments : false,
                            screw_ie8: true
                        }
                    }) : p => false,
            
            ]
        ),
        
    },
    {
        entry  : {
            "Rescope": "./src/Rescope.js",
        },
        devtool: !production ? 'inline-source-map' : 'source-map',
        output : {
            path         : __dirname,
            filename     : production ? "dist/[name].min.js" : "dist/[name].js",
            publicPath   : "/",
            libraryTarget: 'commonjs2'
        },
        resolve: {
            extensions: [
                "",
                ".js",
                ".json",
            ],
        },
        
        module : {
            loaders: [
                {
                    test   : /\.js$/,
                    exclude: /node_modules/,
                    loader : 'babel-loader',
                    query  : {
                        
                        presets: [
                            'babel-preset-react',
                            'babel-preset-es2015',
                            'babel-preset-stage-0'
                        ].map(require.resolve),
                        plugins: [
                            "babel-plugin-add-module-exports",
                        ].map(require.resolve)
                    }
                },
                {
                    test   : /\.json$/,
                    loaders: [
                        "json",
                    ],
                },
                {
                    test   : /\.(html|txt)$/,
                    loaders: [
                        "file-loader?name=[path][name].[ext]&context=./src",
                    ],
                },
            ],
        },
        plugins: (
            [
                new webpack.DefinePlugin({
                                             __PROD__: production
                                         }),
                production ? new webpack.optimize.UglifyJsPlugin(
                    {
                        compress: {
                            screw_ie8   : true, // React doesn't support IE8
                            warnings    : false,
                            drop_console: true
                        },
                        mangle  : {
                            screw_ie8: true
                        },
                        output  : {
                            comments : false,
                            screw_ie8: true
                        }
                    }) : p => false,
            
            ]
        ),
        
    },
    {
        entry  : {
            "Rescope": "./src/Rescope.js",
        },
        devtool: !production ? 'inline-source-map' : 'source-map',
        output : {
            path         : __dirname,
            filename     : production ? "dist/[name].browser.min.js" : "dist/[name].browser.js",
            publicPath   : "/",
            libraryTarget: 'var'
        },
        resolve: {
            extensions: [
                "",
                ".js",
                ".json",
            ],
        },
        
        module : {
            loaders: [
                {
                    test   : /\.js$/,
                    exclude: /node_modules/,
                    loader : 'babel-loader',
                    query  : {
                        
                        presets: [
                            'babel-preset-react',
                            'babel-preset-es2015',
                            'babel-preset-stage-0'
                        ].map(require.resolve),
                        plugins: [
                            "babel-plugin-add-module-exports",
                        ].map(require.resolve)
                    }
                },
                {
                    test   : /\.json$/,
                    loaders: [
                        "json",
                    ],
                },
                {
                    test   : /\.(html|txt)$/,
                    loaders: [
                        "file-loader?name=[path][name].[ext]&context=./src",
                    ],
                },
            ],
        },
        plugins: (
            [
                new webpack.DefinePlugin({
                                             __PROD__: production
                                         }),
                production ? new webpack.optimize.UglifyJsPlugin(
                    {
                        compress: {
                            screw_ie8   : true, // React doesn't support IE8
                            warnings    : false,
                            drop_console: true
                        },
                        mangle  : {
                            screw_ie8: true
                        },
                        output  : {
                            comments : false,
                            screw_ie8: true
                        }
                    }) : p => false,
            
            ]
        ),
        
    },
    {
        entry  : {
            "examples/vanilla/NewsListComp": ["./src/examples/vanilla/NewsListComp.js", './src/examples/vanilla/index.html'],
            "examples/react/App"           : ['./src/examples/react/index.html', "./src/examples/react/App.js"],
        },
        devtool: 'source-map',
        // description de nos sorties
        output : {
            path      : __dirname,
            filename  : "[name].js",
            publicPath: "/",
        },
        
        resolve: {
            extensions: [
                "",
                ".js",
                ".json",
            ],
        },
        
        module : {
            loaders: [
                {
                    test   : /\.js$/,
                    exclude: /node_modules/,
                    loader : 'babel-loader',
                    query  : {
                        
                        presets: [
                            'babel-preset-react',
                            'babel-preset-es2015',
                            'babel-preset-stage-0'
                        ].map(require.resolve),
                        plugins: [
                            "babel-plugin-add-module-exports",
                        ].map(require.resolve)
                    }
                },
                {
                    test   : /\.json$/,
                    loaders: [
                        "json",
                    ],
                },
                {
                    test   : /\.(html|txt)$/,
                    loaders: [
                        "file-loader?name=[path][name].[ext]&context=./src",
                    ],
                },
            ],
        },
        plugins: (
            [
                new webpack.DefinePlugin({
                                             __PROD__: production
                                         }),
            ]
        ),
        
    }
]