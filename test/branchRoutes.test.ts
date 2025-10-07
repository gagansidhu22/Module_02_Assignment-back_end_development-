import request from "supertest";
import app from "../src/app";

describe("Branch Management Endpoints", () => {
  let createdBranchId: number;

  // Create Branch
  describe("POST /api/v1/branches", () => {
    it("should create a new branch when valid data is provided", async () => {
      // Arrange
      const newBranch = { name: "Main Branch", address: "123 Main St", phone: "123-456-7890" };

      // Act
      const res = await request(app).post("/api/v1/branches").send(newBranch);

      // Assert
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toMatchObject(newBranch);
      createdBranchId = res.body.id;
    });

    it("should return 400 if required fields are missing", async () => {
      // Arrange
      const invalidBranch = { address: "123 Main St" }; // missing name and phone

      // Act
      const res = await request(app).post("/api/v1/branches").send(invalidBranch);

      // Assert
      expect(res.status).toBe(400);
    });
  });

  // Get All Branches
  describe("GET /api/v1/branches", () => {
    it("should return an array of all branches", async () => {
      // Act
      const res = await request(app).get("/api/v1/branches");

      // Assert
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should return at least one branch after creation", async () => {
      // Act
      const res = await request(app).get("/api/v1/branches");

      // Assert
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  // Get Branch by ID
  describe("GET /api/v1/branches/:id", () => {
    it("should return the branch with the given ID", async () => {
      // Act
      const res = await request(app).get(`/api/v1/branches/${createdBranchId}`);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", createdBranchId);
    });

    it("should return 404 if branch does not exist", async () => {
      // Act
      const res = await request(app).get("/api/v1/branches/99999");

      // Assert
      expect(res.status).toBe(404);
    });
  });

  // Update Branch
  describe("PUT /api/v1/branches/:id", () => {
    it("should update the branch with valid data", async () => {
      // Arrange
      const updates = { address: "456 Updated St" };

      // Act
      const res = await request(app).put(`/api/v1/branches/${createdBranchId}`).send(updates);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("address", "456 Updated St");
    });

    it("should return 400 if update data is invalid", async () => {
      // Arrange
      const invalidUpdate = { phone: "" }; // invalid empty phone

      // Act
      const res = await request(app).put(`/api/v1/branches/${createdBranchId}`).send(invalidUpdate);

      // Assert
      expect(res.status).toBe(400);
    });
  });

  // Delete Branch
  describe("DELETE /api/v1/branches/:id", () => {
    it("should delete the branch successfully", async () => {
      // Act
      const res = await request(app).delete(`/api/v1/branches/${createdBranchId}`);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Branch deleted successfully");
    });

    it("should return 404 if branch does not exist", async () => {
      // Act
      const res = await request(app).delete("/api/v1/branches/99999");

      // Assert
      expect(res.status).toBe(404);
    });
  });
});
