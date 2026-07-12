import React from 'react';
import Layout from '../component/layout/Layout';
import { useSearch } from '../context/search';
import { NavLink } from 'react-router-dom';

const SearchPage = () => {
  const { value } = useSearch();
  const results = value?.result || [];

  return (
    <Layout title="Search Results | Town Shop" discription="Search results for products on Town Shop">
      <div className="container mt-4 justify-content-around">
        <h1 className="mb-4">Search Results</h1>
        <p className="text-muted">Query: <strong>{value?.keyword || 'None'}</strong> ||  Item: <strong>{results?.length || '0'}</strong></p>

        {results.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            No products found. Try another search term.
          </div>
        ) : (
          <div className="d-flex flex-wrap justify-content-around">
            {results.map((product) => (
              <div className="col-md-3 mb-3" key={product._id}>
                <div className="card m-2" style={{width: '18rem'}}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                    loading="lazy"
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name.substring(0,20)}</h5>
                    <p className="card-text">{product.description?.substring(0, 50)}...</p>
                    <p className="fw-bold">₹{product.price}</p>
                    <NavLink to={`/product/${product.slug}`} className="mt-auto btn btn-primary">
                      View Product
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
