import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const CURRENT_TIME = 'videoplayer-current-time';

const refs = {
  iframe: document.querySelector('#vimeo-player'),
};

const player = new Player(refs.iframe);

const onPlay = function (data) {
  const frames = data.seconds;
  localStorage.setItem(CURRENT_TIME, frames);
  // console.log(frames);
};

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(0.0 + localStorage.getItem(CURRENT_TIME)).then(function (seconds) {
  seconds = localStorage.getItem(CURRENT_TIME);
});
