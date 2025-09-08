# Component Fixing Plan - Evanto 2.0

## 📋 Overview
This document outlines the systematic approach for fixing and updating all components to work with the centralized core architecture.

## 🎯 Core Principles
- **Centralized, Not Duplicated**: Use centralized imports and services
- **Built-in First**: Leverage MUI, TanStack Query, Zustand built-in features
- **Consistency**: Follow established patterns and naming conventions
- **Simple Over Complex**: Choose simple solutions, avoid over-engineering

---

## 📅 Phase 1: Core Navigation & Layout
**Priority: HIGH** - Foundation for all other components

### 1. App.tsx
- **Status**: ✅ Completed
- **Tasks**:
  - Re-enable routes and navigation
  - Fix routing configuration
  - Ensure proper provider setup
- **Dependencies**: None
- **Estimated Time**: 30 minutes
- **Test Results**: ✅ Routes working, navigation functional
- **Notes**: Successfully re-enabled routes, fixed routing config

### 2. Container Component
- **Status**: ⏳ Pending
- **Tasks**:
  - Create/maintain main layout wrapper
  - Ensure mobile-first responsive design
  - Apply consistent styling patterns
- **Dependencies**: None
- **Estimated Time**: 20 minutes

### 3. Navigation Components
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix bottom navigation
  - Update header components
  - Ensure proper routing integration
- **Dependencies**: App.tsx, Container
- **Estimated Time**: 45 minutes

---

## 🔐 Phase 2: Authentication Flow
**Priority: HIGH** - Core user functionality

### 4. SignIn.tsx
- **Status**: ✅ Completed
- **Tasks**:
  - Fix import statements (centralized hooks)
  - Update user type handling
  - Fix authentication flow
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 30 minutes
- **Test Results**: ✅ Logo displays correctly in both light/dark modes, navigation fixed to /home, OAuth redirect working
- **Notes**: Fixed dark mode logo implementation, improved error handling for authentication

### 5. SignUp.tsx
- **Status**: ✅ Completed
- **Tasks**:
  - Fix import statements
  - Update user creation flow
  - Fix form validation
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 30 minutes
- **Test Results**: ✅ Logo displays correctly in both light/dark modes, navigation fixed to /home
- **Notes**: Fixed dark mode logo implementation, navigation working properly

### 6. AuthCallback.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix OAuth callback handling
  - Update user type handling
  - Fix redirect logic
- **Dependencies**: Core architecture
- **Estimated Time**: 20 minutes

### 7. Profile.tsx
- **Status**: ✅ Completed
- **Tasks**:
  - Fix import statements (useUser, useUpdateUser)
  - Update profile management
  - Fix form handling
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 45 minutes
- **Test Results**: ✅ Import paths fixed, routes added to App.tsx
- **Notes**: Fixed import path from @/hooks/useUsers to @/hooks/entityConfigs

### 8. ForgotPassword.tsx
- **Status**: ✅ Completed
- **Tasks**:
  - Fix button styling and full width
  - Ensure proper form validation
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 20 minutes
- **Test Results**: ✅ Send button now full width with proper styling
- **Notes**: Fixed button cut-off issue with inline styles and fullWidth prop

### 9. VerifyCode.tsx
- **Status**: ✅ Completed
- **Tasks**:
  - Fix OTP input fields to full width
  - Ensure proper validation
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 20 minutes
- **Test Results**: ✅ OTP input fields now full width instead of narrow centered
- **Notes**: Changed width from 45px to 100% for better mobile experience

### 10. ResetPassword.tsx
- **Status**: ✅ Completed
- **Tasks**:
  - Fix navigation after password reset
  - Ensure proper form validation
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 20 minutes
- **Test Results**: ✅ Navigation fixed from /onboarding/congratulations to /home
- **Notes**: Fixed routing issue that was causing "No routes matched location" error

### 11. EmailSent.tsx
- **Status**: ✅ Completed
- **Tasks**:
  - Add route to App.tsx
  - Ensure proper navigation
- **Dependencies**: App.tsx
- **Estimated Time**: 10 minutes
- **Test Results**: ✅ Route added, navigation working
- **Notes**: Added missing route for email sent confirmation

