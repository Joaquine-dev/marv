---
stepsCompleted: [step-01-init, step-02-discovery, step-03-vision, step-04-users, step-05-features, step-06-ux, step-07-technical, step-08-constraints, step-09-nfr, step-10-risks, step-11-complete]
inputDocuments:
  - "ux-design-specification.md"
workflowType: 'prd'
projectType: 'brownfield'
classification:
  projectType: desktop_app
  domain: general
  complexity: low
  projectContext: brownfield
documentCounts:
  brief: 0
  research: 0
  projectDocs: 0
  uxDesign: 1
---

# Product Requirements Document - MARV

**Auteur:** Icene
**Date:** 2026-01-29
**Version:** 1.0
**Type:** Redesign UX/UI (Brownfield)

---

## 1. Executive Summary

### 1.1 Product Vision

**MARV** est le cockpit ultime du streamer — une alternative logicielle au StreamDeck physique qui démocratise le contrôle professionnel du streaming. Après 5 ans d'existence fonctionnelle, ce projet vise à transformer MARV en une expérience moderne, intuitive et visuellement exceptionnelle.

**Vision du redesign :** Créer une interface qui fait dire "WOW" dès la première ouverture, accessible à tous les niveaux d'utilisateurs tout en offrant une profondeur pour les power users.

### 1.2 Problem Statement

L'application MARV, bien que fonctionnellement solide, souffre d'une dette de design de 5 ans :
- Interface visuellement datée comparée aux standards actuels
- Navigation parfois confuse (fonctionnalités cachées dans les clics-droits)
- Feedback insuffisant sur les actions utilisateur
- Mode édition peu distinct du mode utilisation
- Onboarding technique intimidant pour les débutants

### 1.3 Proposed Solution

Un redesign complet de l'interface utilisateur suivant la direction "Modern Glass" :
- Glassmorphism élégant avec effets de profondeur
- Micro-interactions satisfaisantes sur chaque action
- Navigation explicite et intuitive
- Système de feedback visuel riche
- Accessibilité WCAG 2.1 AA

### 1.4 Success Metrics

| Métrique | Cible | Mesure |
|----------|-------|--------|
| First Impression | "WOW" effect | Feedback qualitatif utilisateurs |
| Time to First Action | < 60 secondes | Onboarding tracking |
| Action Feedback | 100% | Toute action a un feedback visuel |
| Response Time | < 200ms | Time to visual feedback |
| Accessibility | WCAG 2.1 AA | Audit automatisé |

---

## 2. Target Users

### 2.1 Primary Personas

#### Persona 1: Léo — Le Débutant Enthousiaste
- **Âge:** 19 ans
- **Contexte:** Premier stream ce soir, stressé mais excité
- **Besoin:** "Que ça marche" sans configuration complexe
- **Frustration:** Interfaces intimidantes, jargon technique
- **Objectif MARV:** Onboarding en < 60 secondes, actions évidentes

#### Persona 2: Marie — La Streameuse Régulière
- **Âge:** 28 ans
- **Contexte:** Stream 3x/semaine, audience établie
- **Besoin:** Personnalisation sans coder, efficacité
- **Frustration:** Limitations de customisation, manque de feedback
- **Objectif MARV:** Panels personnalisés, widgets visuellement pros

#### Persona 3: Thomas — Le Pro Exigeant
- **Âge:** 35 ans
- **Contexte:** Streamer full-time, setup complexe multi-écrans
- **Besoin:** Efficacité maximale, raccourcis, automatisation
- **Frustration:** Lenteur, manque de raccourcis clavier
- **Objectif MARV:** Keyboard-first, actions < 1 seconde

### 2.2 User Needs Summary

| Besoin | Léo | Marie | Thomas |
|--------|-----|-------|--------|
| Simplicité immédiate | ★★★ | ★★ | ★ |
| Personnalisation | ★ | ★★★ | ★★ |
| Raccourcis clavier | ★ | ★★ | ★★★ |
| Feedback visuel | ★★★ | ★★★ | ★★ |
| Performance | ★★ | ★★ | ★★★ |

---

## 3. Functional Requirements

### 3.1 Core Features (Existantes - Redesign UI uniquement)

