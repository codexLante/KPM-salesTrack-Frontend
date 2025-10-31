# SalesTrack - Field Sales Management System

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.3.9-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.8.1-CA4245.svg)](https://reactrouter.com/)

A comprehensive field sales management system built as a university project, featuring separate portals for administrators and salespeople. This application streamlines sales operations with role-based access, interactive dashboards, and responsive design.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Project Architecture](#project-architecture)
- [Key Components](#key-components)
- [How It Works](#how-it-works)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

## Features

### Admin Portal
- **Dashboard**: Comprehensive stats, performance charts, and activity feed
- **Employee Management**: Full CRUD operations for managing sales team members
- **Client Management**: Complete client database with add, edit, delete, and view functionalities
- **Calendar-based Meeting Management**: Interactive calendar with drag-and-drop scheduling
- **Route Optimizer**: Optimize sales routes for efficiency
- **Task Assignment**: Assign and track tasks for salespeople
- **Reports & Analytics**: Detailed reporting and data visualization

### Sales Portal
- **Personal Dashboard**: Daily check-in/check-out functionality
- **Meetings Management**: Schedule and manage client meetings
- **My Clients**: Personalized client list and management
- **Tasks & Messages**: Tabbed interface for tasks, messages, and completed items
- **Weekly Objectives**: Animated circular progress charts for goal tracking

### Features Comparison

| Feature | Admin Portal | Sales Portal |
|---------|--------------|--------------|
| Dashboard | Comprehensive stats & analytics | Personal check-in/out |
| User Management | Full employee CRUD | N/A |
| Client Management | Full CRUD | View & manage assigned clients |
| Meetings | Calendar view with drag-drop | Schedule & view personal meetings |
| Tasks | Assign to employees | View & complete assigned tasks |
| Reports | Advanced analytics | Personal progress tracking |
| Route Optimization | Yes | N/A |

## Tech Stack

- **Frontend Framework**: React.js 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.4
- **Styling**: Tailwind CSS 4.1.14
- **Icons**: Lucide React 0.546.0
- **State Management**: React Context API (local state)
- **Development**: ESLint for code quality

## Project Structure

```
KPM SalesTrack/
├── public/
│   └── vite.svg
├── src/
│   ├── ADMIN/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── FilterButtons.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── performanceChart.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── pages/
│   │   │   ├── login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── ClientManagement/
│   │   │   ├── Dashboard/
│   │   │   ├── EmployeeManagement/
│   │   │   ├── Meetings/
│   │   │   ├── ReportsAnalysis/
│   │   │   ├── RouteOptimizer/
│   │   │   └── TaskAssignment/
│   │   └── index.jsx
│   ├── SALES/
│   │   ├── components/
│   │   │   ├── ProgressCircle.jsx
│   │   │   ├── SalesHeader.jsx
│   │   │   └── SalesSidebar.jsx
│   │   ├── pages/
│   │   │   ├── clients/
│   │   │   ├── Dashboard/
│   │   │   ├── Meetings/
│   │   │   ├── Objective/
│   │   │   └── Task/
│   │   └── index.jsx
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── TODO.md
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Environment Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd KPM-salesTrack-Frontend/KPM\ SalesTrack
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (default Vite port)

## Installation & Setup

### Development Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd KPM-salesTrack-Frontend/KPM\ SalesTrack
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - No additional environment variables are required for local development
   - The application uses mock data and local state management

4. **Start Development Server**
   ```bash
   npm run dev
   ```

### Build for Production

```bash
npm run build
npm run preview
```

### Code Quality

```bash
npm run lint
```

## Usage

### Accessing the Application

1. Start the development server: `npm run dev`
2. Open `http://localhost:5173` in your browser
3. Choose your portal:
   - **Admin Portal**: Access administrative features
   - **Sales Portal**: Access salesperson features

### Role-Based Authentication

- The application uses role-based authentication via React Context API
- Protected routes ensure users can only access appropriate features
- Authentication state is managed locally (ready for API integration)

### Navigation

- **Admin Portal**: Sidebar navigation with Dashboard, Employee Management, Client Management, Meetings, Route Optimizer, Task Assignment, and Reports
- **Sales Portal**: Sidebar navigation with Dashboard, My Clients, Meetings, Tasks & Messages, and Objectives

## Project Architecture

### Component-Based Architecture

The application follows a modular component-based architecture:

- **Shared Components**: Reusable UI components in `src/components/`
- **Role-Specific Components**: Admin and Sales components in respective directories
- **Context API**: Authentication and state management via `AuthContext.jsx`
- **Protected Routes**: Route guarding using `ProtectedRoute.jsx`

### State Management

- Local state management using React hooks and Context API
- No external state management libraries (Redux-free)
- Ready for API integration with backend services

### Responsive Design

- Mobile-first approach using Tailwind CSS
- Responsive breakpoints for desktop, tablet, and mobile devices
- Optimized layouts for different screen sizes

## Key Components

### Admin Components
- `Sidebar.jsx`: Main navigation sidebar
- `StatCard.jsx`: Dashboard statistics cards
- `performanceChart.jsx`: Data visualization charts
- `CalendarGrid.jsx`: Interactive calendar component
- `AddMeetingModal.jsx`: Meeting creation modal

### Sales Components
- `SalesSidebar.jsx`: Sales portal navigation
- `ProgressCircle.jsx`: Animated progress indicators
- `TasksTabs.jsx`: Tabbed task management interface

### Shared Components
- `ProtectedRoute.jsx`: Route protection wrapper
- `Button.jsx`, `Input.jsx`, `Select.jsx`: Reusable form components

## How It Works

### Authentication Flow

1. User accesses the application
2. Role selection determines portal access (Admin/Sales)
3. Authentication context manages user state
4. Protected routes redirect unauthorized users
5. Components render based on user role and permissions

### Data Flow

- Currently uses mock data stored in local state
- Components interact with context for data management
- Ready for API integration with backend endpoints
- CRUD operations handled through component state

### Role-Based System

- **Admin Role**: Full access to all management features
- **Sales Role**: Limited to personal dashboard and assigned tasks
- Authentication context enforces role-based permissions
- UI components conditionally render based on user role

## Screenshots

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)
*Comprehensive admin dashboard with statistics, charts, and activity feed*

### Sales Dashboard
![Sales Dashboard](screenshots/sales-dashboard.png)
*Personal sales dashboard with check-in/out and progress tracking*

### Calendar Management
![Calendar View](screenshots/calendar-view.png)
*Interactive calendar with drag-and-drop meeting scheduling*

### Mobile Responsive
![Mobile View](screenshots/mobile-responsive.png)
*Responsive design optimized for mobile devices*

*Note: Screenshots are placeholders. Replace with actual application screenshots.*

## Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced analytics and reporting
- [ ] GPS tracking for field sales
- [ ] Offline data synchronization
- [ ] Multi-language support
- [ ] Advanced route optimization algorithms
- [ ] Integration with CRM systems
- [ ] Push notifications
- [ ] Data export functionality

## Contributing

This is a university project. Contributions are welcome for educational purposes.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow React best practices
- Use functional components with hooks
- Maintain consistent code style
- Add proper comments and documentation
- Test components thoroughly

## Troubleshooting

### Common Issues

**Development server won't start**
- Ensure Node.js version 16+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Styling issues**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS classes

**Routing problems**
- Verify React Router DOM version compatibility
- Check route definitions in App.jsx

**Build failures**
- Run `npm run lint` to check for code issues
- Ensure all dependencies are installed

### Performance Tips

- Use React.memo for expensive components
- Optimize images and assets
- Minimize bundle size with code splitting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Project Author**: [Your Name]
**University**: [Your University Name]
**Email**: [your.email@university.edu]
**GitHub**: [your-github-username]

For questions or feedback about this university project, please reach out via email or create an issue in the repository.
# KPM SalesTrack Frontend

A modern sales tracking and management system built with React and TypeScript.

## Overview

KPM SalesTrack Frontend provides a user-friendly interface for managing sales operations, tracking performance, and generating insights. This web application helps businesses streamline their sales processes and make data-driven decisions.

## Features

- 📊 Real-time sales dashboard
- 👥 Customer management
- 💰 Sales pipeline tracking
- 📈 Performance analytics
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/KPM-salesTrack-Frontend.git

# Navigate to project directory
cd KPM-salesTrack-Frontend

# Install dependencies
npm install

# Start development server
npm start
```

## Documentation

For detailed documentation, please visit:
- [API Documentation](docs/api.md)
- [User Guide](docs/user-guide.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## Support

For support and questions:
- Create an [Issue](https://github.com/your-username/KPM-salesTrack-Frontend/issues)
- Contact the development team at support@kpmsalestrack.com

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Maintainers

- Project Lead: [Your Name](https://github.com/your-username)
- Development Team: KPM Tech
