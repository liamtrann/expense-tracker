import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  min?: number;
  step?: number;
  placeholder?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  min,
  step,
  placeholder,
  className,
}) => {
  return (
    <Form.Group controlId={label} className={`mb-3 ${className}`}>
      {/* Input field with dynamic properties for type, value, and validation */}
      <Form.Label className="fw-bold">{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        step={step}
        placeholder={placeholder}
      />
    </Form.Group>
  );
};

export default InputField;
