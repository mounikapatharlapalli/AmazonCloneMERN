import React from 'react';

const Aboutpage = () => {
  return (
    <div className="container my-4">
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-md-3 col-lg-3 bg-primary text-white text-center p-3 rounded">
          <h2>Heading 1</h2>
          <p>This is the first section.</p>
        </div>
        <div className="col-12 col-sm-6 col-md-3 col-lg-3 bg-danger text-white text-center p-3 rounded">
          <h2>Heading 2</h2>
          <p>This is the second section.</p>
        </div>
        <div className="col-12 col-sm-6 col-md-3 col-lg-3 bg-info text-white text-center p-3 rounded">
          <h2>Heading 3</h2>
          <p>This is the third section.</p>
        </div>
        <div className="col-12 col-sm-6 col-md-3 col-lg-3 bg-success text-white text-center p-3 rounded">
          <h2>Heading 4</h2>
          <p>This is the fourth section.</p>
        </div>
      </div>
    </div>
  );
};

export default Aboutpage;
