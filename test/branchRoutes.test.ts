import request from "supertest";
import app from "../src/app";
import * as branchService from "../src/api/v1/services/branchService";

jest.mock("../src/api/v1/services/branchService");

const mockBranchId = 1;

describe("Branch API Endpoints (Mocked Services)", () => {
  beforeEach(() => jest.resetAllMocks());

  it("should create a new branch", async () => {
    (branchService.createBranch as jest.Mock).mockResolvedValue({
      id: mockBranchId,
      name: "Main Branch",
      address: "123 Main St",
      phone: "123-456-7890",
    });

    const res = await request(app)
      .post("/api/v1/branches")
      .send({ name: "Main Branch", address: "123 Main St", phone: "123-456-7890" });

    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe(mockBranchId);
  });

  it("should get all branches", async () => {
    (branchService.getBranches as jest.Mock).mockResolvedValue([
      { id: mockBranchId, name: "Main Branch" },
    ]);

    const res = await request(app).get("/api/v1/branches");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0].id).toBe(mockBranchId);
  });

  it("should get branch by id", async () => {
    (branchService.getBranchById as jest.Mock).mockResolvedValue({
      id: mockBranchId,
      name: "Main Branch",
    });

    const res = await request(app).get(`/api/v1/branches/${mockBranchId}`);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(mockBranchId);
  });

  it("should update a branch", async () => {
    (branchService.updateBranch as jest.Mock).mockResolvedValue({
      id: mockBranchId,
      address: "456 Updated St",
    });

    const res = await request(app)
      .put(`/api/v1/branches/${mockBranchId}`)
      .send({ address: "456 Updated St" });

    expect(res.status).toBe(200);
    expect(res.body.data.address).toBe("456 Updated St");
  });

  it("should delete a branch", async () => {
    (branchService.deleteBranch as jest.Mock).mockResolvedValue({
      message: "Branch deleted successfully",
    });

    const res = await request(app).delete(`/api/v1/branches/${mockBranchId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Branch deleted successfully");
  });
});
