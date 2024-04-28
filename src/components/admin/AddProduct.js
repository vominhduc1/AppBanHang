import { useEffect, useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddProduct({ categories = [] }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [catId, setCatId] = useState(1);
    const [createAt, setCreateAt] = useState('');
    const [status, setStatus] = useState(true);

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/products")
            .then(res => res.json())
            .then(result => setProducts(result));
    }, []);

    // Xử lý save to DB
    const handleSubmit = (e) => {
        // Ngăn chặn hoạt động re-load form sau khi submit
        e.preventDefault();
        const newProduct = { id, name, price, quantity, catId, createAt, status };
        if (validProduct(newProduct)) {
            // Create
            fetch("http://localhost:9999/products", {
                method: "POST",
                body: JSON.stringify(newProduct),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        alert(`${result.name} create success`);
                        navigate('/'); // Go to Home page
                    }
                })
        }
    };

    function validProduct({ id, name, price, quantity, catId, createAt, status }) {
        let msg = '';
        // Check Id:
        if (id == "") {
            msg += "ProductId is required\n";
        } else if (!id.match(/^P\d{3}$/)) {
            msg += "Invalid ProductId. Ex: P123";
        } else {
            const product = products?.find(p => p.id == id);
            if (product) {
                msg += "This ProductId existed.";
            }
        }
        // Check Product name:
        if (name == "") {
            msg += "Product name is required";
        } // Check Price:
        if (isNaN(price) || price <= 0) {
            msg += "Price must be a positive number\n";
        }
        if (isNaN(quantity) || quantity <= 0) {
            msg += "Quantity must be a positive number\n";
        }


        if (msg.length != 0) {
            alert(msg);
            return false;
        }
        // Check Price:
        

        return true;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>Create new product</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Id (*)</Form.Label>
                            <Form.Control onChange={e => setId(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product name (*)</Form.Label>
                            <Form.Control onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' min={0} onChange={e => setPrice(parseInt(e.target.value))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type='number' min={0} onChange={e => setQuantity(parseInt(e.target.value))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Create At</Form.Label>
                            <Form.Control type='date' onChange={e => setCreateAt(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={e => setCatId(parseInt(e.target.value))}>
                                {
                                    categories?.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Status</Form.Label>
                            <Form.Check onChange={e => setStatus(e.target.checked)} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <input type='submit' value={'Create'} className='btn btn-success' />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
}

export default AddProduct;