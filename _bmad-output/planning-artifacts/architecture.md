---
stepsCompleted: [auto-generated]
inputDocuments:
  - "prd.md"
  - "ux-design-specification.md"
projectType: 'brownfield'
status: 'complete'
---

# Architecture Document - MARV Redesign

**Auteur:** Icene
**Date:** 2026-01-29
**Version:** 1.0
**Type:** UI/UX Redesign Architecture (Brownfield)

---

## 1. Executive Summary

### 1.1 Architecture Vision

Ce document définit l'architecture technique pour le redesign UI/UX de MARV. L'objectif est de moderniser l'interface utilisateur sans impacter le code métier existant, en utilisant une approche de **refactoring visuel progressif**.

### 1.2 Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| AD1: Design System | Tailwind CSS évolutif | Stack existante, pas de migration |
| AD2: Component Strategy | Modernisation in-place | Préserver les props/API existantes |
| AD3: State Management | Svelte stores (inchangé) | Pas de changement fonctionnel |
| AD4: Animation | CSS + Svelte transitions | Performance native, 60fps |
| AD5: Theming | CSS Custom Properties | Tokens centralisés, runtime theming |

### 1.3 Constraints

- **Pas de changement fonctionnel** — Le code métier reste inchangé
- **Compatibilité API** — Les composants gardent leurs interfaces
- **Performance** — Animations 60fps, feedback < 200ms
- **Accessibilité** — WCAG 2.1 AA compliance

---

## 2. Current Architecture Analysis

### 2.1 Existing Stack

```
┌─────────────────────────────────────────────┐
│                  Electron                    │
├─────────────────────────────────────────────┤
│                   Svelte                     │
│  ┌─────────────────────────────────────┐    │
│  │           Components (30+)           │    │
│  │  ┌─────────┐ ┌─────────┐ ┌────────┐ │    │
│  │  │   UI    │ │ Widgets │ │ Panels │ │    │
│  │  │(15 core)│ │  (11)   │ │  (5)   │ │    │
│  │  └─────────┘ └─────────┘ └────────┘ │    │
│  └─────────────────────────────────────┘    │
├─────────────────────────────────────────────┤
│              Tailwind CSS                    │
│         (tailwind/colors.js)                │
├─────────────────────────────────────────────┤
│                  Vite                        │
└─────────────────────────────────────────────┘
```

### 2.2 Component Inventory

**UI Primitives (15):**
```
front-src/client/components/UI/
├── Button.svelte
├── Checkbox.svelte
├── ConfirmModal.svelte
├── Flexbar.svelte
├── HorizontalScroller.svelte
├── Input.svelte
├── Menu.svelte
├── MenuItem.svelte
├── Modal.svelte
├── Notify.svelte
├── Overlay.svelte
├── Progressbar.svelte
├── Select.svelte
├── Separator.svelte
└── [autres]
```

**Widget Components (11):**
```
front-src/client/components/Widgets/
├── OBS/ (5 widgets)
├── Twitch/ (5 widgets)
└── Anime/ (1 widget)
```

**Layout Components:**
```
front-src/client/components/
├── Dashboard/
│   ├── Topbar.svelte
│   ├── Drawer.svelte
│   ├── DrawerToggle.svelte
│   └── QuitButton.svelte
├── Panels/
│   ├── Panel.svelte
│   ├── Selector.svelte
│   ├── EditMessage.svelte
│   └── Panel/Grid.svelte
└── App/Notify/
    ├── Badge.svelte
    ├── Notice.svelte
    └── Notices.svelte
```

### 2.3 Current Styling

**tailwind/colors.js (actuel):**
```javascript
// Palette existante à moderniser
module.exports = {
  // Dark theme de base
  // Accent indigo
  // États basiques
}
```

---

## 3. Target Architecture

### 3.1 Design System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Design Tokens                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │   Colors    │ │  Typography │ │   Spacing   │       │
│  │ (CSS Vars)  │ │  (Tailwind) │ │ (Tailwind)  │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │  Shadows    │ │ Animations  │ │   Radius    │       │
│  │ (Elevation) │ │ (Keyframes) │ │ (Tailwind)  │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
├─────────────────────────────────────────────────────────┤
│                 Primitive Components                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │GlassCard │ │  Button  │ │  Input   │ │  Modal   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
├─────────────────────────────────────────────────────────┤
│                 Composite Components                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Sidebar  │ │CommandPal│ │WidgetCard│ │  Toast   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
├─────────────────────────────────────────────────────────┤
│                   Page Layouts                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Topbar + Sidebar + Content Area + Notifications │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Design Tokens Specification

