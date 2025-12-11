import React from 'react';
const styles = require('./InputField.module.css');

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
}) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.labelWrapper}>
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`${styles.input} ${error ? styles.inputError : ''} ${disabled ? styles.inputDisabled : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <div id={`${id}-error`} className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;