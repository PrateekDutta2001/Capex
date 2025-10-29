// Data Synchronization Manager for CapEx Portal
// This module handles real-time data sync across all pages using localStorage

class DataSyncManager {
    constructor() {
        this.storageKey = 'capex_data';
        this.syncInterval = 30000; // 30 seconds
        this.listeners = new Set();
        this.init();
    }

    init() {
        // Initialize data from localStorage
        this.loadDataFromStorage();
        
        // Setup auto-save
        this.setupAutoSave();
        
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'capex_data' || e.key === 'capex_requests' || e.key === 'capex_current_user') {
                this.handleStorageChange();
            }
        });
        
        // Setup real-time sync
        this.setupRealtimeSync();
    }

    loadDataFromStorage() {
        // Load requests
        const savedRequests = localStorage.getItem('capex_requests');
        if (savedRequests) {
            try {
                const parsed = JSON.parse(savedRequests);
                if (Array.isArray(parsed)) {
                    window.capexRequests = parsed;
                }
            } catch (e) {
                console.error('Error loading requests from storage:', e);
            }
        }
    }

    saveDataToStorage() {
        // Save requests
        if (window.capexRequests && Array.isArray(window.capexRequests)) {
            localStorage.setItem('capex_requests', JSON.stringify(window.capexRequests));
        }
        
        // Save users
        if (window.users && Array.isArray(window.users)) {
            localStorage.setItem('capex_users', JSON.stringify(window.users));
        }
        
        // Save notifications
        if (window.notifications && Array.isArray(window.notifications)) {
            localStorage.setItem('capex_notifications', JSON.stringify(window.notifications));
        }
    }

    setupAutoSave() {
        // Auto-save on every mutation
        if (window.capexRequests && !window.capexRequests._saveData) {
            const originalPush = Array.prototype.push;
            const self = this;
            
            if (!window.capexRequests.save) {
                window.capexRequests.save = function() {
                    self.saveDataToStorage();
                    self.notifyListeners('dataSaved');
                };
            }
        }
        
        // Override push for arrays
        const observer = new MutationObserver(() => {
            this.saveDataToStorage();
        });
        
        // Wrap array methods
        this.wrapArrayMethods(window.capexRequests);
    }

    wrapArrayMethods(array) {
        if (!array || !Array.isArray(array)) return;
        
        const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
        const self = this;
        
        methods.forEach(method => {
            if (array[method] && !array['_' + method + '_wrapped']) {
                const original = array[method];
                array[method] = function(...args) {
                    const result = original.apply(this, args);
                    self.saveDataToStorage();
                    self.notifyListeners('dataChanged');
                    return result;
                };
                array['_' + method + '_wrapped'] = true;
            }
        });
    }

    setupRealtimeSync() {
        // Sync every 30 seconds
        setInterval(() => {
            this.sync();
        }, this.syncInterval);
        
        // Sync on visibility change
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.sync();
            }
        });
    }

    sync() {
        // Reload data from storage
        this.loadDataFromStorage();
        
        // Notify all listeners
        this.notifyListeners('sync');
    }

    handleStorageChange() {
        console.log('Storage change detected, reloading data...');
        this.loadDataFromStorage();
        this.notifyListeners('storageChange');
    }

    notifyListeners(event) {
        this.listeners.forEach(listener => {
            try {
                listener(event);
            } catch (e) {
                console.error('Error in listener:', e);
            }
        });
    }

    addListener(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    // Method to manually trigger sync
    forceSync() {
        this.saveDataToStorage();
        this.loadDataFromStorage();
        this.notifyListeners('manualSync');
    }

    // Get request by ID with auto-sync
    getRequestById(id) {
        const request = window.capexRequests?.find(r => r.id === id);
        if (!request) {
            this.sync();
            return window.capexRequests?.find(r => r.id === id);
        }
        return request;
    }

    // Update request with auto-save
    updateRequest(id, updates) {
        const request = this.getRequestById(id);
        if (request) {
            Object.assign(request, updates);
            request.updatedAt = new Date().toISOString();
            this.saveDataToStorage();
            this.notifyListeners('requestUpdated', { id, updates });
            return request;
        }
        return null;
    }

    // Create new request with auto-save
    createRequest(requestData) {
        if (!window.capexRequests) {
            window.capexRequests = [];
        }
        
        window.capexRequests.push(requestData);
        this.saveDataToStorage();
        this.notifyListeners('requestCreated', requestData);
        return requestData;
    }

    // Delete request with auto-save
    deleteRequest(id) {
        if (!window.capexRequests) return false;
        
        const index = window.capexRequests.findIndex(r => r.id === id);
        if (index !== -1) {
            window.capexRequests.splice(index, 1);
            this.saveDataToStorage();
            this.notifyListeners('requestDeleted', { id });
            return true;
        }
        return false;
    }

    // Get all requests for a user
    getUserRequests(userId) {
        return window.capexRequests?.filter(r => r.requesterId === userId) || [];
    }

    // Get pending approvals for a user
    getUserPendingApprovals(userId) {
        return window.capexRequests?.filter(r => {
            if (r.status === 'pending' || r.status === 'in_progress') {
                return r.approvalChain?.some(approval => 
                    approval.status === 'pending' && approval.userId === userId
                );
            }
            return false;
        }) || [];
    }

    // Statistics
    getStatistics() {
        if (!window.capexRequests) return null;
        
        return {
            total: window.capexRequests.length,
            pending: window.capexRequests.filter(r => r.status === 'pending' || r.status === 'in_progress').length,
            approved: window.capexRequests.filter(r => r.status === 'approved').length,
            rejected: window.capexRequests.filter(r => r.status === 'rejected').length,
            totalAmount: window.capexRequests.reduce((sum, r) => sum + r.amount, 0),
            avgAmount: window.capexRequests.length > 0 ? 
                window.capexRequests.reduce((sum, r) => sum + r.amount, 0) / window.capexRequests.length : 0
        };
    }
}

// Initialize global sync manager
const dataSyncManager = new DataSyncManager();

// Export for use in other modules
window.dataSyncManager = dataSyncManager;

// Auto-save before page unload
window.addEventListener('beforeunload', () => {
    dataSyncManager.saveDataToStorage();
});

// Save on any array modification
if (window.capexRequests) {
    window.capexRequests.originalPush = window.capexRequests.push;
    window.capexRequests.push = function(...items) {
        const result = this.originalPush(...items);
        localStorage.setItem('capex_requests', JSON.stringify(window.capexRequests));
        return result;
    };
}

