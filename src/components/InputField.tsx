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
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  min,
  step,
}) => {
  return (
    <Form.Group controlId={label} className="mb-3">
      <Form.Label className="fw-bold">{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        step={step}
      />
    </Form.Group>
  );
};

export default InputField;
