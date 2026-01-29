---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments:
  - "Analyse du codebase existant (exploration automatique)"
project_name: "MARV"
author: "Icene"
date: "2026-01-29"
workflow_type: "brownfield-redesign"
---

# UX Design Specification - MARV

**Auteur:** Icene
**Date:** 2026-01-29
**Type:** Redesign complet d'application existante

---

## Contexte Initial

### Application Analysée
**MARV** est un tableau de bord StreamDeck-like pour les streamers Twitch, construit avec Svelte, Electron et Vite.

### Fonctionnalités Actuelles Identifiées
- **Dashboard principal** avec système de panels/widgets personnalisables
- **Intégration OBS** : Changement de scènes, contrôle audio, monitoring
- **Intégration Twitch** : Chat, followers, rewards, statut de stream
- **Éditeur d'animation** : Timeline avec keyframes pour overlays
- **Gestion de fichiers** : Upload et organisation de médias

### Structure des Composants Existants
- 30+ composants UI primitifs (Button, Input, Modal, etc.)
- Système de widgets avec 11 widgets disponibles
- Thème sombre avec accent indigo

---

## Executive Summary

### Project Vision

MARV est le cockpit ultime du streamer — une alternative logicielle au StreamDeck qui démocratise le contrôle professionnel du streaming. Après 5 ans d'existence, ce redesign vise à transformer une application fonctionnelle en une expérience moderne, intuitive et visuellement exceptionnelle.

**Objectif du redesign :** Créer une interface qui fait dire "WOW" dès la première ouverture, accessible à tous les niveaux d'utilisateurs tout en offrant une profondeur pour les power users.

### Target Users

**Utilisateur primaire : Le streamer universel**
- Tous niveaux : du débutant découvrant le streaming au pro établi
- Tous styles : gaming, créatif, talk-show, IRL
- Contexte : utilisation pendant le stream (stress, multitâche) et en préparation
- Attentes : simplicité immédiate, puissance accessible

**Personas clés :**
1. **Léo, 19 ans** — Premier stream ce soir, stressé, veut que "ça marche"
2. **Marie, 28 ans** — Streameuse régulière, veut personnaliser sans coder
3. **Thomas, 35 ans** — Pro avec setup complexe, veut efficacité maximale

### Key Design Challenges

1. **Dette de design de 5 ans** — Interface fonctionnelle mais visuellement datée
2. **Accessibilité vs Puissance** — Satisfaire débutants ET experts
3. **Navigation invisible** — Fonctionnalités cachées dans les clics-droits
4. **Onboarding technique** — Première expérience intimidante
5. **Feedback insuffisant** — Actions sans confirmation satisfaisante
6. **Mode édition confus** — Distinction floue entre consultation et édition

### Design Opportunities

1. **Design system moderne** — Glassmorphism, gradients subtils, micro-animations
2. **Onboarding progressif** — Accompagnement humain, pas technique
3. **Navigation hybride** — Explicite pour débutants, raccourcis pour pros
4. **Micro-interactions** — Chaque action devient satisfaisante
5. **Mode édition distinctif** — Expérience d'édition excitante et claire
6. **Hiérarchie visuelle** — Zones claires, respiration, focus
7. **Composants premium** — Élévation du design system existant

---

## Core User Experience

### Defining Experience

L'expérience core de MARV se résume à un moment : **le clic sur un widget qui déclenche une action instantanée et satisfaisante**. Tout le reste de l'application existe pour rendre ce moment parfait — de la découverte du bon widget à la confirmation que l'action a réussi.

**Action core :** Cliquer un widget → Action déclenchée → Feedback visuel
**Boucle secondaire :** Personnaliser panels/widgets → Tester → Utiliser en live

### Platform Strategy

| Aspect | Décision |
|--------|----------|
| Plateforme | Desktop (Electron) - optimisé pour second écran |
| Interaction | Souris/clavier principal, tactile-ready |
| Responsive | Adaptatif pour écrans 13" à 27"+ |
| Performance | Animations 60fps, réponse < 100ms |
| Futur | Architecture prête pour app mobile companion |

### Effortless Interactions

