import React from 'react';

const ErrorPage = () => {
    return (
        <div className="container mt-5 text-center">
            <h1 className="display-4">Oops!</h1>
            <p className="lead">No such category exists.</p>
            <p>Please go back and try again.</p>
        </div>
    );
};

export default ErrorPage;
