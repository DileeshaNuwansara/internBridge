import React from 'react'
import Card from 'react-bootstrap/Card';
import companies from './companies';
import NavBar from '../../components/LandingPageNavbar/LandingPageNavbar';
import Footer from '../../components/Footer/Footer';




export default function Company() {

  


  return (
    <>
    <section>
      <NavBar/>
    </section>
    <br/>
    <br/><br/>
    <section id="supported-companies" class="py-5">
    <div class="container">
    <h2 class="text-center mb-4">Our Supported Companies</h2>
    <p class="text-center mb-5">We are proud to be supported by leading IT companies in Sri Lanka.</p>

    <div class="row text-center">
    {companies.map((company,index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
    

      
      
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={company.logo} alt={company.name} />
                <Card.Body>
                  <Card.Title>{company.name}</Card.Title>
                  <Card.Text>
                    {company.description}
                  </Card.Text>
        
                </Card.Body>
              </Card>
            </div>
          ))}
      
     
          </div>
        </div>
      </section>
      <div>
        <Footer/>
      </div>
  </>
    
  );
}
