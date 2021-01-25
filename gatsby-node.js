const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const urlHelper = require('./src/helpers/path');

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions;

	// Define a template for blog post
	const blogPost = path.resolve('./src/templates/Post/Post.tsx');

	// Get all markdown blog posts sorted by date
	const result = await graphql(
		`
			{
				allMarkdownRemark(
					sort: { fields: [frontmatter___date], order: ASC }
					limit: 1000
				) {
					nodes {
						id
						fields {
							slug
						}
					}
				}
			}
		`
	);

	if (result.errors) {
		reporter.panicOnBuild(
			`There was an error loading your blog posts`,
			result.errors
		);
		return;
	}

	const posts = result.data.allMarkdownRemark.nodes;

	// Create blog posts pages
	// But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
	// `context` is available in the template as a prop and as a variable in GraphQL

	if (posts.length > 0) {
		// prettier-ignore
		posts.forEach((post, index) => {
			const previousPostId = index === 0 ? null : posts[index - 1].id;
			const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;

			const path = urlHelper.getUrlFromSlug(post.fields.slug);

			createPage({
				path,
				component: blogPost,
				context: {
					id: post.id,
					previousPostId,
					nextPostId,
					pagePath: path,
				},
			});
		});
	}
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode, trailingSlash: false });

		createNodeField({
			name: `slug`,
			node,
			value: value,
		});

		createNodeField({
			name: `path`,
			node,
			value: urlHelper.getUrlFromSlug(value),
		});
	}
};

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;

	// Explicitly define the siteMetadata {} object
	// This way those will always be defined even if removed from gatsby-config.js

	// Also explicitly define the Markdown frontmatter
	// This way the "MarkdownRemark" queries will return `null` even when no
	// blog posts are stored inside "content/blog" instead of returning an error
	createTypes(`
		type SiteSiteMetadata {
			author: Author
			image: String
			siteUrl: String
			social: Social
		}

		type Author {
			name: String
			summary: String
		}

		type Social {
			twitter: String
		}

		type MarkdownRemark implements Node @infer {
			frontmatter: Frontmatter
			fields: Fields
		}

		type Frontmatter @infer {
			title: String
			description: String
			date: Date @dateformat
			modified: Date @dateformat
			isFeatured: Boolean
			featuredImage: File @fileByRelativePath
			categories: [String!]!
			tags: [String!]
		}

		type Fields {
			slug: String
			path: String
		}
	`);
};
