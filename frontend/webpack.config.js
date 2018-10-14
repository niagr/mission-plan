const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: 'development',
	entry: ["./src/index.js"],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	devtool: 'source-map',
	module: {
		rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
			{
				test: /\.(css|sass|scss)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
							localIdentName: '[local]_[hash:base64:5]',
						}
					},
					"sass-loader"
				]
			},
			{
				test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "assets/"
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		})
	]
}