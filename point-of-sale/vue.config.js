const fs = require('fs')

module.exports = {

  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    // host: 'dev.local',
    port: 8080,
    https: {
      key: fs.readFileSync('./certs/dev.local+4-key.pem', 'utf-8'),
      cert: fs.readFileSync('./certs/dev.local+4.pem', 'utf-8'),
      // ca: fs.readFileSync('./certs/my-ca.crt')
    }
  },

  transpileDependencies: [
    'vuetify'
  ],

  runtimeCompiler: true,

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          // test: /node_modules[/\\]@polkadot*.js$/,
          include: /node_modules[/\\|]@polkadot/i,
          loader: require.resolve('@open-wc/webpack-import-meta-loader'),
          // loader: '@open-wc/webpack-import-meta-loader',
          exclude: /\.vue$/,
        },

        {
          test: /\.m?js$/,
          include: /node_modules[/\\|]@polkadot/i,
          // exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@vue/cli-plugin-babel/preset',
              ],
              plugins: [
                "@babel/plugin-proposal-private-methods",
                "@babel/plugin-proposal-class-properties",
                '@babel/plugin-proposal-object-rest-spread',
              ]
            }
          }
        },

      ]
    }
  }
}
