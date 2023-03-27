import React from 'react';
import PropTypes from 'prop-types';

import 'components/Application.scss';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.configuration();
  }

  render() {
    return <div className="starter">js starter...</div>;
  }
}

Application.propTypes = {
  configuration: PropTypes.func.isRequired,
};
