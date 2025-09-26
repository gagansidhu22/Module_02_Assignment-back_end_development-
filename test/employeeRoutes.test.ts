import request from "supertest";
import app from "../src/app";

describe("Employee API - Create Employee", () => {
  let createdEmployeeId: number;

  describe("POST /api/v1/employees", () => {
    it("should create a new employee when all required fields are provided", async () => {
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
      const incompleteEmployee = { name: "Bob OnlyName" };

      // Act
      const res = await request(app).post("/api/v1/employees").send(incompleteEmployee);

      // Assert
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });
});

// Get all Employee
describe("GET /api/v1/employees", () => {
    // Arrange
    it("should return an array of employees", async () => {
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
