const express = require("express");
const router = express.Router();
const { getAuditLogs } = require("../controllers/auditlog.controller");
const { protect, admin } = require("../middlewares/auth.middleware");

router.get("/", protect, admin, getAuditLogs);

module.exports = router;
