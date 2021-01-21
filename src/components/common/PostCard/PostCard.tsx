import React, { useState } from 'react';

import styles from './PostCard.module.scss';

interface FrontMatter {
	title: string;
	description: string;
	date: string;
	modified?: string;
	tags?: string[];
	categories: string[];
	isFeatured?: boolean;
}
interface Post {
	excerpt: string;
	fields: {
		slug: string;
	};
	frontmatter: FrontMatter;
}
interface PostCardProps {
	post: Post;
}

interface FeaturedPostCardCoverImageProps {
	imageUrl: string;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
	const { isFeatured } = post.frontmatter;
	const [isUsingTempCard] = useState(true);

	if (isUsingTempCard) return <TemporaryPostCard post={post} />;

	// prettier-ignore
	return isFeatured ? <FeaturedPostCard post={post} /> : <RegularPostCard post={post} />;
};

const TemporaryPostCard: React.FC<PostCardProps> = ({ post }) => (
	<div className={styles.temporaryPostCard}>
		<h2 className={styles.temporaryPostCardTitle}>{post.frontmatter.title}</h2>
		<p className={styles.temporaryPostCardExcerpt}>{post.excerpt}</p>
	</div>
);

const FeaturedPostCard: React.FC<PostCardProps> = ({ post }) => (
	<div className={styles.featuredPostCard}>
		<FeaturedPostCardCoverImage imageUrl="https://placekitten.com/2000/2000" />
		{/* Currently, it makes sense to use H2. However, if there're additional sub-H1 headings in the future, make this H3 */}
		<h2 className={styles.featuredPostCardTitle}>
			Keyboard & Hello, world! สวัสดีชาวโลก! รีวิวคีย์บอร์ด
		</h2>
	</div>
);

const FeaturedPostCardCoverImage: React.FC<FeaturedPostCardCoverImageProps> = ({
	imageUrl,
}) => (
	<div className={styles.featuredPostCardCoverImageContainer}>
		<svg viewBox="0 0 1618 1000"></svg>
		<div
			className={styles.featuredPostCardCoverImage}
			style={{ backgroundImage: `url('${imageUrl}')` }}
		></div>
	</div>
);

const RegularPostCard: React.FC<PostCardProps> = ({ post }: PostCardProps) => (
	<div className={styles.regularPostCard}>
		<div
			className={styles.regularPostCardCoverImage}
			style={{ backgroundImage: `url('https://placekitten.com/2000/2000')` }}
		></div>
		<h2 className={styles.regularPostCardTitle}>
			Keyboard & Hello, world! สวัสดีชาวโลก! รีวิวคีย์บอร์ด
			ทดสอบชื่อบทความยาวววววววววววววววววววววววววววววววววววววววว
		</h2>
	</div>
);

export default PostCard;
