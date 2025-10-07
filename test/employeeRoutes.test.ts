import request from "supertest";
import app from "../src/app";

describe("Branch API Endpoints", () => {
  it("dummy test to confirm Jest works", () => {
    expect(true).toBe(true);
  });
});

let createdEmployeeId: number;

describe("Employee API Endpoints", () => {
  // Create Employee
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

  // Get all employees
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

  // Get Employee by Id
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

  // update employee
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

  // Delete Employee
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

// Get All Employees for a branch
describe("GET /api/v1/employees/branch/:branchId", () => {
  it("should return employees for a given branch", async () => {
    // Arrange
    const resCreate = await request(app).post("/api/v1/employees").send({
      name: "John Doe",
      position: "Developer",
      department: "IT",
      email: "john@example.com",
      phone: "1234567890",
      branchId: 101,
    });

    const branchId = resCreate.body.branchId;

    // Act
    const res = await request(app).get(`/api/v1/employees/branch/${branchId}`);

    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((emp: any) => emp.branchId === branchId)).toBe(true);
  });

  it("should return 400 if branchId is invalid", async () => {
    const res = await request(app).get("/api/v1/employees/branch/abc");
    expect(res.status).toBe(400);
  });
});

// Get Employees by Department
describe("GET /api/v1/employees/department/:department", () => {
  it("should return employees for a given department", async () => {
    // Arrange
    await request(app).post("/api/v1/employees").send({
      name: "Jane Smith",
      position: "Manager",
      department: "HR",
      email: "jane@example.com",
      phone: "9876543210",
      branchId: 102,
    });

    // Act
    const res = await request(app).get("/api/v1/employees/department/HR");

    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((emp: any) => emp.department === "HR")).toBe(true);
  });

  it("should return 400 if department is missing", async () => {
    const res = await request(app).get("/api/v1/employees/department/");
    expect(res.status).toBe(404); // Express treats missing param as 404
  });
});


