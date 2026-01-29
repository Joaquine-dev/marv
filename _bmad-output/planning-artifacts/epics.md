---
stepsCompleted: [auto-generated]
inputDocuments:
  - "prd.md"
  - "architecture.md"
  - "ux-design-specification.md"
projectType: 'brownfield'
status: 'complete'
totalEpics: 5
totalStories: 23
---

# Epics & Stories - MARV Redesign

**Auteur:** Icene
**Date:** 2026-01-29
**Version:** 1.0

---

## Requirements Coverage

### Functional Requirements Mapping

| FR | Description | Epic | Stories |
|----|-------------|------|---------|
| FR1 | Dashboard Principal | Epic 2, 4 | 2.1, 4.1-4.3 |
| FR2 | Système de Panels | Epic 3 | 3.1-3.4 |
| FR3 | Widgets OBS | Epic 4 | 4.1-4.3 |
| FR4 | Widgets Twitch | Epic 4 | 4.1-4.3 |
| FR5 | Widget Animation | Epic 4 | 4.3 |
| FR6 | Gestion de Fichiers | Epic 4 | 4.3 |
| FR7 | Connexion OBS | Epic 3 | 3.5 |
| FR8 | Édition de Widgets | Epic 4 | 4.4 |
| FR9 | Command Palette | Epic 3 | 3.3 |
| FR10 | Sidebar Navigation | Epic 3 | 3.1, 3.2 |
| FR11 | Toast Notifications | Epic 2 | 2.5 |
| FR12 | Widget Catalogue | Epic 4 | 4.5 |
| FR13 | Inline Editing | Epic 3 | 3.4 |

### Non-Functional Requirements Mapping

| NFR | Description | Epic | Addressed |
|-----|-------------|------|-----------|
| NFR1-5 | Performance | Epic 5 | 5.2 |
| NFR6-10 | Accessibility | Epic 5 | 5.1 |
| NFR11-15 | Compatibility | Epic 5 | 5.3 |

---

## Epic 1: Design System Foundation

**Priority:** P0 - Critical Path
**Estimated Stories:** 4
**Dependencies:** None

### Overview

Établir les fondations du nouveau design system : tokens, variables CSS, et composant GlassCard de base qui servira de building block pour tous les autres composants.

---

### Story 1.1: Design Tokens Implementation

**Priority:** P0
**Estimate:** 3 points
**Dependencies:** None

#### Description

En tant que développeur, je veux un système de design tokens centralisé afin que tous les composants utilisent des valeurs cohérentes pour les couleurs, espacements, et animations.

#### Acceptance Criteria

- [ ] Fichier `tailwind/design-tokens.js` créé avec toutes les valeurs
- [ ] Fichier `styles/tokens.css` avec CSS Custom Properties
- [ ] `tailwind.config.js` mis à jour pour importer les tokens
- [ ] Palette de couleurs "Modern Glass" implémentée
- [ ] Système d'élévation (shadows) défini
- [ ] Tokens d'animation définis (durées, easings)
- [ ] Documentation inline des tokens

#### Technical Notes

```javascript
// tailwind/design-tokens.js
module.exports = {
  colors: {
    background: { DEFAULT: '#0a0a0b', surface: '#141416', elevated: '#1c1c1f' },
    accent: { DEFAULT: '#8b5cf6', secondary: '#6366f1', glow: 'rgba(139,92,246,0.4)' },
    // ... voir Architecture doc
  }
}
```

#### Tasks

- [ ] Créer `tailwind/design-tokens.js`
- [ ] Créer `styles/tokens.css`
- [ ] Mettre à jour `tailwind.config.js`
- [ ] Mettre à jour `tailwind/colors.js` (migration)
- [ ] Vérifier build Tailwind sans erreurs

---

### Story 1.2: Animation System Setup

**Priority:** P0
**Estimate:** 2 points
**Dependencies:** 1.1

#### Description

En tant que développeur, je veux un système d'animations réutilisables afin d'avoir des micro-interactions cohérentes dans toute l'application.

#### Acceptance Criteria

- [ ] Fichier `styles/animations.css` avec keyframes
- [ ] Animations: fadeIn, slideUp, scaleIn, ripple, glowPulse
- [ ] Support `prefers-reduced-motion`
- [ ] Fichier `lib/transitions.js` avec Svelte transitions
- [ ] Transitions: glassIn, slideUp, fadeScale

#### Technical Notes

