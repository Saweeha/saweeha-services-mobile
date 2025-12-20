# Animated Header System

This document explains how the animated header system works in the application. The system provides automatic header show/hide functionality based on scroll position, with a floating back button when the header is hidden.

## Overview

The animated header system is designed to be **completely automatic** - screens don't need to know about headers. All header logic is handled in the navigation configuration, and screens simply use `AutoScrollView` instead of regular `ScrollView`.

**Key Design Principles:**
- ✅ Header logic exists **only inside navigation** - screens never import or configure headers
- ✅ **Zero-configuration screens** - screens remain completely unaware of header behavior
- ✅ **Focus-aware registration** - uses navigation focus state, not route names
- ✅ **Lifecycle-safe** - only one active scroll channel at a time
- ✅ **Instance-safe** - works with nested navigators and repeated screens

## Architecture

### Components

1. **ScrollChannelContext** (`src/contexts/ScrollContext.js`)
   - Tracks **only the currently focused scroll channel** (not multiple screens)
   - Provides `setActiveScrollChannel`, `clearActiveScrollChannel`, and `activeScrollChannel`
   - Uses React Context API
   - **No route-name coupling** - uses focus state instead

2. **AutoScrollView** (`src/components/AutoScrollView/AutoScrollView.js`)
   - Drop-in replacement for `Animated.ScrollView`
   - Creates its own `scrollY` animated value
   - Uses `useFocusEffect` to detect screen focus/blur
   - Registers as active scroll channel **ON FOCUS**
   - Unregisters **ON BLUR / UNMOUNT**
   - **Does NOT** reference route names or navigation options

3. **AutoFlatList** (`src/components/AutoFlatList/AutoFlatList.js`)
   - Same behavior as `AutoScrollView` but for `FlatList`
   - Focus-aware registration and lifecycle management

4. **AnimatedHeader** (`src/components/AnimatedHeader/AnimatedHeader.js`)
   - Handles header show/hide animations
   - Shows floating back button when header is hidden
   - Reads **only the active scroll channel** from context
   - Gracefully handles `null` (no active scroll channel)
   - Uses explicit scroll thresholds (not opacity inversion)

5. **RootNavigator** (`src/navigation/RootNavigator.js`)
   - Decides which routes use `AnimatedHeader`
   - Renders `AnimatedHeader` **only in `header` prop**
   - Never manages scroll state directly
   - All header configuration is centralized here

## How It Works

### Flow Diagram

```
Screen Component
    │
    │ Uses AutoScrollView
    │
    ▼
AutoScrollView
    │
    │ Creates scrollY Animated.Value
    │ Detects focus via useFocusEffect
    │ Registers scroll channel ON FOCUS
    │
    ▼
ScrollChannelContext
    │
    │ Tracks ONLY active scroll channel
    │ (one at a time, focus-aware)
    │
    ▼
AnimatedHeader (in Navigation)
    │
    │ Reads active scroll channel
    │ Animates opacity/transform
    │ Shows floating back button when hidden
    │
    ▼
Screen loses focus
    │
    │ AutoScrollView unregisters
    │ ScrollChannelContext clears active channel
```

### Step-by-Step

1. **Screen renders `AutoScrollView`**
   - Component creates its own `Animated.Value` for scroll position
   - Creates a scroll channel object containing:
     - `scrollY`: The animated scroll value
     - `isCollapsed`: Derived value (0 when scrollY < threshold, 1 when scrollY >= threshold)

2. **Screen gains focus**
   - `useFocusEffect` callback fires
   - `AutoScrollView` registers its scroll channel as the active channel
   - `ScrollChannelContext` stores this as the single active channel

3. **User scrolls**
   - `AutoScrollView` updates the `scrollY` animated value on scroll events
   - The active scroll channel's `scrollY` value updates
   - `AnimatedHeader` (which reads the active channel) receives updates

4. **Header animates**
   - `AnimatedHeader` reads `scrollY` from the active scroll channel
   - Uses interpolation to calculate opacity and transform values
   - Animates header visibility based on scroll threshold (default: 100px)
   - Floating back button appears when header is hidden (using explicit thresholds)

5. **Screen loses focus**
   - `useFocusEffect` cleanup callback fires
   - `AutoScrollView` clears the active scroll channel
   - Scroll position resets to 0
   - Header animations reset cleanly

## Scroll Channel Structure

A scroll channel is an object containing:

```javascript
{
  scrollY: Animated.Value,        // The scroll position value
  isCollapsed: Animated.Value      // Derived: 0 when scrollY < threshold, 1 when scrollY >= threshold
}
```

**Key Points:**
- Only **one scroll channel is active at a time** (the focused screen)
- Channels are registered/unregistered based on focus state
- No route-name coupling - works with any screen instance
- Lifecycle-safe - channels are cleared on blur/unmount

## Usage

### For Screens

Simply use `AutoScrollView` instead of `Animated.ScrollView`:

```javascript
import AutoScrollView from '../components/AutoScrollView/AutoScrollView';

const MyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AutoScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Your content */}
      </AutoScrollView>
    </SafeAreaView>
  );
};
```

**That's it!** No header imports, no scroll tracking, no configuration needed.

**Important Constraints:**
- ❌ **Never** import `AnimatedHeader` in screens
- ❌ **Never** use `navigation.setOptions` to configure headers
- ❌ **Never** reference route names for scroll tracking
- ✅ Screens remain completely unaware of header behavior

### For Navigation

Configure which screens use animated headers in `headerConfig.js`:

