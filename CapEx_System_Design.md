# CapEx Portal - System Design

## 1. Overview
A comprehensive Capital Expenditure management portal that digitizes the entire CapEx requisition process from form submission to final approval, with role-based access control, automated approval workflows, real-time data synchronization, and comprehensive analytics.

## 2. User Roles & Permissions

### 2.1 User Roles
1. **Requester** - Plant-level users who initiate CapEx requests
2. **Department Head** - First level approval authority  
3. **Plant Head** - Second level approval authority
4. **Business CEO** - Third level approval authority
5. **CFO** - Final approval authority
6. **CapEx Committee** - Special approval for requests > 25 lakhs
7. **Admin** - System administration and analytics

### 2.2 Role Permissions
- **Requester**: Create, view own requests, attach documents, track approval chain
- **Department Head**: Approve/reject with comments, view department requests
- **Plant Head**: Approve/reject with comments, view plant requests
- **Business CEO**: Approve/reject with comments, view business unit requests
- **CFO**: Final approval authority with comments for all requests
- **CapEx Committee**: Review and approve requests > 25 lakhs with comments
- **Admin**: Manage users, view all data, access comprehensive analytics with charts

## 3. Database Architecture

### 3.1 Database Schema
The application uses a MySQL database with the following structure:

**Core Tables:**
- `users` - User accounts and roles
- `capex_requests` - CapEx requests with all details
- `approval_chain` - Approval workflow tracking
- `documents` - File attachments
- `notifications` - User notifications
- `audit_logs` - System activity tracking
- `departments` - Department information
- `plants` - Plant/location information
- `business_units` - Business unit information
- `settings` - System configuration
- `approval_thresholds` - Approval amount thresholds

**Views:**
- `v_pending_approvals` - Active pending approvals
- `v_user_stats` - User request statistics
- `v_department_stats` - Department-wise statistics

**Stored Procedures:**
- `sp_create_capex_request` - Create new CapEx request
- `sp_approve_request` - Approve request in workflow

**Triggers:**
- `trg_new_request_notification` - Auto-generate notifications
- `trg_approval_notification` - Notify on approval

### 3.2 Data Synchronization
- **Real-time Sync**: 30-second auto-sync interval
- **Storage Events**: Multi-tab synchronization via localStorage events
- **Auto-save**: Automatic save on all data mutations
- **Force Sync**: Manual sync capability

## 4. Application Architecture

### 4.1 Frontend Components
- **Login System** - Captcha-enabled authentication
- **Dashboard** - Role-specific analytics and overview
- **CapEx Form** - Enhanced form with all required fields
- **Tile-style Request View** - Professional card-based layout
- **Approval Interface** - Comment-based approve/reject with modals
- **Admin Dashboard** - Advanced analytics with Chart.js
- **Document Management** - Drag-and-drop file upload
- **Reporting Dashboard** - Comprehensive status tracking

### 4.2 Enhanced Form Fields
Based on real CapEx forms, the application includes:
- Location, Department, Date of Proposal, Financial Year
- Project Name, Purpose of CapEx
- Project Type selection (8 options)
- Project Description, Current Process, Justification
- Similar Activity section
- Support Attached (12 document types)
- Project Timeline (Duration, Required By Date)
- Economic Evaluation:
  - Capex Amount, Machinery Cost, Installation
  - Other Breakdown, Payback Period, NPV

### 4.3 Data Flow
1. **Request Creation** → Enhanced form → Document attachment → Auto-save
2. **Workflow Routing** → Automatic routing based on amount threshold
3. **Approval Chain** → Sequential approvals with comment tracking
4. **Real-time Sync** → Multi-tab synchronization
5. **Status Updates** → Live dashboard updates
6. **WBS/AUC Generation** → Automatic code generation
7. **Analytics** → Real-time charts and metrics

## 5. Key Features

### 5.1 Core Functionality
- ✅ Enhanced multi-step approval workflow
- ✅ Comment-based approvals with modals
- ✅ Tile-style request viewing
- ✅ Document attachment and management
- ✅ Real-time status tracking
- ✅ Role-based dashboards
- ✅ Comprehensive reporting
- ✅ Mobile-responsive design
- ✅ Data synchronization across tabs

### 5.2 Admin Features
- ✅ Chart-based analytics (Pie, Bar, Line, Doughnut) with Chart.js
- ✅ Statistical overview cards with gradient icons
- ✅ Real-time data refresh and force sync
- ✅ Export all data to JSON
- ✅ Department distribution analysis
- ✅ Amount trend tracking
- ✅ Professional reports dashboard with 4 chart types

### 5.3 User Features
- ✅ Profile and settings
- ✅ Logout functionality
- ✅ Fixed sidebar (non-collapsible by default)
- ✅ Navigation visibility based on role
- ✅ Track approval chain
- ✅ View request details inline
- ✅ Modern approval interface with search and filters
- ✅ Expandable request details
- ✅ Professional document display

## 6. Technical Implementation

### 6.1 Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS with dark theme and responsive design
- **Charts**: Chart.js for analytics
- **Icons**: Font Awesome 6.0
- **Data Storage**: 
  - Current: localStorage with sync manager
  - Future: MySQL database (schema provided)
- **Architecture**: Multi-page application with real-time sync

