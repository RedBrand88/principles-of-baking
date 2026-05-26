# Visual Design Improvements

**Date:** 2026-05-25
**Scope:** Recipe Explorer (cards + detail view), About Me page
**Approach:** One section at a time — Recipe Explorer first, then About Me

---

## Goals

- Fix visual gaps and ADA issues in the recipe explorer and about me page
- Establish a consistent visual language across components (gold labels, warm fill surfaces, ruled dividers)
- Keep whimsical animations (shimmer sweep) while making them ADA-compliant
- Improve keyboard accessibility throughout

---

## Section 1: Recipe Explorer

### 1a. RecipeCard

**Component changes:**
- Replace the `<div>` root element with `<button>` so the card is keyboard-reachable and has an implicit `role="button"`
- Use the `isActive` prop (currently passed but ignored) to apply the active style class

**Content — rich metadata:**
- Title (bold, `0.9rem`)
- Description truncated to one line (`overflow: hidden; white-space: nowrap; text-overflow: ellipsis; opacity: 0.75`)
- Yield in grams sourced from `recipe.Meta.yieldGrams` — displayed as e.g. `996g`
- Yeast type badge: inferred from ingredients using the existing `isStarter` utility — shows "sourdough" or "dry yeast" as a small pill

**Note:** `Meta.tags` is not present in Firestore documents. Tags will be omitted from cards until a backend tagging system is added. The card design accommodates tags gracefully when they arrive.

**Styling — warm fill:**

Remove `backdrop-filter: blur(10px)` from `.recipeCard` — it has no effect against the solid `#45484A` background and carries a layout/paint cost for zero visual payoff. The warm fill gradient replaces it entirely.

```css
/* resting */
background: rgba(202, 150, 92, 0.12);
border-radius: 10px;
padding: 10px 12px;
transition: background 0.2s ease, transform 0.15s ease;

/* hover */
background: rgba(202, 150, 92, 0.22);
transform: translateY(-2px);

/* active */
background: rgba(202, 150, 92, 0.30);
box-shadow: inset 3px 0 0 #EEC373;

/* focus-visible */
outline: 2px solid #EEC373;
outline-offset: 2px;
```

**Shimmer animation — ADA guard:**
```css
@media (prefers-reduced-motion: no-preference) {
  .recipeCard::before { /* shimmer sweep */ }
  .recipeCard:hover::before { animation: shimmer 1.2s ease-out forwards; }
}
```

**Data model fixes (alongside card work):**
- `Meta` → `meta` (field name casing mismatch between Firestore and TypeScript type)
- `yeildGrams` → `yieldGrams` (typo in TypeScript type — Firestore uses correct spelling)
- `userID` → `userId` (casing mismatch)

Fix the TypeScript `Recipe` interface and any fetch/mapping code that references these fields.

---

### 1b. RecipeDetailView

No structural changes to the layout (two-column grid, toggle row, overflow behavior all stay).

**Visual changes:**

Header area:
- Title (`h2`) and description (`h5`) stay
- Replace the current `border-bottom: 1px solid var(--text-color)` with a warmer ruled line: `border-bottom: 1px solid rgba(238, 195, 115, 0.25)`

Ingredients column:
- Add an uppercase gold section label above the list: `INGREDIENTS`, `font-size: 0.68rem; letter-spacing: 0.1em; color: #EEC373`
- Remove default `list-style`
- Each `<li>` gets a subtle bottom border: `border-bottom: 1px solid rgba(244, 223, 186, 0.07)`, last child has none

Instructions column:
- Add an uppercase gold section label above the list: `INSTRUCTIONS`
- Replace bare `<ol>` numbering with CSS counters — each step gets a small gold circle badge (20px, `background: rgba(202, 150, 92, 0.2)`, `border: 1px solid rgba(202, 150, 92, 0.35)`, `color: #EEC373`)
- Step layout: `display: flex; gap: 10px` with the number badge as a flex-shrunk pseudo-element

**ADA:**
- Add `:focus-visible` styles to UnitToggle and YeastToggle if not already present

---

## Section 2: About Me

### Layout

Two zones, full-width:

**Hero zone:**
- Background: `linear-gradient(180deg, rgba(202, 150, 92, 0.12) 0%, transparent 100%)` — same warm wash as landing glass card
- Bottom border: `1px solid rgba(238, 195, 115, 0.15)`
- Content: avatar (circular, existing size) + name (`h1`) + role subtitle in gold + social link pills in normal document flow (no absolute positioning)
- Social pills: `background: rgba(202, 150, 92, 0.15); border: 1px solid rgba(202, 150, 92, 0.3); border-radius: 20px; padding: 3px 12px; color: #EEC373`

**Content zone:**
- Two-column grid (`grid-template-columns: 1fr 1fr; gap: 24px`) below the hero
- Left panel — "About the site": condensed site description paragraph + CV download button
- Right panel — "Baking & background": baking origin story + ruled gold divider + dev background paragraph
- Each panel has an uppercase gold section label matching the recipe detail view treatment

**Original text:** The existing body paragraphs are preserved verbatim in JSX comments directly above the condensed versions. No text is deleted.

**Mobile (max-width: 480px):**
- Hero: avatar centered above name/role/socials (column direction)
- Content: single column, panels stack vertically

---

## ADA Requirements (applies to both sections)

| Requirement | Where |
|---|---|
| `prefers-reduced-motion` guard | RecipeCard shimmer, WaveText, mobile bread icon pulse/jump |
| `<button>` for interactive cards | RecipeCard |
| `:focus-visible` outline (gold, 2px) | RecipeCard, nav links, toggles |
| Social links have visible text (not icon-only) | AboutMe hero pills |

---

## Out of scope

- Landing page (not selected)
- Learning steps (not selected)
- Auto-tagging backend for recipes
- Any changes to recipe data in Firestore
- ScaleBreadRecipe, AddBreadRecipe, Calendar tabs

---

## Implementation order

1. Fix data model field names (`meta`, `yieldGrams`, `userId`) in TypeScript types and fetch hooks
2. Implement RecipeCard (Section 1a)
3. Implement RecipeDetailView styling (Section 1b)
4. Implement AboutMe redesign (Section 2)

Each section ships as its own implementation plan and commit.
