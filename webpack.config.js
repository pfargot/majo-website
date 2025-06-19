const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const INCLUDE_PATTERN = /<include src="(.+)"\s*\/?>(?:<\/include>)?/gi
const processNestedHtml = (content, loaderContext, dir = null) =>
  !INCLUDE_PATTERN.test(content)
    ? content
    : content.replace(INCLUDE_PATTERN, (m, src) => {
        const filePath = path.resolve(dir || loaderContext.context, src)
        loaderContext.dependency(filePath)
        return processNestedHtml(
          loaderContext.fs.readFileSync(filePath, 'utf8'),
          loaderContext,
          path.dirname(filePath)
        )
      })

// HTML generation
const paths = []
const generateHTMLPlugins = () =>
  glob.sync('./src/*.html').map((dir) => {
    const filename = path.basename(dir)

    if (filename !== '404.html') {
      paths.push(filename)
    }

    return new HtmlWebpackPlugin({
      filename,
      template: `./src/${filename}`,
      favicon: `./src/images/favicon/favicon.ico`,
      inject: 'body',
    })
  })

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/js/index.js',
  devServer: {
    static: {
      directory: path.join(__dirname, './build'),
    },
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|avif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          preprocessor: processNestedHtml,
        },
      },
    ],
  },
  plugins: [
    ...generateHTMLPlugins(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'CNAME',
          to: '.',
        },
        {
          from: 'src/cv',
          to: 'cv',
        },
        {
          from: 'src/js/sw.js',
          to: 'sw.js',
        },
        {
          from: 'src/images',
          to: 'src/images',
        },
      ],
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: '/majo-website/',
    assetModuleFilename: '[path][name][ext]',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cssnanoMinify,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              cssDeclarationSorter: false,
              reduceIdents: false,
              reduceTransforms: false,
              colormin: true,
              minifySelectors: false,
            },
          ],
        },
      }),
    ],
  },
}
