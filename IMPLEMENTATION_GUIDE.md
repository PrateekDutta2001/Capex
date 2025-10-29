# CapEx Portal - Implementation Guide

## Overview
This guide provides complete instructions for implementing and deploying the CapEx Portal application with MySQL database integration.

## Prerequisites

### For Current Implementation (Client-Side Only)
- Modern web browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- No server required
- Just open `index.html` in browser

### For Database Integration (Future)
- MySQL 8.0 or higher
- Web server (Apache/Nginx)
- PHP 8.0+ or Node.js 16+ (for backend API)
- phpMyAdmin or MySQL Workbench

## Installation

### Step 1: Extract Files
```
1. Extract all files to your web directory
2. Ensure all folders (css, js, assets, database) are in place
3. Open index.html in your browser
```

### Step 2: Database Setup (For Future Backend)
```bash
# Connect to MySQL
mysql -u root -p

# Run the schema file
source database/capex_database.sql

# Verify tables
SHOW TABLES;
```

## Configuration

### Current Configuration (LocalStorage)
The application currently uses localStorage for data persistence. All data is automatically synced across:
- All pages
- All browser tabs
- Page reloads

### Data Synchronization
- **Auto-save**: All changes saved to localStorage immediately
- **Cross-tab Sync**: Opens in multiple tabs sync automatically
- **30-second Auto-refresh**: Dashboard updates every 30 seconds
- **Manual Sync**: Call `dataSyncManager.forceSync()` to refresh

## Usage

### Login Credentials
```
Requester: john.doe / password123
Department Head: sarah.wilson / password123
Plant Head: mike.johnson / password123
Business CEO: lisa.brown / password123
CFO: david.garcia / password123
CapEx Committee: committee.member / password123
Admin: admin.user / password123
```

### Creating a Request
1. Login as requester
2. Click "New Request" or go to request-form.html
3. Fill all required fields (marked with *)
4. Select project types and support documents
5. Enter economic evaluation details
6. Upload documents (optional)
7. Click "Submit Request"
8. Request routed to Department Head

### Approving Requests
1. Login as approver
2. Click "Pending Approvals"
3. Review request details
4. Click "Approve" or "Reject"
5. Add comment in modal dialog
6. Submit - request moves to next level

### Admin Functions
1. Login as admin
2. Click "Admin" in sidebar
3. View charts:
   - Requests by Status (Pie)
   - Requests by Type (Bar)
   - Amount Trend (Line)
   - Department Distribution (Doughnut)
4. Export data or refresh statistics

## Features

### Enhanced Request Form
Based on real CapEx PDF forms, includes:
- **Basic Info**: Location, Department, Financial Year, Dates
- **Project Type**: 8 checkbox options
- **Description**: Current Process, Project Description, Justification
- **Support**: 12 document type options
- **Economic**: Amount, Machinery, Installation, Payback, NPV

### Approval Workflow
```
Amount < ₹25 Lakhs:
Requester → Department Head → Plant Head → Business CEO → CFO

Amount ≥ ₹25 Lakhs:
Requester → Department Head → Plant Head → CapEx Committee → Business CEO → CFO
```

### Tile-Style Request Viewing
- Professional card layout
- Inline actions (View Details, Track)
- Search and filter
- Status indicators

### Admin Dashboard
- Statistical overview cards
- 4 chart types with Chart.js
- Real-time data
- Export functionality

### Sidebar Navigation
- Collapsible (click three-line icon)
- Role-based menu visibility
- Badge notifications
- Profile and logout buttons

## Data Synchronization

### Current Implementation
```
localStorage
├── capex_requests      # All CapEx requests
├── capex_users        # User data
├── capex_notifications # User notifications
└── capex_current_user  # Current session
```

### Automatic Sync
- Auto-save on create/update/delete
- Storage event listeners for multi-tab sync
- 30-second refresh interval
- Force sync capability

### Manual Sync
```javascript
// Force refresh data
dataSyncManager.forceSync();

// Update request
dataSyncManager.updateRequest(id, {status: 'approved'});

// Get statistics
const stats = dataSyncManager.getStatistics();
```

