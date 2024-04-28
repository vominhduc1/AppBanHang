import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
function AddToCart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [vat, setVat] = useState(0);

    useEffect(() => {
        // Lấy dữ liệu từ localStorage khi trang được tải lần đầu
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
            const items = JSON.parse(storedCartItems);
            setCartItems(items);

            // Tính tổng số lượng và tổng giá trị của tất cả các sản phẩm
            let quantity = 0;
            let price = 0;
            items.forEach(item => {
                quantity += item.quantity;
                price += item.price * item.quantity;
            });
            const vatValue = price * 0.08; // VAT là 8% của tổng giá trị
            setVat(vatValue);

            setTotalQuantity(quantity);
            setTotalPrice(price);
        }
        
    }, []);

    const clearCart = () => {
        localStorage.removeItem('cartItems');
        setCartItems([]);
        setTotalQuantity(0);
        setTotalPrice(0);
        setVat(0);
    };


    return (
        <Container>
            <Row>
                <Col>
                    <Table striped border hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Images</th>                               
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.price}</td>
                                    <td>1</td>
                                    <td><img src={p.image} alt={p.name} width="70" height="70" /></td> 
                                    <td>{p.price*p.quantity}</td>                                                                           
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <tfoot>
                        <tr>
                            <td colSpan="3"></td>
                            <td><h4>VAT: 8%</h4></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                                <td colSpan="3"></td>
                                <td><h4>Total: {vat}đ</h4></td>
                                <td></td>
                                <td> <Button href='/verify' variant="primary" >Buy</Button></td>
                            </tr>
                            <tr>
                          
                            <td colSpan="5">
                                <Button  variant="danger" onClick={clearCart}>Clear Card</Button>
                            </td>
                        </tr>
                        </tfoot>

                </Col>
            </Row>

        </Container>
    )
}

export default AddToCart;