#### FR1: Dashboard Principal
- **Description:** Interface principale avec grille de widgets personnalisables
- **Comportement actuel:** Fonctionnel
- **Changement UI:** Glassmorphism, élévation au hover, animations fluides

#### FR2: Système de Panels
- **Description:** Organisation des widgets en panels/onglets
- **Comportement actuel:** Fonctionnel avec tabs
- **Changement UI:** Sidebar collapsible, raccourcis 1-9, transitions smooth

#### FR3: Widgets OBS
- **Description:** Contrôle OBS (scènes, sources, audio)
- **Widgets:** SceneButton, SourceToggle, AudioMixer, RecordButton, StreamButton
- **Changement UI:** Feedback visuel riche, états de connexion clairs

#### FR4: Widgets Twitch
- **Description:** Intégration Twitch (chat, followers, rewards)
- **Widgets:** ChatWidget, FollowerAlert, RewardTrigger, ClipCreator, AdBreak
- **Changement UI:** Indicateurs live, notifications élégantes

#### FR5: Widget Animation
- **Description:** Timeline editor pour overlays animés
- **Changement UI:** Interface timeline modernisée

#### FR6: Gestion de Fichiers
- **Description:** Upload et organisation de médias
- **Changement UI:** Drag & drop amélioré, previews

#### FR7: Connexion OBS
- **Description:** WebSocket connection à OBS
- **Changement UI:** Auto-détection, feedback connexion clair

#### FR8: Édition de Widgets
- **Description:** Configuration des widgets
- **Changement UI:** Drawers au lieu de modals, preview temps réel

### 3.2 New UI Features

#### FR9: Command Palette
- **Description:** Recherche rapide globale (Ctrl+K)
- **Critères:** Recherche widgets, panels, actions, settings
- **Priorité:** High

#### FR10: Sidebar Navigation
- **Description:** Navigation persistante collapsible
- **Critères:** Liste panels, catalogue widgets, états connexion
- **Priorité:** High

#### FR11: Toast Notifications
- **Description:** Système de notifications non-bloquantes
- **Critères:** Success/Error/Warning/Info, actions inline, auto-dismiss
- **Priorité:** High

#### FR12: Widget Catalogue
- **Description:** Browser de widgets avec drag & drop
- **Critères:** Catégorisation, preview, recherche
- **Priorité:** Medium

#### FR13: Inline Editing
- **Description:** Édition inline pour noms de panels/widgets
- **Critères:** Double-clic pour éditer, Escape pour annuler
- **Priorité:** Medium

---

## 4. Non-Functional Requirements

### 4.1 Performance

| NFR | Requirement | Target |
|-----|-------------|--------|
| NFR1 | Response time | < 100ms pour feedback visuel |
| NFR2 | Animation framerate | 60fps constant |
| NFR3 | Startup time | < 3 secondes |
| NFR4 | Memory usage | < 200MB idle |
| NFR5 | CPU usage | < 5% idle |

### 4.2 Accessibility

| NFR | Requirement | Standard |
|-----|-------------|----------|
| NFR6 | Color contrast | WCAG 2.1 AA (4.5:1 minimum) |
| NFR7 | Keyboard navigation | Full support, focus visible |
| NFR8 | Screen reader | ARIA labels complets |
| NFR9 | Reduced motion | Respect prefers-reduced-motion |
| NFR10 | Touch targets | Minimum 44x44px |

### 4.3 Compatibility

| NFR | Requirement | Support |
|-----|-------------|---------|
| NFR11 | Windows | 10, 11 |
| NFR12 | macOS | 11+ (Big Sur) |
| NFR13 | Linux | Ubuntu 20.04+, Debian 11+ |
| NFR14 | Screen sizes | 1280x720 à 3840x2160 |
| NFR15 | DPI scaling | 100% à 200% |

### 4.4 Security

| NFR | Requirement |
|-----|-------------|
| NFR16 | Pas de stockage de credentials en clair |
| NFR17 | Communications OBS via WebSocket sécurisé |
| NFR18 | Pas de télémétrie sans consentement |

---

## 5. User Experience Requirements

### 5.1 Design Direction

