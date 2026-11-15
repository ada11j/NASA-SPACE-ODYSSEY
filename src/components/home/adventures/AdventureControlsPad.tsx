import { useEffect } from 'react';

export interface DriveInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

const ZERO_INPUT: DriveInput = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

interface AdventureControlsPadProps {
  onInputChange: (updater: (prev: DriveInput) => DriveInput) => void;
  ariaLabel: string;
}

/**
 * Shared touch D-pad and keyboard (WASD / Arrow keys) controller
 * for the 3D rover driving adventures (Sojourner, Opportunity, Apollo LRV).
 * Resets held inputs on window blur so keys never stick.
 */
export function AdventureControlsPad({
  onInputChange,
  ariaLabel,
}: AdventureControlsPadProps) {
  useEffect(() => {
    const handleKey = (isDown: boolean) => (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (
        key === 'arrowup' ||
        key === 'arrowdown' ||
        key === 'arrowleft' ||
        key === 'arrowright'
      ) {
        if (document.activeElement?.closest('.adventure-stage')) {
          e.preventDefault();
        }
      }

      if (key === 'w' || key === 'arrowup') {
        onInputChange((prev) => ({ ...prev, forward: isDown }));
      } else if (key === 's' || key === 'arrowdown') {
        onInputChange((prev) => ({ ...prev, backward: isDown }));
      } else if (key === 'a' || key === 'arrowleft') {
        onInputChange((prev) => ({ ...prev, left: isDown }));
      } else if (key === 'd' || key === 'arrowright') {
        onInputChange((prev) => ({ ...prev, right: isDown }));
      }
    };

    const handleBlur = () => {
      onInputChange(() => ({ ...ZERO_INPUT }));
    };

    const onKeyDown = handleKey(true);
    const onKeyUp = handleKey(false);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [onInputChange]);

  const bindBtn = (dir: keyof DriveInput) => ({
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.focus();
      onInputChange((prev) => ({ ...prev, [dir]: true }));
    },
    onPointerUp: () => onInputChange((prev) => ({ ...prev, [dir]: false })),
    onPointerLeave: () => onInputChange((prev) => ({ ...prev, [dir]: false })),
    onPointerCancel: () => onInputChange((prev) => ({ ...prev, [dir]: false })),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });

  return (
    <div className="adventure-dpad" role="group" aria-label={ariaLabel}>
      <div className="adventure-dpad__row">
        <button
          type="button"
          className="adventure-dpad__btn"
          aria-label="Forward"
          {...bindBtn('forward')}
        >
          ▲
        </button>
      </div>
      <div className="adventure-dpad__row">
        <button
          type="button"
          className="adventure-dpad__btn"
          aria-label="Turn Left"
          {...bindBtn('left')}
        >
          ◀
        </button>
        <button
          type="button"
          className="adventure-dpad__btn"
          aria-label="Backward"
          {...bindBtn('backward')}
        >
          ▼
        </button>
        <button
          type="button"
          className="adventure-dpad__btn"
          aria-label="Turn Right"
          {...bindBtn('right')}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