### 6.2 File Structure
```
CapEx/
├── index.html                    # Login page
├── dashboard.html                # Main dashboard with admin features
├── request-form.html             # Enhanced CapEx form
├── my-requests.html              # Tile-style request viewing
├── approval.html                 # Approval interface with comments
├── reports.html                  # Reporting dashboard
├── css/
│   ├── main.css                 # Core styles
│   ├── components.css            # Component styles + tiles + admin
│   └── responsive.css            # Responsive styles
├── js/
│   ├── app.js                    # Main application logic
│   ├── auth.js                   # Authentication
│   ├── workflow.js               # Approval workflow
│   ├── data.js                   # Sample data (10+ requests)
│   └── sync.js                   # Data synchronization manager
├── assets/
│   └── images/                   # Images and logos
├── database/
│   └── capex_database.sql        # Complete SQL schema
└── forms/                        # Reference images
```

## 7. Data Structure

### 7.1 Sample Data
- **10 CapEx Requests** covering all scenarios:
  - Pending, In Progress, Approved, Rejected statuses
  - Various departments and plants
  - Different amounts (triggering different workflows)
  - Comprehensive approval chains with comments
  
- **10 Users** across all roles
- **Complete notifications** system
- **All approval chains** with timestamp tracking

### 7.2 Request Fields
Enhanced request object includes all fields from real-world CapEx forms:
- Basic Information (location, department, dates, financial year)
- Project Type (8 checkbox options)
- Project Description & Justification
- Similar Activity tracking
- Support Documents (12 types)
- Economic Evaluation details
- Complete approval chain with comments

## 8. User Experience Enhancements

### 8.1 Tile-Style Design
- Professional card-based layout for requests
- Inline actions (View Details, Track Approval Chain)
- Hover effects and smooth transitions
- Responsive grid layout
- Search and filter functionality

### 8.2 Navigation Improvements
- Collapsible sidebar (three-line toggle)
- Role-based menu visibility
- Smooth collapse/expand animations
- Profile and logout working across all pages
- Badge notifications for pending items

### 8.3 Admin Dashboard
- 4 Chart types: Pie, Bar, Line, Doughnut
- Real-time statistics
- Export functionality
- Refresh capability
- Department distribution analysis

### 8.4 Modern Approval Interface
- Professional card-based approval interface
- Urgency badges (High Value vs Standard)
- Quick info grid for essential details
- Search functionality (filter by title, description, ID)
- Filter options (All, High Amount ≥₹25L, Urgent)
- Expandable detailed sections ("Show More/Less")
- Professional document cards with download buttons
- Large action buttons (Approve/Reject with comments)
- Color-coded information (amount in green, status badges)
- Smooth hover effects and transitions
- Responsive design for all devices

### 8.5 Reports & Analytics Dashboard
- 4 statistics cards with gradient icons
- 4 chart types: Status (Pie), Type (Bar), Trend (Line), Department (Doughnut)
- Financial overview section with totals and averages
- Department analysis with request counts
- Export all data functionality
- Professional card-based layout
- Chart.js integration
- Responsive grid layouts

## 9. Implementation Details

### 9.1 Data Synchronization
```javascript
// Auto-sync every 30 seconds
// Multi-tab synchronization via storage events
// Auto-save on all mutations
// Force sync capability
```

### 9.2 Approval Workflow
- Modal-based approve/reject interface
- Mandatory comments for rejections
- Optional comments for approvals
- Complete approval chain tracking
- Real-time status updates

### 9.3 Chart Implementation
- Chart.js library integration
- Pie chart for status distribution
- Bar chart for type distribution  
- Line chart for amount trends
- Doughnut chart for department distribution

## 10. Database Migration Path

### 10.1 Current Implementation
- Uses localStorage with DataSyncManager
- Real-time synchronization across tabs
- Auto-save on all changes
- Complete data persistence

### 10.2 Future Implementation
- MySQL database schema provided
- RESTful API endpoints needed
- Backend authentication required
- Real-time updates via WebSockets

### 10.3 Database Tables
See `database/capex_database.sql` for complete schema including:
- All necessary tables
- Relationships and foreign keys
- Indexes for performance
- Views for common queries
- Stored procedures for operations
- Triggers for automation

## 11. Security Features
- Password-based authentication
- Role-based access control
- CAPTCHA on login
- Session timeout management
- Audit logging capability
- Data encryption ready

## 12. Testing & Deployment

### 12.1 Testing Checklist
- ✅ All user roles can login
- ✅ Request form captures all fields
- ✅ Approval workflow with comments
- ✅ Tile-style request viewing
- ✅ Admin dashboard with charts
- ✅ Data synchronization across tabs
- ✅ Profile and logout functionality
- ✅ Sidebar toggle works properly
- ✅ Real-time data updates

### 12.2 Known Features
- Comment modals for approve/reject
- Search and filter on requests
- Track approval chain inline
- Export data functionality
- Chart-based analytics
- Mobile responsive design

## 13. Future Enhancements
- MySQL database integration
- Email notification system
- SAP integration for WBS/AUC codes
- Power BI dashboard integration
- Mobile application
- Advanced reporting and analytics
- Document version control
- Multi-language support
- Real-time WebSocket updates