**Fichier: `tailwind/design-tokens.js`**

```javascript
module.exports = {
  colors: {
    // Backgrounds
    background: {
      DEFAULT: '#0a0a0b',
      surface: '#141416',
      elevated: '#1c1c1f',
      hover: '#222225',
    },
    // Borders
    border: {
      DEFAULT: '#2a2a2d',
      subtle: '#1f1f22',
      accent: 'rgba(139, 92, 246, 0.5)',
    },
    // Accent (Violet Gradient)
    accent: {
      DEFAULT: '#8b5cf6',
      secondary: '#6366f1',
      hover: '#a78bfa',
      muted: 'rgba(139, 92, 246, 0.1)',
      glow: 'rgba(139, 92, 246, 0.4)',
    },
    // Semantic
    success: '#10b981',
    error: '#f43f5e',
    warning: '#f59e0b',
    info: '#3b82f6',
    // Text
    text: {
      primary: '#fafafa',
      secondary: '#a1a1aa',
      muted: '#71717a',
    },
  },

  boxShadow: {
    'elevation-1': '0 1px 2px rgba(0,0,0,0.3)',
    'elevation-2': '0 4px 6px rgba(0,0,0,0.4)',
    'elevation-3': '0 10px 15px rgba(0,0,0,0.5)',
    'glow-accent': '0 0 20px rgba(139, 92, 246, 0.4)',
    'glow-success': '0 0 20px rgba(16, 185, 129, 0.4)',
    'glow-error': '0 0 20px rgba(244, 63, 94, 0.4)',
  },

  animation: {
    'fade-in': 'fadeIn 200ms ease-out',
    'slide-up': 'slideUp 200ms ease-out',
    'scale-in': 'scaleIn 150ms ease-out',
    'ripple': 'ripple 400ms ease-out',
    'glow-pulse': 'glowPulse 2s ease-in-out infinite',
  },

  backdropBlur: {
    'glass': '12px',
    'glass-heavy': '20px',
  },

  transitionDuration: {
    'fast': '100ms',
    'normal': '200ms',
    'slow': '300ms',
  },

  transitionTimingFunction: {
    'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
}
```

### 3.3 Component Architecture

#### Base Component: GlassCard

```svelte
<!-- GlassCard.svelte -->
<script>
  export let elevation = 1;
  export let blur = true;
  export let glow = false;
  export let hoverable = false;
</script>

<div
  class="glass-card"
  class:glass-card--blur={blur}
  class:glass-card--glow={glow}
  class:glass-card--hoverable={hoverable}
  class:glass-card--elevation-1={elevation === 1}
  class:glass-card--elevation-2={elevation === 2}
  class:glass-card--elevation-3={elevation === 3}
>
  <slot />
</div>

<style>
  .glass-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    transition: all var(--duration-normal) var(--easing-smooth);
  }

  .glass-card--blur {
    backdrop-filter: blur(var(--blur-glass));
    background: rgba(20, 20, 22, 0.8);
  }

  .glass-card--hoverable:hover {
    border-color: var(--color-border-accent);
    box-shadow: var(--shadow-elevation-2);
    transform: translateY(-1px);
  }

  .glass-card--glow {
    box-shadow: var(--shadow-glow-accent);
  }
</style>
```

#### Widget Component Pattern

```svelte
<!-- WidgetCard.svelte -->
<script>
  import GlassCard from './GlassCard.svelte';
  import { createEventDispatcher } from 'svelte';

  export let widget;
  export let disabled = false;

  const dispatch = createEventDispatcher();

  let state = 'idle'; // idle | loading | success | error

  async function handleClick() {
    if (disabled || state === 'loading') return;

    state = 'loading';
    dispatch('click', widget);

    // State will be updated by parent via props or events
  }

  export function setSuccess() {
    state = 'success';
    setTimeout(() => state = 'idle', 1000);
  }

  export function setError() {
    state = 'error';
    setTimeout(() => state = 'idle', 2000);
  }
</script>

<GlassCard
  hoverable={!disabled}
  glow={state === 'success'}
  elevation={state === 'idle' ? 1 : 2}
>
  <button
    class="widget-card"
    class:widget-card--loading={state === 'loading'}
    class:widget-card--success={state === 'success'}
    class:widget-card--error={state === 'error'}
    on:click={handleClick}
    {disabled}
  >
    <slot />
  </button>
</GlassCard>
```

---

## 4. File Structure

### 4.1 New Files to Create