```css
@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

#### Tasks

- [ ] Créer `styles/animations.css`
- [ ] Créer `lib/transitions.js`
- [ ] Tester reduced motion
- [ ] Importer dans app principale

---

### Story 1.3: GlassCard Base Component

**Priority:** P0
**Estimate:** 3 points
**Dependencies:** 1.1, 1.2

#### Description

En tant que développeur, je veux un composant GlassCard réutilisable afin d'avoir une base cohérente pour tous les containers avec effet glassmorphism.

#### Acceptance Criteria

- [ ] Composant `Base/GlassCard.svelte` créé
- [ ] Props: elevation (1-3), blur (boolean), glow (boolean), hoverable (boolean)
- [ ] Effet glassmorphism avec backdrop-filter
- [ ] États hover avec transition fluide
- [ ] Glow effect optionnel
- [ ] Slot pour contenu
- [ ] Accessible (pas de problème de contraste)

#### Technical Notes

```svelte
<GlassCard elevation={2} hoverable glow={isActive}>
  <slot />
</GlassCard>
```

#### Tasks

- [ ] Créer dossier `components/Base/`
- [ ] Implémenter `GlassCard.svelte`
- [ ] Ajouter styles avec CSS Custom Properties
- [ ] Tester dans Storybook ou page de test
- [ ] Documenter les props

---

### Story 1.4: Ripple Effect Component

**Priority:** P1
**Estimate:** 2 points
**Dependencies:** 1.2

#### Description

En tant que utilisateur, je veux un effet ripple sur les éléments cliquables afin d'avoir un feedback tactile satisfaisant.

#### Acceptance Criteria

- [ ] Composant `Base/Ripple.svelte` créé
- [ ] Ripple se déclenche au clic
- [ ] Position du ripple = position du clic
- [ ] Animation fluide < 400ms
- [ ] Nettoyage automatique après animation
- [ ] Respecte reduced-motion

#### Tasks

- [ ] Implémenter `Ripple.svelte`
- [ ] Action Svelte `use:ripple` optionnelle
- [ ] Tester performance (pas de memory leak)

---

## Epic 2: Core UI Components Modernization

**Priority:** P0 - Critical Path
**Estimated Stories:** 5
**Dependencies:** Epic 1

### Overview

Moderniser les 15 composants UI primitifs existants avec le nouveau design system tout en préservant leur API publique.

---

### Story 2.1: Button Component Redesign

**Priority:** P0
**Estimate:** 3 points
**Dependencies:** 1.3, 1.4

#### Description

En tant que utilisateur, je veux des boutons modernes avec feedback visuel riche afin d'avoir une expérience satisfaisante à chaque clic.

#### Acceptance Criteria

- [ ] `UI/Button.svelte` modernisé
- [ ] Variants: primary (gradient), secondary (border), ghost (text)
- [ ] Sizes: sm, md, lg
- [ ] États: default, hover, active, disabled, loading
- [ ] Ripple effect intégré
- [ ] Loading state avec spinner
- [ ] API props existante préservée
- [ ] Focus ring visible (a11y)

#### Technical Notes

```svelte
<Button variant="primary" size="md" loading={isLoading}>
  Save Changes
