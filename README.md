# CapEx Portal Application

A comprehensive Capital Expenditure automation application that digitizes the entire CapEx requisition process from form submission to final approval, with role-based access control and automated approval workflows.

## Features

### 🔐 Role-Based Authentication
- **Requester**: Create and view own CapEx requests
- **Department Head**: First level approval authority
- **Plant Head**: Second level approval authority
- **Business CEO**: Third level approval authority
- **CFO**: Final approval authority
- **CapEx Committee**: Special approval for requests > 25 lakhs
- **Admin**: System administration and configuration

### 📋 CapEx Request Management
- Create new CapEx requests with detailed information
- Upload supporting documents
- Track request status in real-time
- View comprehensive request details
- Business justification and expected delivery dates

### ✅ Approval Workflow
- **Standard Process** (< 25 lakhs): Requester → Department Head → Plant Head → Business CEO → CFO
- **Committee Process** (≥ 25 lakhs): Requester → Department Head → Plant Head → CapEx Committee → Business CEO → CFO
- Real-time approval tracking
- Comments and feedback at each approval level

### 📊 Dashboard & Analytics
- Role-specific dashboards
- Real-time statistics and metrics
- Comprehensive reporting
- Department-wise analysis
- Amount analysis and trends

### 🔔 Notifications
- Real-time notifications for pending approvals
- Status updates and alerts
- Email integration ready (future enhancement)

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Download or clone the application files
2. Open `index.html` in your web browser
3. The application will run locally without any server setup

### Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Requester | john.doe | password123 |
| Department Head | sarah.wilson | password123 |
| Plant Head | mike.johnson | password123 |
| Business CEO | lisa.brown | password123 |
| CFO | david.garcia | password123 |
| CapEx Committee | committee.member | password123 |
| Admin | admin.user | password123 |

## Usage Guide

### 1. Login
- Open the application in your browser
- Select your role from the dropdown
- Enter your username and password
- Enter the captcha text shown (case-insensitive)
- Click the refresh icon to get a new captcha if needed
- Click "Login" to access the dashboard

### 2. Creating a CapEx Request (Requester)
1. Navigate to "Create Request" from the sidebar
2. Fill out the CapEx request form:
   - Request Title
   - CapEx Type (Revenue Growth or Maintenance)
   - Description
   - Amount in INR
   - Expected Delivery Date
   - Business Justification
   - Supporting Documents (optional)
3. Click "Submit Request"
4. The request will be routed to the appropriate approval chain

### 3. Approving Requests (Approvers)
1. Navigate to "Pending Approvals" from the sidebar
2. Review the request details
3. Click "Approve" or "Reject"
4. Add comments if rejecting
5. The request will move to the next approval level

### 4. Viewing Reports (Authorized Users)
1. Navigate to "Reports" from the sidebar
2. View comprehensive analytics including:
   - Request summary statistics
   - Amount analysis
   - Type distribution
   - Department analysis

### 5. Admin Functions (Admin Users)
1. Navigate to "Admin" from the sidebar
2. Access system administration features:
   - User management
   - System settings
   - Data export

## Sample Data

The application includes comprehensive sample data:

### CapEx Requests
- **CAPEX-2024-001**: New Production Line Equipment (₹45,00,000) - Pending Department Head approval
- **CAPEX-2024-002**: HVAC System Replacement (₹18,00,000) - Fully approved
- **CAPEX-2024-003**: Quality Control Equipment Upgrade (₹12,00,000) - Rejected by Plant Head
- **CAPEX-2024-004**: IT Infrastructure Upgrade (₹32,00,000) - Pending CapEx Committee approval
- **CAPEX-2024-005**: Safety Equipment Installation (₹8,50,000) - Pending Department Head approval
- **CAPEX-2024-006**: Warehouse Automation System (₹68,00,000) - Pending CapEx Committee approval

### Approval Scenarios
- **Standard Process**: Requests below ₹25,00,000 follow the standard approval chain
- **Committee Process**: Requests above ₹25,00,000 require CapEx Committee review
- **Different Statuses**: Pending, Approved, Rejected, In Progress

## Technical Details

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with responsive design
- **Data Storage**: Local Storage for demo purposes
- **Architecture**: Single Page Application (SPA)

