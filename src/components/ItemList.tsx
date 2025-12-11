import React from 'react';
import ItemCard from './ItemCard';
const styles = require('./ItemList.module.css');

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface ItemListProps {
  posts: Post[];
  onItemClick: (post: Post) => void;
}

const ItemList: React.FC<ItemListProps> = ({ posts, onItemClick }) => {
  if (posts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📝</div>
        <h3 className={styles.emptyTitle}>No posts yet</h3>
        <p className={styles.emptyText}>
          Start by adding your first post using the form
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <ItemCard
          key={post.id}
          post={post}
          onClick={() => onItemClick(post)}
        />
      ))}
    </div>
  );
};

export default ItemList;