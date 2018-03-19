import { h, Component } from 'preact';

class AudioPlayer extends Component {
  constructor() {
    super();
    this.onEnded = this.onEnded.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onMetadataLoaded = this.onMetadataLoaded.bind(this);
  }

  componentDidMount() {
    this.audio = new Audio();
    this.audio.addEventListener('ended', this.onEnded);
    this.audio.addEventListener('timeupdate', this.onTimeUpdate);
    this.audio.addEventListener('loadedmetadata', this.onMetadataLoaded);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.audio.src = nextProps.src;
      this.audio.play();
    }

    if (!this.props.isPlaying && nextProps.isPlaying) {
      this.audio.play();
    }
    if (this.props.isPlaying && !nextProps.isPlaying) {
      this.audio.pause();
    }
    if (this.props.seekTo !== nextProps.seekTo) {
      this.audio.currentTime = nextProps.seekTo * (this.audio.duration || 0);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  onEnded(e) {
    this.props.onEnd();
  }

  onTimeUpdate(e) {
    this.props.onTimeUpdate(e.target.currentTime);
  }

  onMetadataLoaded(e) {
    this.props.onMetadataLoaded({
      duration: e.target.duration
    });
  }

  render() {
    return <div />;
  }
}

AudioPlayer.defaultProps = {
  isPlaying: false,
  src: '',
  onMetadataLoaded: () => {},
  onEnd: () => {},
  onTimeUpdate: () => {}
};

export default AudioPlayer;
