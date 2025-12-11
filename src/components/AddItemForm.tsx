import React, { useState } from 'react';
import InputField from './InputField';
const styles = require('./AddItemForm.module.css');

interface AddItemFormProps {
  onSubmit: (title: string, body: string) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      alert('Please fill in both title and body fields.');
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSubmit(title, body);
    setTitle('');
    setBody('');
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setTitle('');
    setBody('');
  };

  const getCharCounterClass = () => {
    if (body.length > 500) return styles.error;
    if (body.length > 400) return styles.warning;
    return '';
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>
          Create New Post
        </h2>
        <p className={styles.formSubtitle}>
          Share your thoughts with the community
        </p>
      </div>

      <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <InputField
            label="Post Title"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a compelling title..."
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="body" className={`${styles.formLabel} ${styles.required}`}>
            Content
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your post content here..."
            rows={6}
            className={styles.textarea}
            required
            maxLength={600}
          />
          <div className={`${styles.charCounter} ${getCharCounterClass()}`}>
            {body.length} / 600 characters
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !body.trim()}
            className={styles.submitButton}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Publishing...
              </>
            ) : (
              'Publish Post'
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className={styles.clearButton}
            disabled={isSubmitting || (!title && !body)}
          >
            Clear
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AddItemForm;