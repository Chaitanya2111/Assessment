import React from "react";

function Card() {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img
          src="https://images.pexels.com/photos/285283/pexels-photo-285283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button className="btn btn-primary">Button</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
