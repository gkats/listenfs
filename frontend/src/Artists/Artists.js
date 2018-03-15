import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { index } from './actions';

class Artists extends Component {
  componentDidMount() {
    this.props.index();
  }

  render() {
    return (
      <div>
        {this.props.artists.map(a => <div>{a}</div>)}
      </div>
    );
  }
};

const mapStateToProps = ({ artists }) => ({
  isLoading: artists.isLoading,
  artists: artists.artists
});

export default connect(mapStateToProps, { index })(Artists);