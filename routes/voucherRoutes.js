const express = require("express");

const router = express.Router();

const {
    addVoucher,
    viewMyVouchers
} = require("../controllers/voucherController");

// Create Voucher
router.post("/create", addVoucher);

// View Employee Vouchers
router.get("/my/:employeeId", viewMyVouchers);

module.exports = router;