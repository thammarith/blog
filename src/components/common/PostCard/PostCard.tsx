import React from 'react';

import styles from './PostCard.module.scss';

interface PostCardProps {
    post: any;
}

{/* <div>{JSON.stringify(post)}</div> */}

const PostCard: React.FC<PostCardProps> = ({ post }: PostCardProps) => {
    const { isFeatured } = post.frontmatter;
    return isFeatured ? <FeaturedPostCard post={post} /> : <RegularPostCard post={post} />;
};

const FeaturedPostCard: React.FC<PostCardProps> = ({ post }: PostCardProps) => {
    return (
        <div className={styles.featuredPostCard}>FeaturedPostCard</div>
    )
}

const RegularPostCard: React.FC<PostCardProps> = ({ post }: PostCardProps) => {
    return (
        <div className={styles.regularPostCard}>RegularPostCard</div>
    )
}

export default PostCard;

