'use client';

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { motion, AnimatePresence, Transition, VariantLabels, Target, TargetAndTransition } from 'framer-motion';

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

const MotionSpan = motion.span as any;

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<'span'>,
    'children' | 'transition' | 'initial' | 'animate' | 'exit'
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | TargetAndTransition;
  exit?: Target | VariantLabels;
  animatePresenceMode?: 'sync' | 'wait' | 'popLayout';
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

export const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: 'spring', damping: 25, stiffness: 300 },
      initial = { y: '100%', opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: '-120%', opacity: 0 },
      animatePresenceMode = 'popLayout',
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = 'first',
      loop = true,
      auto = true,
      splitBy = 'characters',
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const next = useCallback(() => {
      setCurrentTextIndex((prev) => {
        if (prev === texts.length - 1) {
          return loop ? 0 : prev;
        }
        return prev + 1;
      });
    }, [texts.length, loop]);

    const previous = useCallback(() => {
      setCurrentTextIndex((prev) => {
        if (prev === 0) {
          return loop ? texts.length - 1 : prev;
        }
        return prev - 1;
      });
    }, [texts.length, loop]);

    const jumpTo = useCallback((index: number) => {
      if (index >= 0 && index < texts.length) {
        setCurrentTextIndex(index);
      }
    }, [texts.length]);

    const reset = useCallback(() => {
      setCurrentTextIndex(0);
    }, []);

    useImperativeHandle(ref, () => ({
      next,
      previous,
      jumpTo,
      reset
    }), [next, previous, jumpTo, reset]);

    useEffect(() => {
      if (onNext) {
        onNext(currentTextIndex);
      }
    }, [currentTextIndex, onNext]);

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [auto, rotationInterval, next]);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
        const segmenter = new (Intl as any).Segmenter('en', { granularity: 'grapheme' });
        return Array.from(segmenter.segment(text), (s: any) => s.segment);
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const text = texts[currentTextIndex];
      if (!text) return [];
      if (splitBy === 'characters') {
        return splitIntoCharacters(text);
      }
      if (splitBy === 'words') {
        return text.split(' ');
      }
      if (splitBy === 'lines') {
        return text.split('\n');
      }
      if (splitBy === '') {
        return [text];
      }
      return text.split(splitBy);
    }, [texts, currentTextIndex, splitBy]);

    const calculateDelay = (index: number, total: number) => {
      if (staggerDuration === 0) return 0;
      switch (staggerFrom) {
        case 'first':
          return index * staggerDuration;
        case 'last':
          return (total - 1 - index) * staggerDuration;
        case 'center': {
          const center = (total - 1) / 2;
          return Math.abs(center - index) * staggerDuration;
        }
        case 'random':
          return Math.random() * total * staggerDuration;
        default:
          if (typeof staggerFrom === 'number') {
            return Math.abs(staggerFrom - index) * staggerDuration;
          }
          return index * staggerDuration;
      }
    };

    return (
      <span
        className={cn('relative inline-flex flex-wrap', mainClassName)}
        {...rest}
      >
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <MotionSpan
            key={currentTextIndex}
            className="flex flex-wrap"
            layout
          >
            {elements.map((el, i) => (
              <span
                key={i}
                className={cn('inline-block overflow-hidden', splitLevelClassName)}
              >
                <MotionSpan
                  className={cn('inline-block', elementLevelClassName)}
                  initial={initial}
                  animate={animate}
                  exit={exit}
                  transition={{
                    ...transition,
                    delay: calculateDelay(i, elements.length)
                  }}
                >
                  {el === ' ' ? '\u00A0' : el}
                </MotionSpan>
              </span>
            ))}
          </MotionSpan>
        </AnimatePresence>
      </span>
    );
  }
);

RotatingText.displayName = 'RotatingText';
export default RotatingText;
