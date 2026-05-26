# Recipe Explorer Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the recipe card list and detail view with warm fill styling, rich metadata, keyboard accessibility, and `prefers-reduced-motion` guards on all animations.

**Architecture:** Pure CSS and component markup changes — no new hooks, no new data fetching. The type fix in Task 1 unlocks `recipe.meta.yieldGrams` for the card. Each task is self-contained and commits independently.

**Tech Stack:** React 18, TypeScript, Vitest, plain CSS modules, Vite dev server

---

## File Map

| File | Change |
|---|---|
| `src/types/models.ts` | Fix field name mismatches (`Meta`→`meta`, `yeildGrams`→`yieldGrams`, `userID`→`userId`) |
| `src/Components/RecipeCard/recipeCard.tsx` | Convert to `<button>`, add rich metadata content |
| `src/Components/RecipeCard/recipeCard.css` | Replace glassmorphism with warm fill, guard shimmer with `prefers-reduced-motion` |
| `src/Components/RecipeDetailView/recipeDetailView.tsx` | Add section label `<div>` elements, wrap columns |
| `src/Components/RecipeDetailView/recipeDetailView.css` | Section labels, ingredient row dividers, CSS counter steps |
| `src/Components/WaveText/waveText.css` | Guard wave + colors animations with `prefers-reduced-motion` |
| `src/Components/Header/header.css` | Guard mobile bread icon pulse with `prefers-reduced-motion` |

---

## Task 1: Fix TypeScript type field names

The Go backend (`breadmachine/models/recipe.go`) uses JSON tags `json:"meta"` and `json:"yieldGrams"` and `json:"userId,omitempty"`. The TypeScript types have mismatched names that prevent accessing `recipe.meta.yieldGrams` in the card.

**Files:**
- Modify: `src/types/models.ts`

- [ ] **Step 1: Update `models.ts`**

Replace the entire file with:

```typescript
export interface Ingredient {
  id: string;
  ingredientName: string;
  bakerPercentage: number;
  quantity: number;
  unit: string;
  Grams: number;
  phase: "dough" | "scald" | "soak" | "autolyse";
  densityGPerMl: number;
}

export interface Meta {
  yieldGrams: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export type YeastType = "dry" | "sourdough";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  meta: Meta;
  userId: string;
  yeastType?: YeastType;
}
```

- [ ] **Step 2: Check for broken references**

```bash
npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors. If TypeScript reports errors referencing `recipe.Meta` or `recipe.userID` anywhere, update those call sites to `recipe.meta` / `recipe.userId`.

- [ ] **Step 3: Run existing tests to confirm nothing regressed**

```bash
npm test -- --run
```

Expected: all tests pass (the test files use `Ingredient.Grams` which is unchanged).

- [ ] **Step 4: Commit**

```bash
git add src/types/models.ts
git commit -m "fix: correct TypeScript Recipe type field names to match API JSON"
```

---

## Task 2: Guard WaveText animation with `prefers-reduced-motion`

The wave and colors animations run unconditionally. Users who have enabled reduced motion in their OS settings will see them anyway. Fix by wrapping the animation declarations — keep the gradient color styles outside the query so the text still looks good at rest.

**Files:**
- Modify: `src/Components/WaveText/waveText.css`

- [ ] **Step 1: Replace `waveText.css`**

```css
.wave {
  display: inline;
  white-space: nowrap;
}

.wave span {
  display: inline-block;
  position: relative;
  background: linear-gradient(135deg, hsla(12, 89%, 89%, 1) 0%, hsla(329, 82%, 76%, 1) 50%, hsla(342, 95%, 78%, 1) 100%);
  background-size: 500%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (prefers-reduced-motion: no-preference) {
  .wave span {
    animation: wave 2s ease-in-out infinite,
      colors 5s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.3s);
  }

  @keyframes wave {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }

  @keyframes colors {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/Components/WaveText/waveText.css
git commit -m "fix(a11y): guard WaveText animations with prefers-reduced-motion"
```

---

## Task 3: Guard header mobile pulse with `prefers-reduced-motion`

The bread icon button in the mobile header has a `jump` keyframe animation that bounces indefinitely to prompt the user to open the recipe drawer. It needs the same guard.

**Files:**
- Modify: `src/Components/Header/header.css`

- [ ] **Step 1: Move the `jump` keyframes and pulse rule inside a motion guard**

Inside the existing `@media (max-width: 480px)` block, replace:

```css
@keyframes jump {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-20px);
  }

  60% {
    transform: translateY(-10px);
  }
}

