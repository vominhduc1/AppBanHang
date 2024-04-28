import { Table, Container, Row, Col, Form ,Button} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Sử dụng cú pháp function -> Tạo 1 component đặt tên là Product
export default function Product() {
  // Tạo ra các biến trạng thái (state) để quản lý dữ liệu cho component
  const [products, setProducts] = useState([]); // products = data; change values of 'products' -> setProducts()
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState(0);
  const [search, setSearch] = useState("");
  const { cat_id } = useParams();
  const [editProductId, setEditProductId] = useState(null); // State để lưu ID của sản phẩm cần chỉnh sửa

  useEffect(() => {
    fetch(
      cat_id
        ? `http://localhost:9999/products/?catId=${cat_id}`
        : "http://localhost:9999/products"
    )
      .then((res) => res.json())
      .then((result) => {
        let searchResult = [];
        if (catId === 0) {
          searchResult = result.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          );
          setProducts(searchResult);
        } else {
          searchResult = result.filter(
            (p) =>
              p.catId === catId &&
              p.name.toLowerCase().includes(search.toLowerCase())
          );
          setProducts(searchResult);
        }
      });

    fetch("http://localhost:9999/categories")
      .then((res) => res.json())
      .then((result) => setCategories(result));
  }, [catId, search, cat_id]);

  const navigate = useNavigate();


  const handleDeleteProduct = (productId) => {
    // Hiển thị thông báo hỏi người dùng có chắc chắn muốn xóa hay không
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    
    // Nếu người dùng đồng ý xóa
    if (isConfirmed) {
        // Gửi yêu cầu DELETE đến máy chủ để xóa sản phẩm với ID tương ứng
        fetch(`http://localhost:9999/products/${productId}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((result) => {
            // Cập nhật danh sách sản phẩm sau khi xóa thành công
            setProducts(products.filter((p) => p.id !== productId));
           // dieu huong ve trang danh sach san pham
            // navigate('/product');
            
        })
        .catch((error) => console.log(error));
    }
};

  
  function handleDelete(id) {
    setEditProductId(id);
  }
   
  // Hàm xử lý chuyển đến trạng thái chỉnh sửa sản phẩm khi nhấn nút "Edit"
  

  return (
    <Container fluid>
      <Row>
        <Col xs={3}>
          <Form.Select onChange={(e) => setCatId(parseInt(e.target.value))}>
            <option key={0} value={0}>
              Select all
            </option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter product name to search ..."
                style={{ border: "1px solid gray" }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={3} style={{ textAlign: "right" }}>
          <Link to={"/product/create"}>Create new product</Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped border hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td><Link to={`/product/${p.id}`}>{p.name}</Link></td>
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>
                  <td>
                    {
                      categories && categories.find(c => c.id == p.catId)?.name
                    }
                  </td>
                  <td>
                    <span style={{ marginRight: "10px" }}>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(p.id)}>Delete</Button>
                    </span>
                    <Button  variant="primary" size="sm" href={`/admin/product/edit/${p.id}`} /* Gọi hàm xử lý khi nhấn vào nút "Edit"*/>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

function Category({ data }) {
  return (
    <ul>
      {data?.map((c) => (
        <li key={c.id}>
          <Link to={`products/category/${c.id}`}>{c.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export { Category };