**Interactions zéro-friction :**
1. Clic widget → Action instantanée avec feedback riche
2. Changement de panel → Tabs + swipe + raccourcis (1-9)
3. Connexion OBS → Un bouton, auto-reconnexion
4. Ajout widget → Drag depuis sidebar OU clic-droit contextuel
5. Édition widget → Double-clic OU icône hover
6. Monitoring → Informations glanceables, détails au hover

**Éliminé :**
- Modals de configuration au premier lancement
- Navigation exclusivement par clic-droit
- Feedback uniquement textuel

### Critical Success Moments

1. **Onboarding (< 60s)** : OBS connecté + panel par défaut fonctionnel
2. **Premier clic** : Action réussie + feedback satisfaisant = confiance établie
3. **Première customisation** : Panel créé sans documentation = autonomie validée
4. **Usage en live** : Widget trouvé en < 1s sous stress = outil maîtrisé

### Experience Principles

| Principe | Application |
|----------|-------------|
| **Un clic, une action** | Chaque widget déclenche exactement une action claire |
| **Feedback toujours** | États loading, success, error visibles sur chaque interaction |
| **Visible avant caché** | Navigation explicite, clic-droit = raccourci, pas nécessité |
| **Progressive disclosure** | Interface simple par défaut, options avancées accessibles |
| **Zen sous pression** | Contraste élevé, zones cliquables généreuses, pas d'animations distrayantes |

---

## Desired Emotional Response

### Primary Emotional Goals

**Émotion centrale : "Je contrôle tout"**

L'utilisateur doit ressentir la sérénité d'un pilote dans son cockpit — chaque élément à sa place, chaque action prévisible, même sous pression. MARV transforme le chaos du streaming en expérience maîtrisée.

**Émotions primaires visées :**
1. **Confiance** — "Je sais exactement ce que fait chaque bouton"
2. **Satisfaction** — "Chaque clic est agréable"
3. **Sérénité** — "Même en live, je reste calme"

### Emotional Journey Mapping

| Phase | Émotion de départ | Émotion cible | Trigger UX |
|-------|-------------------|---------------|------------|
| Découverte | Curiosité | Impression ("Wow") | Design premium visible |
| Onboarding | Appréhension | Confiance | Succès immédiat (OBS connecté) |
| Premier usage | Exploration | Satisfaction | Feedback riche sur actions |
| Personnalisation | Hésitation | Fierté créative | Preview temps réel |
| Usage quotidien | Habitude | Maîtrise | Raccourcis, efficiency |
| Moment de stress | Tension | Calme contrôlé | Interface zen, feedback clair |
| Erreur | Panique | Réassurance | Message clair, solution visible |

### Micro-Emotions

**À amplifier :**
- Confiance → Labels explicites, états prévisibles
- Satisfaction → Micro-animations, feedback sonore optionnel
- Fierté → Résultats visuellement pros, partageables
- Sérénité → Espaces négatifs, animations non-intrusives
- Maîtrise → Raccourcis clavier, personnalisation poussée

**À neutraliser :**
- Confusion → Navigation explicite
- Doute → Feedback immédiat sur chaque action
- Frustration → Réduction des clics nécessaires
- Anxiété → Suppression des animations stressantes
- Sentiment d'abandon → Aide contextuelle accessible

### Design Implications

| Principe émotionnel | Implémentation concrète |
|--------------------|------------------------|
| Inspirer confiance | Boutons avec labels + icônes, pas d'actions destructives sans confirmation |
| Créer satisfaction | Animations de succès (0.2s), changements de couleur, optional sounds |
| Maintenir le calme | Palette sombre apaisante, animations fluides (ease-out), pas de rouge sauf erreur |
| Encourager la maîtrise | Tooltips avec raccourcis, mode pro accessible |
| Rassurer sur les erreurs | Toasts non-bloquants, messages constructifs, undo quand possible |

### Emotional Design Principles

1. **Feedback avant tout** — Aucune action sans réponse visuelle immédiate
2. **Calme par défaut** — L'interface ne demande jamais l'attention, elle répond
3. **Succès célébré** — Les accomplissements sont visuellement récompensés
4. **Erreurs humaines** — Messages sans jargon, toujours une sortie de secours
5. **Progression visible** — L'utilisateur voit qu'il maîtrise de plus en plus

