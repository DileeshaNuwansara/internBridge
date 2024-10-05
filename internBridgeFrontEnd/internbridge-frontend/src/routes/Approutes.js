import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Public/LandingPage';
import Contactus from './pages/Contactus/Contactus';
import Aboutus from './pages/Aboutus/Aboutus';
import Company from './pages/Company/Company';
import Testimonials from './pages/Testimonials/Testimonials';
import Signin from './pages/Signin/Signin';
import NoPage from '../pages/Nopage/NoPage';
import ADMINRoutes from './ADMINroutes';
import STUDENTRoutes from './STUDENTroutes';
import COMPANYHRRoutes from './COMPANYHRroutes';
import COORDINATORRoutes from './COORDINATORroutes';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/nopage" element={<NoPage />} />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/contact-us" element={<Contactus />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/company" element ={<Company/>} />

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
        </Router>
    );
};

export default AppRoutes;
