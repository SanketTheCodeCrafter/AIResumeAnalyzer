import multer from "multer";

/**
 * Multer Configuration for Resume PDF Uploads
 *
 * Uses memory storage (Buffer) instead of disk — the file stays in RAM
 * so we can pipe it directly into pdf-parse without touching the filesystem.
 */

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB max
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed."), false);
        }
    },
});

/**
 * Middleware: expects a single file under the field name "resume".
 * After this middleware, `req.file.buffer` contains the raw PDF bytes.
 *
 * Usage in routes:
 *   router.post("/", getUser, uploadResume, controller);
 */
export const uploadResume = upload.single("resume");