---

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**1. Elgato Stream Deck**
- Grille visuelle claire avec widgets comme boutons physiques
- Configuration drag & drop intuitive avec aperçu temps réel
- Multi-actions via folders et profiles
- **À retenir** : Mental model du "deck de contrôle"

**2. Discord**
- Dark theme exemplaire avec hiérarchie via nuances de gris
- Transitions fluides qui guident sans distraire
- Notifications intelligentes et non-intrusives
- Sidebar persistante pour navigation principale
- **À retenir** : Référence visuelle pour notre public cible

**3. Spotify**
- Micro-interactions satisfaisantes (cœur qui pulse, play qui bounce)
- Progressive disclosure : simple en surface, profond si exploration
- Contrôles toujours accessibles rapidement
- **À retenir** : Standard du feedback satisfaisant

**4. Figma**
- Mode édition fluide sans changement de contexte brutal
- Raccourcis omniprésents pour power users
- Undo/Redo robuste permettant l'expérimentation
- **À retenir** : Référence pour l'expérience d'édition

### Transferable UX Patterns

**Navigation :**
- Sidebar persistante (Discord) → Liste de panels
- Tabs + Raccourcis clavier (Chrome) → Accès rapide aux panels
- Breadcrumb contextuel (Figma) → Orientation en édition

**Interactions :**
- Drag & drop naturel (Stream Deck) → Ajout/déplacement widgets
- Double-clic pour éditer (Figma) → Édition rapide
- Hover reveal (Spotify) → Actions secondaires
- Press & hold preview → Aperçu avant action

**Feedback :**
- Ripple effect (Material) → Retour tactile simulé
- Success glow (Spotify) → Confirmation visuelle
- Toast notifications → Confirmations non-bloquantes
- Skeleton loading → Perception de rapidité

**Visuels :**
- Glassmorphism subtil (macOS) → Profondeur moderne
- Gradient accents (Discord Nitro) → Énergie gaming
- Elevation system (Material 3) → Hiérarchie claire
- Rounded corners cohérents → Modernité

### Anti-Patterns to Avoid

| Anti-Pattern | Impact négatif | Alternative MARV |
|--------------|----------------|------------------|
| Menu hamburger exclusif | Navigation cachée | Sidebar + hamburger secondaire |
| Modals en cascade | Perte de contexte | Drawers, panels inline |
| Confirmation systématique | Friction | Undo disponible |
| Tooltips obligatoires | Inaccessible | Labels visibles |
| Animations > 200ms | Lenteur perçue | Animations rapides |
| Rouge comme accent | Stress visuel | Rouge = erreurs uniquement |
| Onboarding long | Abandon | Contextuel, progressif |

### Design Inspiration Strategy

**Adopter :**
- Dark theme inspiré Discord (public identique)
- Grille visuelle Stream Deck (mental model établi)
- Micro-animations Spotify (satisfaction prouvée)
- Système de raccourcis Figma (efficacité pro)

**Adapter :**
- Sidebar Discord → Version collapsible
- Drag & drop Figma → Simplifié pour widgets
- Feedback Spotify → Moins intrusif en live

**Éviter :**
- Complexité onboarding Notion
- Customisation technique Twitch
- Menus contextuels profonds

---

## Design System Foundation

### Design System Choice

**Approche choisie : Évolution du système Tailwind existant**

MARV conserve sa stack technique (Svelte + Tailwind CSS) tout en modernisant complètement son design system. Cette approche permet une refonte visuelle ambitieuse sans risque de régression fonctionnelle.

**Justification :**
- Tailwind CSS déjà intégré et maîtrisé
- 30+ composants existants à améliorer plutôt qu'à remplacer
- Contrainte de non-modification fonctionnelle respectée
- Flexibilité totale pour un style gaming/streaming unique

### Rationale for Selection

