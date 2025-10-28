# CapEx Automation - Changelog

## Version 1.1.0 - January 2024

### 🔐 Security Enhancements
- **CAPTCHA Added**: Implemented CAPTCHA verification on login page to prevent automated login attempts
- **Case-insensitive Validation**: CAPTCHA is case-insensitive for better user experience
- **Refresh Functionality**: Added refresh button to generate new captcha codes
- **Visual Captcha Display**: Beautiful gradient background for captcha display with monospace font

### 🎨 UI/UX Improvements
- **Fixed Background Image**: Login page now properly displays `bg.png` background image
- **Fixed Icon Overlap**: Resolved icons overlapping with text in login form fields (increased padding-left to 2.75rem)
- **Dark Theme Consistency**: Applied dark theme to all form elements across the application
  - Form containers: Dark background (#1e293b)
  - Input fields: Dark background (#0f172a) with light text
  - Labels: Light text (#e2e8f0)
  - Borders: Subtle dark borders (#475569)
- **Enhanced Search & Filter**: Updated search inputs and filter dropdowns with dark theme styling
- **Improved File Upload**: Better visual feedback for drag-and-drop file uploads

### 🐛 Bug Fixes
- **Removed Unwanted Warnings**: Disabled "Changes you made may not be saved" browser warnings
- **Removed Error Notifications**: Disabled error notification popups on page load
- **Clean Up**: Removed test files (comprehensive-test.html, test.html) from repository

### 📄 New Pages Created
- **request-form.html**: Standalone CapEx request creation form
- **my-requests.html**: Standalone page for viewing user's requests
- **approval.html**: Standalone approval interface for approvers
- **reports.html**: Standalone reports and analytics dashboard

### 🔗 Navigation Updates
- Updated dashboard.html to link to standalone pages instead of SPA sections
- Improved cross-page navigation with consistent sidebar
- Added proper active state indicators for current page

### 📚 Documentation Updates
- Updated README.md with new file structure
- Added captcha instructions to usage guide
- Documented recent updates and improvements
- Created comprehensive IMPLEMENTATION_GUIDE.md
- Added CHANGELOG.md for version tracking

## Version 1.0.0 - Initial Release

### Core Features
- Role-based authentication system
- Multi-level approval workflow
- CapEx request management
- Dashboard with statistics
- Document upload support
- Search and filtering capabilities
- Mobile responsive design
- Sample data included

---

**Note**: All changes are backward compatible. The application can be used without any server setup.

