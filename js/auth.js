// Authentication Module for CapEx Automation Application

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('capex_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isAuthenticated = true;
        }
    }

    login(username, password, role) {
        // Find user in the users array
        const user = users.find(u => 
            u.username === username && 
            u.password === password && 
            u.role === role
        );

        if (user) {
            this.currentUser = user;
            this.isAuthenticated = true;
            
            // Save to localStorage
            localStorage.setItem('capex_current_user', JSON.stringify(user));
            
            // Save login timestamp
            localStorage.setItem('capex_login_time', new Date().toISOString());
            
            return { success: true, user: user };
        } else {
            return { success: false, message: 'Invalid credentials or role' };
        }
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        
        // Clear localStorage
        localStorage.removeItem('capex_current_user');
        localStorage.removeItem('capex_login_time');
        
        // Redirect to login page
        window.location.href = 'index.html';
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isLoggedIn() {
        return this.isAuthenticated && this.currentUser !== null;
    }

    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }

    hasAnyRole(roles) {
        return this.currentUser && roles.includes(this.currentUser.role);
    }

    canApprove() {
        const approverRoles = ['department_head', 'plant_head', 'business_ceo', 'cfo', 'capex_committee'];
        return this.hasAnyRole(approverRoles);
    }

    canCreateRequest() {
        return this.hasRole('requester') || this.hasRole('admin');
    }

    canViewAllRequests() {
        return this.hasRole('admin') || this.hasRole('cfo') || this.hasRole('business_ceo');
    }

    canManageUsers() {
        return this.hasRole('admin');
    }

    getApprovalLevel() {
        if (!this.currentUser) return 0;
        
        const levelMap = {
            'requester': 1,
            'department_head': 2,
            'plant_head': 3,
            'capex_committee': 4,
            'business_ceo': 5,
            'cfo': 6,
            'admin': 0
        };
        
        return levelMap[this.currentUser.role] || 0;
    }

    getPendingApprovals() {
        if (!this.canApprove()) return [];
        
        const currentUserId = this.currentUser.id;
        const currentUserRole = this.currentUser.role;
        
        return capexRequests.filter(request => {
            if (request.status === 'pending' || request.status === 'in_progress') {
                // Find the current approver in the approval chain
                const currentApprover = request.approvalChain.find(approval => 
                    approval.status === 'pending' && approval.userId === currentUserId
                );
                
                // Also check if the current user's role matches the current approver role
                const roleMatch = request.currentApprover === currentUserRole;
                
                return currentApprover || roleMatch;
            }
            return false;
        });
    }

    getMyRequests() {
        if (!this.currentUser) return [];
        
        return capexRequests.filter(request => 
            request.requesterId === this.currentUser.id
        );
    }

    getDashboardStats() {
        const myRequests = this.getMyRequests();
        const pendingApprovals = this.getPendingApprovals();
        
        let totalRequests = myRequests.length;
        let pendingRequests = myRequests.filter(r => r.status === 'pending' || r.status === 'in_progress').length;
        let approvedRequests = myRequests.filter(r => r.status === 'approved').length;
        let rejectedRequests = myRequests.filter(r => r.status === 'rejected').length;
        
        // If user can view all requests, show global stats
        if (this.canViewAllRequests()) {
            totalRequests = capexRequests.length;
            pendingRequests = capexRequests.filter(r => r.status === 'pending' || r.status === 'in_progress').length;
            approvedRequests = capexRequests.filter(r => r.status === 'approved').length;
            rejectedRequests = capexRequests.filter(r => r.status === 'rejected').length;
        }
        
        return {
            totalRequests,
            pendingRequests,
            approvedRequests,
            rejectedRequests,
            pendingApprovals: pendingApprovals.length
        };
    }

    getNotifications() {
        if (!this.currentUser) return [];
        
        return notifications.filter(notification => 
            notification.userId === this.currentUser.id
        );
    }

    getUnreadNotificationCount() {
        return this.getNotifications().filter(n => !n.read).length;
    }

    markNotificationAsRead(notificationId) {
        const notification = notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
        }
    }

    markAllNotificationsAsRead() {
        const userNotifications = this.getNotifications();
        userNotifications.forEach(notification => {
            notification.read = true;
        });
        this.saveNotifications();
    }

    saveNotifications() {
        localStorage.setItem('capex_notifications', JSON.stringify(notifications));
    }

    // Session management
    checkSession() {
        const loginTime = localStorage.getItem('capex_login_time');
        if (loginTime) {
            const loginDate = new Date(loginTime);
            const now = new Date();
            const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);
            
            // Session expires after 8 hours
            if (hoursSinceLogin > 8) {
                this.logout();
                return false;
            }
        }
        return true;
    }

    // Auto-logout on page unload (optional)
    setupSessionTimeout() {
        // Check session every 5 minutes
        setInterval(() => {
            if (!this.checkSession()) {
                alert('Your session has expired. Please log in again.');
            }
        }, 5 * 60 * 1000);
    }
}