| Critère | Évaluation |
|---------|------------|
| Risque technique | Minimal — pas de changement de stack |
| Effort d'implémentation | Modéré — refonte progressive possible |
| Flexibilité design | Maximale — pas de framework imposé |
| Performance | Excellente — Tailwind CSS optimisé |
| Maintenabilité | Bonne — tokens centralisés |

### Implementation Approach

**Phase 1 : Design Tokens**
- Refonte complète de `tailwind/colors.js`
- Création de tokens pour spacing, typography, shadows, animations
- Export centralisé dans `tailwind/index.js`

**Phase 2 : Composants UI Primitifs**
- Modernisation des 15 composants UI core (Button, Input, Modal, etc.)
- Ajout de micro-animations et états de feedback
- Implémentation du système d'élévation

**Phase 3 : Composants Métier**
- Refonte visuelle des widgets (OBS, Twitch, Anime)
- Amélioration du système de panels et grille
- Nouveau design de la Topbar et navigation

### Customization Strategy

**Palette de couleurs modernisée :**

| Token | Valeur | Usage |
|-------|--------|-------|
| `--color-background` | `#0a0a0b` | Fond principal |
| `--color-surface` | `#141416` | Cards, panels |
| `--color-surface-elevated` | `#1c1c1f` | Modals, dropdowns |
| `--color-border` | `#2a2a2d` | Bordures subtiles |
| `--color-accent` | `#8b5cf6 → #6366f1` | Gradient accent |
| `--color-accent-glow` | `rgba(139, 92, 246, 0.3)` | Effets lumineux |

**Système d'animation :**

| Token | Valeur | Usage |
|-------|--------|-------|
| `--duration-fast` | `100ms` | Hover states |
| `--duration-normal` | `200ms` | Transitions UI |
| `--duration-slow` | `300ms` | Modals, drawers |
| `--easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard |
| `--easing-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Feedback satisfaisant |

**Système d'élévation :**

| Level | Shadow | Usage |
|-------|--------|-------|
| 0 | none | Éléments plats |
| 1 | `0 1px 2px rgba(0,0,0,0.3)` | Buttons, inputs |
| 2 | `0 4px 6px rgba(0,0,0,0.4)` | Cards, widgets |
| 3 | `0 10px 15px rgba(0,0,0,0.5)` | Modals, dropdowns |
| glow | `0 0 20px var(--color-accent-glow)` | États actifs |

---

## Defining User Experience

### Defining Experience Statement

**"Je clique, ça agit, je vois que ça a marché."**

MARV se définit par l'interaction la plus simple possible : un clic sur un widget déclenche une action instantanée avec un feedback visuel satisfaisant. Cette expérience doit être aussi satisfaisante qu'appuyer sur un bouton physique de StreamDeck, avec la flexibilité infinie du logiciel.

**Pitch utilisateur :** "C'est comme un StreamDeck sur ton écran. Tu cliques, boom — ça agit. Pas de latence, super satisfaisant."

### User Mental Model

**Références apportées par l'utilisateur :**
- StreamDeck physique → Attente de feedback tactile immédiat
- Télécommande → Un bouton = une action claire et prévisible
- Clavier gaming → Raccourcis pour efficacité maximale
- Smartphone → Touch = réponse instantanée

**Points de friction anticipés :**

| Frustration potentielle | Solution UX |
|------------------------|-------------|
| "Rien ne s'est passé" | Feedback visuel systématique |
| "C'est quoi cette action?" | Labels + icônes explicites |
| "Comment j'ajoute?" | Navigation visible, pas juste clic-droit |
| "Je trouve pas mon bouton" | Organisation + recherche |

### Success Criteria

**Chaque interaction doit être :**

| Critère | Cible | Mesure |
|---------|-------|--------|
| Instantanée | < 100ms perçu | Time to first feedback |
| Prévisible | 100% correspondance | Action = attente |
| Confirmée | Toujours | Feedback visuel présent |
| Satisfaisante | Subjective | Micro-animation agréable |
| Réversible | Quand pertinent | Undo disponible |

**Indicateurs de succès utilisateur :**
- Widget réagit visuellement au clic
- Action OBS/Twitch se déclenche instantanément
- Confirmation visuelle claire (glow, checkmark)
- Enchaînement d'actions sans attente

