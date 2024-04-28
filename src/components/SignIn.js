import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignIn() {

    const [email,setEmail] = useState('');
    // const [id,setId] = useState(0);
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('remember')){
            const account = JSON.parse(localStorage.getItem('remember'));    
            setEmail(account?.email);
            setPassword(account?.password);
        }
    },[]);
    // check LocalStorage
   function handleSignIn(e){
        e.preventDefault();
        fetch(`http://localhost:9999/users/?email=${email}&password=${password}`)
        .then (res => res.json())
        .then (( data ) => {
           if(data.length > 0){
             const existuser = data[0];
             // add Account to LocalStorage
             localStorage.setItem("account", JSON.stringify({id:existuser.id,email:existuser.email}));
             // set check "Remember"
            if(document.getElementById('remember').checked == true){
                const accRemember = {email:email,password:password};
                localStorage.setItem('remember',JSON.stringify(accRemember));
                console.log(accRemember);
            }
            alert('Login success');
            navigate('/Home');

           }
        })
   }  
  
  return (
    <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <h3>Sign In</h3>

                    <Form onSubmit={e=>handleSignIn(e)} >
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address(*)</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email"
                             onChange={e => setEmail(e.target.value)} value={email}   />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password(*)</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                             onChange={e=>setPassword(e.target.value)} name="password" value={password}   />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Check type="checkbox" label="Remember me" id="remember" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
  )
}

export default SignIn