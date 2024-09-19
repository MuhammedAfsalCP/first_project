import React, { useEffect } from 'react'
import { useState } from 'react'
import { Pascomponent } from '../../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const ContaxtForm = ({ children }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [verifyname, setVerifyname] = useState(null);
    const [verifyemail, setVerifyemail] = useState(null);
    const [verifypass, setVerifypass] = useState(null);
    const [verifyconfirm, setVerifyconfirm] = useState(null);
    const [storeemail, setStoreemail] = useState([]);
    const [loginmail, setLoginmail] = useState("");
    const [loginpass, setLoginpass] = useState("");

    // filter states
    const [itemfilter, setItemfilter] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [specificcart, setSpecificcart] = useState("");
    const [user, setUser] = useState(false);
    const [userid, setUserid] = useState("");
    const [cartview, setCartview] = useState([]);
    
    const navigate = useNavigate();

    //  registration checking
    const handleSubmit = async (e) => {
        e.preventDefault();
        const namevalid = name.trim();
        const passvalid = pass.split("").filter((x) => x === " ");
        const response = await axios.get("http://localhost:3000/register-details");
        const check = response.data.find((x) => x.email === email);
        
        if (namevalid.length !== 0 && email !== "" && passvalid.length === 0 && confirm === pass && pass.length >= 5 && confirm.length >= 5 && check === undefined) {
            await axios.post("http://localhost:3000/register-details", { "name": name, "email": email, "password": pass, "cart": [] });
            navigate('/Login');
            setVerifyname(true);
            setVerifyconfirm(true);
            setVerifyemail(true);
            setVerifypass(true);
            setConfirm("");
            setEmail("");
            setName("");
            setPass("");
        }else{
            //error finding
            if(name!=""){
           setVerifyname(true)
            }else{
              setVerifyname(false)
            }
            if(email!=""&&check==undefined){
              setVerifyemail(true)
            }else{
              setVerifyemail(false)
            }if(passvalid.length==0&&pass.length>=5){
            setVerifypass(true)
            }else{
              setVerifypass(false)
            }if(confirm==pass&&confirm.length>=5){
              setVerifyconfirm(true)
            }else{
              setVerifyconfirm(false)
            }
          }
    };

    // login verification
    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:3000/register-details");
            const check = response.data.find((x) => x.email === loginmail && x.password === loginpass);
            
            if (check) {
                localStorage.setItem("user_Id", check.id);
                sessionStorage.setItem('user', JSON.stringify(check));
                sessionStorage.removeItem('cart');
                const userResponse = await axios.get(`http://localhost:3000/register-details/${check.id}`);
                const userCart = userResponse.data.cart;
                sessionStorage.setItem('cart', JSON.stringify(userCart));
                setUserid(check.id);
                setCartview(userCart);
                setUser(true);
                navigate('/');
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    // item adding cart
    const cartadd = async (item) => {
        if (user) {
            try {
                const response = await axios.get(`http://localhost:3000/register-details/${userid}`);
                const detail = response.data;
                let cartData = detail.cart || [];
                const itemExist = cartData.find(cartItem => cartItem.id === item.id);
                
                if (itemExist) {
                    // aldredy item added
                } else {
                    // not aldredy add item
                    cartData = [...cartData, { ...item, quantity: 1, total_price: item.price }];
                }
                // quantity==0 remove the item 
                cartData = cartData.filter(cartItem => cartItem.quantity > 0);
                // session storage and cart state update
                setCartview(cartData);
                sessionStorage.setItem('cart', JSON.stringify(cartData));
                //original cart updated
                await axios.patch(`http://localhost:3000/register-details/${userid}`, { cart: cartData });
            } catch (error) {
                console.error('Error updating cart:', error);
                alert('Failed to update cart. Please try again.');
            }
        } else {
            navigate('/Login');
        }
    };

    // Load cart from sessionStorage on component mount
    useEffect(() => {
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setCartview(parsedCart);
        }
    }, [setCartview, userid]);

    // Increment item quantity in cart
    const increament = async (item) => {
        try {
            const response = await axios.get(`http://localhost:3000/register-details/${userid}`);
            const detail = response.data;
            let cartData = detail.cart || [];
            const itemExist = cartData.find(cartItem => cartItem.id === item.id);
            
            if (itemExist) {
                // Update aldredy exist item
                cartData = cartData.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1, total_price: (cartItem.total_price || cartItem.price) + cartItem.price }
                        : cartItem
                );
            } else {
                // Add new item if it does not exist
                cartData = [...cartData, { ...item, quantity: 1, total_price: item.price }];
            }
            // quantity==0 remove item
            cartData = cartData.filter(cartItem => cartItem.quantity > 0);
            // session storage and cart update
            setCartview(cartData);
            sessionStorage.setItem('cart', JSON.stringify(cartData));
            // original cart update
            await axios.patch(`http://localhost:3000/register-details/${userid}`, { cart: cartData });
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    // decreament original cart Quandity
    const decreament = async (item) => {
        try {
            const response = await axios.get(`http://localhost:3000/register-details/${userid}`);
            const detail = response.data;
            let cartData = detail.cart || [];
            const itemExist = cartData.find(cartItem => cartItem.id === item.id);
            
            if (itemExist) {
                // aldredy aded item
                cartData = cartData.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: (cartItem.quantity || 1) - 1, total_price: (cartItem.total_price || cartItem.price) - cartItem.price }
                        : cartItem
                );
            } else {
                // new item add
                cartData = [...cartData, { ...item, quantity: 1, total_price: item.price }];
            }
            // quandity==0 remove item
            cartData = cartData.filter(cartItem => cartItem.quantity > 0);
            //  cart state and sessionStorage update
            setCartview(cartData);
            sessionStorage.setItem('cart', JSON.stringify(cartData));
            // Update orginal cart
            await axios.patch(`http://localhost:3000/register-details/${userid}`, { cart: cartData });
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };



    return (
        <div>
            <Pascomponent.Provider value={{decreament,setCartview,increament,cartadd,loginSubmit,handleSubmit,cartview,userid,setUserid,user,setUser,specificcart,setSpecificcart, filteredProducts,setFilteredProducts, itemfilter,setItemfilter, loginmail, setLoginmail, loginpass, setLoginpass, name, setName, email, setEmail, pass, setPass, confirm, setConfirm, verifyname, setVerifyname, verifyemail, setVerifyemail, verifypass, setVerifypass, verifyconfirm, setVerifyconfirm, storeemail, setStoreemail }}>
                {children}
            </Pascomponent.Provider>
        </div>
    )
}

export default ContaxtForm