</Button>
```

#### Tasks

- [ ] Analyser props actuelles de Button.svelte
- [ ] Ajouter classes pour nouveaux variants
- [ ] Intégrer Ripple component
- [ ] Ajouter loading state
- [ ] Vérifier non-régression

---

### Story 2.2: Input Component Redesign

**Priority:** P0
**Estimate:** 2 points
**Dependencies:** 1.1

#### Description

En tant que utilisateur, je veux des champs de saisie élégants avec des états clairs afin de savoir quand je peux interagir.

#### Acceptance Criteria

- [ ] `UI/Input.svelte` modernisé
- [ ] Focus ring accent avec glow subtil
- [ ] États: default, focus, error, disabled
- [ ] Transition fluide entre états
- [ ] Support placeholder stylé
- [ ] API préservée

#### Tasks

- [ ] Mettre à jour styles Input.svelte
- [ ] Ajouter focus ring avec glow
- [ ] Ajouter état error
- [ ] Tester avec formulaires existants

---

### Story 2.3: Select Component Redesign

**Priority:** P1
**Estimate:** 3 points
**Dependencies:** 1.3

#### Description

En tant que utilisateur, je veux des dropdowns avec effet glass afin d'avoir une expérience cohérente avec le reste de l'interface.

#### Acceptance Criteria

- [ ] `UI/Select.svelte` modernisé
- [ ] Dropdown avec glassmorphism
- [ ] Animation d'ouverture smooth
- [ ] Hover states sur options
- [ ] Keyboard navigation préservée
- [ ] API préservée

#### Tasks

- [ ] Appliquer GlassCard au dropdown
- [ ] Ajouter animation slideUp
- [ ] Vérifier keyboard navigation
- [ ] Tester avec selects existants

---

### Story 2.4: Modal & Overlay Redesign

**Priority:** P0
**Estimate:** 4 points
**Dependencies:** 1.3, 1.2

#### Description

En tant que utilisateur, je veux des modals élégants avec effet glass afin d'avoir une expérience premium lors des dialogues.

#### Acceptance Criteria

- [ ] `UI/Modal.svelte` modernisé
- [ ] Glassmorphism sur le modal
- [ ] Backdrop blur
- [ ] Animation d'entrée/sortie (scaleIn)
- [ ] Focus trap fonctionnel
- [ ] Escape pour fermer
- [ ] Sizes: sm (400px), md (600px), lg (900px)
- [ ] API préservée

#### Tasks

- [ ] Appliquer GlassCard à Modal
- [ ] Ajouter backdrop blur à Overlay
- [ ] Implémenter animations Svelte
- [ ] Vérifier focus trap
- [ ] Tester avec modals existants

---

### Story 2.5: Toast Notification System

**Priority:** P1
**Estimate:** 4 points
**Dependencies:** 1.3, 1.2

#### Description

En tant que utilisateur, je veux des notifications toast élégantes afin d'être informé des résultats de mes actions sans être bloqué.

#### Acceptance Criteria

- [ ] Nouveau composant `Feedback/Toast.svelte`
- [ ] `Feedback/ToastContainer.svelte` pour le stack
- [ ] Types: success, error, warning, info
- [ ] Animation slideUp à l'entrée
- [ ] Auto-dismiss configurable (default 3s)
- [ ] Action button optionnel
- [ ] Stack jusqu'à 3 toasts
- [ ] API: `toast.success('Message')`, `toast.error('Message')`

#### Technical Notes

```javascript
import { toast } from '$lib/toast';
toast.success('Widget activé !');
toast.error('Connexion OBS perdue', { action: { label: 'Retry', onClick: reconnect } });
```

#### Tasks

- [ ] Créer dossier `components/Feedback/`
- [ ] Implémenter Toast.svelte
- [ ] Implémenter ToastContainer.svelte
- [ ] Créer store `lib/toast.js`
- [ ] Intégrer dans App.svelte
- [ ] Documenter l'API

---

## Epic 3: Navigation System

**Priority:** P0 - Critical Path
**Estimated Stories:** 5
**Dependencies:** Epic 1, Epic 2

### Overview

Refondre la navigation avec une sidebar collapsible, une command palette, et une topbar modernisée.

---

### Story 3.1: Sidebar Component

**Priority:** P0
**Estimate:** 5 points
**Dependencies:** 1.3, 2.1

#### Description

En tant que utilisateur, je veux une sidebar persistante avec la liste de mes panels afin de naviguer rapidement sans perdre le contexte.

#### Acceptance Criteria

- [ ] Nouveau composant `Navigation/Sidebar.svelte`
- [ ] Liste des panels avec icônes
- [ ] État collapsed (64px) / expanded (240px)
- [ ] Toggle button pour collapse
- [ ] Panel actif visuellement distinct
- [ ] Bouton "+" pour nouveau panel
- [ ] Raccourcis clavier 1-9 pour panels
- [ ] Animation smooth de collapse
- [ ] Glassmorphism subtil

#### Technical Notes

```svelte
<Sidebar
  panels={$panels}
  activePanel={$currentPanel}
  collapsed={sidebarCollapsed}
  on:selectPanel={handleSelectPanel}
  on:newPanel={handleNewPanel}
