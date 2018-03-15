import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { show } from './actions';
import Player from '../Player/Player';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      currentTrack: null
    };
  }

  componentDidMount() {
    const { artistName, albumName } = this.props.route;
    this.props.show({ artistName, albumName });
  }

  trackClicked(track) {
    this.setState({ currentTrack: track.location });
  }

  render() {
    return (
      <div>
        <h1>{this.props.route.albumName}</h1>
        {this.props.isLoading ? (
          <div>Loading album tracks...</div>
        ) : this.props.tracks.length ? (
          <div>
            {this.props.tracks.map(t => (
              <div key={t.name} onClick={this.trackClicked.bind(this, t)}>
                {t.name}
              </div>
            ))}
            <div>
              <Player
                src={
                  this.state.currentTrack
                    ? `${this.props.spaHost}/tracks/${this.state.currentTrack}`
                    : null
                }
              />
            </div>
          </div>
        ) : (
          <div>No tracks found.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ albums, config }) => ({
  isLoading: albums.isLoading,
  tracks: albums.tracks,
  spaHost: config.spaHost
});

export default connect(mapStateToProps, { show })(Album);
