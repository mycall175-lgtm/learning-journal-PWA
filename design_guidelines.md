# Learning Journal PWA - Design Guidelines

## Design Approach

**System:** Material Design principles adapted for educational productivity
**Rationale:** Content-rich learning documentation requires clear hierarchy, excellent readability, and efficient information display. Material Design's elevation system and structured layouts excel at organizing dense educational content.

## Typography System

**Font Families:**
- Headings: Inter or Roboto (via Google Fonts CDN)
- Body: System font stack for optimal performance
- Code snippets: 'Fira Code' or 'JetBrains Mono'

**Type Scale:**
- Hero title: text-5xl font-bold (homepage)
- Page titles: text-4xl font-bold
- Section headings: text-2xl font-semibold
- Subsections: text-xl font-medium
- Body text: text-base leading-relaxed
- Metadata/dates: text-sm
- Code: text-sm font-mono

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16 for consistent rhythm
- Section padding: py-16 md:py-24
- Component spacing: space-y-8 or gap-8
- Inner element spacing: space-y-4
- Tight groupings: space-y-2

**Container Strategy:**
- Max width: max-w-6xl for content pages
- Reading content: max-w-3xl for journal entries
- Full-width sections with constrained inner content

**Grid System:**
- Projects page: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- About page: Single column with sidebar for quick links
- Journal entries: Single column for readability

## Page-Specific Layouts

### Homepage (index.html)
**Structure:**
1. Hero section (60vh) with professional headshot or abstract learning visual
2. Welcome statement and site purpose (centered, max-w-2xl)
3. Quick stats cards (3 columns on desktop: Total Entries, Weeks Completed, Technologies Learned)
4. Recent journal entries preview (2 cards)
5. Call-to-action section linking to journal

**Components:**
- Elevated cards with subtle shadow (elevation-2 in Material terms)
- Stat cards: Large number display with label beneath

### Journal Page (journal.html)
**Structure:**
1. Page header with title and current date display
2. Sticky filter bar (Filter by week, Search entries)
3. Reflection submission form (card-based, prominent)
4. Timeline of entries (chronological, newest first)

**Form Design:**
- Grouped in elevated card with generous padding (p-8)
- Input fields: Full width, clear labels above inputs
- Text area: Min 6 rows for reflection input
- Character counter below textarea
- Submit/Reset buttons aligned right

**Entry Display:**
- Each entry in separate card with:
  - Date badge (top-left, small elevated chip)
  - Author name (text-lg font-semibold)
  - Reflection text (text-base leading-relaxed)
  - Entry metadata footer (word count, edit timestamp)
- Cards have mb-6 spacing between them

### About Page (about.html)
**Structure:**
1. Profile header with photo and introduction
2. Two-column layout (desktop): Bio (left 2/3) + Quick facts sidebar (right 1/3)
3. Skills section with organized categories
4. Contact information cards

**Components:**
- Profile photo: Rounded, 200x200px on desktop, centered on mobile
- Skills: Pill-shaped badges grouped by category
- Contact cards: Icon + label pairs in grid-cols-2 md:grid-cols-4

### Projects Page (projects.html)
**Structure:**
1. Page header with filter/sort controls
2. Project grid (responsive: 1 col mobile, 2 tablet, 3 desktop)
3. Each project card includes:
   - Thumbnail image or placeholder
   - Project title and date
   - Brief description (2-3 lines)
   - Technology badges
   - Link to full details or demo

**Card Design:**
- Aspect ratio 16:9 for thumbnails
- Hover state: Subtle lift with increased shadow
- Badge container at bottom with flex-wrap

## Component Library

### Navigation
**Desktop:** Horizontal navbar, sticky top
- Logo/name (left)
- Navigation links (center): Home, Journal, Projects, About
- Theme toggle + Install PWA button (right)

**Mobile:** Hamburger menu
- Full-screen overlay on open
- Large, touch-friendly links (text-2xl)
- Smooth slide-in animation

### Cards
**Standard Card:**
- Padding: p-6 md:p-8
- Border radius: rounded-lg
- Shadow: Standard elevation
- Hover: Subtle scale (scale-[1.02]) with increased shadow

### Forms
**Input Fields:**
- Height: h-12 for text inputs
- Padding: px-4
- Border radius: rounded-md
- Focus state: Clear focus ring
- Labels: mb-2 text-sm font-medium

**Buttons:**
- Primary: Large, rounded-md, px-6 py-3
- Secondary: Outlined variant
- Icon buttons: w-10 h-10, centered icon

### Badges/Chips
- Rounded-full px-3 py-1 text-sm
- Used for: Dates, categories, technologies, tags

### Loading States
- Skeleton screens for journal entries during fetch
- Spinner for form submissions
- Shimmer effect on placeholder cards

## Offline/PWA Features

### Installation Prompt
- Floating action button (bottom-right on desktop, bottom-center on mobile)
- Icon: Download/install symbol
- Dismissible but remembers choice

### Offline Indicator
- Slim banner at top when offline
- Toast notification when returning online
- Cached entries display with "Offline" badge

### Service Worker Status
- Small indicator in footer showing cache status
- Last updated timestamp

## Images

**Hero Image (Homepage):**
- Abstract representation: Books, laptop, code editor, or learning workspace
- Dimensions: 1920x1080px minimum
- Placement: Background of hero section with overlay for text readability
- Alternative: Professional headshot on solid background (800x800px, centered)

**About Page:**
- Professional profile photo (square, 400x400px minimum)
- Optional: Banner image showing workspace or interests

**Projects Page:**
- Project thumbnails (16:9 aspect ratio, 640x360px minimum)
- Placeholder images for projects without custom thumbnails

**Fallback Strategy:**
- Use CSS gradients or geometric patterns when images unavailable
- Maintain layout structure with placeholder boxes

## Accessibility Standards

- All interactive elements have minimum 44x44px touch targets
- Form inputs include proper labels and ARIA attributes
- Skip-to-content link for keyboard navigation
- Semantic HTML throughout (nav, main, article, section)
- High contrast maintained for all text
- Focus indicators clearly visible on all interactive elements

## Responsive Breakpoints

- Mobile: Base styles (< 640px)
- Tablet: md: (≥ 768px) - Two-column grids begin
- Desktop: lg: (≥ 1024px) - Full three-column layouts, horizontal navigation
- Wide: xl: (≥ 1280px) - Increased max-widths, more generous spacing