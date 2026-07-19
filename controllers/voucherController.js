const { createVoucher, getMyVouchers } = require("../models/voucherModel");
const generateVoucherNumber = require("../utils/voucherNumber");

const addVoucher = (req, res) => {

    const {
        voucher_date,
        expense_date,
        department,
        expense_title,
        expense_category,
        expense_description,
        amount,
        employee_id
    } = req.body;

    const voucher_number = generateVoucherNumber();

    const status = "Draft";

    const voucher = [
        voucher_number,
        voucher_date,
        expense_date,
        department,
        expense_title,
        expense_category,
        expense_description,
        amount,
        employee_id,
        status
    ];

    createVoucher(voucher, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Failed to create voucher"
            });
        }

        res.status(201).json({
            message: "Voucher created successfully",
            voucher_number: voucher_number
        });

    });

};

// NEW FUNCTION
const viewMyVouchers = (req, res) => {

    const employeeId = req.params.employeeId;

    getMyVouchers(employeeId, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json(result);

    });

};

module.exports = {
    addVoucher,
    viewMyVouchers
};