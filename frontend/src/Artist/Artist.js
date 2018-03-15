import { h, Component } from 'preact';

class Artist extends Component {
  render({ route }) {
    return <div>Artist page for {route.name}</div>;
  }
}

export default Artist;