.recipesButton.pulse {
  animation: jump 1.5s ease infinite;
}
```

with:

```css
@media (prefers-reduced-motion: no-preference) {
  @keyframes jump {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }

    40% {
      transform: translateY(-20px);
    }

    60% {
      transform: translateY(-10px);
    }
  }

  .recipesButton.pulse {
    animation: jump 1.5s ease infinite;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/Components/Header/header.css
git commit -m "fix(a11y): guard mobile bread icon pulse animation with prefers-reduced-motion"
```

---

## Task 4: RecipeCard CSS — warm fill

Replace the glassmorphism card style (which has no visible effect on a solid background) with a warm fill treatment. Move the shimmer animation inside a `prefers-reduced-motion` guard.

**Files:**
- Modify: `src/Components/RecipeCard/recipeCard.css`

- [ ] **Step 1: Replace `recipeCard.css`**

```css
.recipeCard {
  background: rgba(202, 150, 92, 0.12);
  color: var(--text-color);
  margin-bottom: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: background 0.2s ease, transform 0.15s ease;
  text-align: left;
  border: none;
  width: 100%;
  font-size: inherit;
  font-family: inherit;
}

.recipeCard:hover {
  background: rgba(202, 150, 92, 0.22);
  transform: translateY(-2px);
}

.recipeCard.active {
  background: rgba(202, 150, 92, 0.30);
  box-shadow: inset 3px 0 0 #EEC373;
}

.recipeCard:focus-visible {
  outline: 2px solid #EEC373;
  outline-offset: 2px;
}

.cardTitle {
  font-weight: 600;
  font-size: 0.9rem;
}

.cardDesc {
  font-size: 0.8rem;
  opacity: 0.75;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 3px;
}

.cardMeta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  flex-wrap: wrap;
}

.yieldLabel {
  font-size: 0.72rem;
  opacity: 0.55;
}

.yeastBadge {
  font-size: 0.68rem;
  padding: 2px 8px;
  border-radius: 20px;
  background: rgba(238, 195, 115, 0.15);
  color: #EEC373;
  border: 1px solid rgba(238, 195, 115, 0.25);
}

