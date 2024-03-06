import React ,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
//form fucntion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address,answer }
      );
      //console.log('Response from backend:', res.data); // Log the response for debugging
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log('Error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
    <div className='register'>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="text" 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="form-control" 
            id="exampleInputName" 
            placeholder='Enter Your Name'
            required
          /> 
        </div>
        <div className="mb-3">
          <input 
            type="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="form-control" 
            id="exampleInputEmail1" 
            placeholder='Enter Your Email'
            required
          /> 
        </div>
        <div className="mb-3">
          <input 
            type="password" 
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            className="form-control" 
            id="exampleInputPassword1" 
            placeholder='Enter Your Password'
            required
          />
        </div>
        <div className="mb-3">
          <input 
            type="phone" 
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="form-control" 
            id="exampleInputPhone1" 
            placeholder='Enter Your Phone'
            required
          />
        </div>
        <div className="mb-3">
          <input 
            type="address" 
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            className="form-control" 
            id="exampleInputPassword1" 
            placeholder='Enter Your Address'
            required
          />
        </div>
        <div className="mb-3">
          <input 
            type="answer" 
            value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
            className="form-control" 
            id="exampleInputPassword1" 
            placeholder='Who is you Best friend '
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  </Layout>
  
  )
}

export default Register
