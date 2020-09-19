const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    // fs
    // Fixes npm packages that depend on `fs` module
    // https://stackoverflow.com/questions/51694902/react-boilerplate-error-cant-resolve-xlsx-in-users-react-boilerplate-no
    // https://github.com/vercel/next.js/issues/7755
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    // modernizr
    // https://github.com/peerigon/modernizr-loader/issues/35
    config.module.rules.push({
        test: /\.modernizrrc$/,
        loader: "modernizr-loader!json-loader"
        // Uncomment this when you use `JSON` format for configuration
        // type: 'javascript/auto'
    })

    config.resolve = config.resolve || {}
    config.resolve.alias = config.resolve.alias || {}
    config.resolve.alias["modernizr$"] = path.resolve(__dirname, ".modernizrrc")


    // glslify loader
    // https://github.com/glslify/glslify-loader
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
//      loader: 'glslify-loader!raw-loader',
      use: [
        'raw-loader',
        'glslify-loader'
      ]
    })


    return config
  }
}

