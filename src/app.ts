import express, { Express, Request, Response } from "express";
// Importing morgan
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";



const app: Express = express();

// Use morgan for HTTP request logging
app.use(morgan("combined"));


// Health End Point
interface HealthResponse {
status: string;
uptime: number;
timestamp: string;
version: string;
}
app.get("/api/v1/health", (_req: Request, res: Response) => {
    const health: HealthResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };
    res.json(health);
});

app.get("/api/v1/info", (_req: Request, res: Response) => {
    const info = {
        name: "MyApp",
        environment: process.env.NODE_ENV || "development",
        port: Number(process.env.PORT) || 3000,
        timestamp: new Date().toISOString(),
    };
    res.json(info);
});

// Routes
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);
export default app;