import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Expense } from "../type";

interface DataTableProps {
  columns: string[];
  data: Array<Expense>;
  onEdit?: (id?: number) => void;
  onDelete?: (id: string) => void;
  noDataMessage?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  noDataMessage,
}) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            {/* Conditionally add Actions column if edit or delete callbacks are present */}
            {onEdit || onDelete ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.date}</td>
                {/* Render edit and delete buttons only if their respective callbacks are provided */}
                {(onEdit || onDelete) && (
                  <td>
                    {onEdit && (
                      <Button
                        variant="warning"
                        as={Link as any} // Using Link to navigate to edit page
                        to={`/edit/${item.id}`} // Dynamically constructing URL based on item ID
                      >
                        Edit
                      </Button>
                    )}{" "}
                    {onDelete && (
                      <Button
                        variant="danger"
                        onClick={() => onDelete?.(item.id ?? "")} // Handle delete action by invoking callback
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            // Display a message if no data is available, adjusting colspan based on the presence of the Actions column
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="text-center fw-bold"
              >
                {noDataMessage || "No Data"}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
