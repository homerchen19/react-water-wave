import * as React from 'react';
import cleanProps from 'clean-react-props';
import * as $ from 'jquery';
import 'jquery.ripples';

export interface RipplesOptions {
  imageUrl?: string;
  dropRadius?: number;
  perturbance?: number;
  resolution?: number;
  interactive?: boolean;
  crossOrigin?: string;
}

export type SetProperties =
  | 'dropRadius'
  | 'perturbance'
  | 'interactive'
  | 'imageUrl'
  | 'crossOrigin';

export type Drop = {
  x: number;
  y: number;
  radius: number;
  strength: number;
};

export type Set = {
  property: SetProperties;
  value: any;
};

export interface Props extends RipplesOptions {
  children: (props: {
    destroy: () => void;
    pause: () => void;
    play: () => void;
    hide: () => void;
    show: () => void;
    drop: ({ x, y, radius, strength }: Drop) => void;
    set: ({ property, value }: Set) => void;
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

    return () => {
      target.current.ripples('destroy');
    };
  }, [
    crossOrigin,
    dropRadius,
    imageUrl,
    interactive,
    perturbance,
    resolution,
    rippleRef,
  ]);

  const destroy = () => {
    target.current.ripples('destroy');
  };

  const drop = ({ x, y, radius, strength }: Drop) => {
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

  const set = ({ property, value }: Set) => {
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
