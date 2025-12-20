# Refactor Animated Header System (Navigation-Owned Only)

## Hard Constraint
- AnimatedHeader MUST exist only inside navigation
- No screen may import, render, or configure headers
- No `navigation.setOptions` from screens
- Screens remain completely unaware of header behavior

---

## Goal
Refactor the animated header system to:
- Keep header logic fully inside navigation
- Preserve zero-configuration screens
- Remove route-name–keyed scroll state
- Avoid storing Animated.Values directly in Context
- Make the system lifecycle-safe and instance-safe

---

## Core Design Change

### Replace route-name–based scroll registry
❌ `scrollMap[route.name]`

### With navigation-key–scoped channels
✅ Use `route.key` or focus-aware registration
✅ One active scroll channel per focused screen

---

## Step 1: Refactor ScrollContext → ScrollChannelContext

ScrollContext should:
- Track ONLY the currently focused scroll channel
- Expose:
  - `setActiveScrollChannel(channel)`
  - `clearActiveScrollChannel()`
  - `activeScrollChannel`

A scroll channel contains:
- `scrollY` (Animated.Value or SharedValue)
- `isCollapsed` (derived boolean or derived value)

DO NOT:
- Store multiple screens
- Store maps keyed by route names

---

## Step 2: AutoScrollView Responsibilities

AutoScrollView should:
- Create its own scrollY animated value
- Detect focus using `useFocusEffect`
- Register itself as the active scroll channel ON FOCUS
- Unregister ON BLUR / UNMOUNT

It must NOT:
- Know anything about headers
- Reference navigation options
- Reference route names

---

## Step 3: AnimatedHeader Responsibilities

AnimatedHeader should:
- Read ONLY the active scroll channel from context
- Gracefully handle `null` (no scroll)
- Animate based on the active channel only
- Use explicit scroll thresholds, not opacity inversion

Floating back button logic:
- Driven by `isCollapsed`
- Not inverse opacity math

---

## Step 4: RootNavigator Responsibilities

RootNavigator should:
- Decide which routes use AnimatedHeader
- Render AnimatedHeader ONLY in `header`
- Never manage scroll state
- Never reference scroll values directly

---

## Step 5: Lifecycle Safety

Ensure:
- Only ONE scroll channel is active at a time
- Channel is cleared when screen loses focus
- Header animations reset cleanly on navigation transitions

---

## Expected Outcome

- Header logic remains fully inside navigation
- Screens stay 100% clean
- No route-name coupling
- No global animated value registry
- Safe with nested navigators and repeated screens
- Predictable, debuggable behavior
