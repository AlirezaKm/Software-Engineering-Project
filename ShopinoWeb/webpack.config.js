var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.resolve(__dirname,'src');
var DIST_DIR = path.resolve(__dirname,'dist');
console.log(SRC_DIR);
module.exports= {
    entry:SRC_DIR+"/index.js",
    output:{
        path:DIST_DIR,
        filename:"bundle.js",
    },
    devServer:{
        port:3000,
        contentBase:  DIST_DIR
    },
    module:{
        loaders:[
            {
                test:/\.jsx?/,
                include:SRC_DIR,
                loader:'babel-loader',
                query:{
                    presets: ['env'],
                    plugins:['transform-object-rest-spread']
                }
            },
            {
                test:/\.css/,
                loader:'css-loader'
            }
        ]
    }

}