### 12. Welcome.tsx
- **Status**: ✅ Completed
- **Tasks**:
  - Fix logo implementation for both themes
  - Ensure proper button styling and full width
  - Fix OAuth redirect URLs
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 30 minutes
- **Test Results**: ✅ Logo displays correctly, buttons full width, OAuth working
- **Notes**: Consolidated welcome/auth landing page, fixed dark mode logo, improved button styling

### 13. ChooseYourInterests.tsx
- **Status**: ✅ Completed
- **Tasks**:
  - Align interests with app categories
  - Use consistent icon system with CategoryIcon
  - Apply design system styling and spacing
  - Add dark mode support
  - Fix navigation (back arrow and skip button)
- **Dependencies**: Core architecture, CategoryIcon component
- **Estimated Time**: 45 minutes
- **Test Results**: ✅ Interests aligned with categories, consistent icons, proper spacing, dark mode working, navigation fixed
- **Notes**: Updated to use centralized CategoryIcon system, aligned with filtersStore categories, added comprehensive dark mode support

---

## 🏠 Phase 3: Main App Features
**Priority: HIGH** - Core app functionality

### 8. Home.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements (useUnifiedItems)
  - Update data fetching
  - Fix event/meetup display
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 45 minutes

### 9. Search.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements
  - Update search functionality
  - Fix filter integration
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 30 minutes

### 10. Filter.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements (useFiltersStore)
  - Update filter logic
  - Fix modal functionality
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 30 minutes

### 11. Favorites.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements
  - Update favorites functionality
  - Fix data display
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 30 minutes

---

## 🎪 Phase 4: Event/Meetup Management
**Priority: MEDIUM** - Event creation and management

### 12. EventDetails.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements (useUser)
  - Update event display
  - Fix booking integration
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 45 minutes

### 13. CreateEvent.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements (useCreateEvent)
  - Update event creation flow
  - Fix form validation
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 45 minutes

### 14. UpdateEvent.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements (useFiltersStore)
  - Update event editing
  - Fix form handling
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 45 minutes

### 15. ManageEvents.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements (useDeleteEvent, useDeleteMeetup)
  - Update event management
  - Fix CRUD operations
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 45 minutes

### 16. MeetupStep1/2/3.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements (useCreateMeetup)
  - Update meetup creation flow
  - Fix form validation
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 60 minutes

---

## 🎫 Phase 5: Booking System
**Priority: MEDIUM** - Booking and payment functionality

### 17. Summary.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements (useUserBookings, useCreateBooking)
  - Update booking summary
  - Fix booking logic
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 45 minutes

### 18. Tickets.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements (useUpdateBookingStatus)
  - Update ticket display
  - Fix booking management
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 30 minutes

### 19. GetTicket.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements
  - Update ticket display
  - Fix data handling
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 20 minutes

---

## 🧩 Phase 6: Supporting Components
**Priority: LOW** - Reusable UI components

### 20. EventCard.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements
  - Update card display
  - Fix data handling
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 30 minutes

### 21. SeatPicker.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements
  - Update seat selection
  - Fix booking integration
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 30 minutes

### 22. LocationPicker.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements
  - Update location selection
  - Fix geocoding integration
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 30 minutes

### 23. CategoryIcon.tsx
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements
  - Update icon display
  - Fix category handling
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 15 minutes

---

## 📝 Phase 7: Form Components
**Priority: LOW** - Form handling and validation

### 24. All Form Components
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements
  - Update form validation
  - Fix input handling
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 60 minutes

### 25. Payment Components
- **Status**: ⏳ Pending
- **Tasks**:
  - Fix import statements
  - Update payment flow
  - Fix payment integration
  - Apply consistent styling
- **Dependencies**: Core architecture
- **Estimated Time**: 45 minutes

---

## 🔧 Phase 8: Final Integration
**Priority: HIGH** - Complete app functionality

### 26. Routes
- **Status**: ⏳ Pending
- **Tasks**:
  - Complete routing setup
  - Fix navigation
  - Ensure proper redirects
- **Dependencies**: All components
- **Estimated Time**: 30 minutes

### 27. Error Boundaries
- **Status**: ⏳ Pending
- **Tasks**:
  - Implement error handling
  - Fix error display
  - Ensure graceful failures
- **Dependencies**: All components
- **Estimated Time**: 20 minutes

### 28. Loading States
- **Status**: ⏳ Pending
- **Tasks**:
  - Implement loading indicators
  - Fix loading states
  - Ensure smooth UX