```
front-src/client/
├── styles/
│   ├── tokens.css              # CSS Custom Properties
│   └── animations.css          # Keyframe definitions
│
├── components/
│   ├── Base/                   # NEW: Primitives
│   │   ├── GlassCard.svelte
│   │   ├── Ripple.svelte
│   │   └── Icon.svelte
│   │
│   ├── Feedback/               # NEW: Feedback components
│   │   ├── Toast.svelte
│   │   ├── ToastContainer.svelte
│   │   └── StatusBadge.svelte
│   │
│   ├── Navigation/             # NEW: Navigation components
│   │   ├── Sidebar.svelte
│   │   ├── SidebarItem.svelte
│   │   └── CommandPalette.svelte
│   │
│   └── Widgets/
│       └── WidgetCard.svelte   # NEW: Widget wrapper
│
tailwind/
├── colors.js                   # MODIFY: New palette
├── design-tokens.js            # NEW: Full token system
└── animations.js               # NEW: Animation config
```

### 4.2 Files to Modify

| File | Changes |
|------|---------|
| `tailwind/colors.js` | New color palette |
| `tailwind.config.js` | Import design tokens |
| `UI/Button.svelte` | Add ripple, states, gradient |
| `UI/Input.svelte` | Focus ring, transitions |
| `UI/Modal.svelte` | Glassmorphism, animations |
| `UI/Select.svelte` | Glass dropdown |
| `Dashboard/Topbar.svelte` | Blur background, status |
| `Dashboard/Drawer.svelte` | → Sidebar refactor |
| `Panels/Panel.svelte` | Glass effect, transitions |
| `Panels/Panel/Grid.svelte` | Gap, animations |
| `Widgets/*.svelte` | WidgetCard wrapper |

---

## 5. Implementation Strategy

### 5.1 Migration Approach

**Strategy: Parallel Evolution**

```
Phase 1: Tokens         Phase 2: Primitives      Phase 3: Composite
     │                        │                        │
     ▼                        ▼                        ▼
┌─────────┐             ┌─────────┐             ┌─────────┐
│ colors  │────────────▶│ Button  │────────────▶│ Sidebar │
│ shadows │             │ Input   │             │ Topbar  │
│ anims   │             │ Modal   │             │ Widgets │
└─────────┘             └─────────┘             └─────────┘
     │                        │                        │
     └────────────────────────┴────────────────────────┘
                              │
                              ▼
                    Existing functionality
                        preserved
```

### 5.2 Component Migration Pattern

Pour chaque composant existant :

1. **Analyze** — Identifier props et comportements
2. **Preserve** — Garder l'API publique identique
3. **Enhance** — Ajouter classes et styles
4. **Test** — Vérifier non-régression

**Exemple: Button Migration**

```svelte
<!-- BEFORE -->
<button class="btn {variant}" on:click>
  <slot />
</button>

<!-- AFTER -->
<button
  class="btn btn--{variant} btn--{size}"
  class:btn--loading={loading}
  on:click={handleClick}
>
  {#if loading}
    <Spinner size="sm" />
  {/if}
  <span class="btn__content" class:btn__content--hidden={loading}>
    <slot />
  </span>
  <Ripple />
</button>
```

### 5.3 Backward Compatibility

| Aspect | Strategy |
|--------|----------|
| Props | Maintain all existing props |
| Events | Preserve event signatures |
| Slots | Keep slot structure |
| Classes | Add new classes, don't remove |
| Behavior | No functional changes |

---

## 6. Animation System

### 6.1 Animation Tokens

```css
/* styles/animations.css */

:root {
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;

  --easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
  }
  50% {
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 6.2 Svelte Transitions

```javascript
// lib/transitions.js
import { cubicOut, backOut } from 'svelte/easing';

export function glassIn(node, { duration = 200, delay = 0 }) {
  return {
    duration,
    delay,
    css: (t) => {
      const eased = cubicOut(t);
      return `
        opacity: ${eased};
        transform: scale(${0.95 + 0.05 * eased});
        backdrop-filter: blur(${12 * eased}px);
      `;
    }
  };
}

