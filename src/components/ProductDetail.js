import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
function ProductDetail() {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`http://localhost:9999/products/${id}`)
      .then(res => res.json())
      .then(result => setProduct(result));
  }, [])


  return (
    <Container>
      <Row>
        <Col>

        <div>Product ID: {product.id}</div>
        <div>Product Name: {product.id}</div>
        <div>Price: {product.price}</div>
        <div>Quantity: {product.quantity}</div>
        <div>Status: {product?.status==true?'In stock': 'Out of stock'}</div>
        </Col>
      </Row>

    </Container>
  )
}

export default ProductDetail