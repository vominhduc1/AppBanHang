
import Product, { Category } from "./components/admin/Product";
import AddProduct from "./components/admin/AddProduct";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetail from "./components/ProductDetail";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Edit from "./components/admin/Edit";
import AddToCart from "./components/AddToCart";
import VerifyOrder from "./components/VerifyOrder";
import Payment from "./components/Payment";


function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/categories")
      .then((res) => res.json())
      .then((result) => setCategories(result));

      fetch("http://localhost:9999/products")
      .then((res) => res.json())
      .then((result) => setProducts(result));
  }, []);
     
  // Hàm để thêm sản phẩm vào giỏ hàng
  


  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col
            style={{
              textAlign: "right",
              lineHeight: "50px",
              borderBottom: "1px solid blue",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              <Button href="/auth/Sign-in" variant="primary">Sign In</Button>
            </span>
            {/* {
              localStorage.
            } */}
            <Button href="/auth/Sign-up" variant="primary">Sign Up</Button>
          </Col>

        </Row>
        <Row>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <a class="nav-link" href="/Home">Home </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="/Product">Product </a>
                </li>
              </ul>
            </div>
          </nav>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col xs={12} sm={5} md={3}>
            <Category data={categories} />
          </Col>
          <Col xs={12} sm={7} md={9}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/create" element={<AddProduct categories={categories} />} />
              <Route path="/products/category/:catId" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/auth/Sign-up" element={<SignUp />} />
              <Route path="/auth/Sign-in" element={<SignIn />} />
              <Route path="/admin/product/edit/:pid" element={<Edit categories={categories} />} />
              <Route path="/carts" element={<AddToCart />} />
              <Route path="/verify" element={<VerifyOrder />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              textAlign: "center",
              lineHeight: "50px",
              borderTop: "1px solid blue",
            }}
          >
            Footer
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;