import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { removeUser } from '../../reducers/users';

import User from './User';


class UserCard extends Component {

  constructor(props) {
    super(props);
    this.removeUserCallback = this.removeUserCallback.bind(this);
    console.log('usercard props', this.props.user)
  }

  render() {
    const { user, currentUser } = this.props;
    const authorized = currentUser && (currentUser.isAdmin || currentUser.id === user.id);
    return (
      <div className="list-group-item min-content user-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            {/* <img className="media-object img-circle" src={user.photo} /> */}
          </div>
          <Link
            className="media-body"
            activeClassName="active"
            to={`/users/${user.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="John Doe">{user.name}</span>
            </h4>
            <h5 className="tucked">
              <span>{user.email}</span>
            </h5>
          </Link>
          <div className="media-right media-middle">
            {
              authorized ?
              <button
                  className="btn btn-default"
                  onClick={this.removeUserCallback}>
                <span className="glyphicon glyphicon-remove" />
              </button>
              : null
            }
          </div>
        </div>
      </div>
    )
  }

  removeUserCallback (event) {
    const { removeUser, user } = this.props;
    event.stopPropagation();
    removeUser(user.id);
  }
}

const mapState = ({ currentUser }) => ({ currentUser });

const mapDispatch = { removeUser };

export default connect(mapState, mapDispatch)(UserCard);
