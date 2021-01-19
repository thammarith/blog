import React from 'react';
import { Link, graphql } from 'gatsby';

import SEO from '../components/seo';

import Header from '../components/common/Header/Header';
import PostCard from '../components/common/PostCard/PostCard';
import Layout from '../components/layout';

const BlogIndex = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata?.title || `Title`;
	const posts = data.allMarkdownRemark.nodes;

	return (
		<Layout location={location} title={siteTitle}>
			<SEO title="All posts" />
			<Header />

			<div style={{ padding: '0 4rem 2rem' }}>
				{posts.map(post => <PostCard key={post.key} post={post} />)}
			</div>

			{/* <ol style={{ listStyle: `none` }}>
				{posts.map(post => {
					const title = post.frontmatter.title || post.fields.slug;

					return (
						<li key={post.fields.slug}>
							<article
								className="post-list-item"
								itemScope
								itemType="http://schema.org/Article"
							>
								<header>
									<h2>
										<Link
											to={post.fields.slug}
											itemProp="url"
										>
											<span itemProp="headline">
												({post.frontmatter.isFeatured ? 'Featured!' : 'Normal'})
												{title}
											</span>
										</Link>
									</h2>
									<small>{post.frontmatter.date}</small>
								</header>
								<section>
									<p
										dangerouslySetInnerHTML={{
											__html:
												post.frontmatter.description ||
												post.excerpt,
										}}
										itemProp="description"
									/>
								</section>
							</article>
						</li>
					);
				})}
			</ol> */}
		</Layout>
	);
};

export default BlogIndex;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			nodes {
				excerpt
				fields {
					slug
				}
				frontmatter {
					date(formatString: "D MMM YYYY")
					title
					description
					isFeatured
				}
			}
		}
	}
`;
