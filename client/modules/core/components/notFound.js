import React from 'react';

class NotFound extends React.Component {
  render() {

    return (
      <div>
        <div className="container pos-vertical-center">
          <div className="row">
            <div className="col-sm-12 text-center">
              <i className="icon icon--lg icon-Compass-4"></i>
              <h1>Error 404 - Page Not Found</h1>
              <p>
                The page you were looking for wasn't found, if you think this might be a mistake
                <a href="#">drop us a line</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default NotFound;
