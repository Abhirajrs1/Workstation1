import axios from "axios";
import React,{ useState,createContext, useEffect } from "react";
import Swal from 'sweetalert2';
export const AuthContext=createContext()


function UserContext({children}) {
     const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')) || null);
     const [loading,setLoading]=useState(true)

     axios.defaults.withCredentials=true

     useEffect(()=>{
         const checkAuthenticated=async()=>{
            const token=localStorage.getItem('token')
            if(token){
                try {
                    const response=await axios.get('http://localhost:3000/verify',{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if(response.data.success){
                        setUser(JSON.parse(localStorage.getItem('user')))
                    }else{
                        setUser(null)
                        localStorage.removeItem('user');
                    }
                } catch (error) {
                    console.error('An error occurred during token verification:', error);
                    setUser(null);
                    localStorage.removeItem('user');
                }
            }
            setLoading(false)
         }
         checkAuthenticated()
     },[])

     const login=async(email,password)=>{
             try {     
                const response = await axios.post('http://localhost:3000/employee-login', { email, password});
                if(response.data.success){
                    setUser(response.data.user)
                    console.log(response.data.user);
                    localStorage.setItem('token',response.data.token)
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    return true
                }else{
                    Swal.fire({
                        title: 'Error!',
                        text: response.data.message,
                        icon: 'error',
                        timer: 5000,
                        position: 'top-center',
                      });
                      return false
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    console.error(error.response.data);
                    Swal.fire({
                        title: 'Error!',
                        text: error.response.data.message,
                        icon: 'error',
                        timer: 5000,
                        position: 'top-center',
                      });
                  } else {
                    console.error('An error occurred:', error);
                    Swal.fire({
                        title: 'Error!',
                        text:"An error occured.Please try again later",
                        icon: 'error',
                        timer: 5000,
                        position: 'top-center',
                      });
                }
             }
           }

           const logout=async()=>{
            try {
                const response=await axios.get('http://localhost:3000/employee-logout')
                if(response.data.success){
                    setUser(null)
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                        Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        timer: 5000,
                        position: 'top-center',
                      })
                }
            } catch (error) {
                console.log("An error occured during logout",error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred. Please try again later.',
                    icon: 'error',
                    timer: 5000,
                    position: 'top-center',
                  });
            }
           }
  return (
    <div>
      <AuthContext.Provider value={{login,logout,user,setUser,isAuthenticated:!!user,loading}}>
            {children}
      </AuthContext.Provider>
    </div>
  )
}

export default UserContext
