# AI Corporate Training Landing Page

## Overview

This is a full-stack web application for a Russian corporate AI training course landing page. The application showcases a 4-week training program focused on using AI tools in the workplace, featuring sections for course overview, weekly curriculum, pricing, and contact forms. Built with React frontend and Express.js backend using TypeScript, it implements a modern, responsive design with comprehensive UI components.

**Latest Update (Jan 2025)**: Added bilingual support with Russian and English versions. Integrated language switcher in navigation. Updated course tools to include WhisprAI, Exa AI, TabTabTab, and BukvitsaAI. Modified main goal to emphasize practical outcomes. Added team section with instructor photos and PRACTICAL AI logo in black navigation header.

## User Preferences

Preferred communication style: Simple, everyday language.
Language Support: Bilingual (Russian primary, English secondary with /en route)
Course Focus: Practical AI skills with ready-made tools for participants

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Routing**: Wouter for client-side routing (lightweight React router alternative)
- **State Management**: TanStack React Query for server state management and API caching
- **Component Structure**: Modular component architecture with reusable UI components from shadcn/ui
- **Design System**: Custom color scheme with CSS variables for theming, Inter and Open Sans fonts

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Architecture Pattern**: RESTful API design with modular route handling
- **Development Setup**: Hot-reload development server with tsx for TypeScript execution
- **Storage Interface**: Abstract storage layer with in-memory implementation for user management
- **Error Handling**: Centralized error handling middleware for consistent API responses
- **Request Logging**: Custom middleware for API request/response logging

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Schema Management**: Centralized schema definition in shared directory for type consistency
- **Database Provider**: Configured for Neon Database (serverless PostgreSQL)
- **Migrations**: Drizzle Kit for database schema migrations and management
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple

### Authentication and Authorization
- **Session Management**: Express session-based authentication with PostgreSQL storage
- **User Schema**: Basic user model with username/password authentication
- **Type Safety**: Zod schema validation for user input validation and type inference

### External Dependencies
- **Database**: Neon Database (serverless PostgreSQL) for production data storage
- **UI Components**: Radix UI primitives for accessible, unstyled components
- **Form Handling**: React Hook Form with Hookform resolvers for form validation
- **Styling**: Tailwind CSS with PostCSS for processing, class-variance-authority for component variants
- **Icons**: Lucide React for consistent iconography
- **Development Tools**: Replit-specific plugins for development environment integration
- **Build Tools**: ESBuild for server bundling, Vite for frontend development and building