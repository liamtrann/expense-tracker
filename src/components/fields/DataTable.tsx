import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Expense } from "../../type";

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
            {onEdit || onDelete ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.date}</td>
                {(onEdit || onDelete) && (
                  <td>
                    {onEdit && (
                      <Button
                        variant="warning"
                        as={Link as any}
                        to={`/edit/${item.id}`}
                      >
                        Edit
                      </Button>
                    )}{" "}
                    {onDelete && (
                      <Button
                        variant="danger"
                        onClick={() => onDelete?.(item.id ?? "")}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
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
