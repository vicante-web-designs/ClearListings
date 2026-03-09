# Development Log

## Day 1

### High Level System Design

**What I built**  
Defined the foundational system design for the application.

**Why it matters**  
Understanding the system structure early ensures the application is scalable and logically organized before development begins.

**Problem faced**  
Needed clarity on the main entities and how users would interact with the system.

**Solution**  
Mapped the user journey, identified core domains and entities, and defined relationships between them.

**Next step**  
Set up the project environment and repository.

### Project Scaffolding

**What I built**  
Initialized the project and prepared the development environment.

**Why it matters**  
A proper project setup ensures consistent development and easier collaboration.

**Problem faced**  
Needed a reliable modern development setup.

**Solution**  
Created the repository, bootstrapped the project with Vite, set up the basic file structure, connected the project to GitHub, and created basic test features to verify the setup.

**Next step**  
Define the application's page structure and component planning.

## Day 2

### Site Mapping

**What I built**  
Defined the full page structure of the application.

**Why it matters**  
A clear site map helps organize navigation and ensures all user flows are planned before building UI components.

**Pages defined**  

1. Home Page
2. About Page
3. Listings Page
4. Listing Details Page
5. Contact Page
6. Login Page
7. Sign Up Page
8. Create Listing Page

**Problem faced**  
Needed to ensure both browsing and listing management flows were covered.

**Solution**  
Mapped out all required pages supporting both visitors and authenticated users.

**Next step**  
Establish project conventions and component tracking.

### Project Conventions & Component Inventory

**What I built**  
Created documentation files to enforce consistency across the project.

**Why it matters**  
Maintaining consistent naming, structure, and reusable components improves maintainability as the project grows.

**Problem faced**  
Needed a way to track reusable components and enforce code standards.

**Solution**  
Created two documentation files

* `CONVENTIONS.md` to define coding and project structure standards
* `COMPONENTS.md` to maintain an inventory of all reusable components

**Next step**  
Improve data structure and folder organization.

## Day 3

### Data and Structure Refactoring

**What I built**  
Improved the internal data structure and project organization.

**Why it matters**  
Better structure makes the application easier to scale and maintain.

**Problem faced**  
Listing data and folder structure needed better organization for future development.

**Solution**  
Refactored listing data, reorganized the folder structure, and created a `utils` directory with a helper function to format listing prices.

**Next step**  
Continue building features on the improved structure.

## Day 4

### Development Pause

**What happened**  
Development paused for a break.

**Why it matters**  
Taking breaks helps maintain productivity and avoid burnout.

**Next step**  
Resume development once rested.

## Day 5

### Health Recovery

**What happened**  
Development paused due to illness and stress.

**Why it matters**  
Recovery was necessary before continuing work.

**Next step**  
Gradually return to development workflow.

## Day 6

### Returning to Development

**What I did**  
Resumed work on the project after recovery.

**Why it matters**  
Re-entering development flow helps rebuild momentum and continue progress.

**Next step**  
Continue building UI components and refining the design system.

## Day 7

### UI Styling Preparation

**What I built**  
Created styled components and UI references in Figma.

**Why it matters**  
Defining visual styles early helps maintain design consistency across the application.

**Problem faced**  
Needed a clear visual direction before implementing additional UI components.

**Solution**  
Designed component styles and visual references in Figma.

**Next step**  
Refactor UI components to match the new design.

## Day 8

### Listing Card Refactor

**What I built**  
Refactored the Listing Card component.

**Why it matters**  
Listing cards are a core component used across the platform to display property summaries.

**Problem faced**  
The initial component structure needed improvement for flexibility and styling consistency.

**Solution**  
Reworked the component layout and styling.

**Next step**  
Implement search functionality for listings.

## Day 9

### Search Functionality

**What I built**  
Implemented search functionality for property listings.

**Why it matters**  
Search improves the user experience by allowing users to quickly find relevant listings.

