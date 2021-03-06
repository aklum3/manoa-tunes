import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';
import { Jams } from '../../api/jams/Jams';
import YourCard from '../components/YourCard';
import { ProfilesInstruments } from '../../api/profiles/ProfilesInstruments';
import { Notes } from '../../api/note/Notes';

/** Returns the Profile and associated jams and Interests associated with the passed user email. */
function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const instruments = _.pluck(ProfilesInstruments.collection.find({ profile: email }).fetch(), 'instrument');
  const jams = _.pluck(ProfilesJams.collection.find({ profile: email }).fetch(), 'jam');
  // console.log(_.extend({ }, data, { interests, jams: jamPictures }));
  return _.extend({}, data, { interests, instruments, jams });
}

/** Renders the Profile Collection as a set of Cards. */
class YourProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const profileData = [getProfileData(Meteor.user().username)];
    return (
        <div className="bg-image2">
          <Container id="yourProfile-page">
            <Card.Group itemsPerRow={1}>
              {_.map(profileData, (profile, index) => <YourCard key={index} profile={profile} notes={this.props.notes.filter(note => (note.contactId === profile._id))}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

YourProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
  notes: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesInstruments.userPublicationName);
  const sub4 = Meteor.subscribe(ProfilesJams.userPublicationName);
  const sub5 = Meteor.subscribe(Jams.userPublicationName);
  const sub6 = Meteor.subscribe(Notes.userPublicationName);
  return {
    notes: Notes.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready(),
  };
})(YourProfile);
