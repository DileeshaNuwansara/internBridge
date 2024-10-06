import React from 'react';
import { Link } from 'react-router-dom';

export default function NoPage() {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <p className="display-4 text-primary">404</p>
        <h1 className="mt-3 display-5 font-weight-bold text-dark">Page not found</h1>
        <p className="mt-4 lead text-muted">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-5 d-flex justify-content-center">
          <Link
            to="/"
            className="btn btn-primary btn-lg px-4 py-2 mx-3"
          >
            Go back home
          </Link>
          <Link
            to="/contact-us"
            className="btn btn-outline-secondary btn-lg px-4 py-2 mr-3 py-2"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
