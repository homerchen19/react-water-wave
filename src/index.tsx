import { useEffect, useRef } from 'react';
import * as $ from 'jquery';
import type { ReactNode, RefObject } from 'react';
import 'jquery.ripples';

export interface RipplesOptions {
  imageUrl: string;
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

export type Drop = ({
  x,
  y,
  radius,
  strength,
}: {
  x: number;
  y: number;
  radius: number;
  strength: number;
}) => void;

export type Set = ({
  property,
  value,
}: {
  property: SetProperties;
  value: any;
}) => void;

export interface WaterEffectProps extends RipplesOptions {
  children: (props: {
    destroy: () => void;
    pause: () => void;
    play: () => void;
    hide: () => void;
    show: () => void;
    drop: Drop;
    set: Set;
    updateSize: () => void;
  }) => ReactNode;
}

export type RipplesArgument =
  | 'destroy'
  | 'drop'
  | 'pause'
  | 'play'
  | 'hide'
  | 'show'
  | 'set'
  | 'updateSize'
  | RipplesOptions;

export const useRipples = ({
  imageUrl,
  dropRadius,
  perturbance,
  resolution,
  interactive,
  crossOrigin,
  rippleRef,
}: RipplesOptions & {
  rippleRef: RefObject<HTMLDivElement>;
}) => {
  const target = useRef({
    ripples: (_arg: RipplesArgument, ..._args: any[]) => {},
  });

  useEffect(() => {
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

  const drop: Drop = ({ x, y, radius, strength }) => {
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

  const set: Set = ({ property, value }) => {
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

function WaterEffect({
  imageUrl = '',
  dropRadius = 20,
  perturbance = 0.03,
  resolution = 256,
  interactive = true,
  crossOrigin = '',
  children,
  ...otherProps
}: WaterEffectProps) {
  const rippleRef = useRef<HTMLDivElement>(null);
  const { destroy, pause, play, hide, show, drop, set, updateSize } =
    useRipples({
      imageUrl,
      dropRadius,
      perturbance,
      resolution,
      interactive,
      crossOrigin,
      rippleRef,
    });

  return (
    <div ref={rippleRef} {...otherProps}>
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
}

export default WaterEffect;