### File Structure
```
CapEx/
├── index.html                  # Login page
├── dashboard.html              # Main dashboard with admin charts
├── request-form.html            # Enhanced CapEx request form
├── my-requests.html             # Tile-style request viewing
├── approval.html                # Approval interface with comments
├── reports.html                 # Reports & analytics
├── css/
│   ├── main.css               # Core styles
│   ├── components.css         # Component styles + tiles + admin
│   └── responsive.css          # Responsive design
├── js/
│   ├── app.js                 # Main application logic
│   ├── auth.js                # Authentication & session management
│   ├── workflow.js            # Approval workflow
│   ├── data.js                # Sample data (10+ requests)
│   └── sync.js                # Data synchronization manager
├── database/
│   └── capex_database.sql     # Complete MySQL schema
├── assets/
│   └── images/                # Images and logos
└── forms/                      # Reference PDF images
```

### Key Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Dashboard updates automatically
- **Form Validation**: Client-side validation with error messages
- **File Upload**: Drag-and-drop file upload interface
- **Search & Filter**: Advanced filtering capabilities
- **Export Functionality**: Data export in JSON format
- **Accessibility**: Keyboard navigation and screen reader support

## Future Enhancements

### Planned Features
- **Email Notifications**: Automated email alerts for approvals
- **SAP Integration**: WBS/AUC code generation and PO release
- **Power BI Dashboard**: Advanced analytics and reporting
- **Mobile Application**: Native mobile app for iOS and Android
- **Document Management**: Advanced document version control
- **Multi-language Support**: Internationalization support
- **Advanced Reporting**: Custom report builder
- **Workflow Customization**: Configurable approval workflows

### Integration Points
- **SAP ERP**: For WBS/AUC code generation and PO management
- **Email Systems**: For notification delivery
- **Document Management**: For file storage and version control
- **Business Intelligence**: For advanced analytics

## Browser Compatibility

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## Support

For technical support or questions about the application, please contact the development team.

## License

This application is developed for internal use. All rights reserved.

---

**Version**: 2.1.0  
**Last Updated**: April 2024  
**Developer**: CapEx Portal Team

## Recent Updates (v2.1.0)

### Major Enhancements
- ✅ **Enhanced Request Form**: Complete form with all fields from real CapEx PDFs including:
  - Location, Department, Financial Year, Date of Proposal
  - Project Type selection (8 checkbox options)
  - Economic Evaluation (Amount, Machinery, Installation, Payback)
  - Support Attached (12 document type options)
  - Project Timeline and Description
- ✅ **Comment System**: Modal-based approve/reject with mandatory/optional comments
- ✅ **Tile-Style UI**: Professional card-based request viewing with inline actions
- ✅ **Modern Approval Interface**: Professional approval cards with search, filters, expandable details
- ✅ **Admin Dashboard**: 4 chart types (Pie, Bar, Line, Doughnut) with Chart.js
- ✅ **Reports Dashboard**: Professional analytics with 4 chart types and statistics
- ✅ **Data Synchronization**: Real-time sync across tabs and pages
- ✅ **Fixed Sidebar**: Non-collapsible for consistent navigation
- ✅ **Dashboard Metrics**: Fixed to show correct stats for all user roles

### Security Enhancements
- ✅ Removed unwanted "Changes you made may not be saved" warnings
- ✅ CAPTCHA verification on login page
- ✅ Session timeout management
- ✅ Role-based access control

### UI/UX Improvements
- ✅ Dark theme applied throughout
- ✅ Professional tile-style request cards
- ✅ Fixed sidebar (non-collapsible)
- ✅ Chart-based analytics for admin and reports
- ✅ Enhanced navigation with badges
- ✅ Modern approval interface with urgency badges
- ✅ Professional document cards
- ✅ Gradient icon cards for statistics

### Database Integration
- ✅ Complete MySQL schema provided
- ✅ All tables, views, stored procedures, triggers
- ✅ DataSyncManager for localStorage synchronization
- ✅ Ready for backend integration

### New Features
- ✅ 10 sample CapEx requests with full distribution
- ✅ Complete approval chains with comments
- ✅ Search and filter functionality for approvals
- ✅ Export data functionality
- ✅ Track approval chain inline
- ✅ Profile and logout working across all pages
- ✅ Dashboard metrics fixed for all roles
- ✅ Expandable approval details
- ✅ Professional reports dashboard
- ✅ Urgency badges for high-value requests
