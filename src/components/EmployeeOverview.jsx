import React, { Component } from 'react';
import PropTypes from 'prop-types'

class EmployeeRole extends Component {
    state = {}
    render() {
        const { name, id, role } = this.props;
        return (
            <div>
                <h2 id={id}>{name}</h2>
                <h4 style={{ color: "gray" }}>{role}</h4>
            </div>
        );
    }
}

EmployeeRole.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
}

EmployeeRole.defaultProps = {

}



export default EmployeeRole;