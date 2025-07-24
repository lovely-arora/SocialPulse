import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import multer from "multer";

// Import your route handlers
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import postRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import relationshipRoutes from "./routes/relationships.js";
import storiesRoutes from "./routes/stories.js";

const app = express();
const __dirname = path.resolve();

// Add all origins your frontend requests come from here:
// Include protocol (http or https), domain or IP, and port number exactly
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://18.179.178.229:5173",  // Your deployed frontend
  // Add more if needed
];

// CORS middleware with logging & strict origin check
app.use(cors({
  origin: (origin, callback) => {
    console.log("CORS request origin:", origin);
    if (!origin) {
      // Allow requests with no origin, like curl, Postman or server-to-server requests
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn("Blocked by CORS, origin:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// Enable preflight requests for all routes
app.options("*", cors());

// Always allow credentials header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "/public/uploads")));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Setup API routes
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/stories", storiesRoutes);

// Start server on all interfaces (0.0.0.0) for external access
app.listen(8800, "0.0.0.0", () => {
  console.log("Backend server running on port 8800");
});
