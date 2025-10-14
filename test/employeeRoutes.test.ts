import request from "supertest";
import app from "../src/app";
import * as employeeService from "../src/api/v1/services/employeeService";

jest.mock("../src/api/v1/services/employeeService");

const mockEmployeeId = "mockId";

describe("Employee API Endpoints (Mocked Services)", () => {
  beforeEach(() => jest.resetAllMocks());

  it("should create a new employee", async () => {
    (employeeService.createEmployee as jest.Mock).mockResolvedValue({
      id: mockEmployeeId,
      name: "Alice",
      position: "Developer",
      department: "IT",
      email: "alice@test.com",
      phone: "1234567890",
      branchId: 1
    });

    const res = await request(app)
      .post("/api/v1/employees")
      .send({ name: "Alice", position: "Developer", department: "IT", email: "alice@test.com", phone: "1234567890", branchId: 1 });

    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe(mockEmployeeId);
  });

  it("should get all employees", async () => {
    (employeeService.getAllEmployees as jest.Mock).mockResolvedValue([
      { id: mockEmployeeId, name: "Alice" },
    ]);

    const res = await request(app).get("/api/v1/employees");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0].id).toBe(mockEmployeeId);
  });

  it("should get employee by id", async () => {
    (employeeService.getEmployeeById as jest.Mock).mockResolvedValue({
      id: mockEmployeeId,
      name: "Alice",
    });

    const res = await request(app).get(`/api/v1/employees/${mockEmployeeId}`);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(mockEmployeeId);
  });

  it("should update an employee", async () => {
    (employeeService.updateEmployee as jest.Mock).mockResolvedValue({
      id: mockEmployeeId,
      position: "Senior Developer",
    });

    const res = await request(app)
      .put(`/api/v1/employees/${mockEmployeeId}`)
      .send({ position: "Senior Developer" });

    expect(res.status).toBe(200);
    expect(res.body.data.position).toBe("Senior Developer");
  });

  it("should delete an employee", async () => {
    (employeeService.deleteEmployee as jest.Mock).mockResolvedValue({
      message: "Employee deleted successfully",
    });

    const res = await request(app).delete(`/api/v1/employees/${mockEmployeeId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Employee deleted successfully");
  });
});
