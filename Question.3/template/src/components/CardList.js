import React from 'react';
import './CardList.css';

function CardList({ selectedMenu }) {

  const menuTitle = selectedMenu ? selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1) : 'Menu';

  return (
    <div className="container mt-3">
      <h5>{menuTitle}</h5>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card custom-card">
            <img
              src="https://images.pexels.com/photos/285283/pexels-photo-285283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top custom-card-img"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button className="btn btn-primary">Button</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card custom-card">
            <img
              src="https://images.pexels.com/photos/2438/nature-forest-waves-trees.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top custom-card-img"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button className="btn btn-primary">Button</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card custom-card">
            <img
              src="https://images.pexels.com/photos/610294/pexels-photo-610294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top custom-card-img"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button className="btn btn-primary">Button</button>
            </div>
          </div>
        </div>
      </div>
      <h5 className="mt-4">Cards Content Types</h5>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card custom-card">
            <img
              src="https://images.pexels.com/photos/7621340/pexels-photo-7621340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top custom-card-img"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button className="btn btn-primary">Button</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card custom-card">
            <img
              src="https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top custom-card-img"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button className="btn btn-primary">Button</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card custom-card">
            <img
              src="https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top custom-card-img"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button className="btn btn-primary">Button</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardList;
