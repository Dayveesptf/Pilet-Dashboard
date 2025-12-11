import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../InputField';

describe('InputField Component', () => {
  const defaultProps = {
    label: 'Test Input',
    id: 'test-input',
    type: 'text',
    value: '',
    onChange: jest.fn(),
  };

  test('renders with label', () => {
    render(<InputField {...defaultProps} />);
    expect(screen.getByLabelText(/test input/i)).toBeInTheDocument();
  });

  test('shows required asterisk when required', () => {
    render(<InputField {...defaultProps} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(
      <InputField
        {...defaultProps}
        onChange={handleChange}
      />
    );
    
    const input = screen.getByLabelText(/test input/i);
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('displays error message when error prop provided', () => {
    const errorMessage = 'This field is required';
    render(
      <InputField
        {...defaultProps}
        error={errorMessage}
      />
    );
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByLabelText(/test input/i)).toHaveClass('inputError');
  });

  test('is disabled when disabled prop is true', () => {
    render(<InputField {...defaultProps} disabled />);
    expect(screen.getByLabelText(/test input/i)).toBeDisabled();
  });
});