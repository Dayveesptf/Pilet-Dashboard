import React from 'react';
const styles = require('./ItemCard.module.css');

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface ItemCardProps {
  post: Post;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ post, onClick }) => {
  const formattedBody = post.body.length > 150 
    ? `${post.body.substring(0, 150)}...` 
    : post.body;

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <span className={styles.cardId}>#{post.id}</span>
      </div>
      <p className={styles.cardBody}>{formattedBody}</p>
      <div className={styles.cardFooter}>
        <span className={styles.userInfo}>
          <span className={styles.userIcon}>👤</span>
          User {post.userId}
        </span>
        <button className={styles.viewButton}>
          View Details
          <span className={styles.viewIcon}>→</span>
        </button>
      </div>
    </div>
  );
};

export default ItemCard;