@media (prefers-reduced-motion: no-preference) {
  .recipeCard::before {
    content: "";
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(202, 150, 92, 0.35),
      transparent
    );
    transform: skewX(-20deg);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .recipeCard:hover::before {
    opacity: 0.2;
    animation: shimmer 1.2s ease-out forwards;
  }

  @keyframes shimmer {
    0% { left: -75%; }
    100% { left: 125%; }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/Components/RecipeCard/recipeCard.css
git commit -m "feat: replace glassmorphism recipe card with warm fill style"
```

---

## Task 5: RecipeCard component — rich metadata + keyboard accessible

Convert the card from a `<div>` (not keyboard reachable) to a `<button>`. Add description, yield, and inferred yeast type badge. Wire up the `isActive` prop that was previously ignored.

**Files:**
- Modify: `src/Components/RecipeCard/recipeCard.tsx`

- [ ] **Step 1: Replace `recipeCard.tsx`**

```tsx
import { Recipe } from "../../types/models";
import { isStarter } from "../../Utility/ingredientMatchers";
import "./recipeCard.css";

type RecipeCardProps = {
  recipe: Recipe;
  isActive: boolean;
  onClick: () => void;
};

const RecipeCard = ({ recipe, isActive, onClick }: RecipeCardProps) => {
  const yeastLabel = recipe.ingredients.some(i => isStarter(i.ingredientName))
    ? "sourdough"
    : "dry yeast";

  const yieldDisplay = recipe.meta.yieldGrams
    ? `${Math.round(recipe.meta.yieldGrams)}g`
    : null;

  return (
    <button
      type="button"
      className={`recipeCard${isActive ? " active" : ""}`}
      onClick={onClick}
    >
      <div className="cardTitle">{recipe.title}</div>
      {recipe.description && (
        <div className="cardDesc">{recipe.description}</div>
      )}
      <div className="cardMeta">
        {yieldDisplay && <span className="yieldLabel">{yieldDisplay}</span>}
        <span className="yeastBadge">{yeastLabel}</span>
      </div>
    </button>
  );
};

export default RecipeCard;
```

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/Components/RecipeCard/recipeCard.tsx
git commit -m "feat: add rich metadata to recipe card and make keyboard accessible"
```

---

## Task 6: RecipeDetailView CSS — section labels, row borders, step counters

**Files:**
- Modify: `src/Components/RecipeDetailView/recipeDetailView.css`

- [ ] **Step 1: Replace `recipeDetailView.css`**

```css
.recipeDetailView {
  display: flex;
  flex-direction: column;
  color: var(--text-color);
  padding: 0 40px;
  overflow-y: auto;
  height: 100%;
}

.recipeDetailView h2 {
  font-size: 2rem;
  line-height: 1.3;
  border-bottom: 1px solid rgba(238, 195, 115, 0.25);
  margin-bottom: 0.25rem;
}

.recipeDetailView h5 {
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.7;
  margin-bottom: 0;
}

.body {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  margin-top: 32px;
  gap: 24px;
}

.sectionLabel {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #EEC373;
  opacity: 0.85;
  margin-bottom: 10px;
}

.ingredients {
  font-size: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredients li {
  padding: 6px 0;
  border-bottom: 1px solid rgba(244, 223, 186, 0.07);
}

.ingredients li:last-child {
  border-bottom: none;
}

.instructions {
  font-size: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: steps;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.instructions li {
  counter-increment: steps;
  display: flex;
  gap: 10px;
  line-height: 1.5;
}

.instructions li::before {
  content: counter(steps);
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(202, 150, 92, 0.2);
  border: 1px solid rgba(202, 150, 92, 0.35);
  color: #EEC373;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

@media screen and (max-width: 480px) {
  .body {
    display: flex;
    flex-direction: column;
  }

  .recipeDetailView {
    padding: 0 16px;
  }
}

.toggleRow {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.toggleRow .toggleWrapper {
  margin-bottom: 0;
}

.toggleDivider {
  width: 1px;
  height: 28px;
  background-color: #3a2e24;
  flex-shrink: 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/Components/RecipeDetailView/recipeDetailView.css
git commit -m "feat: add section labels, row borders, and step counters to recipe detail view"
```

---

## Task 7: RecipeDetailView component — add section label elements

Add the `sectionLabel` divs and wrap each column in a `<div>` so the label sits above its list.

**Files:**
- Modify: `src/Components/RecipeDetailView/recipeDetailView.tsx`

- [ ] **Step 1: Update the `body` JSX in `recipeDetailView.tsx`**

Find the `<div className="body">` block (currently lines 87–99) and replace it with:

```tsx
<div className="body">
  <div>
    <div className="sectionLabel">Ingredients</div>
    <ul className="ingredients">
      {displayIngredients.map(ing => (
        <li key={ing.ingredientName}>
          {displayIngredient(ing)}
        </li>
      ))}
    </ul>
  </div>
  <div>
    <div className="sectionLabel">Instructions</div>
    <ol className="instructions">
      {recipe.instructions.map(inst => (
        <li key={inst}>{inst}</li>
      ))}
    </ol>
  </div>
</div>
```

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/Components/RecipeDetailView/recipeDetailView.tsx
git commit -m "feat: add Ingredients and Instructions section labels to recipe detail view"
```

---

## Task 8: Visual verification

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:5173` in a browser.

- [ ] **Step 2: Verify recipe cards**

Navigate to `/tab`. Check:
- Cards show title, truncated description, yield (e.g. `997g`), and a yeast badge (`sourdough` or `dry yeast`)
- Clicking a card highlights it with a gold left border and deeper fill
- Tabbing through the card list moves focus visibly (gold outline)
- The shimmer sweep fires on hover

- [ ] **Step 3: Verify recipe detail view**

Click a recipe. Check:
- Title has a warm gold ruled underline (not stark white)
- "Ingredients" and "Instructions" labels appear in small uppercase gold above their lists
- Ingredient rows have subtle separator lines
- Instructions are numbered with small gold circles

- [ ] **Step 4: Verify reduced motion**

In browser DevTools → Rendering tab → enable "Emulate CSS media feature prefers-reduced-motion: reduce". Reload. Check:
- Card shimmer does not animate on hover
- WaveText on the mobile recipe prompt is static (gradient color only, no bounce)
- Mobile bread icon does not pulse

- [ ] **Step 5: Run full test suite**

```bash
npm test -- --run
```

Expected: all existing tests pass.

- [ ] **Step 6: Commit if any fixups were needed**

```bash
git add -p
git commit -m "fix: visual verification fixups for recipe explorer redesign"
```
