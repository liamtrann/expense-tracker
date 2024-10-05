import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import ExpenseList from "./pages/ExpenseList";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 py-3 shadow">
        <Navbar.Brand as={Link} to="/" className="ml-2">
          Expense Tracker
        </Navbar.Brand>
        <Nav className="fw-bold mr-2">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/add">
            Add Expense
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/edit/:id" element={<EditExpense />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
