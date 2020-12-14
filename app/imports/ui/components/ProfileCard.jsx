import React from 'react';
import { Card, Image, Label, Header, Feed, Dropdown, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import AddNote from './AddNote';
import Note from './Note';

class ProfileCard extends React.Component {

  render() {
    /** Component for layout out a Profile Card. */
    const whiteText = { color: 'white' };

    return (
        <Card>
          <Card.Content className="card-bg">
            <Image floated='right' size='mini' src={this.props.profile.picture}/>
            <Card.Header style={whiteText}>{this.props.profile.name}</Card.Header>
            <Card.Meta style={whiteText}>
              <span className='date'>{this.props.profile.email}</span>
            </Card.Meta>
            <Card.Description style={whiteText}>
              {this.props.profile.bio}
            </Card.Description>
          </Card.Content>
          <Card.Content extra className="card-bg">
            <Header as='h5' style={whiteText} className="card-header">Interests</Header>
            {_.map(this.props.profile.interests,
                (interest, index) => <Label key={index} size='tiny' color='black'>{interest}</Label>)}
          </Card.Content>
          <Card.Content extra className="card-bg">
            <Header as='h5' className="card-header" style={whiteText}>Instruments</Header>
            {_.map(this.props.profile.instruments,
                (instrument, index) => <Label key={index} size='tiny' color='black'>{instrument}</Label>)}
          </Card.Content>
          <Card.Content extra className="card-bg">
            <Header as='h5' className="card-header" style={whiteText}>Jams</Header>
            {_.map(this.props.profile.jams,
                (jam, index) => <Label key={index} size='tiny' color='green'>{jam}</Label>)}
          </Card.Content>
          <Dropdown text='Reviews' className="comment-bg white">
            <Dropdown.Menu>
              <Modal trigger={<Dropdown.Item>Open Reviews</Dropdown.Item>}>
                <Modal.Content extra className="comment-bg">
                <Header as='h1' className="card-header" style={whiteText}>Reviews</Header>
                <Feed>
                  {_.map(this.props.notes, (note, index) => <Note key={index} note={note}/>)}
                </Feed>
              </Modal.Content>
                <Modal.Content extra className="comment-bg">
                  <AddNote owner={this.props.profile.name} contactId={this.props.profile._id} user={Meteor.user().username} />
                </Modal.Content>
              </Modal>
            </Dropdown.Menu>
          </Dropdown>

        </Card>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

export default withRouter(ProfileCard);
