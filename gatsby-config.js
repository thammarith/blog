module.exports = {
	siteMetadata: {
		title: `Thammarith's Blog`,
		author: {
			name: 'Thammarith',
			summary: 'a full-stack web engineer, curretly working at Agoda, who happens to love writing',
		},
		image: '/default-thumbnail.png',
		description: 'The place where I write',
		siteUrl: 'https://thammarith.github.io/blog',
		social: {
			twitter: '@thammarith',
		},
	},
	flags: { PRESERVE_WEBPACK_CACHE: true },
	plugins: [
		// filesystem
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/blog`,
				name: 'blog',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/assets`,
				name: 'assets',
			},
		},
		// transformer
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 704,
							wrapperStyle: 'max-width: 88rem',
						},
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
						options: {
							wrapperStyle: 'margin-bottom: 1.0725rem',
						},
					},
					'gatsby-remark-prismjs',
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-smartypants',
				],
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				//trackingId: 'ADD YOUR TRACKING ID HERE',
			},
		},
		'gatsby-plugin-feed',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: `Thammarith' Blog`,
				short_name: 'Thammarith',
				start_url: '/',
				background_color: '#ffffff',
				theme_color: '#ff6520',
				display: 'minimal-ui',
				icon: 'src/assets/images/logo.png',
			},
		},
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// 'gatsby-plugin-offline',
	],
};
