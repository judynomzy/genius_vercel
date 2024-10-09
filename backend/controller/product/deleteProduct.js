const productModel = require('../../models/productModel');

async function deleteProductController(req, res) {
    try {
        // Assuming req.user contains user information, including their admin status
        const user = req.user;

        // Check if the user has admin privileges
        if ( user === 'ADMIN') {
            return res.status(403).json({
                message: "Successfull",
                success: true,
                error: false
            });
        }

        const { _id } = req.body; // Extract the product ID from the request body

        if (!_id) {
            return res.status(400).json({
                message: "Product ID is required",
                success: false,
                error: true
            });
        }

        // Find the product by ID and delete it
        const deletedProduct = await productModel.findByIdAndDelete(_id);

        // If the product does not exist
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true
            });
        }

        // Successfully deleted the product
        res.json({
            message: "Product deleted successfully",
            data: deletedProduct,
            success: true,
            error: false
        });

    } catch (error) {
        // Handle any errors that occur during the deletion
        res.status(500).json({
            message: error.message || "An error occurred while deleting the product",
            success: false,
            error: true
        });
    }
}

module.exports = deleteProductController;
