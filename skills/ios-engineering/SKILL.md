---
name: ios-engineering
description: House engineering conventions for the iOS apps this studio builds — SwiftUI architecture, Swift 6 concurrency, Swift Testing, layering, and accessibility rules that every developer and reviewer enforces
type: prompt
whenToUse: When writing, modifying, or reviewing Swift/SwiftUI code in a studio project, and during architecture decisions
---

# iOS engineering conventions

Adapted from the MIT-licensed `app` skills bundle (mintuz/skills) and build-ios-apps-marketplace;
see `THIRD_PARTY_NOTICES.md`.

## Stack defaults

- SwiftUI only (no UIKit), Swift 6 language mode, minimum iOS 17.
- SwiftData for local persistence unless the PRD says otherwise; CloudKit only on explicit scope.
- Swift Package Manager for modules; no CocoaPods/Carthage.
- Dependencies are opt-out by default: add one only with a one-line justification in the PR or
  it gets removed in review.

## Architecture

- State with `@Observable` models (no `ObservableObject`/`@Published`); views read models
  directly. Reach for a ViewModel only when the PRD's complexity justifies it, and say why.
- One feature per Swift Package: `FeatureName` (UI + model) depending on a thin `Core` package
  (design tokens, shared utilities). No cross-feature imports.
- Dependency injection by initializer; no singletons except genuinely app-wide state
  (e.g. the model container).
- Navigation with `NavigationStack` + typed paths; deep-linkable screens get their case.

## Swift 6 concurrency

- `Sendable` everywhere data crosses concurrency domains; actors only for shared mutable state.
- No `DispatchQueue`; use structured concurrency (`async`/`await`, `TaskGroup`).
- Main-actor isolation for all view state mutations — a purple "purple warning" runtime issue
  is a review blocker.

## Testing

- Swift Testing (`@Test`, `#expect`, `#require`) — no XCTest for new tests.
- Name tests after behavior: `addingDuplicateHabitKeepsOriginalOrder()`.
- Every bug fix lands with a regression test that fails without the fix.

## Accessibility and polish (review gate checks)

- Every image/button has a meaningful `accessibilityLabel`; Dynamic Type and VoiceOver pass.
- Loading, empty, and error states specified in `docs/12-design.md` are implemented — a screen
  with only its happy path is incomplete.
- Design tokens (colors, spacing, type) come from the tokens in `docs/12-design.md`, never
  hard-coded literals in views.
