import React, { useState, useEffect } from 'react';
import { Table, ListGroup, Container, Row, Col, Form, Carousel, Pagination } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

function Home({ data }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9999/products")
            .then(res => res.json())
            .then(result => setProducts(result));

        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result));
    }, []);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / pageSize); i++) {
        pageNumbers.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
                {i}
            </Pagination.Item>
        );
    }
    const addToCart = (productId) => {
        // Lấy thông tin sản phẩm từ danh sách sản phẩm
        const productToAdd = products.find(p => p.id === productId);
        const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
        cartItems.push(productToAdd);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        setCartItems(cartItems); // Cập nhật state cartItems từ localStorage
        alert(`Added ${productToAdd.name} to cart`);
     
    }


    // Hàm thêm sản phẩm vào giỏ hàng
   



    return (
        <Container>
            <Carousel style={{ width: "100%", margin: "auto" }}>
                {products.map((p, index) => (
                    <Carousel.Item key={index}>
                        <img style={{ width: "230px", height: "230px" }}
                            className="d-block w-100"
                            src={p.image}
                            alt={p.name}
                        />
                        <Carousel.Caption>
                            <h3>{p.name}</h3>
                            <p>{p.price}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
            <br></br>


            <Container>
                <Row>
                    <Col>
                      <Link to="/carts" className="btn btn-primary" >View Cart ({cartItems.length})</Link>
                    </Col>
                </Row>
                <Row>
                    {products.slice(startIndex, endIndex).map((p, index) => (
                        <Col key={index} sm={3}>
                            <div className="card" style={{ width: '14rem', height: '100%' }}>
                                <img className="card-img-top" src={p.image} alt="Card image cap" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <div className="card-body" >
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <Link to={`/product/${p.id}`} className="btn btn-primary">Detail</Link>
                                    <button className="btn btn-primary" onClick={() => addToCart(p.id)}>AddCart</button>
                                    
                                </div>

                            </div>
                        </Col>
                    ))}
                </Row>
                <br></br>
                <Pagination>{pageNumbers}</Pagination>
            </Container>
        </Container>
    )
}

export default Home;
