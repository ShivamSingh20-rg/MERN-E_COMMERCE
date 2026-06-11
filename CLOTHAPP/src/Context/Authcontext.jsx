import { createContext, useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import {API_URL} from './Apiurl'
import{useNavigate} from 'react-router-dom'
// Ensure cookies are automatically sent to the backend
 

 const AuthContext = createContext();

export default  function AuthProvider  ({ children }) {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userItems, setUserItems] = useState([]); 
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {

        const token = localStorage.getItem('jwt'); 
        if (!token) {
      setUser(null);
      setLoading(false); // 🎯 Stop loading if no token exists
      return;
    }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };  

   const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/profile`, config);
        setUser(response.data.user || response.data);
      } catch (err) {
       
        setUser(null);
      } finally {
        setLoading(false); // 🎯 STEP 2: Always stop loading when the request finishes
      }
    };
    
    checkAuth();
  }, []);

  // 2. Login Action
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    
     const { jwt, user } = response.data;
     
    localStorage.setItem('jwt', jwt);
    
     setUser(user)
     
     navigate('/',{ replace: true })
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // 3. Register Action
  const register = async (fullName, email, password) => {

    
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, { fullName, email, password });
      console.log(response)
      navigate('/login');
      
      // For a new user, this will likely return an empty array, 
      // but it establishes the backend link cleanly
      
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  // 4. Logout Action
  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('jwt')
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userItems, login, register, logout,loading}}>
      {children}
    </AuthContext.Provider>
  );
};
export  const useAuth = () => useContext(AuthContext);