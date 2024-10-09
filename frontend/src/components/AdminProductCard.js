/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md"; // Import the delete icon
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify'; // Import toast for feedback
import SummaryApi from '../common';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(SummaryApi.deleteProduct.url, {
                method: 'delete',
                credentials: 'include', // Include this if using cookies for authentication
                headers: {
                    "Content-Type": "application/json" // Correct header key
                },
                body: JSON.stringify({ _id: data._id }) // Send only product ID in the body
            });

            const result = await response.json();

            if (result.success) {
                toast.success(result.message || "Product deleted successfully");
                fetchdata(); // Refresh product list after deletion
            } else {
                toast.error(result.message || "Failed to delete product");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the product.");
        }
    };

    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} className='mx-auto object-fill h-full' alt={data.productName}/>   
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>
                    <p className='font-semibold'>
                        {displayINRCurrency(data.sellingPrice)}
                    </p>

                    <div className='flex justify-between items-center w-full'>
                        {/* Delete Button */}
                        <div 
                            className='w-fit p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' 
                            onClick={handleDelete}
                        >
                            <MdDelete/>
                        </div>

                        {/* Edit Button */}
                        <div 
                            className='w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' 
                            onClick={() => setEditProduct(true)}
                        >
                            <MdModeEditOutline/>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Render Edit Product Modal */}
            {editProduct && (
                <AdminEditProduct 
                    productData={data} 
                    onClose={() => setEditProduct(false)} 
                    fetchdata={fetchdata} 
                />
            )}
        </div>
    );
};

export default AdminProductCard;