## Database Integration (Future)

### API Endpoints Needed
```
POST   /api/login
POST   /api/logout
GET    /api/user/me
GET    /api/requests
POST   /api/requests
GET    /api/requests/:id
PUT    /api/requests/:id
DELETE /api/requests/:id
POST   /api/requests/:id/approve
POST   /api/requests/:id/reject
GET    /api/pending-approvals
GET    /api/notifications
PUT    /api/notifications/:id/read
GET    /api/stats
```

### Using Stored Procedures
```sql
-- Create request
CALL sp_create_capex_request(
    'CAPEX-2024-011',
    'New Equipment',
    1500000,
    1,
    'John Doe',
    'Production',
    'Plant A'
);

-- Approve request
CALL sp_approve_request(
    'CAPEX-2024-011',
    2,
    'Sarah Wilson',
    'Approved - Good proposal'
);
```

## Testing

### Test Checklist
1. ✅ Login with all roles
2. ✅ Create request with all fields
3. ✅ Upload documents
4. ✅ Approve/reject with comments (modal with textarea)
5. ✅ View tiles on my-requests page
6. ✅ Track approval chain
7. ✅ Admin dashboard loads charts
8. ✅ Fixed sidebar (non-collapsible)
9. ✅ Data syncs across tabs
10. ✅ Profile and logout work
11. ✅ Dashboard metrics show correctly for all roles
12. ✅ Pending approvals page with search and filters
13. ✅ Expandable approval details
14. ✅ Reports dashboard with charts
15. ✅ Export data functionality

### Test Scenarios
```
Scenario 1: Standard Approval (<₹25L)
- Login as john.doe (requester)
- Create request for ₹20L
- Login as sarah.wilson (dept head) - approve with comment
- Login as mike.johnson (plant head) - approve
- Login as lisa.brown (CEO) - approve
- Login as david.garcia (CFO) - approve
- Check WBS/AUC codes generated

Scenario 2: Committee Approval (≥₹25L)
- Login as john.doe (requester)
- Create request for ₹45L
- Login as sarah.wilson - approve (should show as "High Value")
- Login as mike.johnson - approve
- Login as committee.member - approve
- Login as lisa.brown - approve
- Login as david.garcia - approve
- Check full approval chain

Scenario 3: Rejection
- Create request
- Login as approver (sarah.wilson)
- Use modern approval interface to reject with mandatory comment
- Check rejection tracking

Scenario 4: Approval Interface Features
- Login as sarah.wilson (department head)
- Go to Pending Approvals
- Use search to filter requests
- Use filter buttons (All, High Amount)
- Click "Show More" to expand details
- Click approve/reject to see modal
- Add comment and submit

Scenario 5: Dashboard Metrics
- Login as sarah.wilson (should see 10 total requests, not 0)
- Login as admin.user (should see full stats with charts)
- Verify all metrics display correctly
```

## Troubleshooting

### Issue: "Changes may not be saved" dialog
**Solution**: Already fixed - updated beforeunload handler in index.html

### Issue: Data not syncing
**Solution**: Check if sync.js is included in all pages, verify localStorage permissions

### Issue: Charts not showing
**Solution**: Check if Chart.js CDN is loaded, verify data exists

### Issue: Sidebar not collapsing
**Solution**: Check if sidebar-toggle event listener is properly attached

### Issue: Profile/Logout not working
**Solution**: Verify event listeners in auth.js are properly attached

## Deployment

### For Development
```
Open index.html directly in browser
No server required
All data persists in localStorage
```

### For Production with Database
```
1. Setup MySQL database using capex_database.sql
2. Create REST API backend (PHP/Node.js)
3. Update API endpoints in all JS files
4. Deploy to web server
5. Configure database connection
6. Update CORS settings if needed
```

## Support
For technical support or questions, refer to:
- System Design: `CapEx_System_Design_UPDATED.md`
- Database Schema: `database/capex_database.sql`
- Implementation Guide: This file

## Version Information
- **Version**: 2.0.0
- **Release Date**: April 2024
- **Database Version**: 1.0.0
- **API Version**: Not implemented (future)