```javascript
// src/navigation/headerConfig.js
export const ANIMATED_HEADER_SCREENS = ['Business'];

export const getHeaderOptions = (navigation, route) => {
  const needsAnimatedHeader = shouldUseAnimatedHeader(route.name);

  return {
    headerShown: true,
    headerTransparent: needsAnimatedHeader, // Required for animations
    headerShadowVisible: false,
    header: ({ options }) => getHeaderComponent(route, navigation, options),
  };
};
```

The `getHeaderComponent` function handles header rendering:

```javascript
export const getHeaderComponent = (route, navigation, options) => {
  const routeName = route.name;
  const needsAnimatedHeader = shouldUseAnimatedHeader(routeName);

  // Get title from route.params for dynamic updates
  const getTitle = () => {
    if (routeName === 'Business' && route.params?.business?.name) {
      return route.params.business.name;
    }
    return options.title || routeName;
  };

  if (needsAnimatedHeader) {
    return (
      <AnimatedHeader
        title={getTitle()}
        onBackPress={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        showBackButton={navigation.canGoBack()}
        rightComponent={options.headerRight}
        threshold={100}
      />
    );
  }

  return <CustomHeader {...} />;
};
```

### Configuration Options

#### AnimatedHeader Props

- `title` (required): Header title text (can be read from route.params for dynamic updates)
- `onBackPress` (optional): Back button handler
- `showBackButton` (optional): Whether to show back button
- `threshold` (optional, default: 100): Scroll position where header starts appearing
- `rightComponent` (optional): Custom component to render on right side

**Note:** `screenName` prop has been removed - header automatically reads from the active scroll channel.

#### AutoScrollView Props

Accepts all `Animated.ScrollView` props. The component automatically:
- Creates its own scrollY animated value
- Registers/unregisters based on focus state
- Handles scroll events with native driver

**Optional Props:**
- `threshold` (optional, default: 100): Used to derive `isCollapsed` value in scroll channel
- `onScroll` (optional): Additional scroll listener (called after internal handler)

## Animation Details

### Header Show/Hide

- **Threshold**: 100px (configurable via `threshold` prop)
- **Transition Range**: 100px - 150px (50px transition zone)
- **Opacity**: 0 (hidden) → 1 (visible)
- **Transform**: -20px translateY → 0 (slides down)

### Floating Back Button

- **Opacity**: 1 (visible) → 0 (hidden) - uses explicit scroll thresholds
- **Transform**: 0 → -20px translateY - slides up as header appears
- **Position**: Absolute, top-left with safe area insets
- **Logic**: Driven by explicit scroll thresholds (not inverse opacity math)

## Key Features

✅ **Zero Configuration**: Screens just use `AutoScrollView`  
✅ **Automatic**: Focus detection, scroll tracking, animations  
✅ **Centralized**: All header logic in navigation  
✅ **Clean Separation**: Screens don't import headers  
✅ **Floating Back Button**: Automatically shown when header is hidden  
✅ **Smooth Animations**: Native driver for 60fps performance  
✅ **Lifecycle-Safe**: Only one active channel, cleared on blur  
✅ **Instance-Safe**: Works with nested navigators and repeated screens  
✅ **No Route-Name Coupling**: Uses focus state instead  

## Design Decisions

### Why Focus-Aware Instead of Route-Name-Based?

1. **Lifecycle Safety**: Only one scroll channel active at a time
2. **Instance Safety**: Works with repeated screens (same route, different instances)
3. **Nested Navigator Support**: Focus state handles nested navigation correctly
4. **Cleaner Architecture**: No route-name coupling between components

### Why Single Active Channel?

1. **Predictable Behavior**: Only the focused screen controls the header
2. **No Conflicts**: Prevents multiple screens from fighting over header state
3. **Clean Transitions**: Header resets cleanly when navigating between screens
4. **Debuggable**: Easy to trace which screen is controlling the header

### Why No screenName Prop?

1. **Separation of Concerns**: Header doesn't need to know route names
2. **Focus-Based**: Registration happens automatically based on focus
3. **Simpler API**: One less prop to manage and pass around

## Adding to New Screens

1. Use `AutoScrollView` in your screen component
2. Add screen name to `ANIMATED_HEADER_SCREENS` array in `headerConfig.js`
3. That's it!

Example:

```javascript
// In headerConfig.js
export const ANIMATED_HEADER_SCREENS = ['Business', 'MyNewScreen'];

// In MyNewScreen.js
<AutoScrollView>
  {/* content */}
</AutoScrollView>
```

## Troubleshooting

### Header not animating

- Check that `headerTransparent: true` is set for the screen in `headerConfig.js`
- Verify screen name is in `ANIMATED_HEADER_SCREENS` array
- Ensure `ScrollChannelProvider` wraps your app (in `App.js`)
- Check that screen is using `AutoScrollView` (not regular `ScrollView`)

### Floating back button not showing

- Check that `showBackButton` and `onBackPress` are provided to `AnimatedHeader`
- Verify scroll threshold is reached (default 100px)
- Ensure screen has focus (check focus state)

### Scroll position not updating

- Ensure you're using `AutoScrollView` (not regular `ScrollView`)
- Verify screen has focus (scroll channel only active when focused)
- Check that `ScrollChannelContext` is available (check `App.js` has `ScrollChannelProvider`)

### Multiple screens interfering

- This shouldn't happen with the new system - only focused screen is active
- If issues occur, check that `useFocusEffect` cleanup is working correctly
- Verify only one scroll channel is registered at a time

## Migration Notes

If migrating from the old route-name-based system:

1. **Remove `screenName` prop** from `AnimatedHeader` usage
2. **Remove route name detection** from `AutoScrollView` (now uses focus)
3. **Update context usage** - use `useScrollChannelContext` instead of `useScrollContext`
4. **Remove `navigation.setOptions`** calls from screens (hard constraint violation)

The old `useScrollContext` hook still works but shows a deprecation warning.
