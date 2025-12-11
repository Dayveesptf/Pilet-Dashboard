import React from 'react';
const styles = require('./DetailModal.module.css');

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, post }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleSection}>
            <h2 className={styles.modalTitle}>Post Details</h2>
            <div className={styles.postMeta}>
              <span className={styles.postId}>ID: #{post.id}</span>
              <span className={styles.userId}>User: {post.userId}</span>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.contentSection}>
            <h3 className={styles.sectionTitle}>Title</h3>
            <p className={styles.titleText}>{post.title}</p>
          </div>

          <div className={styles.contentSection}>
            <h3 className={styles.sectionTitle}>Content</h3>
            <div className={styles.bodyContainer}>
              <p className={styles.bodyText}>{post.body}</p>
            </div>
          </div>

          <div className={styles.contentSection}>
            <h3 className={styles.sectionTitle}>Stats</h3>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Title Length</span>
                <span className={styles.statValue}>{post.title.length} characters</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Content Length</span>
                <span className={styles.statValue}>{post.body.length} characters</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.closeModalButton} onClick={onClose}>
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;