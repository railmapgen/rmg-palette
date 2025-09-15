# RMG Palette

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

RMG Palette is a React/TypeScript web application for managing and viewing color palettes for public transportation systems worldwide. It consists of a main React app and a resources package that provides color data for different cities' transit systems.

## Working Effectively

Bootstrap, build, and test the repository:
- `npm install` -- installs both main app and resources package dependencies. Takes 30 seconds. NEVER CANCEL.
- `npm run build:resources` -- builds the resources package. Takes 7 seconds. NEVER CANCEL.
- `npm run build` -- builds the main React application. Takes 9 seconds. NEVER CANCEL.
- `npm run test` -- runs all tests with coverage. Takes 17 seconds. NEVER CANCEL.
- `npm run lint` -- runs ESLint on src and package directories. Takes 6 seconds. NEVER CANCEL.

Run the application:
- ALWAYS run `npm install` first before any other commands.
- Development server: `npm run dev` -- starts on http://localhost:5173/rmg-palette/ in under 1 second
- Production preview: `npm run preview` -- serves built app on http://localhost:4173/rmg-palette/

Build the resources package separately:
- `cd ./package && npm run build` -- builds the resources package independently
- `cd ./package && npm run test` -- tests resources package (takes 2 seconds)

## Validation

ALWAYS manually validate changes by:
- Running the full test suite with `npm run test`
- Starting the dev server with `npm run dev` and testing functionality at http://localhost:5173/rmg-palette/
- ALWAYS test the complete user workflow: select a country from the dropdown, view the city list, click on a city to see its transit line color palette
- Verify that color data displays correctly with HEX codes and RGB values
- Always run `npm run lint` before committing -- the CI (.github/workflows/check.yml) will fail if linting fails
- Test both the main palette view and the editor functionality if making changes to those areas

## Common Tasks

### Repository Structure
```
/home/runner/work/rmg-palette/rmg-palette/
├── README.md                 # Main documentation with color references
├── package.json             # Main app dependencies and scripts  
├── src/                     # React application source code
├── package/                 # Resources package (color data)
│   ├── package.json        # Resources package config
│   ├── src/                # Color data and utilities
│   └── dist/               # Built resources (after npm run build:resources)
├── dist/                   # Built main app (after npm run build)
├── .github/workflows/      # CI/CD configuration
├── scripts/build.sh        # Production build script used by CI
└── vite.config.mts         # Vite configuration
```

### Key npm Scripts
- `npm run dev` -- Start development server
- `npm run build` -- Build main app (requires TypeScript compilation + Vite build)
- `npm run build:resources` -- Build only the resources package
- `npm run test` -- Run tests with coverage
- `npm run lint` -- Run ESLint
- `npm run lint:fix` -- Fix ESLint issues automatically
- `npm run preview` -- Preview built application

### CI/CD Workflows
The repository has GitHub Actions workflows in `.github/workflows/`:
- `check.yml` -- Runs on PRs: builds resources, runs tests, lints code
- `build.yml` -- Manual dispatch: builds and releases the application
- Order of operations in CI: resources build → main app install → lint → test → build

### Application Features
- Country/region selector to filter cities
- City cards showing transit system color palettes
- Expandable city details showing line names in multiple languages
- Color display in both HEX and RGB formats
- Edit functionality for palette data
- Support for 150+ cities worldwide

### Development Notes
- Uses Vite as build tool with React plugin
- TypeScript with strict configuration
- ESLint for code quality (includes React and Prettier rules)
- Vitest for testing with coverage
- Mantine UI component library
- PostCSS for styling
- Uses npm workspaces pattern (main app + resources package)

### Color Data Format
Color data is stored in JSON files within the resources package:
- `city-config.json` -- List of cities with metadata
- `[city].json` -- Individual city color palettes
- Each line entry includes: id, name (multilingual), colour (HEX), fg (foreground color)

### Timeout Guidelines
- npm install: Set timeout to 60+ seconds (actual: ~30s)
- npm run build: Set timeout to 30+ seconds (actual: ~9s)  
- npm run test: Set timeout to 30+ seconds (actual: ~17s)
- npm run build:resources: Set timeout to 20+ seconds (actual: ~7s)
- npm run lint: Set timeout to 20+ seconds (actual: ~6s)

NEVER CANCEL any build or test commands. Builds are fast but set generous timeouts to account for system variations.

### Common Issues
- If npm install fails, ensure you're in the correct directory (/home/runner/work/rmg-palette/rmg-palette)
- The postinstall script automatically installs package dependencies
- Resources must be built before the main app if working with color data
- Use absolute paths when referencing files: /home/runner/work/rmg-palette/rmg-palette/