const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: 'development',
	entry: ["./src/index.js"],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	devtool: 'eval-source-map',
	module: {
		rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
						presets: ['@babel/preset-react'],
						plugins: [
							'@babel/plugin-proposal-class-properties', 
							'@babel/plugin-proposal-object-rest-spread'
						]
                    }
                }
            },
			{
				test: /\.(css|sass|scss)$/,
				use: [
					"style-loader",
					"css-loader",
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