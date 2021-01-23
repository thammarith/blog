import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../../components/common/Layout/Layout';
import Bio from '../../components/bio';
import SEO from '../../components/seo';

import styles from './Post.module.scss';

interface PostProps {
	data: any;
	location: any;
}

interface PostHeaderProps {
	title: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ title }) => (
	<header>
		<h1 className={styles.postHeaderTitle}>{title}</h1>
	</header>
);

const Post: React.FC<PostProps> = ({ data, location }) => {
	const post = data.markdownRemark;
	const siteTitle = data.site.siteMetadata?.title || `Title`;
	const { previous, next } = data;

	return (
		<Layout location={location} title={siteTitle}>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
			/>

			<article
				className="blog-post"
				itemScope
				itemType="http://schema.org/Article"
			>
				<PostHeader title={post.frontmatter.title} />

				<section
					className={styles.postContent}
					dangerouslySetInnerHTML={{ __html: post.html }}
					itemProp="articleBody"
				/>

				<footer style={{ height: '10rem' }}>{/* <Bio /> */}</footer>
			</article>

			{/* <nav className="blog-post-nav">
				<ul
					style={{
						display: `flex`,
						flexWrap: `wrap`,
						justifyContent: `space-between`,
						listStyle: `none`,
						padding: 0,
					}}
				>
					<li>
						{previous && (
							<Link to={previous.fields.slug} rel="prev">
								← {previous.frontmatter.title}
							</Link>
						)}
					</li>
					<li>
						{next && (
							<Link to={next.fields.slug} rel="next">
								{next.frontmatter.title} →
							</Link>
						)}
					</li>
				</ul>
			</nav> */}
		</Layout>
	);
};

export default Post;

export const pageQuery = graphql`
	query BlogPostBySlug(
		$id: String!
		$previousPostId: String
		$nextPostId: String
	) {
		site {
			siteMetadata {
				title
			}
		}
		markdownRemark(id: { eq: $id }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "D MMMM YYYY", locale: "en-GB")
				modified(formatString: "D MMMM YYYY", locale: "en-GB")
				description
			}
		}
		previous: markdownRemark(id: { eq: $previousPostId }) {
			fields {
				slug
				path
			}
			frontmatter {
				title
			}
		}
		next: markdownRemark(id: { eq: $nextPostId }) {
			fields {
				slug
				path
			}
			frontmatter {
				title
			}
		}
	}
`;
