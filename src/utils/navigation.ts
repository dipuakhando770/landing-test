/**
 * Clean URL Navigation & Smooth Scrolling Helpers (Zero Hash URLs)
 */

export const navigateTo = (path: string) => {
  if (typeof window === 'undefined') return;
  window.history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const scrollToElement = (elementId: string) => {
  if (typeof window === 'undefined') return;
  const cleanId = elementId.replace(/^#/, '');
  const element = document.getElementById(cleanId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    element.classList.add('ring-4', 'ring-emerald-500', 'ring-offset-4', 'transition-all', 'duration-500');
    setTimeout(() => {
      element.classList.remove('ring-4', 'ring-emerald-500', 'ring-offset-4');
    }, 2500);
  }
};

