import React from 'react'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    console.log(err);
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
      <p>
        <h2>Error </h2>
        <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode}  occurred on server`
          : 'An error occurred on client'}
        </p>
      </p>
    )
  }
}
