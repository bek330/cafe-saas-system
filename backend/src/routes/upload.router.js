const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const router = express.Router();



const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file.buffer) {
      return res.status(400).json({
        error: "Invalid upload",
      });

    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        error: "Invalid file type",
      });
    }

    if (req.file.size > 2 * 1024 * 1024) {
      return res.status(400).json({
        error: "File too large",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "menu_items",
          resource_type: "image",
          transformation: [
            {
              width: 1200,
              crop: "limit",
              quality: "auto",
              fetch_format: "auto",
            },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    // 🔥 Return BOTH values (very important)
    res.json({
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;