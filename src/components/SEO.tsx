import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export interface SEOProps {
	description: string;
	title: string;
	path: string;
	content?: string;
	image?: string;
	lang?: string;
	meta?: JSX.IntrinsicElements['meta'][];
}

const SEO: React.FC<SEOProps> = ({
	description,
	image,
	path = '',
	title,
	content = 'article',
	lang = 'en',
	meta = [],
}) => {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						defaultTitle: title
						defaultDescription: description
						defaultImage: image
						siteUrl
						social {
							twitter
						}
					}
				}
			}
		`
	);

	const {
		defaultDescription,
		defaultImage,
		defaultTitle,
		siteUrl,
	} = site.siteMetadata;

	const articlePath = `${siteUrl}${path}`;
	const imagePath = `${siteUrl}${image || defaultImage}`.replace('/blog/blog', '/blog');

	// const defaultMeta = [
	// 	{
	// 		name: `twitter:card`,
	// 		content: `summary`,
	// 	},
	// ];

	// prettier-ignore
	return (
		<Helmet titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}>
			{/* Vanilla HTML */}
			<html lang={lang} />
			<title itemProp="name" lang={lang}>{title || defaultTitle}</title>

			<meta name="author" content="Thammarith" />
			<meta name="description" content={description || defaultDescription} />
			<meta name="image" content={imagePath} />

			{/* OpenGraph */}
			<meta property="og:description" content={description || defaultDescription} />
			<meta property="og:image" content={imagePath} />
			<meta property="og:site_name" content="thammarith's" />
			<meta property="og:title" content={title || defaultTitle} />
			<meta property="og:type" content={content} />
			<meta property="og:url" content={articlePath} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:creator" content={site.siteMetadata?.social?.twitter ?? 'thammarith'} />
			<meta name="twitter:description" content={description || defaultDescription} />
			<meta name="twitter:image" content={imagePath} />
			<meta name="twitter:title" content={title || defaultTitle} />

			{/* Extra */}
			{meta.map(m => <meta name={m.name} content={m.content} />)}
		</Helmet>
	);
};

export default SEO;
