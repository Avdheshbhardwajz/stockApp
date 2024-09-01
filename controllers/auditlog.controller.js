const asyncHandler = require("express-async-handler");
const AuditLog = require("../models/auditlog.model");

// Get all audit logs
const getAuditLogs = asyncHandler(async (req, res) => {
  // Retrieve audit logs based on user role (admins have access to all logs)
  let auditLogs;
  if (req.user.role === "admin") {
    auditLogs = await AuditLog.find({});
  } else {
    auditLogs = await AuditLog.find({ user: req.user._id });
  }

  res.json(auditLogs);
});

module.exports = {
  getAuditLogs,
};
