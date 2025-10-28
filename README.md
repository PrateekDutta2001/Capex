# CapEx Automation Application

## 1. Overview
A comprehensive Capital Expenditure automation application that digitizes the entire CapEx requisition process from form submission to final approval, with role-based access control and automated approval workflows.

## 2. User Roles & Permissions

### 2.1 User Roles
1. **Requester** - Plant-level users who initiate CapEx requests
2. **Department Head** - First level approval authority
3. **Plant Head** - Second level approval authority  
4. **Business CEO** - Third level approval authority
5. **CFO** - Final approval authority
6. **CapEx Committee** - Special approval for requests > 25 lakhs
7. **Admin** - System administration and configuration

### 2.2 Role Permissions
- **Requester**: Create, view own requests, attach documents
- **Department Head**: Approve/reject requests from their department
- **Plant Head**: Approve/reject requests from their plant
- **Business CEO**: Approve/reject requests from their business unit
- **CFO**: Final approval authority for all requests
- **CapEx Committee**: Review and approve requests > 25 lakhs
- **Admin**: Manage users, configure workflows, view all data

## 3. CapEx Types & Approval Thresholds

### 3.1 CapEx Types
1. **Revenue Growth CapEx** - Investments for business expansion
2. **Maintenance CapEx** - Equipment maintenance and replacement

### 3.2 Approval Thresholds
- **Standard Process** (< 25 lakhs): Requester → Department Head → Plant Head → Business CEO → CFO
- **Committee Process** (≥ 25 lakhs): Requester → Department Head → Plant Head → CapEx Committee → Business CEO → CFO

## 4. Application Architecture

### 4.1 Frontend Components
- **Login System** - Role-based authentication
- **Dashboard** - Role-specific overview and pending actions
- **CapEx Form** - Dynamic form with validation
- **Approval Interface** - Streamlined approval/rejection workflow
- **Document Management** - File upload and viewing
- **Reporting Dashboard** - Status tracking and analytics

### 4.2 Data Flow
1. **Request Creation** → Form validation → Document attachment
2. **Workflow Routing** → Automatic routing based on amount and type
3. **Approval Chain** → Sequential approvals with notifications
4. **Status Updates** → Real-time status tracking
5. **WBS/AUC Generation** → Automatic code generation post-approval
6. **PO Release** → Integration point for procurement

## 5. Key Features

### 5.1 Core Functionality
- Multi-step approval workflow
- Document attachment and management
- Real-time status tracking
- Role-based dashboards
- Comprehensive reporting
- Mobile-responsive design

### 5.2 Advanced Features
- Automatic routing based on amount thresholds
- Email notifications (future integration)
- SAP integration points (future)
- Power BI dashboard integration (future)
- Audit trail and compliance tracking

## 6. Technical Implementation

### 6.1 Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with responsive design
- **Data Storage**: Local Storage for demo purposes
- **Architecture**: Single Page Application (SPA)

### 6.2 File Structure
```
CapEx/
├── index.html (Login page)
├── dashboard.html (Main dashboard)
├── request-form.html (CapEx request form)
├── approval.html (Approval interface)
├── reports.html (Reporting dashboard)
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
```

## 7. Sample Data Structure

### 7.1 Users
- Multiple users for each role
- Different departments and plants
- Various business units

### 7.2 CapEx Requests
- Requests below 25 lakhs (standard process)
- Requests above 25 lakhs (committee process)
- Different CapEx types (Revenue Growth vs Maintenance)
- Various statuses (Pending, Approved, Rejected, etc.)

### 7.3 Approval Chains
- Complete approval workflows
- Different routing scenarios
- Status tracking at each level

## 8. User Experience Design

### 8.1 Design Principles
- **Simplicity**: Easy-to-use interface for plant-level users
- **Efficiency**: Streamlined approval process
- **Transparency**: Clear status tracking and visibility
- **Accessibility**: Mobile-responsive design
- **Intuitive**: Role-based navigation and workflows

### 8.2 Key User Journeys
1. **Requester Journey**: Login → Create Request → Attach Documents → Submit → Track Status
2. **Approver Journey**: Login → View Pending Approvals → Review Details → Approve/Reject → Add Comments
3. **Admin Journey**: Login → Manage Users → Configure Settings → View Reports

## 9. Future Enhancements
- Email notification system
- SAP integration for WBS/AUC codes
- Power BI dashboard integration
- Mobile application
- Advanced reporting and analytics
- Document version control
- Multi-language support