**Problem faced**  
Needed a way to filter listings dynamically based on user input.

**Solution**  
Implemented search logic connected to the listings data.

**Next step**  
Add dynamic routing for listing detail pages.

## Day 10

### Dynamic Routing

**What I built**  
Implemented dynamic routes for individual listing detail pages.

**Why it matters**  
Each listing needs its own dedicated page with detailed information.

**Problem faced**  
Needed a scalable routing solution for dynamically generated listing pages.

**Solution**  
Used React Router to create dynamic routes based on listing IDs.

**Next step**  
Improve search and filtering logic.

## Day 11

### Search and Filter Optimization

**What I built**  
Improved the search and filtering logic.

**Why it matters**  
Combining search and filtering simplifies the logic and improves maintainability.

**Problem faced**  
Search and filter features were handled separately, causing redundant logic.

**Solution**  
Merged both features into a unified logic system and enforced mandatory listing types.

**Next step**  
Prepare the production deployment environment.

### Production Deployment Fixes

**What I built**  
Improved the production deployment configuration.

**Why it matters**  
Production builds revealed bugs that did not appear in development.

**Problem faced**  
Deployment errors and unexpected behavior in production.

**Solution**  
Resolved production issues and added analytics tracking through Vercel.

**Next step**  
Improve navigation handling.

## Day 12

### Navigation Improvements

**What I built**  
Improved navigation behavior within the application.

**Why it matters**  
Navigation controls must behave consistently to ensure good user experience.

**Problem faced**  
Return navigation required cleaner routing logic.

**Solution**  
Used React Router navigation for the return button and removed unnecessary link imports.

**Next step**  
Expand the application with a dedicated listings page.

## Day 13

### Listings Page Expansion

**What I built**  
Created a dedicated listings page.

**Why it matters**  
Separating listings into their own page improves structure and user navigation.

**Problem faced**  
Needed clear navigation patterns between different parts of the application.

**Solution**  
Implemented two types of navigation links

* Navbar navigation links
* In-page navigation links

**Next step**  
Refine visual styling.

## Day 14

### UI Theme Adjustments

**What I built**  
Refined styling and visual themes.

**Why it matters**  
Consistent styling improves overall usability and visual appeal.

**Problem faced**  
Design elements needed better alignment with the intended project theme.

**Solution**  
Adjusted color themes, spacing, and layout styles.

**Next step**  
Improve global state management.

## Day 15

### State Management Planning

**What I learned**  
Studied Redux to improve state management architecture.

**Why it matters**  
As the application grows, managing global state with React Context becomes harder.

**Problem faced**  
Context-based state management was becoming less scalable.

**Solution**  
Researched Redux as a more structured global state solution.

**Next step**  
Install and configure Redux.

## Day 16

### Redux Installation

**What I built**
Installed Redux and prepared the project for state management refactoring.

**Why it matters**
Redux enables predictable and centralized state updates.

**Problem faced**
Needed to integrate Redux into an existing project structure.

**Solution**
Installed Redux dependencies and began setting up the store.

**Next step**
Migrate state management from Context to Redux.

## Day 17

### Redux State Refactor

**What I built**  
Replaced React Context with Redux for managing listings state.

**Why it matters**  
Redux provides more scalable state management as the application grows.

**Problem faced**  
Existing context logic needed to be migrated without breaking functionality.

**Solution**  
Implemented Redux reducers for

* creating listings
* updating listings
* deleting listings

**Next step**  
Continue refining state architecture and expanding features.

## Day 18 (09/03/2026)

### Installed and implemented shadcn-ui

**What I did**  
I installed shadcn-ui and implemented it in the project

**Why it matters**  
It was stressfull creating custom components, especially when I had to think of the various use cases for it

**Problems faced**  
Custom ui components conflicted with shadcn's components.

**Solution**  
I solved it by

* Removing all custom components
* Fixing import paths to match shadcn's ui components

**Next step**  
Use shadcn field component to create CreateListingForm component