### Novel UX Patterns

**Patterns établis adoptés :**
- Grille de boutons (StreamDeck) → Layout widgets
- Clic = Action (universel) → Comportement de base
- Feedback tactile (mobile) → Ripple, scale effects
- Drag & drop (desktop) → Réorganisation widgets
- Undo/Redo (productivité) → Actions réversibles

**Innovations MARV :**
- Widgets intelligents affichant données live
- Timeline editor intégré pour animations
- Système de conditions et queues
- Personnalisation visuelle sans limite

### Experience Mechanics

**Phase 1 - Initiation :**
- Widget visible → Label + icône indiquent action
- Hover → Élévation subtile + border accent
- Affordance claire → "Je peux cliquer"

**Phase 2 - Interaction :**
- Clic gauche → Ripple effect (< 50ms)
- Widget scale 0.95 → 1.0 (100ms)
- Action envoyée au backend

**Phase 3 - Feedback :**
- SUCCESS: Border glow accent + checkmark (1s) + toast optionnel
- LOADING: Spinner subtil + border animée
- ERROR: Border error + toast avec action suggérée

**Phase 4 - Completion :**
- Glow fade out (200ms ease-out)
- Widget retour état normal
- Prêt pour action suivante

---

## Visual Design Foundation

### Color System

**Palette de fond (Dark Theme) :**

| Token | Valeur | Usage |
|-------|--------|-------|
| `background` | `#0a0a0b` | Fond principal |
| `surface` | `#141416` | Cards, panels |
| `surface-elevated` | `#1c1c1f` | Modals, dropdowns |
| `surface-hover` | `#222225` | États hover |
| `border` | `#2a2a2d` | Bordures |

**Palette d'accent (Gradient Violet) :**

| Token | Valeur | Usage |
|-------|--------|-------|
| `accent` | `#8b5cf6` | Primary |
| `accent-secondary` | `#6366f1` | Gradient |
| `accent-hover` | `#a78bfa` | Hover |
| `accent-glow` | `rgba(139, 92, 246, 0.4)` | Glow effects |

**Couleurs sémantiques :**
- Success: `#10b981` (Emerald)
- Error: `#f43f5e` (Rose)
- Warning: `#f59e0b` (Amber)
- Info: `#3b82f6` (Blue)

### Typography System

**Police principale :** Inter (UI), JetBrains Mono (code)

