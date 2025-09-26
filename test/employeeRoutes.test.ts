import request from "supertest";
import app from "../src/app";

let createdEmployeeId: number;

describe("Employee API Endpoints", () => {
  // CREATE EMPLOYEE
  describe("POST /api/v1/employees", () => {
    it("should create a new employee when all fields are provided", async () => {
      // Arrange
      const newEmployee = {
        name: "Alice Smith",
        position: "Developer",
        department: "IT",
        email: "alice.smith@example.com",
        phone: "123-456-7890",
        branchId: 1,
      };

      // Act
      const res = await request(app).post("/api/v1/employees").send(newEmployee);

      // Assert
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toBe(newEmployee.name);
      createdEmployeeId = res.body.id;
    });

    it("should return 400 when required fields are missing", async () => {
      // Arrange
      const invalidEmployee = { name: "Bob" };

      // Act
      const res = await request(app).post("/api/v1/employees").send(invalidEmployee);

      // Assert
      expect(res.status).toBe(400);
    });
  });

  // GET ALL EMPLOYEES
  describe("GET /api/v1/employees", () => {
    // Arrange
    it("should return all employees", async () => {
     // Act
      const res = await request(app).get("/api/v1/employees");

      // Assert
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
    // Arrange
    it("should return an empty array if no employees exist", async () => {

      // Act
      const res = await request(app).get("/api/v1/employees");

      // Assert
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // GET EMPLOYEE BY ID
  describe("GET /api/v1/employees/:id", () => {
    // Arrange
    it("should return employee by ID", async () => {

      // Act
      const res = await request(app).get(`/api/v1/employees/${createdEmployeeId}`);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", createdEmployeeId);
    });
    
    // Arrange
    it("should return 404 if employee does not exist", async () => {
      // Act
      const res = await request(app).get("/api/v1/employees/99999");

      // Assert
      expect(res.status).toBe(404);
    });
  });

  // UPDATE EMPLOYEE
  describe("PUT /api/v1/employees/:id", () => {
    it("should update an existing employee", async () => {
      // Arrange
      const updates = { position: "Senior Developer" };

      // Act
      const res = await request(app).put(`/api/v1/employees/${createdEmployeeId}`).send(updates);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.position).toBe(updates.position);
    });

    // Arrange
    it("should return 400 when no update fields are provided", async () => {
      // Act
      const res = await request(app).put(`/api/v1/employees/${createdEmployeeId}`).send({});

      // Assert
      expect(res.status).toBe(400);
    });
  });

  // DELETE EMPLOYEE
  describe("DELETE /api/v1/employees/:id", () => {
    // Arrange
    it("should delete employee by ID", async () => {
      // Act
      const res = await request(app).delete(`/api/v1/employees/${createdEmployeeId}`);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
    });

    // Arrange
    it("should return 404 if employee does not exist", async () => {
      // Act
      const res = await request(app).delete("/api/v1/employees/99999");

      // Assert
      expect(res.status).toBe(404);
    });
  });
});
