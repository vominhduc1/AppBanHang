import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

const Payment = () => {
    const [orderInfo, setOrderInfo] = useState({});
    const [paymentInfo, setPaymentInfo] = useState({
        
        expirationDate: '',
        cvv: ''
    });

    useEffect(() => {
        // Lấy dữ liệu từ Local Storage khi trang được tải
        const storedOrderInfo = localStorage.getItem('orderInfo');
        if (storedOrderInfo) {
            setOrderInfo(JSON.parse(storedOrderInfo));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    return (
        <div>
            <h2>Thông tin đơn hàng:</h2>
            <p>First Name: {orderInfo.fname}</p>
            <p>Last Name: {orderInfo.lname}</p>
            <p>Address: {orderInfo.address}</p>
            <p>Mobile: {orderInfo.mobile}</p>
            <p>Email: {orderInfo.email}</p>

            <h2>Mã thanh toán:</h2>
           
            <QRCode value={JSON.stringify(paymentInfo)} />
          
        </div>
    );
};

export default Payment;
