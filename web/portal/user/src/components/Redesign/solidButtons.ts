/**
 * ivoz-ui's SolidButton and LightButton render identical markup (same MUI
 * classes, a generated emotion class each), and SolidButton writes its text
 * in var(--color-button), which is a dark surface in dark mode.
 *
 * To restyle primary buttons, tag every button whose background is its own
 * --color (that is SolidButton) with .rd-solid, and style that class in
 * redesign.css. Each button is checked once, when it is first shown enabled.
 * redesign.css styles the other buttons only once they carry
 * data-rd-checked, so its own rules never hide a SolidButton from this
 * check.
 *
 * This goes away once the ivoz-ui fork gives SolidButton its own class.
 */
const SELECTOR = '.MuiButton-root:not([data-rd-checked])';

let probe: HTMLSpanElement | null = null;

function normalise(color: string): string {
  if (!probe) {
    probe = document.createElement('span');
    probe.style.display = 'none';
    document.body.appendChild(probe);
  }
  probe.style.color = '';
  probe.style.color = color;

  return getComputedStyle(probe).color;
}

function check(button: HTMLElement): void {
  // A disabled button shows the disabled colours: check it once enabled.
  if (button.classList.contains('Mui-disabled')) {
    return;
  }
  button.setAttribute('data-rd-checked', '');

  const style = getComputedStyle(button);
  const own = style.getPropertyValue('--color').trim();
  if (!own) {
    return;
  }
  const background = style.backgroundColor;
  if (background && background === normalise(own)) {
    button.classList.add('rd-solid');
  }
}

function scan(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>(SELECTOR).forEach(check);
}

export function tagSolidButtons(): void {
  let pending = false;

  const run = () => {
    pending = false;
    scan(document);
  };

  // Batch checks into one frame: a list page adds many buttons at once.
  const observer = new MutationObserver(() => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(run);
    }
  });

  const start = () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
    run();
  };

  if (document.body) {
    start();
  } else {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  }
}
