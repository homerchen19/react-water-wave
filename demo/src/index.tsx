import { render } from 'react-dom';
import GithubCorner from 'react-github-corner';
import GradientButton from 'react-linear-gradient-button';
import './index.css';
import WaterWave from '../../src';
import image from './assets/demo.jpg';

function Demo() {
  return (
    <WaterWave
      imageUrl={image as string}
      style={{ width: '100%', height: '100%', backgroundSize: 'cover' }}
    >
      {({ pause, play }) => (
        <div className="container">
          <GithubCorner href="https://github.com/homerchen19/react-water-wave" />
          <h1>React Water Wave</h1>
          <GradientButton className="button" onClick={pause} theme="Royal">
            Pause
            <span aria-label="Pause" role="img">
              🙅‍
            </span>
          </GradientButton>
          <GradientButton className="button" onClick={play} theme="Quepal">
            Play{' '}
            <span aria-label="Play" role="img">
              🙆‍
            </span>
          </GradientButton>
          <h3>
            MIT ©{' '}
            <a
              href="https://github.com/homerchen19"
              rel="noopener noreferrer"
              target="_blank"
            >
              homerchen19
            </a>
          </h3>
        </div>
      )}
    </WaterWave>
  );
}

render(<Demo />, document.querySelector('#demo'));
