# ProgrammingTable Component - Decomposed Architecture

A modular, searchable, sortable data table component for displaying David Felder's programming and performance history using TanStack Table. This component has been decomposed into smaller, focused components to minimize client-side rendering and improve maintainability.

## Architecture Overview

The original monolithic `ProgrammingTable` component has been decomposed into the following smaller components:

```
ProgrammingTable/
├── ProgrammingTable.tsx       # Main orchestrator component (client)
├── TableHeader.tsx            # Static header (can be server-rendered)
├── SearchControls.tsx         # Search input and controls (client)
├── DesktopTable.tsx          # Desktop table view (client)
├── MobileCardView.tsx        # Mobile card layout (client)
├── PaginationControls.tsx    # Pagination UI (client)
├── EmptyState.tsx            # Empty/no results state (can be server-rendered)
├── TableCells.tsx            # Individual cell components (server-renderable)
├── tableColumns.tsx          # Column definitions (server-renderable)
├── utils.ts                  # Utility functions (server-renderable)
├── types.ts                  # TypeScript definitions
├── index.ts                  # Exports
└── README.md                 # This documentation
```

## Component Breakdown

### Server-Renderable Components
These components contain only pure functions or static content and can be rendered server-side:

#### `TableHeader.tsx`
- Static page header with title and description
- No client state or interactions
- Fully server-renderable

#### `TableCells.tsx`
- Individual cell rendering components (`DateCell`, `ProgramTitleCell`, etc.)
- Pure functions that format data for display
- Can be pre-rendered with known data

#### `EmptyState.tsx`
- Displays when no data or search results found
- Minimal client interaction (clear search button)
- Main content can be server-rendered

#### `utils.ts`
- Pure utility functions (date formatting, filtering logic)
- No React components, fully server-side compatible

#### `tableColumns.tsx`
- Column configuration using utility functions
- Can be pre-computed server-side

### Client-Only Components
These components require client-side state and interactions:

#### `ProgrammingTable.tsx`
- Main orchestrator component
- Manages global state (search filter)
- Coordinates all child components

#### `SearchControls.tsx`
- Search input with real-time filtering
- Requires client state for input value

#### `DesktopTable.tsx` & `MobileCardView.tsx`
- Interactive table with sorting and row interactions
- Requires TanStack Table client-side functionality

#### `PaginationControls.tsx`
- Interactive pagination controls
- Requires client state for page management

## Benefits of Decomposition

### 1. Reduced Client-Side Bundle
- Static components can be server-rendered
- Only interactive components shipped to client
- Smaller JavaScript bundle size

### 2. Improved Performance
- Server-rendered components load immediately
- Reduced Time to First Contentful Paint (FCP)
- Better Core Web Vitals scores

### 3. Better Maintainability
- Single responsibility principle
- Easier to test individual components
- Clear separation of concerns

### 4. Enhanced Reusability
- Components can be used independently
- Cell components reusable in other tables
- Utility functions shared across components

### 5. Progressive Enhancement
- Base content loads without JavaScript
- Interactive features enhance the experience
- Graceful degradation for slow connections

## Usage Patterns

### Basic Usage (All Client-Side)
```tsx
import { ProgrammingTable } from "@/components/ProgrammingTable";

function ProgrammingPage({ programs }) {
  return <ProgrammingTable programs={programs} />;
}
```

### Selective Server Rendering
```tsx
import { 
  TableHeader, 
  EmptyState, 
  ProgrammingTable 
} from "@/components/ProgrammingTable";

function ProgrammingPage({ programs }) {
  return (
    <>
      {/* Server-rendered */}
      <TableHeader />
      
      {programs.length === 0 ? (
        // Server-rendered empty state
        <EmptyState globalFilter="" setGlobalFilter={() => {}} />
      ) : (
        // Client-rendered interactive table
        <ProgrammingTable programs={programs} />
      )}
    </>
  );
}
```

### Custom Composition
```tsx
import { 
  TableHeader,
  SearchControls,
  DesktopTable,
  createTableColumns 
} from "@/components/ProgrammingTable";

function CustomProgrammingView({ programs }) {
  const [filter, setFilter] = useState("");
  
  return (
    <>
      <TableHeader title="Custom Programming View" />
      <SearchControls 
        globalFilter={filter}
        setGlobalFilter={setFilter}
        totalRows={programs.length}
        filteredRows={programs.length}
      />
      {/* Custom table implementation */}
    </>
  );
}
```

## Performance Characteristics

### Before Decomposition
- Single large component (~455 lines)
- All code shipped to client
- Monolithic render tree
- Single point of failure

### After Decomposition
- Multiple focused components (50-80 lines each)
- Server-renderable components reduce client bundle
- Modular render tree
- Isolated failure domains
- Better tree-shaking opportunities

## Data Structure

```typescript
interface ProgramData {
  _id: string;
  programTitle?: string;
  composer?: string;
  context?: string;
  ensemble?: string;
  instrumentation?: string;
  personnel?: string;
  programWork?: string;
  programDate?: string;
}
```

## Server-Side Rendering Considerations

### Static Components
- `TableHeader`: Render with props server-side
- `TableCells`: Pre-render with known data
- `EmptyState`: Render default state server-side

### Hydration Strategy
- Server-render static shell
- Hydrate interactive components on client
- Progressive enhancement pattern

### SEO Benefits
- Table structure visible to crawlers
- Content accessible without JavaScript
- Better Core Web Vitals scores

## Migration Guide

### From Original Component
1. Replace single import with specific component imports
2. Compose components as needed
3. Identify server-renderable portions
4. Implement progressive enhancement

### Component Mapping
- Table header → `TableHeader`
- Search functionality → `SearchControls`
- Desktop table → `DesktopTable`
- Mobile cards → `MobileCardView`
- Pagination → `PaginationControls`
- Empty state → `EmptyState`

## Future Enhancements

### Server Components (React 18+)
- Convert utils and cell components to Server Components
- Stream table data progressively
- Reduce client-side hydration cost

### Edge Rendering
- Deploy static components to edge locations
- Faster initial page loads
- Reduced server load

### Code Splitting
- Lazy load non-critical components
- Route-based splitting for table views
- Reduced initial bundle size

This decomposed architecture provides better performance, maintainability, and flexibility while preserving all original functionality.