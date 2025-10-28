# CapEx Automation Application - Implementation Guide

## Overview
The CapEx Automation Application has been completed with separate HTML pages for better organization and easier navigation. All files are created and integrated according to the system design.

## Application Structure

```
CapEx/
├── index.html (Login page)
├── dashboard.html (Main dashboard)
├── request-form.html (CapEx request creation form)
├── approval.html (Approval interface)
├── reports.html (Reporting dashboard)
├── my-requests.html (My requests list)
├── css/
│   ├── main.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── app.js (Main application logic)
│   ├── auth.js (Authentication)
│   ├── workflow.js (Approval workflow)
│   └── data.js (Sample data)
└── assets/
    └── images/
        └── bg.png (Background image)
```

## Files Created/Updated

### 1. **index.html** (Login Page)
- Login form with username, password, and role selection
- Background image integration (fixed)
- Demo credentials displayed on login page
- Redirects to dashboard.html after successful login

### 2. **dashboard.html** (Main Dashboard)
- **Updated** to link to separate pages instead of sections
- Dashboard with statistics cards
- Recent requests list
- Pending approvals preview
- Quick action buttons
- Approval workflow diagram

### 3. **request-form.html** (NEW - CapEx Request Form)
- Complete form for creating new CapEx requests
- Fields include:
  - Request title
  - CapEx type (Revenue Growth/Maintenance)
  - Description
  - Amount in INR
  - Expected delivery date
  - Business justification
  - Document upload with drag-and-drop support
- Form validation and submission
- Redirects to dashboard after successful submission
- Approval chain auto-configured based on amount (25 lakhs threshold)

### 4. **my-requests.html** (NEW - My Requests)
- List of all requests created by the current user
- Search functionality
- Filter by status (All, Pending, Approved, Rejected, In Progress)
- Filter by type (Revenue Growth, Maintenance)
- Table view with sortable columns
- View details modal with complete request information
- Approval chain visualization

### 5. **approval.html** (NEW - Pending Approvals)
- List of requests pending approval for current user
- Approve/Reject buttons with optional comments
- Detailed request view
- Document download capability
- Real-time status updates
- Shows approval chain progress

### 6. **reports.html** (NEW - Reports & Analytics)
- Request summary statistics
- Amount analysis (total, average, highest)
- Type distribution chart
- Department-wise analysis
- Recent requests table
- Export data functionality (JSON download)

## Integration Points

### Navigation Flow
1. **Login** (index.html) → **Dashboard** (dashboard.html)
2. **Dashboard** → **New Request** (request-form.html)
3. **Dashboard** → **My Requests** (my-requests.html)
4. **Dashboard** → **Pending Approvals** (approval.html)
5. **Dashboard** → **Reports** (reports.html)

### Authentication
- All pages (except index.html) check for authentication
- Unauthenticated users are redirected to login page
- Session management with 8-hour timeout
- Role-based access control

### Data Persistence
- Uses localStorage for request data
- Automatically saves to localStorage on submission
- Loads from localStorage on page load
- Sample data provided for demo purposes

## Features by Page

### request-form.html
- Complete CapEx request creation form
- Drag-and-drop file upload
- Multiple file support
- File size validation (10MB max per file)
- Real-time file list preview
- Form validation
- Auto-approval chain configuration

### my-requests.html
- Display all user's requests
- Search by title or ID
- Filter by status and type
- View detailed request information
- Approval chain visualization
- WBS/AUC/PO codes display (if approved)

### approval.html
- List pending approvals for current user
- Approve with optional comment
- Reject with required reason
- View full request details
- Download documents
- Real-time status updates

### reports.html
- Comprehensive statistics
- Amount analysis
- Type and department breakdown
- Recent requests table
- Export functionality

## How to Use

### As a Requester
1. Login with `john.doe / password123`
2. Click "New Request" to create a CapEx request
3. Fill out the form completely
4. Upload supporting documents
5. Click "Submit Request"
6. View your requests in "My Requests"
7. Track approval status and history

### As an Approver (Department Head, Plant Head, CEO, CFO)
1. Login with appropriate credentials
2. Go to "Pending Approvals"
3. Review request details
4. Click "Approve" or "Reject" button
5. Add comments if needed
6. View approval history

### As an Admin
1. Login with `admin.user / password123`
2. Access all sections
3. View reports and analytics
4. Export data
5. Manage system settings

## Key Functions

### Authentication (auth.js)
- `authManager.login()` - User authentication
- `authManager.logout()` - User logout
- `authManager.getCurrentUser()` - Get current user
- `authManager.getPendingApprovals()` - Get pending approvals
- `authManager.getMyRequests()` - Get user's requests
- `updateUserInterface()` - Update UI with user data

### Workflow (workflow.js)
- `approveRequest()` - Approve a request
- `rejectRequest()` - Reject a request
- `viewRequestDetails()` - View request details modal
- `formatCurrency()` - Format currency display
- `formatDate()` - Format date display

### Utilities (app.js)
- `showMessage()` - Display notification messages
- `formatFileSize()` - Format file size display
- Global event handlers
- Form validation

## Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Requester | john.doe | password123 |
| Department Head | sarah.wilson | password123 |
| Plant Head | mike.johnson | password123 |
| Business CEO | lisa.brown | password123 |
| CFO | david.garcia | password123 |
| CapEx Committee | committee.member | password123 |
| Admin | admin.user | password123 |

## Testing Checklist

### Login Flow
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Role selection works correctly
- [ ] Redirect to dashboard after login
- [ ] Redirect to login if not authenticated

### Request Creation
- [ ] Create new CapEx request
- [ ] Form validation works
- [ ] File upload works
- [ ] Drag-and-drop file upload
- [ ] Form submission successful
- [ ] Redirect to dashboard after submission

### My Requests
- [ ] View all my requests
- [ ] Search functionality
- [ ] Filter by status
- [ ] Filter by type
- [ ] View request details
- [ ] Approval chain visualization

### Approvals
- [ ] View pending approvals
- [ ] Approve request with comment
- [ ] Reject request with reason
- [ ] Download documents
- [ ] View request details
- [ ] Status updates correctly

### Reports
- [ ] View all statistics
- [ ] Request summary accurate
- [ ] Amount analysis correct
- [ ] Type distribution visible
- [ ] Department breakdown shown
- [ ] Export data works

## Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Edge, Safari)
- No IE11 support
- Responsive design for mobile devices

### Data Storage
- Uses localStorage API
- Data persists across page refreshes
- No backend required for demo

### CSS Framework
- Custom CSS with CSS variables
- Responsive breakpoints
- Mobile-first approach
- Font Awesome icons

### JavaScript
- Vanilla JavaScript (ES6+)
- No dependencies
- Modular structure
- Event-driven architecture

## Future Enhancements
- Backend API integration
- Real database storage
- Email notifications
- SAP integration
- Power BI integration
- Advanced analytics
- Document version control
- Multi-language support

## Summary

The CapEx Automation Application is now complete with separate HTML pages for each major section. The application follows the system design and provides a comprehensive solution for managing Capital Expenditure requests through a streamlined approval workflow. All pages are integrated, functional, and ready for use.