export function slideUp(node, { duration = 200, delay = 0 }) {
  return {
    duration,
    delay,
    css: (t) => {
      const eased = cubicOut(t);
      return `
        opacity: ${eased};
        transform: translateY(${8 * (1 - eased)}px);
      `;
    }
  };
}
```

---

## 7. Accessibility Architecture

### 7.1 Focus Management

```svelte
<!-- FocusTrap.svelte -->
<script>
  import { onMount } from 'svelte';

  export let active = true;

  let container;

  function handleKeydown(e) {
    if (!active || e.key !== 'Tab') return;

    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
</script>

<div bind:this={container} on:keydown={handleKeydown}>
  <slot />
</div>
```

### 7.2 ARIA Patterns

| Component | ARIA Role | Key Attributes |
|-----------|-----------|----------------|
| Modal | dialog | aria-modal, aria-labelledby |
| Sidebar | navigation | aria-label |
| Toast | alert | aria-live="polite" |
| Widget | button | aria-pressed, aria-disabled |
| Menu | menu | aria-expanded |
| CommandPalette | combobox | aria-autocomplete |

---

## 8. Performance Considerations

### 8.1 Animation Performance

```css
/* Use GPU-accelerated properties only */
.animated-element {
  /* GOOD - GPU accelerated */
  transform: translateX(0);
  opacity: 1;

  /* AVOID - triggers layout */
  /* width, height, top, left, margin, padding */

  /* Enable GPU layer */
  will-change: transform, opacity;
}
```

### 8.2 Component Optimization

```svelte
<script>
  // Use reactive declarations sparingly
  $: expensiveComputation = heavyFunction(data);

  // Prefer event delegation
  function handleClick(e) {
    const widget = e.target.closest('[data-widget-id]');
    if (widget) {
      // Handle click
    }
  }
</script>

<!-- Use keyed each blocks -->
{#each widgets as widget (widget.id)}
  <Widget {widget} />
{/each}
```

### 8.3 CSS Performance

```css
/* Avoid expensive selectors */
.widget-card { } /* Good */
.panel > .grid > .widget-card { } /* Avoid */

/* Use CSS containment */
.widget-grid {
  contain: layout style;
}
```

---

## 9. Testing Strategy

### 9.1 Visual Regression Testing

```javascript
// playwright.config.js
export default {
  testDir: './tests/visual',
  use: {
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium' },
    { name: 'firefox' },
    { name: 'webkit' },
  ],
};
```

### 9.2 Component Testing

```javascript
// Button.test.js
import { render, fireEvent } from '@testing-library/svelte';
import Button from './Button.svelte';

test('shows ripple effect on click', async () => {
  const { container } = render(Button, { props: { label: 'Click' } });
  const button = container.querySelector('button');

  await fireEvent.click(button);

  const ripple = container.querySelector('.ripple');
  expect(ripple).toBeTruthy();
});

test('shows loading state', async () => {
  const { container, component } = render(Button);

  component.$set({ loading: true });

  const spinner = container.querySelector('.spinner');
  expect(spinner).toBeTruthy();
});
```

---

## 10. Rollout Plan

### 10.1 Feature Flags

```javascript
// config/features.js
export const features = {
  newDesignSystem: true,
  glassmorphism: true,
  newSidebar: true,
  commandPalette: true,
  animations: true,
};

// Usage in components
{#if features.glassmorphism}
  <GlassCard>
    <slot />
  </GlassCard>
{:else}
  <div class="card-legacy">
    <slot />
  </div>
{/if}
```

### 10.2 Phased Rollout

| Phase | Components | Duration |
|-------|------------|----------|
| 1 | Design tokens, GlassCard | Week 1 |
| 2 | Button, Input, Select | Week 2 |
| 3 | Modal, Toast, Overlay | Week 3 |
| 4 | Sidebar, Topbar | Week 4 |
| 5 | WidgetCard, Panel | Week 5 |
| 6 | Polish, accessibility | Week 6 |

---

## Appendix A: CSS Custom Properties Reference

```css
:root {
  /* Colors */
  --color-background: #0a0a0b;
  --color-surface: #141416;
  --color-surface-elevated: #1c1c1f;
  --color-surface-hover: #222225;
  --color-border: #2a2a2d;
  --color-border-accent: rgba(139, 92, 246, 0.5);

  --color-accent: #8b5cf6;
  --color-accent-secondary: #6366f1;
  --color-accent-hover: #a78bfa;
  --color-accent-glow: rgba(139, 92, 246, 0.4);

  --color-success: #10b981;
  --color-error: #f43f5e;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;

  --color-text-primary: #fafafa;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #71717a;

  /* Shadows */
  --shadow-elevation-1: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-elevation-2: 0 4px 6px rgba(0,0,0,0.4);
  --shadow-elevation-3: 0 10px 15px rgba(0,0,0,0.5);
  --shadow-glow-accent: 0 0 20px rgba(139, 92, 246, 0.4);

  /* Blur */
  --blur-glass: 12px;
  --blur-glass-heavy: 20px;

  /* Timing */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Layout */
  --topbar-height: 56px;
  --sidebar-width: 240px;
  --sidebar-width-collapsed: 64px;
}
```

---

*Document généré via le workflow BMAD Architecture*
*Status: Complet*
