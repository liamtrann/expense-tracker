import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="text-center"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <Card.Body>
          <Card.Title className="fw-bold fs-4">404 - Page Not Found</Card.Title>
          <Card.Text>
            Oops! The page you are looking for does not exist.
          </Card.Text>
          <Button variant="primary" onClick={handleGoHome}>
            Go to Home
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotFound;
