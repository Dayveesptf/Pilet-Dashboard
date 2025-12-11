import React, { useState, useEffect, lazy, Suspense } from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
const styles = require('./Dashboard.module.css');
const DetailModal = lazy(() => import('./DetailModal'));

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const postsPerPage = 8;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = (title: string, body: string) => {
    const newItem: Post = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      title,
      body,
      userId: 1,
    };
    setPosts([newItem, ...posts]);
  };

  const handleItemClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <span className={styles.loadingText}>Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brand}>
              <div className={styles.brandText}>
                <h1>Content Dashboard</h1>
                <p>Manage and monitor your posts</p>
              </div>
            </div>
            
            <div className={styles.headerStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>{posts.length}</div>
                <div className={styles.statLabel}>Total Posts</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>{totalPages}</div>
                <div className={styles.statLabel}>Pages</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className={styles.contentWrapper}>
          <aside className={styles.sidebar}>
            <AddItemForm onSubmit={handleAddItem} />
          </aside>

          <div className={styles.postsContainer}>
            <div className={styles.postsHeader}>
              <h2>Recent Posts</h2>
            </div>

            <div className={styles.postsContent}>
              <div className={styles.postsWrapper}>
              <div className={styles.postsListContainer}>
                <ItemList 
                  posts={currentPosts} 
                  onItemClick={handleItemClick} 
                />

                {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={styles.pageButton}
                  >
                    ←
                  </button>
                  
                  <span className={styles.pageInfo}>
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ''}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={styles.pageButton}
                  >
                    →
                  </button>
                </div>
              )}
              </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {selectedPost && isModalOpen && (
        <Suspense fallback={
          <div className={styles.modalLoading}>
            <div className={styles.loadingSpinner}></div>
            <span>Loading details...</span>
          </div>
        }>
          <DetailModal
            isOpen={isModalOpen}
            onClose={closeModal}
            post={selectedPost}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Dashboard;