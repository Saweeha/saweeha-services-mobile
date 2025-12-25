# 🧹 UI Structure Refactor Task

## Objective

Refactor the existing `components` and `screens` directories by introducing **clear, intention-based subfolders** while keeping:
- The same top-level structure
- No mixing of screens and components
- No behavior or logic changes
- No feature-based colocation

The goal is to improve discoverability, mental mapping, and scalability.

---

## Constraints (Important)

DO NOT:
- Move screens into components or vice versa
- Change component logic or props
- Rename exported components
- Change runtime behavior
- Introduce new architectural patterns

ONLY:
- Create subfolders
- Move files
- Update imports accordingly

---

## 1️⃣ Components Refactor

### Current Problem
`src/components` is flat and mixes:
- UI primitives
- Layout components
- Domain-specific cards
- Modals
- Infrastructure helpers

### Solution
Organize components by **responsibility**, not feature.

---

### ✅ Target Structure

```txt
src/components/
├── ui/
│   ├── Card/
│   ├── SearchBar/
│   ├── ContinueButton/
│   ├── FloatingContinueButton/
│   └── CustomTabs/
│
├── layout/
│   ├── ScreenHeader/
│   ├── CustomHeader/
│   ├── HomeHeader/
│   ├── SectionHeader/
│   └── BackButton/
│
├── list/
│   ├── AutoFlatList/
│   ├── AutoScrollView/
│   ├── BookingListItem/
│   ├── ServiceListItem/
│   ├── NotificationItem/
│   ├── ReviewListItem/
│   └── TeamListItem/
│
├── cards/
│   ├── BookingCard/
│   ├── BusinessCard/
│   ├── CategoryCard/
│   ├── InfoCard/
│   ├── ServiceCard/
│   └── TeamMemberCard/
│
├── modals/
│   ├── AuthModal/
│   ├── BookingConfirmationModal/
│   └── ProfessionalSelectionModal/
│
├── auth/
│   ├── AuthTextInput/
│   └── SocialAuthButtons/
│
├── booking/
│   ├── DatePicker/
│   └── TimeSlotPicker/
│
├── business/
│   ├── BusinessHero/
│   └── BusinessInfo/
│
└── media/
    └── PromotionSwiper/
