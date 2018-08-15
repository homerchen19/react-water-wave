import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cleanProps from 'clean-react-props';
import $ from 'jquery';
import 'jquery.ripples';

class WaterEffect extends Component {
  componentDidMount() {
    const {
      imageUrl,
      dropRadius,
      perturbance,
      resolution,
      interactive,
      crossOrigin,
    } = this.props;
    this.target = $(this.el);

    this.target.ripples({
      imageUrl,
      dropRadius,
      perturbance,
      resolution,
      interactive,
      crossOrigin,
    });
  }

  componentWillUnmount() {
    this.target.ripples('destroy');
  }

  destroy = () => {
    this.target.ripples('destroy');
  };

  drop = ({ x, y, radius, strength }) => {
    this.target.ripples('drop', x, y, radius, strength);
  };

  pause = () => {
    this.target.ripples('pause');
  };

  play = () => {
    this.target.ripples('play');
  };

  set = ({ property, value }) => {
    this.target.ripples('set', property, value);
  };

  updateSize = () => {
    this.target.ripples('updateSize');
  };

  render() {
    const { children } = this.props;

    return (
      <div
        ref={el => {
          this.el = el;
        }}
        {...cleanProps(this.props)}
      >
        {children({
          destroy: this.destroy,
          pause: this.pause,
          play: this.play,
          drop: this.drop,
          set: this.set,
          updateSize: this.updateSize,
        })}
      </div>
    );
  }
}

WaterEffect.propTypes = {
  imageUrl: PropTypes.string,
  dropRadius: PropTypes.number,
  perturbance: PropTypes.number,
  resolution: PropTypes.number,
  interactive: PropTypes.bool,
  crossOrigin: PropTypes.string,
  children: PropTypes.func,
};

WaterEffect.defaultProps = {
  imageUrl: null,
  dropRadius: 20,
  perturbance: 0.03,
  resolution: 256,
  interactive: true,
  crossOrigin: '',
  children: () => {},
};

export default WaterEffect;
