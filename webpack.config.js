module.exports = {
    entry: 'src/main.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'app.js'
    },
    watch: true,
    devServer: {
      inline: true
    },
    module: {
        loaders: [
            {
                test: /\.scss/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env']
                }
            }
        ]
    }
}