// import React, { useEffect, useState } from 'react';
// import { Accordion, Card, Form, InputGroup, FormControl, Dropdown, Row, Col } from 'react-bootstrap';
// import Layout from '../../Layout/Layout';  // Ensure the path is correct
// import axios from 'axios';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// const AppSettings = () => {

//   const [date, setDate] = useState(new Date());
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     axios.get('/api/settings/calendar') 
//       .then(response => setEvents(response.data))
//       .catch(error => console.error('Error fetching interview event', error));
//   }, []);

//   const isEventDate = (date) => {
//     return events.some(event => new Date(event.date).toDateString() === date.toDateString());
//   };

//   const role = localStorage.getItem('role');  // Role from localStorage

//   return (
//     <Layout role={role}>  {/* Passing role to Layout component */}
//       <h2>App Settings</h2>
//       <Accordion defaultActiveKey="0">
//         {/* General Settings */}
//         <Card>
//           <Accordion.Header as={Card.Header} eventKey="0">
//             General Settings
//           </Accordion.Header>
//           <Accordion.Collapse eventKey="0">
//             <Card.Body>
//               <Form>
//                 <Form.Group controlId="formServerClock">
//                   <Form.Check type="switch" label="Sync with Server Clock" />
//                 </Form.Group>
//                 <Form.Group controlId="formLanguage">
//                   <Form.Label>Default Language</Form.Label>
//                   <Form.Control as="select">
//                     <option>English</option>
//                   </Form.Control>
//                 </Form.Group>
//               </Form>
//             </Card.Body>
//           </Accordion.Collapse>
//         </Card>

//         {/* User Management */}
//         <Card>
//           <Accordion.Header as={Card.Header} eventKey="1">
//             User Management
//           </Accordion.Header>
//           <Accordion.Collapse eventKey="1">
//             <Card.Body>
//               <Form>
//                 <Form.Group controlId="formRoleManagement">
//                   <Form.Label>Manage Roles and Permissions</Form.Label>
//                   <Dropdown>
//                     <Dropdown.Toggle variant="secondary">Select Role</Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item>Admin</Dropdown.Item>
//                       <Dropdown.Item>Coordinator</Dropdown.Item>
//                       <Dropdown.Item>HR</Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </Form.Group>

//                 <Form.Group controlId="formUserStatus">
//                   <Form.Label>User Status and Access Control</Form.Label>
//                   <Form.Check type="checkbox" label="Enable/Disable User Account" />
//                   <Form.Check type="checkbox" label="Reset Password" />
//                 </Form.Group>

//                 <h5>User Counts & Performance Stats</h5>
//                 <Row>
//                   <Col><strong>Total Users:</strong> 120</Col>
//                   <Col><strong>Active Sessions:</strong> 35</Col>
//                 </Row>
//               </Form>
//             </Card.Body>
//           </Accordion.Collapse>
//         </Card>

//         <Card>
//           <Accordion.Header as={Card.Header} eventKey="2">
//             Application Settings
//           </Accordion.Header>
//           <Accordion.Collapse eventKey="2">
//             <Card.Body>
//               <Form>
//                 <Form.Group controlId="formMaintenanceMode">
//                   <Form.Check type="switch" label="Maintenance Mode" />
//                 </Form.Group>
//                 <Form.Group controlId="formCustomPost">
//                   <Form.Label>Testimonial Post</Form.Label>
//                   <Form.File />
//                 </Form.Group>
//                 <Form.Group controlId="formFooterText">
//                   <Form.Label>Testimonial Text</Form.Label>
//                   <FormControl as="textarea" placeholder="Enter testimonial text" />
//                 </Form.Group>
//               </Form>
//             </Card.Body>
//           </Accordion.Collapse>
//         </Card>

//         <Accordion.Item eventKey="3">
//           <Accordion.Header>Calendar and Scheduling</Accordion.Header>
//           <Accordion.Body>
//             <Form>
//               <Form.Group controlId="formEventCalendar">
//                 <Form.Label>Event Calendar</Form.Label>
//                 <Form.Control type="date" />
//               </Form.Group>
//               <Form.Group controlId="formWorkingHours">
//                 <Form.Label>Set Practice session Hours</Form.Label>
//                 <InputGroup>
//                   <Form.Control type="time" />
//                   <Form.Control type="time" />
//                 </InputGroup>
//               </Form.Group>
//             </Form>
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>

//       <div>
//         <Calendar
//           onChange={setDate}
//           value={date}
//           tileClassName={({ date, view }) => 
//             view === 'month' && isEventDate(date) ? 'highlight-event' : null
//           }
//         />
//         <div className="event-details">
//           <h4>Selected Date: {date.toDateString()}</h4>
//           <ul>
//             {events
//               .filter(event => new Date(event.date).toDateString() === date.toDateString())
//               .map((event, index) => (
//                 <li key={index}>{event.name} - {event.description}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AppSettings;
