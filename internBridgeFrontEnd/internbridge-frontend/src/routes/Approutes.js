import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/Landing/Landing';
import Contactus from '../pages/Contactus/Contactus';
import Aboutus from '../pages/Aboutus/Aboutus';
import Company from '../pages/Company/Company';
import Testimonials from '../pages/Testimonials/Testimonials';
import ForgotPassword from '../pages/ForgetPassword/ForgetPasswordPage';
import ResetPassword from '../pages/ForgetPassword/ResetPasswordPage';
import Signin from '../pages/Signin/Signin';
//import Signup from '../pages/Register/Register';
import Signout from '../pages/Signout/Signout'; 
import NoPage from '../pages/Nopage/NoPage';
import ADMINRoutes from './ADMINroutes';
import STUDENTRoutes from './STUDENTroutes';
import COMPANYHRRoutes from './COMPANYHRroutes';
import COORDINATORRoutes from './COORDINATORroutes';
import PrivateRoute from './PrivateRoutes';
import RoleRoute from './RoleRouter';


const AppRoutes = () => {
    return (
        
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<Signin />} />
                {/* <Route path="/register" element={<Signup/>} /> */}
                <Route path="/nopage" element={<NoPage />} />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/contact-us" element={<Contactus />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/forgot-password" element={<ForgotPassword />} /> 
                <Route path="/reset-password/:token" element={<ResetPassword />} /> 
                <Route path="/company" element ={<Company/>} />
                

                {/* Protected Routes */}

                <Route path="/signout" element={<PrivateRoute><Signout /></PrivateRoute>} />

                {ADMINRoutes.map((route) => (
                    <Route 
                        key={route.path}
                        path={route.path} 
                        element={
                            <PrivateRoute>
                                <RoleRoute allowedRoles={route.roles}>
                                    {route.element}
                                </RoleRoute>
                            </PrivateRoute>
                        }
                    />
                ))}

                {STUDENTRoutes.map((route) => (
                    <Route 
                        key={route.path}
                        path={route.path} 
                        element={
                            <PrivateRoute>
                                <RoleRoute allowedRoles={route.roles}>
                                    {route.element}
                                </RoleRoute>
                            </PrivateRoute>
                        }
                    />
                ))}

                {COMPANYHRRoutes.map((route) => (
                                    <Route 
                                        key={route.path}
                                        path={route.path} 
                                        element={
                                            <PrivateRoute>
                                                <RoleRoute allowedRoles={route.roles}>
                                                    {route.element}
                                                </RoleRoute>
                                            </PrivateRoute>
                                        }
                                    />
                                ))}


                    {COORDINATORRoutes.map((route) => (
                                        <Route 
                                            key={route.path}
                                            path={route.path} 
                                            element={
                                                <PrivateRoute>
                                                    <RoleRoute allowedRoles={route.roles}>
                                                        {route.element}
                                                    </RoleRoute>
                                                </PrivateRoute>
                                            }
                                        />
                    ))}

                    <Route path="*" element={<NoPage />} />
                </Routes>
            
         );
    };
                    
export default AppRoutes;