**Échelle typographique :**

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-xs` | 11px | 400 | Badges |
| `text-sm` | 13px | 400 | Labels |
| `text-base` | 14px | 400 | Body |
| `text-lg` | 16px | 500 | Subtitles |
| `text-xl` | 18px | 600 | Section titles |
| `text-2xl` | 24px | 700 | Main titles |

### Spacing & Layout Foundation

**Échelle d'espacement (base 4px) :**
- Micro: 4px, 8px
- Standard: 12px, 16px, 20px
- Large: 24px, 32px, 40px

**Dimensions clés :**
- Topbar: 56px height
- Sidebar: 240px (64px collapsed)
- Widget: 100x100px standard
- Modal: 400/600/900px max-width

**Border radius :**
- Small: 4px (inputs)
- Default: 8px (buttons, cards)
- Large: 12px (modals)
- Full: 50% (avatars)

### Accessibility Considerations

**Contraste :**
- Texte principal: 19.5:1 (AAA)
- Texte secondaire: 7.2:1 (AAA)
- Accent sur fond: 5.8:1 (AA)

**Touch targets :**
- Minimum: 44x44px
- Widgets: 80x80px minimum
- Recommandé: 48x48px pour boutons

**Focus states :**
- Outline 2px accent avec offset 2px
- Visible uniquement en navigation clavier

---

## Design Direction Decision

### Design Directions Explored

**6 directions visuelles analysées :**

1. **Minimalist Pro** — Ultra-épuré, focus widgets, pour power users
2. **Gaming Neon** — Vibrant, gradients, glow effects gaming
3. **Discord Familiar** — Mental model Discord, familiarité immédiate
4. **Stream Deck Digital** — Skeuomorphisme, boutons 3D tactiles
5. **Modern Glass** — Glassmorphism, élégant, premium
6. **Command Center** — Data-rich, dashboard professionnel

### Chosen Direction

**Direction retenue : "Modern Glass"**

Philosophie : Élégance moderne avec profondeur visuelle. L'objectif "WOW" est atteint par un design premium qui impressionne sans sacrifier l'utilisabilité.

**Caractéristiques clés :**
- Glassmorphism subtil (blur, transparence)
- Sidebar collapsible pour navigation
- Grille de widgets fluide et responsive
- Gradients accent violet
- Élévation au hover, transitions 60fps
- Modals avec effet glass

### Design Rationale

| Objectif | Comment "Modern Glass" répond |
|----------|------------------------------|
| WOW Factor | Glassmorphism = impression premium immédiate |
| Tous niveaux | Layout intuitif (sidebar + grille) |
| Pas daté | Tendance 2024-2026, pas un style passager |
| Différenciation | Ni StreamDeck clone, ni Discord clone |
| Émotions cibles | Confiance (clair), satisfaction (beau), sérénité (épuré) |

### Implementation Approach

**Phase 1 — Fondations Glass :**
- Backdrop-filter blur pour surfaces
- Gradients de fond subtils
- Système d'élévation (shadow + glow)

**Phase 2 — Composants Core :**
- Topbar avec blur background
- Sidebar collapsible avec glass effect
- Widget cards avec hover elevation

**Phase 3 — Polish :**
- Micro-animations (hover, click, transitions)
- États de feedback (success glow, error border)
- Responsive adaptations

---

## User Journey Flows

### Journey 1: First Launch (Onboarding)

**Objectif :** Utilisateur opérationnel en < 60 secondes

**Flow :**
1. Écran Welcome avec animation logo
2. Détection auto OBS sur réseau local
3. Bouton unique "Connecter" si détecté
4. Création panel par défaut avec widgets essentiels
5. Tooltip guidance légère

**Succès :** OBS connecté + premier widget cliqué

### Journey 2: Widget Click (Core Experience)

**Objectif :** Action instantanée et satisfaisante

**Flow :**
1. Hover → élévation + border accent (< 50ms)
2. Clic → ripple effect (< 16ms)
3. Action → feedback visuel (< 200ms)
4. Success → glow + toast optionnel
5. Error → message clair + action suggérée

**Succès :** Feedback en < 200ms total

### Journey 3: Create Panel

**Objectif :** Organisation personnalisée sans friction

**Flow :**
1. Clic "+" dans sidebar OU clic-droit OU Ctrl+N
2. Panel créé avec nom par défaut
3. Rename inline immédiat
4. Panel vide avec zone drop

**Succès :** Panel créé et nommé en < 5 secondes

### Journey 4: Add Widget

**Objectif :** Configuration intuitive et rapide

**Flow :**
1. Drag depuis sidebar OU clic-droit OU double-clic
2. Catalogue par catégories (OBS/Twitch/Anime)
3. Widget créé à position drop
4. Config en drawer si nécessaire
5. Preview temps réel

**Succès :** Widget fonctionnel en < 30 secondes

### Journey 5: Connect OBS

**Objectif :** Connexion sans connaissance technique

**Flow :**
1. Clic icône OBS dans topbar
2. Auto-détection sur localhost
3. Bouton "Connecter" si détecté
4. Sinon: aide inline avec suggestions
5. Feedback succès/erreur clair

**Succès :** Connecté en 1 clic si auto-détecté

### Journey 6: Live Usage

**Objectif :** Actions rapides sous pression

**Flow :**
1. Notifications non-bloquantes
2. Raccourcis clavier (1-9 pour panels)
3. Recherche rapide (Ctrl+K)
4. Zones cliquables généreuses
5. Feedback instantané, non-distrayant

**Succès :** Action trouvée en < 1s, exécutée en < 100ms

### Journey Patterns

**Navigation :**
- Sidebar persistante + raccourcis 1-9
- Recherche globale Ctrl+K
- Breadcrumb en édition

**Actions :**
- Un clic = action directe
- Double-clic = édition
- Drag & drop = réorganisation

**Feedback :**
- Hover elevation (affordance)
- Success glow (confirmation)
- Toast non-bloquant (info)
- Inline errors (aide contextuelle)

### Flow Optimization Principles

1. **Minimum clicks** — Chaque étape supprime une action inutile
2. **Auto-detection** — Le système devine ce qu'il peut
3. **Inline over modal** — Moins de contexte perdu
4. **Progressive disclosure** — Simple par défaut, détails sur demande
5. **Keyboard first** — Power users récompensés

---

## Component Strategy

### Design System Components

**Composants existants à moderniser (15) :**

| Composant | Action |
|-----------|--------|
| Button | Gradient, ripple effect, glow states |
| Input | Focus ring accent, smooth transitions |
| Checkbox/Switch | Animated check, smooth toggle |
| Select | Glass dropdown, smooth open |
| Modal | Glassmorphism, blur backdrop |
| Menu/ContextMenu | Glass effect, hover states |
| Progressbar | Gradient fill, pulse animation |
| Overlay | Blur backdrop |
| Toast/Notify | Glass style, slide animations |
| Tippy/Tooltip | Glass style |

**Composants conservés sans modification (5) :**
- Flexbar, Separator, Splitter, Icon, FileIcon

### Custom Components

**Nouveaux composants à créer (8) :**

1. **GlassCard** — Container base avec glassmorphism
2. **WidgetCard** — Widget avec feedback complet (ripple, glow, states)
3. **Sidebar** — Navigation collapsible avec panels + catalogue
4. **CommandPalette** — Recherche rapide Ctrl+K
5. **StatusBadge** — Indicateurs connexion compacts
6. **ToastNotification** — Notifications avec actions
7. **InlineEdit** — Édition inline pour noms
8. **WidgetCatalogue** — Browser widgets draggable

### Component Implementation Strategy

**Principes de développement :**

1. **Tokens first** — Tous les composants utilisent les design tokens
2. **Composition** — GlassCard comme base réutilisable
3. **States complets** — Chaque composant gère tous ses états
4. **A11y intégré** — ARIA labels et keyboard support dès le départ
5. **Animation performante** — CSS transforms, will-change, 60fps

**Patterns de feedback :**

| Interaction | Feedback |
|-------------|----------|
| Hover | Élévation + border accent |
| Click | Ripple + scale |
| Success | Glow vert + icon check |
| Error | Border rouge + shake subtil |
| Loading | Spinner + border animée |

### Implementation Roadmap

**Phase 1 — Fondations :**
- GlassCard, Button, WidgetCard, Topbar, StatusBadge

**Phase 2 — Navigation :**
- Sidebar, Tabs, CommandPalette, InlineEdit

**Phase 3 — Feedback :**
- ToastNotification, Modal, ContextMenu, Tooltip

**Phase 4 — Polish :**
- WidgetCatalogue, Input, Select, Checkbox/Switch

---

## UX Consistency Patterns

### Widget Interaction Patterns

**Actions :**
- Clic gauche = Action primaire
- Clic droit = Menu contextuel
- Double-clic = Édition
- Drag (mode edit) = Réorganisation

**États visuels :**
- Default: border-default, elevation-1
- Hover: border-accent, elevation-2
- Active: scale(0.95), ripple effect
- Success: glow emerald (1s)
- Error: border rose, subtle shake
- Loading: spinner overlay, border animée

### Feedback Patterns

| Type | Couleur | Widget | Toast |
|------|---------|--------|-------|
| Success | `#10b981` | Glow + check | 3s auto-dismiss |
| Error | `#f43f5e` | Border + shake | Persist + action |
| Warning | `#f59e0b` | Border pulse | Persist |
| Info | `#3b82f6` | — | 3s auto-dismiss |
| Loading | — | Spinner overlay | — |

