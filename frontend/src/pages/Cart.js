import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import PaystackButton from './PaystackButton';
import { useSelector } from 'react-redux';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, fetchUserAddToCart } = useContext(Context); // Access user from context
  const userEmail = useSelector((state) => state.user.user.email);

  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };

    loadData();
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1
      })
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1
        })
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        _id: id,
      })
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      fetchUserAddToCart();
    }
  };

  const handlePaymentSuccess = async (reference) => {
    const paymentData = {
        reference,
        products: data.map(item => ({
            _id: item._id,
            quantity: item.quantity,
            fileId: item.fileId // Assuming fileId is available in each product
        })),
        email: userEmail // Use the Redux selector for user email
    };

    // Add this log to inspect the payment data
    console.log('Payment Data Sent to Backend:', paymentData); // <-- Log the payment data

    try {
        const response = await fetch(SummaryApi.paymentVerification.url, {
            method: SummaryApi.paymentVerification.method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(paymentData) // Send the payment data
        });

        const responseData = await response.json();

        if (responseData.success) {
            alert('Payment successful! Your files have been sent to your email.');
            setData([]); // Clear the cart after successful payment
        } else {
            alert('Payment verification failed. Please try again.');
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        alert('An error occurred while processing payment. Please try again.');
    }
};


  const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0);

  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3'>
        {data.length === 0 && !loading && (
          <p className='bg-white py-5'>No Data</p>
        )}
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/* View product */}
        <div className='w-full max-w-3xl'>
          {loading ? (
            loadingCart.map((el, index) => (
              <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
              </div>
            ))
          ) : data && data.map((product, index) => (
            <div key={product?._id ? product._id + "Add To Cart" : index + "Add To Cart"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
              <div className='w-32 h-32 bg-slate-200'>
                <img src={product?.productId?.productImage?.[0] || 'default-image-url.jpg'} className='w-full h-full object-scale-down mix-blend-multiply' />
              </div>
              <div className='px-4 py-2 relative'>
                <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                  <MdDelete />
                </div>
                
                <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName || 'Unknown Product'}</h2>
                <p className='capitalize text-slate-500'>{product?.productId?.category || 'Unknown Category'}</p>
                <div className='flex items-center justify-between'>
                  <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice || 0)}</p>
                  <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency((product?.productId?.sellingPrice || 0) * (product?.quantity || 0))}</p>
                </div>
                <div className='flex items-center gap-3 mt-1'>
                  <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decraseQty(product?._id, product?.quantity || 0)}>-</button>
                  <span>{product?.quantity || 0}</span>
                  <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity || 0)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {loading ? (
            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
            </div>
          ) : (
            <div className='h-36 bg-white'>
              <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
              <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>

              <PaystackButton
                amount={totalPrice / 100} // Convert from kobo to naira
                email={userEmail } // Use user email from context
                onSuccess={handlePaymentSuccess}         
              />
            
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