/>
```

#### Tasks

- [ ] Créer dossier `components/Navigation/`
- [ ] Implémenter Sidebar.svelte
- [ ] Implémenter SidebarItem.svelte
- [ ] Connecter aux stores existants
- [ ] Ajouter raccourcis clavier
- [ ] Animer le collapse
- [ ] Remplacer Drawer existant

---

### Story 3.2: Topbar Redesign

**Priority:** P0
**Estimate:** 3 points
**Dependencies:** 1.3

#### Description

En tant que utilisateur, je veux une topbar moderne avec les statuts de connexion visibles afin de savoir l'état de mes intégrations d'un coup d'œil.

#### Acceptance Criteria

- [ ] `Dashboard/Topbar.svelte` modernisé
- [ ] Background avec blur subtil
- [ ] Logo/Titre à gauche
- [ ] Status badges OBS/Twitch (connecté/déconnecté)
- [ ] Bouton settings
- [ ] Bouton quit
- [ ] Height: 56px fixe

#### Tasks

- [ ] Appliquer glassmorphism à Topbar
- [ ] Ajouter StatusBadge components
- [ ] Réorganiser layout
- [ ] Vérifier responsive

---

### Story 3.3: Command Palette

**Priority:** P1
**Estimate:** 5 points
**Dependencies:** 2.4, 1.2

#### Description

En tant que power user, je veux une command palette (Ctrl+K) afin d'accéder rapidement à n'importe quelle action ou panel.

#### Acceptance Criteria

- [ ] Nouveau composant `Navigation/CommandPalette.svelte`
- [ ] Ouverture avec Ctrl+K (Cmd+K sur Mac)
- [ ] Recherche fuzzy sur: panels, widgets, actions, settings
- [ ] Navigation clavier (flèches, Enter, Escape)
- [ ] Résultats groupés par catégorie
- [ ] Animation d'ouverture
- [ ] Glassmorphism modal

#### Technical Notes

```svelte
{#if commandPaletteOpen}
  <CommandPalette
    on:select={handleCommand}
    on:close={() => commandPaletteOpen = false}
  />
{/if}
```

#### Tasks

- [ ] Implémenter CommandPalette.svelte
- [ ] Créer index searchable des items
- [ ] Implémenter fuzzy search
- [ ] Ajouter keyboard listener global
- [ ] Animer ouverture/fermeture

---

### Story 3.4: Inline Editing

**Priority:** P2
**Estimate:** 2 points
**Dependencies:** 2.2

#### Description

En tant que utilisateur, je veux éditer les noms de panels/widgets en double-cliquant afin de personnaliser rapidement sans ouvrir de modal.

#### Acceptance Criteria

- [ ] Nouveau composant `Base/InlineEdit.svelte`
- [ ] Double-clic active l'édition
- [ ] Input stylé inline
- [ ] Enter pour valider, Escape pour annuler
- [ ] Focus automatique
- [ ] Intégré dans Sidebar et WidgetCard

#### Tasks

- [ ] Implémenter InlineEdit.svelte
- [ ] Intégrer dans SidebarItem
- [ ] Intégrer dans WidgetCard (Story 4.1)

---

### Story 3.5: Connection Status Indicators

**Priority:** P1
**Estimate:** 2 points
**Dependencies:** 1.3

#### Description

En tant que utilisateur, je veux voir clairement le statut de connexion OBS/Twitch afin de savoir si mes actions vont fonctionner.

#### Acceptance Criteria

- [ ] Nouveau composant `Feedback/StatusBadge.svelte`
- [ ] États: connected (vert), disconnected (rouge), connecting (orange pulsant)
- [ ] Tooltip avec détails
- [ ] Animation de transition entre états
- [ ] Intégré dans Topbar et Sidebar

#### Tasks

- [ ] Implémenter StatusBadge.svelte
- [ ] Connecter aux stores OBS/Twitch existants
- [ ] Ajouter dans Topbar
- [ ] Ajouter dans Sidebar (section status)

---

## Epic 4: Widget System Enhancement

**Priority:** P0 - Critical Path
**Estimated Stories:** 5
**Dependencies:** Epic 1, Epic 2

### Overview

Moderniser l'expérience des widgets avec feedback visuel complet, états clairs, et catalogue drag & drop.

---

### Story 4.1: WidgetCard Component

**Priority:** P0
**Estimate:** 4 points
**Dependencies:** 1.3, 1.4, 2.5

#### Description

En tant que utilisateur, je veux des widgets avec feedback visuel riche afin de savoir immédiatement si mon action a réussi ou échoué.

#### Acceptance Criteria

- [ ] Nouveau composant `Widgets/WidgetCard.svelte`
- [ ] Wrapper autour des widgets existants
- [ ] États: idle, hover, loading, success, error
- [ ] Ripple effect au clic
- [ ] Glow vert (success) pendant 1s après action réussie
- [ ] Border rouge + shake subtil (error)
- [ ] Spinner overlay pendant loading
- [ ] Élévation au hover

#### Technical Notes

```svelte
<WidgetCard
  widget={widgetData}
  on:click={handleWidgetAction}
  on:success={() => widgetCard.setSuccess()}
  on:error={() => widgetCard.setError()}
/>
```

#### Tasks

- [ ] Implémenter WidgetCard.svelte
- [ ] Intégrer GlassCard + Ripple
- [ ] Ajouter state machine (idle→loading→success|error→idle)
- [ ] Intégrer avec widgets existants
- [ ] Connecter au système de toast pour errors

---

### Story 4.2: Widget Grid Enhancement

**Priority:** P1
**Estimate:** 3 points
**Dependencies:** 4.1

#### Description

En tant que utilisateur, je veux une grille de widgets fluide avec des animations de réorganisation afin d'avoir une expérience premium.

#### Acceptance Criteria

- [ ] `Panels/Panel/Grid.svelte` modernisé
- [ ] Gap cohérent entre widgets
- [ ] Animation flip lors du drag & drop
- [ ] Responsive selon taille du panel
- [ ] Support des différentes tailles de widgets

#### Tasks

- [ ] Mettre à jour styles Grid.svelte
- [ ] Ajouter animations FLIP
- [ ] Tester drag & drop

---

### Story 4.3: Widget Wrappers Update

**Priority:** P1
**Estimate:** 4 points
**Dependencies:** 4.1

#### Description

En tant que développeur, je veux que tous les widgets existants utilisent WidgetCard afin d'avoir un feedback cohérent partout.

#### Acceptance Criteria

- [ ] Tous les widgets OBS (5) utilisent WidgetCard
- [ ] Tous les widgets Twitch (5) utilisent WidgetCard
- [ ] Widget Animation utilise WidgetCard
- [ ] Comportement fonctionnel inchangé
- [ ] Feedback success/error connecté aux actions

#### Tasks

- [ ] Refactorer OBS widgets
- [ ] Refactorer Twitch widgets
- [ ] Refactorer Anime widget
- [ ] Tester chaque widget
- [ ] Vérifier non-régression fonctionnelle

---

### Story 4.4: Widget Edit Mode

**Priority:** P1
**Estimate:** 3 points
**Dependencies:** 2.4

#### Description

En tant que utilisateur, je veux un mode édition distinct et excitant afin de savoir clairement quand je peux modifier mes widgets.

#### Acceptance Criteria

- [ ] Mode edit visuellement distinct (border dashed, badge "Edit")
- [ ] Double-clic pour éditer un widget
- [ ] Drawer latéral pour configuration (pas modal)
- [ ] Preview temps réel des changements
- [ ] Bouton "Done" pour quitter le mode edit

#### Tasks

- [ ] Implémenter état edit dans Panel
- [ ] Créer WidgetEditDrawer.svelte
- [ ] Connecter double-clic à l'édition
- [ ] Ajouter preview temps réel

---

### Story 4.5: Widget Catalogue

**Priority:** P2
**Estimate:** 4 points
**Dependencies:** 1.3, 3.1

#### Description

En tant que utilisateur, je veux un catalogue de widgets avec drag & drop afin d'ajouter facilement de nouveaux widgets à mes panels.

#### Acceptance Criteria

- [ ] Section dans Sidebar pour catalogue
- [ ] Widgets groupés par catégorie (OBS, Twitch, Anime)
- [ ] Drag depuis catalogue vers panel
- [ ] Preview du widget pendant le drag
- [ ] Drop zone visuelle sur le panel
- [ ] Recherche/filtre dans le catalogue

#### Tasks

- [ ] Implémenter catalogue dans Sidebar
- [ ] Grouper par catégorie
- [ ] Implémenter drag & drop
- [ ] Ajouter drop zone dans Grid
- [ ] Ajouter recherche

---

## Epic 5: Polish & Accessibility

**Priority:** P1
**Estimated Stories:** 4
**Dependencies:** Epic 2, Epic 3, Epic 4

### Overview

Finaliser l'expérience avec audit d'accessibilité, optimisation performance, et polish des micro-interactions.

---

### Story 5.1: Accessibility Audit & Fixes

**Priority:** P0
**Estimate:** 4 points
**Dependencies:** All previous epics

#### Description

En tant que utilisateur avec handicap, je veux une application accessible afin de pouvoir l'utiliser avec un lecteur d'écran ou uniquement au clavier.

#### Acceptance Criteria

- [ ] Audit WCAG 2.1 AA complet
- [ ] Contraste vérifié sur tous les textes
- [ ] Navigation clavier complète
- [ ] Focus visible sur tous les éléments interactifs
- [ ] ARIA labels sur tous les contrôles
- [ ] Skip links pour navigation
- [ ] Support prefers-reduced-motion
- [ ] Taille minimum touch targets (44px)

#### Tasks

- [ ] Exécuter audit Lighthouse accessibility
- [ ] Exécuter axe-core
- [ ] Fixer tous les issues critiques
- [ ] Tester avec NVDA/VoiceOver
- [ ] Documenter les raccourcis clavier

---

### Story 5.2: Performance Optimization

**Priority:** P1
**Estimate:** 3 points
**Dependencies:** All previous epics

#### Description

En tant que utilisateur, je veux une application fluide à 60fps afin d'avoir une expérience premium sans lag.

#### Acceptance Criteria

- [ ] Animations à 60fps constant
- [ ] Feedback < 100ms
- [ ] Startup < 3s
- [ ] Memory < 200MB idle
- [ ] CPU < 5% idle
- [ ] Pas de layout thrashing

#### Tasks

- [ ] Profiler avec DevTools
- [ ] Optimiser animations (will-change, transform)
- [ ] Lazy load composants lourds
- [ ] Vérifier memory leaks
- [ ] Benchmark startup time

---

### Story 5.3: Cross-Platform Testing

**Priority:** P1
**Estimate:** 3 points
**Dependencies:** All previous epics

#### Description

En tant que utilisateur, je veux que l'application fonctionne parfaitement sur Windows, Mac et Linux afin de l'utiliser sur ma plateforme préférée.

#### Acceptance Criteria

- [ ] Tests sur Windows 10/11
- [ ] Tests sur macOS 11+
- [ ] Tests sur Ubuntu 20.04+
- [ ] Tests sur différentes résolutions (1280x720 à 4K)
- [ ] Tests DPI scaling (100%, 125%, 150%, 200%)
- [ ] Screenshots de référence par plateforme

#### Tasks

- [ ] Setup CI multi-plateforme
- [ ] Créer suite de tests visuels
- [ ] Fixer issues spécifiques à chaque OS
- [ ] Documenter différences connues

---

### Story 5.4: Micro-Interactions Polish

**Priority:** P2
**Estimate:** 2 points
**Dependencies:** 5.2

#### Description

En tant que utilisateur, je veux des micro-interactions raffinées afin d'avoir une expérience premium et satisfaisante.

#### Acceptance Criteria

- [ ] Review de toutes les transitions
- [ ] Timing cohérent (100/200/300ms)
- [ ] Easing approprié par contexte
- [ ] Pas d'animation sans purpose
- [ ] Feedback sonore optionnel (futur)

#### Tasks

- [ ] Audit de toutes les animations
- [ ] Ajuster timings inconsistants
- [ ] Ajouter easings manquants
- [ ] Supprimer animations superflues

---

## Summary

| Epic | Stories | Priority | Dependencies |
|------|---------|----------|--------------|
| Epic 1: Design System Foundation | 4 | P0 | None |
| Epic 2: Core UI Components | 5 | P0 | Epic 1 |
| Epic 3: Navigation System | 5 | P0 | Epic 1, 2 |
| Epic 4: Widget System | 5 | P0 | Epic 1, 2 |
| Epic 5: Polish & Accessibility | 4 | P1 | All |

**Total: 5 Epics, 23 Stories**

---

## Recommended Implementation Order

```
Week 1: Epic 1 (Stories 1.1 → 1.4)
        ↓
Week 2: Epic 2 (Stories 2.1 → 2.3)
        ↓
Week 3: Epic 2 (Stories 2.4 → 2.5) + Epic 3 (Story 3.1)
        ↓
Week 4: Epic 3 (Stories 3.2 → 3.5)
        ↓
Week 5: Epic 4 (Stories 4.1 → 4.3)
        ↓
Week 6: Epic 4 (Stories 4.4 → 4.5) + Epic 5 (Story 5.1)
        ↓
Week 7: Epic 5 (Stories 5.2 → 5.4) + Final Polish
```

---

*Document généré via le workflow BMAD Create Epics & Stories*
*Status: Complet*
