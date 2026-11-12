export function animateChange(node) {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) node.animate?.([{ opacity: .3, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'ease-out' });
}

export function initAnimations(root = document) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  const targets = [...root.querySelectorAll('[data-reveal],[data-enter]')];
  function configure() {
    if (motion.matches) for (const animation of root.getAnimations()) animation.cancel();
    observer?.disconnect();
    for (const target of targets) target.classList.remove('reveal-pending');
    if (motion.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -16px 0px' });
    for (const target of targets) {
      // Already-visible content stays readable if setup or a later module fails.
      if (target.getBoundingClientRect().top > innerHeight) target.classList.add('reveal-pending');
      observer.observe(target);
    }
  }
  configure();
  motion.addEventListener('change', configure);
}
