import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Option {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <Form.Group controlId={label} className="mb-3">
      <Form.Label className="fw-bold">{label}</Form.Label>
      <Form.Select value={value} onChange={onChange} required={required}>
        {/* Placeholder option prompting user to select a value */}
        {label && <option value="">Select a {label.toLowerCase()}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default SelectInput;
