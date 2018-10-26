import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cleanProps from 'clean-react-props';
import $ from 'jquery';
import 'jquery.ripples';

const WaterEffect = props => {
  const rippleRef = useRef();
  const target = useRef({ ripples: () => {} });

  useEffect(() => {
    const {
      imageUrl,
      dropRadius,
      perturbance,
      resolution,
      interactive,
      crossOrigin,
    } = props;
    target.current = $(rippleRef.current);

    target.current.ripples({
      imageUrl,
      dropRadius,
      perturbance,
      resolution,
      interactive,
      crossOrigin,
    });

    return () => target.current.ripples('destroy');
  }, []);

  const destroy = target.current.ripples('destroy');

  const drop = (
    {
      x = undefined,
      y = undefined,
      radius = undefined,
      strength = undefined,
    } = {
      x: undefined,
      y: undefined,
      radius: undefined,
      strength: undefined,
    }
  ) => {
    target.current.ripples('drop', x, y, radius, strength);
  };

  const pause = () => {
    target.current.ripples('pause');
  };

  const play = () => {
    target.current.ripples('play');
  };

  const hide = () => {
    target.current.ripples('hide');
  };

  const show = () => {
    target.current.ripples('show');
  };

  const set = (
    { property = undefined, value = undefined } = {
      property: undefined,
      value: undefined,
    }
  ) => {
    target.current.ripples('set', property, value);
  };

  const updateSize = () => {
    target.current.ripples('updateSize');
  };

  const { children } = props;
  return (
    <div ref={rippleRef} {...cleanProps(props)}>
      {children({
        destroy,
        pause,
        play,
        hide,
        show,
        drop,
        set,
        updateSize,
      })}
    </div>
  );
};

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