### Navigation Patterns

**Structure :** Topbar + Sidebar + Content Area

**Comportements :**
- Panel switch: fade 150ms
- Sidebar collapse: 240px → 64px (200ms)
- Raccourcis: 1-9 panels, Ctrl+K search
- Panel actif: bg accent-muted + border-left

### Button Hierarchy

| Level | Usage | Style |
|-------|-------|-------|
| Primary | Action principale (1/écran) | Gradient accent |
| Secondary | Alternatives | Border accent |
| Ghost | Tertiaire | Text only |
| Danger | Destructif | Rouge + confirmation |

### Modal & Drawer Patterns

**Modal :** Décisions, confirmations
- Backdrop blur, Escape/X/backdrop = close
- Sizes: 400/600/900px

**Drawer :** Édition, settings
- Right for edit, Left for nav
- Width: 320/480px

### Empty & Loading States

**Empty :** Message contextuel + CTA

**Loading :**
- < 200ms: rien
- 200ms-1s: spinner inline
- > 1s: skeleton pulse

---

## Responsive Design & Accessibility

### Responsive Strategy

**Approche : Desktop-First Adaptive**

MARV est une application desktop Electron optimisée pour le second écran du streamer. La stratégie responsive vise l'adaptation aux différentes tailles d'écrans desktop plutôt qu'une approche mobile-first.

