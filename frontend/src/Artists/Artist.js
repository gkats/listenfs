import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { show } from './actions';
import Link from '../Link/Link';
import Loader from '../Loader/Loader';
import css from './Artists.css';

class Artist extends Component {
  componentDidMount() {
    this.props.show(this.props.route.name);
  }

  render() {
    return (
      <div class={css.wrapper}>
        <h1 class={css.header}>{this.props.route.name}</h1>
        <div>
          {this.props.isLoading ? (
            <Loader visible={this.props.isLoading} />
          ) : this.props.albums.length ? (
            <div class={css.albumList}>
              {this.props.albums.map(a => (
                <div key={a.name} class={css.albumListItem}>
                  <Link
                    href={`#/albums/${this.props.route.name}/${a.uri}`}
                    relative={true}
                    className={css.albumLink}
                  >
                    <div class={css.albumIcon}>
                      <i class="fas fa-dot-circle" />
                    </div>
                    <div class={css.albumText}>
                      {a.year} &bull; {a.title}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div class={css.noneFound}>No albums found.</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ artists }) => ({
  isLoading: artists.isLoading,
  albums: artists.albums
});

export default connect(mapStateToProps, { show })(Artist);
