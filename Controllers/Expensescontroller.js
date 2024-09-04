const Usermodel = require("../Models/User")

const addExpenses = async (req, resp) => {
    const body = req.body;
    const { _id } = req.user;
    try {
        const userData = await Usermodel.findByIdAndUpdate(
            _id,
            {
                $push: { expenses: req.body }
            },
            { new: true }
        );
        return resp.status(200).json({
            message: "Expenses Added ",
            success: true,
            data: userData?.expenses,
        });

    }
    catch (error) {
        return resp.status(500).json({
            message: "something went wrong",
            error: error,
            success: false
        })
    }
}

const fetchExpenses = async (req, resp) => {
    const body = req.body;
    const { _id } = req.user;
    try {
        const userData = await Usermodel.findById(_id).select('expenses');

        return resp.status(200).json({
            message: "Fetched Expenses ",
            success: true,
            data: userData?.expenses,
        });

    }
    catch (error) {
        return resp.status(500).json({
            message: "something went wrong",
            error: error,
            success: false
        })
    }

}
const deleteExpenses = async (req, resp) => {
    const { _id } = req.user;
    const { expenseId } = req.params;
    try {
        const userData = await Usermodel.findByIdAndUpdate(
            _id,
            {
                $pull: { expenses: { _id: expenseId } }
            },
            { new: true }
        );
        return resp.status(200).json({
            message: "Expenses Deleted ",
            success: true,
            data: userData?.expenses,
        });

    }
    catch (error) {
        return resp.status(500).json({
            message: "something went wrong",
            error: error,
            success: false
        })
    }

}

module.exports = {
    addExpenses,
    fetchExpenses,
    deleteExpenses
}