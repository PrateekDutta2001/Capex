// Main Application JavaScript for CapEx Portal

class CapExApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlobalEventListeners();
        this.initializeApp();
    }

    setupGlobalEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });

        // Handle page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handlePageHidden();
            } else {
                this.handlePageVisible();
            }
        });

    // Handle beforeunload - Disabled to prevent unwanted warnings
    // window.addEventListener('beforeunload', (e) => {
    //     this.handleBeforeUnload(e);
    // });

        // Handle clicks outside modals
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('show');
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });
    }

    initializeApp() {
        // Check if user is authenticated
        if (window.location.pathname.includes('dashboard.html')) {
            if (!authManager.isLoggedIn()) {
                window.location.href = 'index.html';
                return;
            }

            // Initialize dashboard
            this.initializeDashboard();
        }

        // Setup session timeout
        authManager.setupSessionTimeout();

        // Initialize tooltips
        this.initializeTooltips();

        // Initialize form validations
        this.initializeFormValidations();
    }

    initializeDashboard() {
        // Update user interface
        updateUserInterface();

        // Load initial dashboard content
        workflowManager.loadDashboardContent();

        // Setup real-time updates (simulated)
        this.setupRealTimeUpdates();
    }

    setupRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            this.updateDashboardData();
        }, 30000);
    }

    updateDashboardData() {
        // Update dashboard stats
        updateDashboardStats();

        // Update pending approvals count
        updatePendingApprovalsCount();

        // Update recent requests
        workflowManager.loadRecentRequests();

        // Update pending approvals
        workflowManager.loadPendingApprovals();
    }

    initializeTooltips() {
        // Initialize tooltips for elements with data-tooltip attribute
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.classList.add('tooltip');
        });
    }

    initializeFormValidations() {
        // Real-time form validation
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });

                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required`;
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Number validation
        if (field.type === 'number' && value) {
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
                isValid = false;
                errorMessage = 'Please enter a valid number';
            } else if (field.hasAttribute('min') && numValue < parseFloat(field.getAttribute('min'))) {
                isValid = false;
                errorMessage = `Value must be at least ${field.getAttribute('min')}`;
            } else if (field.hasAttribute('max') && numValue > parseFloat(field.getAttribute('max'))) {
                isValid = false;
                errorMessage = `Value must be at most ${field.getAttribute('max')}`;
            }
        }

        // Date validation
        if (field.type === 'date' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            if (selectedDate < today) {
                isValid = false;
                errorMessage = 'Date cannot be in the past';
            }
        }

        // Show/hide error
        if (isValid) {
            this.clearFieldError(field);
        } else {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    getFieldLabel(field) {
        const label = field.closest('.form-group')?.querySelector('label');
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }

    showFieldError(field, message) {
        field.classList.add('input-error');
        
        // Remove existing error message
        const existingError = field.closest('.form-group')?.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        field.closest('.form-group')?.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('input-error');
        const errorDiv = field.closest('.form-group')?.querySelector('.form-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    handleWindowResize() {
        // Close mobile menu on desktop
        if (window.innerWidth > 768) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.remove('show');
            }
        }
    }

    handlePageHidden() {
        // Pause real-time updates when page is hidden
        console.log('Page hidden - pausing updates');
    }

    handlePageVisible() {
        // Resume real-time updates when page is visible
        console.log('Page visible - resuming updates');
        this.updateDashboardData();
    }

    handleBeforeUnload(e) {
        // Check for unsaved changes
        const forms = document.querySelectorAll('form');
        let hasUnsavedChanges = false;

        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (input.value && !input.hasAttribute('data-saved')) {
                    hasUnsavedChanges = true;
                }
            });
        });

        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        }
    }

    handleEscapeKey() {
        // Close any open modals
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            modal.classList.remove('show');
        });

        // Close mobile menu
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    }
}

// Utility Functions
class CapExUtils {
    static formatCurrency(amount, currency = 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(amount);
    }

    static formatDate(dateString, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        
        return new Date(dateString).toLocaleDateString('en-IN', { ...defaultOptions, ...options });
    }

    static formatDateTime(dateString) {
        return new Date(dateString).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    static generateId(prefix = 'ID') {
        return prefix + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showMessage('Copied to clipboard!', 'success');
            }).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }

    static fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showMessage('Copied to clipboard!', 'success');
        } catch (err) {
            showMessage('Failed to copy to clipboard', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    static downloadJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    static downloadCSV(data, filename) {
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone);
    }

    static sanitizeInput(input) {
        return input.replace(/[<>]/g, '');
    }

    static getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    static setQueryParam(name, value) {
        const url = new URL(window.location);
        url.searchParams.set(name, value);
        window.history.pushState({}, '', url);
    }

    static removeQueryParam(name) {
        const url = new URL(window.location);
        url.searchParams.delete(name);
        window.history.pushState({}, '', url);
    }

    static showLoading(element) {
        if (element) {
            element.innerHTML = '<div class="loading"></div>';
        }
    }

    static hideLoading(element, originalContent) {
        if (element && originalContent) {
            element.innerHTML = originalContent;
        }
    }

    static animateElement(element, animationClass) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, 300);
    }

    static scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    static isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    static getRandomColor() {
        const colors = [
            '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
            '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    static generateAvatar(name) {
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        const color = this.getRandomColor();
        return { initials, color };
    }
}

// Enhanced Message System
class MessageSystem {
    constructor() {
        this.messageContainer = null;
        this.init();
    }

    init() {
        this.createMessageContainer();
    }

    createMessageContainer() {
        this.messageContainer = document.createElement('div');
        this.messageContainer.className = 'message-container';
        this.messageContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(this.messageContainer);
    }

    show(message, type = 'info', duration = 5000) {
        const messageElement = document.createElement('div');
        messageElement.className = `message message-${type} slide-up`;
        messageElement.style.cssText = `
            margin-bottom: 10px;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 8px;
            animation: slideInRight 0.3s ease;
        `;

        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const colorMap = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };

        messageElement.style.backgroundColor = colorMap[type];
        messageElement.style.color = 'white';

        messageElement.innerHTML = `
            <i class="${iconMap[type]}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="margin-left: auto; background: none; border: none; color: white; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
        `;

        this.messageContainer.appendChild(messageElement);

        // Auto remove after duration
        setTimeout(() => {
            if (messageElement.parentElement) {
                messageElement.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    messageElement.remove();
                }, 300);
            }
        }, duration);
    }
}

// Initialize global message system
const messageSystem = new MessageSystem();

// Enhanced showMessage function
function showMessage(message, type = 'info', duration = 5000) {
    messageSystem.show(message, type, duration);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the main application
    const app = new CapExApp();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        .message-container {
            pointer-events: none;
        }
        
        .message-container .message {
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);
    
    // Global error handler - disabled to prevent unwanted notifications
    // window.addEventListener('error', function(e) {
    //     console.error('Global error:', e.error);
    //     showMessage('An unexpected error occurred. Please refresh the page.', 'error');
    // });
    
    // Global unhandled promise rejection handler - disabled
    // window.addEventListener('unhandledrejection', function(e) {
    //     console.error('Unhandled promise rejection:', e.reason);
    //     showMessage('An unexpected error occurred. Please refresh the page.', 'error');
    // });
});

// Export utilities for use in other modules
window.CapExUtils = CapExUtils;
window.showMessage = showMessage;