**Breakpoints :**

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `compact` | < 1024px | Laptop 13", sidebar collapsée par défaut |
| `standard` | 1024-1440px | Écrans 15-21" |
| `expanded` | > 1440px | Écrans 24"+, multi-colonnes possible |

### Layout Adaptations

**Compact (< 1024px) :**
- Sidebar collapsée par défaut (64px)
- Widgets 80x80px minimum
- Topbar condensée
- Modals pleine largeur

**Standard (1024-1440px) :**
- Sidebar expandable (240px)
- Widgets 100x100px standard
- Layout optimal par défaut

**Expanded (> 1440px) :**
- Possibilité multi-panels côte à côte
- Widgets jusqu'à 120x120px
- Espacement généreux

### Accessibility Standards

**Conformité cible : WCAG 2.1 AA**

**Contraste :**
- Texte normal : minimum 4.5:1
- Texte large (18px+) : minimum 3:1
- Éléments interactifs : minimum 3:1

**Navigation clavier :**
- Tab order logique
- Focus visible (outline 2px accent)
- Raccourcis documentés
- Escape ferme modals/drawers

**Screen readers :**
- ARIA labels sur tous les contrôles
- Live regions pour notifications
- Structure sémantique (landmarks)
- Alt text sur icônes signifiantes

### Inclusive Design Patterns

**Réduction de mouvement :**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**High contrast mode :**
- Bordures renforcées automatiquement
- Suppression effets glassmorphism
- Contrastes maximisés

**Touch targets :**
- Minimum 44x44px (WCAG)
- Widgets 80x80px minimum
- Espacement 8px entre éléments cliquables

### Keyboard Shortcuts

| Raccourci | Action |
|-----------|--------|
| `1-9` | Accès panels 1-9 |
| `Ctrl+K` | Recherche rapide |
| `Ctrl+N` | Nouveau panel |
| `Escape` | Fermer modal/drawer |
| `Enter` | Valider action |
| `Tab` | Navigation focus |
| `Space` | Activer widget focusé |

### Implementation Checklist

**Responsive :**
- [ ] Breakpoints CSS variables
- [ ] Sidebar collapse automatique < 1024px
- [ ] Grid widgets responsive
- [ ] Touch-friendly mode optionnel

**Accessibilité :**
- [ ] Audit contraste complet
- [ ] ARIA labels tous composants
- [ ] Navigation clavier testée
- [ ] Screen reader testing (NVDA/VoiceOver)
- [ ] Reduced motion support
- [ ] Focus management modals

---

## Conclusion

Ce document de spécification UX définit la vision complète du redesign de MARV. Il servira de référence pour :

1. **L'équipe design** — Direction visuelle et patterns d'interaction
2. **L'équipe développement** — Composants à créer et comportements attendus
3. **L'équipe QA** — Critères d'acceptation UX et accessibilité

**Prochaines étapes recommandées :**
- Création de wireframes interactifs
- Prototype Figma haute fidélité
- Architecture technique détaillée
- Création des epics et stories de développement

---

*Document généré via le workflow BMAD Create UX Design*
*Version : 1.0 | Status : Complet*
