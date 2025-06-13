# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the EndoScope IoT Management System - a monorepo for managing endoscope storage with IoT capabilities. The system tracks up to 128 endoscopes across 8 containers (A-H) with 16 trays each, monitoring temperature, humidity, and controlling LED indicators.

## Architecture

### Monorepo Structure
- Uses Lerna and Yarn workspaces
- Two main packages: `client` (React) and `server` (NestJS)
- Shared GraphQL schema with code generation
- Docker-based deployment

### Key Technical Components

#### Serial Port Communication
- Communicates with IoT hardware via serial port (configurable COM port)
- Controls LED lights for tray indicators
- Reads temperature and humidity data
- Uses modbus-serial for hardware communication

#### Database Architecture
- PostgreSQL with TypeORM
- Key entities: Containers, Trays, Endoscopes, Sessions, Actions, Patients, Officers
- Snapshot system for historical data
- 30-day expiration cycle for endoscope storage

#### Real-time Updates
- GraphQL subscriptions for real-time data
- Cron jobs for periodic status checks
- LED position mapping for visual indicators

## Development Commands

### Root Level
```bash
# Install dependencies
yarn install

# Create new version
yarn new-version

# Docker operations
yarn docker:build
yarn ci:docker  # Build, login, and push
yarn ci:dokku   # Deploy to Dokku
```

### Client Development
```bash
cd packages/client

# Development
yarn dev:mac      # Start dev server on Mac
yarn dev:win      # Start dev server on Windows
yarn dev:showcase # Start with showcase environment

# Build
yarn build        # Build React app
yarn gen          # Generate GraphQL types (run after schema changes)

# Testing & Linting
yarn test         # Run tests
yarn lint         # ESLint with auto-fix

# Deployment builds
yarn build-image:local     # Build Docker image for local
yarn build-image:chonburi  # Build for Chonburi hospital
yarn build-image:hadyai    # Build for Hadyai hospital
yarn build-image:endo      # Build for Endo environment
```

### Server Development
```bash
cd packages/server

# Development
yarn dev:mac      # Start with watch mode on Mac
yarn dev:win      # Start with watch mode on Windows
yarn dev:showcase # Start with showcase environment

# Build & Production
yarn build        # Build NestJS app
yarn start:prod   # Start production build

# Testing
yarn test         # Run unit tests
yarn test:watch   # Run tests in watch mode
yarn test:cov     # Run tests with coverage
yarn test:e2e     # Run e2e tests

# Code Quality
yarn lint         # ESLint with auto-fix
yarn format       # Prettier formatting

# Database
yarn seed:run     # Run database seeds
yarn typeorm:gen:dev  # Generate migration
yarn typeorm:run:dev  # Run migrations
```

## Important Implementation Details

### Endoscope Lifecycle
1. New endoscopes are placed in trays (status: "ready")
2. When picked up, status changes to "in use"
3. After use, goes through washing/disinfection process
4. Returns to "ready" status with new 30-day timer
5. Expired endoscopes (>30 days) require re-washing

### LED Control System
- Each tray has an associated LED position
- Colors indicate endoscope status:
  - Green: Ready
  - Red: In use
  - Yellow: Drying
  - Blue: Expired
- LED commands sent via serial port to hardware

### Environment Variables
- `COM_PORT`: Serial port for IoT communication (e.g., COM3, /dev/ttyUSB0)
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection for session management
- Multiple `.env` files for different deployments

### GraphQL Code Generation
The client uses GraphQL code generation to create TypeScript types from the server schema:
1. Server defines GraphQL schema in resolvers
2. Client runs `yarn gen` to generate types
3. Generated types are in `packages/client/src/generated/`

### Testing Strategy
- Client: Jest with React Testing Library
- Server: Jest with NestJS testing utilities
- Test files use `.spec.ts` or `.test.ts` extensions
- Mock data available in database factories

## Deployment Notes

The system is deployed to multiple hospital locations with different configurations:
- Local development
- Chonburi hospital
- Hadyai hospital
- Endo environment

Each deployment has specific environment files and Docker build configurations.

## Common Development Tasks

### Adding a New Endoscope Feature
1. Update server entity and DTO in `packages/server/src/resources/endos/`
2. Update GraphQL resolver
3. Run migrations if database schema changed
4. Generate new GraphQL types in client: `cd packages/client && yarn gen`
5. Update React components to use new fields

### Modifying LED Behavior
1. Check LED position mapping in server code
2. Update serial port communication logic
3. Test with hardware or mock serial port

### Running a Single Test
```bash
# Client
cd packages/client
yarn test -- --testNamePattern="test name"

# Server
cd packages/server
yarn test -- --testNamePattern="test name"
```