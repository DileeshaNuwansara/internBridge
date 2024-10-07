import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/Landing/Landing';
import Contactus from '../pages/Contactus/Contactus';
import Aboutus from '../pages/Aboutus/Aboutus';
import Company from '../pages/Company/Company';
import Testimonials from '../pages/Testimonials/Testimonials';
import Signin from '../pages/Signin/Signin';
import Signup from '../pages/Register/Register';
import NoPage from '../pages/Nopage/NoPage';
import ADMINRoutes from './ADMINroutes';
import STUDENTRoutes from './STUDENTroutes';
import COMPANYHRRoutes from './COMPANYHRroutes';
import COORDINATORRoutes from './COORDINATORroutes';
import PrivateRoute from './PrivateRoutes';
import RoleRoute from './RoleRouter';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';

const AppRoutes = () => {
    return (
        
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/register" element={<Signup/>} />
                <Route path="/nopage" element={<NoPage />} />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/contact-us" element={<Contactus />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/company" element ={<Company/>} />
                {/* <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} /> */}

                {/* Protected Routes */}
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
