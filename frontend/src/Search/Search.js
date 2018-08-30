import { h, Component } from 'preact';
import debounce from 'lodash.debounce';
import css from './Search.css';

const inputDelay = 500;

class Search extends Component {
  constructor() {
    super();
    this.state = { query: null };
    this.inputChanged = debounce(this.inputChanged.bind(this), inputDelay);
  }

  inputChanged(e) {
    e.preventDefault();
    this.setState({ query: e.target.value }, () => {
      this.props.action(this.state.query);
    });
  }

  render() {
    return (
      <div>
        <div class={css.container}>
          <div class={css.searchBox}>
            <input
              type="text"
              class={css.searchInput}
              placeholder="Search Artists"
              onInput={this.inputChanged}
              value={this.state.query}
            />
            <i class="fa fa-search" />
          </div>
        </div>
      </div>
    );
  }
}

Search.defaultProps = {
  action: () => {}
};

export default Search;