**Style choisi : "Modern Glass"**
- Glassmorphism subtil (backdrop-filter blur)
- Gradients accent violet (#8b5cf6 → #6366f1)
- Système d'élévation (shadow + glow)
- Dark theme exclusif (#0a0a0b background)

### 5.2 Interaction Principles

| Principe | Application |
|----------|-------------|
| Un clic, une action | Chaque widget déclenche exactement une action |
| Feedback toujours | États loading, success, error visibles |
| Visible avant caché | Navigation explicite, clic-droit = raccourci |
| Progressive disclosure | Simple par défaut, options avancées accessibles |

### 5.3 Key User Flows

1. **Onboarding** — OBS connecté + premier widget cliqué en < 60s
2. **Widget Click** — Feedback visuel en < 200ms
3. **Panel Creation** — Panel créé et nommé en < 5s
4. **Widget Add** — Widget fonctionnel en < 30s
5. **Live Usage** — Action trouvée en < 1s sous stress

### 5.4 Component Modernization

**15 composants à moderniser :**
Button, Input, Checkbox, Select, Modal, Menu, Progressbar, Overlay, Toast, Tooltip, Topbar, Drawer, Panel, Grid, Widget

**8 nouveaux composants :**
GlassCard, WidgetCard, Sidebar, CommandPalette, StatusBadge, ToastNotification, InlineEdit, WidgetCatalogue

---

## 6. Technical Constraints

### 6.1 Stack Technique (Inchangée)

| Layer | Technology |
|-------|------------|
| Runtime | Electron |
| Frontend | Svelte |
| Build | Vite |
| Styling | Tailwind CSS |
| State | Svelte stores |

### 6.2 Constraints

| Constraint | Impact |
|------------|--------|
| TC1: Pas de changement fonctionnel | Code métier inchangé, UI only |
| TC2: Tailwind existant | Évolution du design system, pas remplacement |
| TC3: Structure composants | 30+ composants existants à moderniser |
| TC4: Electron | Contraintes desktop, pas de PWA |

### 6.3 Dependencies

- OBS WebSocket 5.x
- Twitch API
- Electron 28+
- Node.js 20+

---

## 7. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Régression visuelle | Medium | High | Tests visuels automatisés |
| Performance dégradée | Low | High | Profiling animations, will-change |
| Incompatibilité OS | Low | Medium | Tests multi-plateformes CI |
| Résistance utilisateurs | Medium | Medium | Changements progressifs, feedback beta |

---

## 8. Out of Scope

Les éléments suivants sont explicitement **hors scope** de ce redesign :

- ❌ Nouvelles fonctionnalités métier
- ❌ Nouveaux widgets
- ❌ Nouvelles intégrations (YouTube, Streamlabs, etc.)
- ❌ Version mobile ou web
- ❌ Backend/API changes
- ❌ Refactoring du code métier
- ❌ Migration de stack technique

---

## 9. Implementation Phases

### Phase 1: Fondations Design System
- Nouveaux design tokens (colors, spacing, typography)
- Composant GlassCard de base
- Système d'élévation et animations

### Phase 2: Composants Core
- Button, Input, Select modernisés
- Modal, Drawer avec glassmorphism
- Toast notifications

### Phase 3: Navigation
- Sidebar collapsible
- Command Palette (Ctrl+K)
- Topbar redesign

### Phase 4: Widgets
- WidgetCard avec feedback complet
- Widget catalogue
- États de connexion

### Phase 5: Polish
- Micro-interactions
- Accessibility audit
- Performance optimization

---

## 10. Acceptance Criteria

Le redesign sera considéré **complet** quand :

- [ ] Tous les 30+ composants UI sont modernisés
- [ ] Design direction "Modern Glass" appliquée uniformément
- [ ] Feedback visuel sur 100% des interactions
- [ ] Navigation clavier complète
- [ ] WCAG 2.1 AA compliance vérifiée
- [ ] Performance maintenue (60fps, < 200ms feedback)
- [ ] Tests sur Windows, macOS, Linux
- [ ] Beta feedback positif (> 80% satisfaction)

---

## Appendix A: Reference Documents

- [UX Design Specification](./ux-design-specification.md) — Direction visuelle complète
- Codebase: `front-src/client/components/` — Composants existants

---

*Document généré via le workflow BMAD Create PRD*
*Status: Complet*