- **Dependencies**: All components
- **Estimated Time**: 20 minutes

---

## 📊 Progress Tracking

### Overall Progress
- **Total Components**: 28
- **Completed**: 0 ✅
- **In Progress**: 0 🔄
- **Pending**: 28 ⏳
- **Estimated Total Time**: 12-15 hours
- **Actual Time Spent**: 0 hours

### Phase Progress
- **Phase 1**: 0/3 (0%) ⏳
- **Phase 2**: 0/4 (0%) ⏳
- **Phase 3**: 0/4 (0%) ⏳
- **Phase 4**: 0/5 (0%) ⏳
- **Phase 5**: 0/3 (0%) ⏳
- **Phase 6**: 0/4 (0%) ⏳
- **Phase 7**: 0/2 (0%) ⏳
- **Phase 8**: 0/3 (0%) ⏳

### Status Legend
- ✅ **Completed**: Component fixed, tested, and working
- 🔄 **In Progress**: Currently being worked on
- ⏳ **Pending**: Not started yet
- ❌ **Failed**: Issues found, needs rework

### Completed Components Log
_This section will be updated as components are completed_

#### Phase 1: Core Navigation & Layout
- [x] App.tsx ✅
- [x] SplashScreen ✅
- [x] Container Component ✅
- [ ] Navigation Components

#### Phase 2: Authentication Flow
- [ ] SignIn.tsx
- [ ] SignUp.tsx
- [ ] AuthCallback.tsx
- [ ] Profile.tsx

#### Phase 3: Main App Features
- [ ] Home.tsx
- [ ] Search.tsx
- [ ] Filter.tsx
- [ ] Favorites.tsx

#### Phase 4: Event/Meetup Management
- [ ] EventDetails.tsx
- [ ] CreateEvent.tsx
- [ ] UpdateEvent.tsx
- [ ] ManageEvents.tsx
- [ ] MeetupStep1/2/3.tsx

#### Phase 5: Booking System
- [ ] Summary.tsx
- [ ] Tickets.tsx
- [ ] GetTicket.tsx

#### Phase 6: Supporting Components
- [ ] EventCard.tsx
- [ ] SeatPicker.tsx
- [ ] LocationPicker.tsx
- [ ] CategoryIcon.tsx

#### Phase 7: Form Components
- [ ] All Form Components
- [ ] Payment Components

#### Phase 8: Final Integration
- [ ] Routes
- [ ] Error Boundaries
- [ ] Loading States

---

## 🎯 Fixing Strategy for Each Component

### 1. Import Fixes
- Update to use centralized imports (`@/hooks`, `@/services`, `@/utils`)
- Remove duplicate imports
- Ensure proper type imports

### 2. Type Fixes
- Align with centralized schemas (`src/utils/schemas.ts`)
- Fix TypeScript errors
- Ensure type safety

### 3. Hook Fixes
- Use centralized hooks from `src/hooks/`
- Update hook usage patterns
- Ensure proper data fetching

### 4. Store Fixes
- Use centralized stores
- Update state management patterns
- Ensure proper state access

### 5. Styling Fixes
- Apply MUI + Tailwind patterns
- Use custom Tailwind classes
- Ensure mobile-first design

### 6. Testing
- Verify functionality works
- Test with real data
- Ensure proper error handling

---

## 📝 Update Process

### How to Mark Components as Completed
1. **Fix the component** following the 6-step strategy
2. **Test the component** to ensure it works
3. **Update the status** in this document:
   - Change `⏳ Pending` to `✅ Completed`
   - Update progress counters
   - Add test results and notes
   - Check off the component in the completed log

### Example Update
```markdown
### 1. App.tsx
- **Status**: ✅ Completed
- **Tasks**: [All completed]
- **Test Results**: ✅ Routes working, navigation functional
- **Notes**: Successfully re-enabled routes, fixed routing config
```

### Progress Updates
- **Overall Progress**: Update completed count
- **Phase Progress**: Update phase completion percentage
- **Actual Time**: Track real time spent vs estimates

## 📝 Notes

- **Start with Phase 1** for foundation
- **Test each component** after fixing
- **Follow core principles** throughout
- **Update this document** as progress is made
- **Reference ARCHITECTURE.md** for patterns
- **Mark completed components** immediately after successful testing

---

*This plan serves as a roadmap for systematically fixing all components to work with the centralized core architecture.*
