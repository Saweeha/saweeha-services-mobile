# Animated Header System

This document explains how the animated header system works in the application. The system provides automatic header show/hide functionality based on scroll position, with a floating back button when the header is hidden.

## Overview

The animated header system is designed to be **completely automatic** - screens don't need to know about headers. All header logic is handled in the navigation configuration, and screens simply use `AutoScrollView` instead of regular `ScrollView`.

## Architecture

### Components

1. **ScrollContext** (`src/contexts/ScrollContext.js`)
   - Shares scroll position between screens and navigation headers
   - Provides `registerScrollY` and `getScrollY` methods
   - Uses React Context API

2. **AutoScrollView** (`src/components/AutoScrollView/AutoScrollView.js`)
   - Drop-in replacement for `Animated.ScrollView`
   - Automatically detects route name and registers scroll position
   - No configuration needed in screens

3. **AnimatedHeader** (`src/components/AnimatedHeader/AnimatedHeader.js`)
   - Handles header show/hide animations
   - Shows floating back button when header is hidden
   - Reads scroll position from ScrollContext

4. **RootNavigator** (`src/navigation/RootNavigator.js`)
   - Configures which screens use animated headers
   - Sets up header transparency and animations
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
    │ Auto-detects route name
    │ Registers scrollY with ScrollContext
    │
    ▼
ScrollContext
    │
    │ Stores scroll position per screen
    │
    ▼
AnimatedHeader (in Navigation)
    │
    │ Reads scrollY from ScrollContext
    │ Animates opacity/transform
    │ Shows floating back button when hidden
```

### Step-by-Step

1. **Screen renders `AutoScrollView`**
   - Component detects route name automatically via `useRoute()`
   - Creates an `Animated.Value` for scroll position
   - Registers it with `ScrollContext` using screen name as key

2. **User scrolls**
   - `AutoScrollView` updates the `Animated.Value` on scroll events
   - Value is stored in `ScrollContext` by screen name

3. **Header reads scroll position**
   - `AnimatedHeader` component (rendered in navigation) reads scroll value from context
   - Uses interpolation to calculate opacity and transform values
   - Animates header visibility based on scroll threshold

4. **Floating back button**
   - When header opacity is 0 (hidden), floating back button opacity is 1 (visible)
   - Positioned absolutely at top-left of screen
   - Inverse animation of header opacity

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

### For Navigation

Configure which screens use animated headers in `RootNavigator.js`:

```javascript
const needsAnimatedHeader = route.name === 'Business'; // or any screen name

return {
  headerShown: true,
  headerTransparent: needsAnimatedHeader, // Required for animations
  header: ({ options }) => {
    if (needsAnimatedHeader) {
      return (
        <AnimatedHeader
          screenName={route.name}        // Must match route name
          title={options.title}
          onBackPress={navigation.goBack()}
          showBackButton={navigation.canGoBack()}
          threshold={100}                // Scroll threshold for show/hide
        />
      );
    }
    // Regular header for other screens
    return <CustomHeader {...} />;
  },
};
```

### Configuration Options

#### AnimatedHeader Props

- `screenName` (required): Must match the route name exactly
- `title` (required): Header title text
- `onBackPress` (optional): Back button handler
- `showBackButton` (optional): Whether to show back button
- `threshold` (optional, default: 100): Scroll position where header starts appearing
- `rightComponent` (optional): Custom component to render on right side

#### AutoScrollView Props

Accepts all `Animated.ScrollView` props. The component automatically:
- Detects route name (can be overridden with `screenName` prop)
- Registers scroll position with context
- Handles scroll events

## Animation Details

### Header Show/Hide

- **Threshold**: 100px (configurable)
- **Transition Range**: 100px - 150px
- **Opacity**: 0 (hidden) → 1 (visible)
- **Transform**: -20px translateY → 0 (slides down)

### Floating Back Button

- **Opacity**: 1 (visible) → 0 (hidden) - inverse of header
- **Transform**: 0 → -20px translateY - slides up as header appears
- **Position**: Absolute, top-left with safe area insets

## Key Features

✅ **Zero Configuration**: Screens just use `AutoScrollView`  
✅ **Automatic**: Route name detection, scroll tracking, animations  
✅ **Centralized**: All header logic in navigation  
✅ **Clean Separation**: Screens don't import headers  
✅ **Floating Back Button**: Automatically shown when header is hidden  
✅ **Smooth Animations**: Native driver for 60fps performance  

## Adding to New Screens

1. Use `AutoScrollView` in your screen component
2. Add screen name to `needsAnimatedHeader` check in `RootNavigator.js`
3. That's it!

Example:

```javascript
// In RootNavigator.js
const needsAnimatedHeader = route.name === 'Business' || route.name === 'MyNewScreen';

// In MyNewScreen.js
<AutoScrollView>
  {/* content */}
</AutoScrollView>
```

## Troubleshooting

### Header not animating
- Check that `headerTransparent: true` is set for the screen
- Verify `screenName` in `AnimatedHeader` matches route name exactly
- Ensure `ScrollProvider` wraps your app (in `App.js`)

### Floating back button not showing
- Check that `showBackButton` and `onBackPress` are provided to `AnimatedHeader`
- Verify scroll threshold is reached (default 100px)

### Scroll position not updating
- Ensure you're using `AutoScrollView` (not regular `ScrollView`)
- Check that screen name matches route name
- Verify `ScrollContext` is available (check `App.js` has `ScrollProvider`)

