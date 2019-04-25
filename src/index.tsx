import * as React from 'react';
import * as PropTypes from 'prop-types';
import cleanProps from 'clean-react-props';
import * as $ from 'jquery';
import 'jquery.ripples';

interface RipplesOptions {
  imageUrl?: string;
  dropRadius?: number;
  perturbance?: number;
  resolution?: number;
  interactive?: boolean;
  crossOrigin?: string;
}

interface Props extends RipplesOptions {
  children: (props: {
    destroy: () => void;
    pause: () => void;
    play: () => void;
    hide: () => void;
    show: () => void;
    drop: ({
      x,
      y,
      radius,
      strength,
    }?: {
      x?: undefined;
      y?: undefined;
      radius?: undefined;
      strength?: undefined;
    }) => void;
    set: ({
      property,
      value,
    }?: {
      property?: undefined;
      value?: undefined;
    }) => void;
    updateSize: () => void;
  }) => React.ReactNode;
  [key: string]: any;
}

type ripplesArgument =
  | 'destroy'
  | 'drop'
  | 'pause'
  | 'play'
  | 'hide'
  | 'show'
  | 'set'
  | 'updateSize'
  | RipplesOptions;

const useRipples = ({
  imageUrl,
  dropRadius,
  perturbance,
  resolution,
  interactive,
  crossOrigin,
  rippleRef,
}: RipplesOptions & {
  rippleRef: React.RefObject<HTMLDivElement>;
}) => {
  const target = React.useRef({
    ripples: (_arg: ripplesArgument, ..._args: any[]) => {},
  });

  React.useEffect(() => {
    target.current = $(rippleRef.current as any) as any;

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

  const destroy = () => {
    target.current.ripples('destroy');
  };

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

  return {
    destroy,
    pause,
    play,
    hide,
    show,
    drop,
    set,
    updateSize,
  };
};

const WaterEffect = ({
  imageUrl,
  dropRadius,
  perturbance,
  resolution,
  interactive,
  crossOrigin,
  children,
  ...otherProps
}: Props) => {
  const rippleRef = React.useRef<HTMLDivElement>(null);
  const {
    destroy,
    pause,
    play,
    hide,
    show,
    drop,
    set,
    updateSize,
  } = useRipples({
    imageUrl,
    dropRadius,
    perturbance,
    resolution,
    interactive,
    crossOrigin,
    rippleRef,
  });

  return (
    <div ref={rippleRef} {...cleanProps(otherProps)}>
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
  imageUrl: '',
  dropRadius: 20,
  perturbance: 0.03,
  resolution: 256,
  interactive: true,
  crossOrigin: '',
  children: () => {},
};

export default WaterEffect;