// Initialize global auth manager
const authManager = new AuthManager();

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            
            if (!username || !password || !role) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            const result = authManager.login(username, password, role);
            
            if (result.success) {
                showMessage('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showMessage(result.message, 'error');
            }
        });
    }
    
    // Logout button handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                authManager.logout();
            }
        });
    }
    
    // Check if user is logged in when accessing dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        if (!authManager.isLoggedIn()) {
            window.location.href = 'index.html';
        } else {
            // Update UI with current user info
            updateUserInterface();
        }
    }
});

// Update user interface with current user information
function updateUserInterface() {
    const currentUser = authManager.getCurrentUser();
    if (!currentUser) return;
    
    // Update user name displays
    const userNameElements = document.querySelectorAll('#userName, #userNameHeader, #profileName');
    userNameElements.forEach(element => {
        if (element) element.textContent = currentUser.name;
    });
    
    // Update user role display
    const userRoleElements = document.querySelectorAll('#userRole, #profileRole');
    userRoleElements.forEach(element => {
        if (element) element.textContent = roleDefinitions[currentUser.role]?.label || currentUser.role;
    });
    
    // Show/hide navigation items based on role
    updateNavigationVisibility();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Update pending approvals count
    updatePendingApprovalsCount();
    
    // Load notifications
    loadNotifications();
}

// Update navigation visibility based on user role
function updateNavigationVisibility() {
    const currentUser = authManager.getCurrentUser();
    if (!currentUser) return;
    
    // Show/hide create request nav
    const createRequestNav = document.getElementById('createRequestNav');
    if (createRequestNav) {
        createRequestNav.style.display = authManager.canCreateRequest() ? 'block' : 'none';
    }
    
    // Show/hide pending approvals nav
    const pendingApprovalsNav = document.getElementById('pendingApprovalsNav');
    if (pendingApprovalsNav) {
        pendingApprovalsNav.style.display = authManager.canApprove() ? 'block' : 'none';
    }
    
    // Show/hide reports nav
    const reportsNav = document.getElementById('reportsNav');
    if (reportsNav) {
        reportsNav.style.display = authManager.canViewAllRequests() ? 'block' : 'none';
    }
    
    // Show/hide admin nav
    const adminNav = document.getElementById('adminNav');
    if (adminNav) {
        adminNav.style.display = authManager.canManageUsers() ? 'block' : 'none';
    }
    
    // Show/hide quick action buttons
    const manageUsersBtn = document.getElementById('manageUsersBtn');
    if (manageUsersBtn) {
        manageUsersBtn.style.display = authManager.canManageUsers() ? 'block' : 'none';
    }
}

// Update dashboard statistics
function updateDashboardStats() {
    const stats = authManager.getDashboardStats();
    
    const totalRequestsElement = document.getElementById('totalRequests');
    if (totalRequestsElement) totalRequestsElement.textContent = stats.totalRequests;
    
    const pendingRequestsElement = document.getElementById('pendingRequests');
    if (pendingRequestsElement) pendingRequestsElement.textContent = stats.pendingRequests;
    
    const approvedRequestsElement = document.getElementById('approvedRequests');
    if (approvedRequestsElement) approvedRequestsElement.textContent = stats.approvedRequests;
    
    const rejectedRequestsElement = document.getElementById('rejectedRequests');
    if (rejectedRequestsElement) rejectedRequestsElement.textContent = stats.rejectedRequests;
}

// Update pending approvals count
function updatePendingApprovalsCount() {
    const pendingCount = authManager.getPendingApprovals().length;
    const pendingCountElement = document.getElementById('pendingCount');
    if (pendingCountElement) {
        pendingCountElement.textContent = pendingCount;
        pendingCountElement.style.display = pendingCount > 0 ? 'inline-flex' : 'none';
    }
    
    // Update notification badge
    const notificationBadge = document.getElementById('notificationBadge');
    if (notificationBadge) {
        const unreadCount = authManager.getUnreadNotificationCount();
        notificationBadge.textContent = unreadCount;
        notificationBadge.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
    }
}

// Load notifications
function loadNotifications() {
    const notificationList = document.getElementById('notificationList');
    if (!notificationList) return;
    
    const userNotifications = authManager.getNotifications();
    
    if (userNotifications.length === 0) {
        notificationList.innerHTML = '<div class="empty-state"><i class="fas fa-bell-slash"></i><h3>No Notifications</h3><p>You don\'t have any notifications at this time.</p></div>';
        return;
    }
    
    notificationList.innerHTML = userNotifications.map(notification => `
        <div class="notification-item ${notification.read ? 'read' : 'unread'}">
            <div class="notification-icon ${notification.type}">
                <i class="fas fa-${notification.type === 'success' ? 'check-circle' : notification.type === 'error' ? 'exclamation-circle' : notification.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            </div>
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <span class="notification-time">${workflowManager.formatDateTime(notification.createdAt)}</span>
            </div>
        </div>
    `).join('');
}


// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hours ago`;
    } else {
        return date.toLocaleDateString();
    }
}
