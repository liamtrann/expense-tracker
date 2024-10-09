import React from "react";
import { Form } from "react-bootstrap";

interface DatePickerFieldProps {
  label: string;
  selectedDate?: string;
  onChange: (date: string) => void;
  required?: boolean;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  selectedDate,
  onChange,
  required = false,
}) => {
  return (
    <Form.Group controlId={label} className="mb-3">
      <Form.Label className="fw-bold">{label}</Form.Label>
      <Form.Control
        type="date"
        value={selectedDate ? selectedDate.split("T")[0] : ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </Form.Group>
  );
};

export default DatePickerField;
