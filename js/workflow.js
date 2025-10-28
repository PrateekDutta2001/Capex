// Workflow Management Module for CapEx Automation Application

class WorkflowManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Navigation event listeners
        document.addEventListener('click', (e) => {
            if (e.target.matches('[href^="#"]')) {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                this.navigateToSection(target);
            }
        });

        // Quick action buttons
        const createRequestBtn = document.getElementById('createRequestBtn');
        if (createRequestBtn) {
            createRequestBtn.addEventListener('click', () => this.navigateToSection('create-request'));
        }

        const viewReportsBtn = document.getElementById('viewReportsBtn');
        if (viewReportsBtn) {
            viewReportsBtn.addEventListener('click', () => this.navigateToSection('reports'));
        }

        // Notification modal
        const notificationBtn = document.getElementById('notificationBtn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => this.showNotificationModal());
        }

        const notificationModalClose = document.getElementById('notificationModalClose');
        if (notificationModalClose) {
            notificationModalClose.addEventListener('click', () => this.hideNotificationModal());
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // User menu dropdown
        const userMenuBtn = document.getElementById('userMenuBtn');
        if (userMenuBtn) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleUserDropdown();
            });
        }

        // Profile button
        const profileBtn = document.getElementById('profileBtn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => this.navigateToSection('profile'));
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const userDropdown = document.getElementById('userDropdown');
            if (userDropdown && !e.target.closest('.user-menu')) {
                userDropdown.classList.remove('show');
            }
        });
    }

    navigateToSection(sectionId) {
        // Hide all content sections
        const contentSections = document.querySelectorAll('.content-section');
        contentSections.forEach(section => {
            section.style.display = 'none';
        });

        // Show target section
        const targetSection = document.getElementById(sectionId + 'Content');
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = this.getSectionTitle(sectionId);
        }

        // Update active navigation
        this.updateActiveNavigation(sectionId);

        // Load section content
        this.loadSectionContent(sectionId);

        // Close mobile menu if open
        this.closeMobileMenu();
    }

    getSectionTitle(sectionId) {
        const titles = {
            'dashboard': 'Dashboard',
            'create-request': 'Create CapEx Request',
            'my-requests': 'My Requests',
            'pending-approvals': 'Pending Approvals',
            'reports': 'Reports',
            'admin': 'Admin Panel'
        };
        return titles[sectionId] || 'Dashboard';
    }

    updateActiveNavigation(sectionId) {
        // Remove active class from all nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to current nav item
        const activeNavItem = document.querySelector(`[href="#${sectionId}"]`).closest('.nav-item');
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }

    loadSectionContent(sectionId) {
        switch (sectionId) {
            case 'dashboard':
                this.loadDashboardContent();
                break;
            case 'create-request':
                this.loadCreateRequestContent();
                break;
            case 'my-requests':
                this.loadMyRequestsContent();
                break;
            case 'pending-approvals':
                this.loadPendingApprovalsContent();
                break;
            case 'reports':
                this.loadReportsContent();
                break;
            case 'admin':
                this.loadAdminContent();
                break;
            case 'profile':
                this.loadProfileContent();
                break;
            case 'settings':
                this.loadSettingsContent();
                break;
        }
    }

    loadDashboardContent() {
        this.loadRecentRequests();
        this.loadPendingApprovals();
    }

    loadRecentRequests() {
        const recentRequestsContainer = document.getElementById('recentRequests');
        if (!recentRequestsContainer) return;

        const myRequests = authManager.getMyRequests();
        const recentRequests = myRequests.slice(0, 5);

        if (recentRequests.length === 0) {
            recentRequestsContainer.innerHTML = '<div class="empty-state"><i class="fas fa-file-alt"></i><h3>No Recent Requests</h3><p>You haven\'t created any CapEx requests yet.</p></div>';
            return;
        }

        recentRequestsContainer.innerHTML = recentRequests.map(request => `
            <div class="request-item">
                <div class="request-header">
                    <div class="request-title">${request.title}</div>
                    <div class="status status-${request.status}">
                        <i class="fas fa-circle"></i>
                        ${statusDefinitions[request.status].label}
                    </div>
                </div>
                <div class="request-meta">
                    <span><i class="fas fa-rupee-sign"></i> ${this.formatCurrency(request.amount)}</span>
                    <span><i class="fas fa-calendar"></i> ${this.formatDate(request.createdAt)}</span>
                    <span><i class="fas fa-tag"></i> ${capexTypes.find(t => t.id === request.type)?.name}</span>
                </div>
            </div>
        `).join('');
    }

    loadPendingApprovals() {
        const pendingApprovalsContainer = document.getElementById('pendingApprovals');
        if (!pendingApprovalsContainer) return;

        const pendingApprovals = authManager.getPendingApprovals();
        const recentApprovals = pendingApprovals.slice(0, 5);

        if (recentApprovals.length === 0) {
            pendingApprovalsContainer.innerHTML = '<div class="empty-state"><i class="fas fa-check-circle"></i><h3>No Pending Approvals</h3><p>You have no pending approvals at this time.</p></div>';
            return;
        }

        pendingApprovalsContainer.innerHTML = recentApprovals.map(request => `
            <div class="approval-item">
                <div class="approval-header">
                    <div class="approval-title">${request.title}</div>
                    <div class="status status-${request.status}">
                        <i class="fas fa-circle"></i>
                        ${statusDefinitions[request.status].label}
                    </div>
                </div>
                <div class="approval-meta">
                    <span><i class="fas fa-user"></i> ${request.requesterName}</span>
                    <span><i class="fas fa-rupee-sign"></i> ${this.formatCurrency(request.amount)}</span>
                    <span><i class="fas fa-calendar"></i> ${this.formatDate(request.createdAt)}</span>
                </div>
                <div class="approval-actions">
                    <button class="btn btn-sm btn-primary" onclick="workflowManager.approveRequest('${request.id}')">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="btn btn-sm btn-error" onclick="workflowManager.rejectRequest('${request.id}')">
                        <i class="fas fa-times"></i> Reject
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="workflowManager.viewRequestDetails('${request.id}')">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadCreateRequestContent() {
        const createRequestContent = document.getElementById('createRequestContent');
        if (!createRequestContent) return;

        createRequestContent.innerHTML = `
            <div class="form-container">
                <div class="form-header">
                    <h2>Create New CapEx Request</h2>
                    <p>Fill out the form below to submit a new Capital Expenditure request</p>
                </div>
                
                <form id="capexRequestForm" class="capex-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="requestTitle">Request Title *</label>
                            <input type="text" id="requestTitle" name="title" required placeholder="Enter request title">
                        </div>
                        <div class="form-group">
                            <label for="requestType">CapEx Type *</label>
                            <select id="requestType" name="type" required>
                                <option value="">Select CapEx Type</option>
                                <option value="revenue_growth">Revenue Growth CapEx</option>
                                <option value="maintenance">Maintenance CapEx</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="requestDescription">Description *</label>
                        <textarea id="requestDescription" name="description" required placeholder="Describe the CapEx request in detail"></textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="requestAmount">Amount (INR) *</label>
                            <input type="number" id="requestAmount" name="amount" required placeholder="Enter amount in INR" min="1">
                        </div>
                        <div class="form-group">
                            <label for="expectedDelivery">Expected Delivery Date</label>
                            <input type="date" id="expectedDelivery" name="expectedDelivery">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="justification">Business Justification *</label>
                        <textarea id="justification" name="justification" required placeholder="Explain the business need and expected benefits"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="documentUpload">Supporting Documents</label>
                        <div class="file-upload-area" id="fileUploadArea">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Drag and drop files here or click to browse</p>
                            <input type="file" id="documentUpload" name="documents" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png">
                        </div>
                        <div class="file-list" id="fileList"></div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="workflowManager.navigateToSection('dashboard')">
                            <i class="fas fa-arrow-left"></i> Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-paper-plane"></i> Submit Request
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.setupCreateRequestForm();
    }

    setupCreateRequestForm() {
        const form = document.getElementById('capexRequestForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitCapExRequest();
        });

        // File upload handling
        const fileUploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('documentUpload');
        const fileList = document.getElementById('fileList');

        if (fileUploadArea && fileInput) {
            fileUploadArea.addEventListener('click', () => fileInput.click());
            fileUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileUploadArea.classList.add('drag-over');
            });
            fileUploadArea.addEventListener('dragleave', () => {
                fileUploadArea.classList.remove('drag-over');
            });
            fileUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                fileUploadArea.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                this.handleFileUpload(files);
            });

            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files);
            });
        }
    }

    handleFileUpload(files) {
        const fileList = document.getElementById('fileList');
        if (!fileList) return;

        Array.from(files).forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info">
                    <i class="fas fa-file"></i>
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${this.formatFileSize(file.size)}</span>
                </div>
                <button type="button" class="btn btn-sm btn-error" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            fileList.appendChild(fileItem);
        });
    }

    submitCapExRequest() {
        const form = document.getElementById('capexRequestForm');
        const formData = new FormData(form);
        
        const requestData = {
            id: 'CAPEX-2024-' + String(capexRequests.length + 1).padStart(3, '0'),
            title: formData.get('title'),
            description: formData.get('description'),
            type: formData.get('type'),
            amount: parseFloat(formData.get('amount')),
            currency: 'INR',
            department: authManager.getCurrentUser().department,
            plant: authManager.getCurrentUser().plant,
            businessUnit: authManager.getCurrentUser().businessUnit,
            requesterId: authManager.getCurrentUser().id,
            requesterName: authManager.getCurrentUser().name,
            status: 'pending',
            currentApprover: 'department_head',
            approvalChain: [
                {
                    level: 'requester',
                    userId: authManager.getCurrentUser().id,
                    userName: authManager.getCurrentUser().name,
                    status: 'approved',
                    timestamp: new Date().toISOString(),
                    comments: 'Request submitted'
                },
                {
                    level: 'department_head',
                    userId: null,
                    userName: '',
                    status: 'pending',
                    timestamp: null,
                    comments: ''
                }
            ],
            documents: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            expectedDelivery: formData.get('expectedDelivery'),
            justification: formData.get('justification'),
            wbsCode: null,
            aucCode: null,
            poNumber: null
        };

        // Add remaining approval chain based on amount
        if (requestData.amount >= approvalThresholds.committeeReview) {
            requestData.approvalChain.push(
                { level: 'plant_head', userId: null, userName: '', status: 'pending', timestamp: null, comments: '' },
                { level: 'capex_committee', userId: null, userName: '', status: 'pending', timestamp: null, comments: '' },
                { level: 'business_ceo', userId: null, userName: '', status: 'pending', timestamp: null, comments: '' },
                { level: 'cfo', userId: null, userName: '', status: 'pending', timestamp: null, comments: '' }
            );
        } else {
            requestData.approvalChain.push(
                { level: 'plant_head', userId: null, userName: '', status: 'pending', timestamp: null, comments: '' },
                { level: 'business_ceo', userId: null, userName: '', status: 'pending', timestamp: null, comments: '' },
                { level: 'cfo', userId: null, userName: '', status: 'pending', timestamp: null, comments: '' }
            );
        }

        // Add to requests array
        capexRequests.push(requestData);

        // Show success message
        showMessage('CapEx request submitted successfully!', 'success');

        // Navigate back to dashboard
        setTimeout(() => {
            this.navigateToSection('dashboard');
        }, 1500);
    }

    loadMyRequestsContent() {
        const myRequestsContent = document.getElementById('myRequestsContent');
        if (!myRequestsContent) return;

        const myRequests = authManager.getMyRequests();

        myRequestsContent.innerHTML = `
            <div class="requests-container">
                <div class="requests-header">
                    <h2>My CapEx Requests</h2>
                    <div class="requests-actions">
                        <button class="btn btn-primary" onclick="workflowManager.navigateToSection('create-request')">
                            <i class="fas fa-plus"></i> New Request
                        </button>
                    </div>
                </div>
                
                <div class="requests-filters">
                    <div class="search-filter-bar">
                        <div class="search-input">
                            <input type="text" id="requestSearch" placeholder="Search requests...">
                        </div>
                        <select id="statusFilter" class="filter-select">
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="in_progress">In Progress</option>
                        </select>
                        <select id="typeFilter" class="filter-select">
                            <option value="">All Types</option>
                            <option value="revenue_growth">Revenue Growth</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                </div>
                
                <div class="requests-table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="requestsTableBody">
                            ${this.generateRequestsTableRows(myRequests)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        this.setupRequestsFilters();
    }

    generateRequestsTableRows(requests) {
        if (requests.length === 0) {
            return '<tr><td colspan="7" class="text-center">No requests found</td></tr>';
        }

        return requests.map(request => `
            <tr>
                <td>${request.id}</td>
                <td>${request.title}</td>
                <td>${capexTypes.find(t => t.id === request.type)?.name}</td>
                <td>${this.formatCurrency(request.amount)}</td>
                <td>
                    <div class="status status-${request.status}">
                        <i class="fas fa-circle"></i>
                        ${statusDefinitions[request.status].label}
                    </div>
                </td>
                <td>${this.formatDate(request.createdAt)}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="workflowManager.viewRequestDetails('${request.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            </tr>
        `).join('');
    }

    setupRequestsFilters() {
        const searchInput = document.getElementById('requestSearch');
        const statusFilter = document.getElementById('statusFilter');
        const typeFilter = document.getElementById('typeFilter');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterRequests());
        }
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterRequests());
        }
        if (typeFilter) {
            typeFilter.addEventListener('change', () => this.filterRequests());
        }
    }

    filterRequests() {
        const searchTerm = document.getElementById('requestSearch')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('statusFilter')?.value || '';
        const typeFilter = document.getElementById('typeFilter')?.value || '';

        const myRequests = authManager.getMyRequests();
        const filteredRequests = myRequests.filter(request => {
            const matchesSearch = request.title.toLowerCase().includes(searchTerm) || 
                                request.id.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || request.status === statusFilter;
            const matchesType = !typeFilter || request.type === typeFilter;

            return matchesSearch && matchesStatus && matchesType;
        });

        const tableBody = document.getElementById('requestsTableBody');
        if (tableBody) {
            tableBody.innerHTML = this.generateRequestsTableRows(filteredRequests);
        }
    }

    loadPendingApprovalsContent() {
        const pendingApprovalsContent = document.getElementById('pendingApprovalsContent');
        if (!pendingApprovalsContent) return;

        const pendingApprovals = authManager.getPendingApprovals();

        pendingApprovalsContent.innerHTML = `
            <div class="approvals-container">
                <div class="approvals-header">
                    <h2>Pending Approvals</h2>
                    <p>Review and approve CapEx requests that require your attention</p>
                </div>
                
                <div class="approvals-list">
                    ${pendingApprovals.length === 0 ? 
                        '<div class="empty-state"><i class="fas fa-check-circle"></i><h3>No Pending Approvals</h3><p>You have no pending approvals at this time.</p></div>' :
                        pendingApprovals.map(request => this.generateApprovalCard(request)).join('')
                    }
                </div>
            </div>
        `;
    }

    generateApprovalCard(request) {
        return `
            <div class="approval-card">
                <div class="approval-card-header">
                    <div class="approval-info">
                        <h3>${request.title}</h3>
                        <div class="approval-meta">
                            <span class="request-id">${request.id}</span>
                            <span class="requester">Requested by: ${request.requesterName}</span>
                            <span class="amount">${this.formatCurrency(request.amount)}</span>
                        </div>
                    </div>
                    <div class="approval-status">
                        <div class="status status-${request.status}">
                            <i class="fas fa-circle"></i>
                            ${statusDefinitions[request.status].label}
                        </div>
                    </div>
                </div>
                
                <div class="approval-card-body">
                    <div class="approval-description">
                        <p>${request.description}</p>
                    </div>
                    
                    <div class="approval-details">
                        <div class="detail-item">
                            <label>CapEx Type:</label>
                            <span>${capexTypes.find(t => t.id === request.type)?.name}</span>
                        </div>
                        <div class="detail-item">
                            <label>Department:</label>
                            <span>${request.department}</span>
                        </div>
                        <div class="detail-item">
                            <label>Plant:</label>
                            <span>${request.plant}</span>
                        </div>
                        <div class="detail-item">
                            <label>Expected Delivery:</label>
                            <span>${request.expectedDelivery ? this.formatDate(request.expectedDelivery) : 'Not specified'}</span>
                        </div>
                    </div>
                    
                    <div class="approval-justification">
                        <label>Business Justification:</label>
                        <p>${request.justification}</p>
                    </div>
                    
                    ${request.documents.length > 0 ? `
                        <div class="approval-documents">
                            <label>Supporting Documents:</label>
                            <div class="document-list">
                                ${request.documents.map(doc => `
                                    <div class="document-item">
                                        <i class="fas fa-file"></i>
                                        <span>${doc.name}</span>
                                        <button class="btn btn-sm btn-secondary" onclick="workflowManager.downloadDocument('${doc.name}')">
                                            <i class="fas fa-download"></i>
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="approval-card-footer">
                    <div class="approval-actions">
                        <button class="btn btn-success" onclick="workflowManager.approveRequest('${request.id}')">
                            <i class="fas fa-check"></i> Approve
                        </button>
                        <button class="btn btn-error" onclick="workflowManager.rejectRequest('${request.id}')">
                            <i class="fas fa-times"></i> Reject
                        </button>
                        <button class="btn btn-secondary" onclick="workflowManager.viewRequestDetails('${request.id}')">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    approveRequest(requestId) {
        const request = capexRequests.find(r => r.id === requestId);
        if (!request) return;

        const currentUser = authManager.getCurrentUser();
        const approvalLevel = request.approvalChain.find(approval => 
            approval.status === 'pending' && approval.userId === currentUser.id
        );

        if (approvalLevel) {
            approvalLevel.status = 'approved';
            approvalLevel.timestamp = new Date().toISOString();
            approvalLevel.comments = 'Approved';

            // Check if this was the final approval
            const nextApproval = request.approvalChain.find(approval => approval.status === 'pending');
            if (!nextApproval) {
                request.status = 'approved';
                request.currentApprover = null;
                // Generate WBS and AUC codes
                request.wbsCode = 'WBS-' + request.id;
                request.aucCode = 'AUC-' + request.id;
                request.poNumber = 'PO-' + request.id;
            } else {
                request.status = 'in_progress';
                request.currentApprover = nextApproval.level;
            }

            request.updatedAt = new Date().toISOString();

            showMessage('Request approved successfully!', 'success');
            this.loadPendingApprovalsContent();
            this.loadDashboardContent();
        }
    }

    rejectRequest(requestId) {
        const request = capexRequests.find(r => r.id === requestId);
        if (!request) return;

        const reason = prompt('Please provide a reason for rejection:');
        if (!reason) return;

        const currentUser = authManager.getCurrentUser();
        const approvalLevel = request.approvalChain.find(approval => 
            approval.status === 'pending' && approval.userId === currentUser.id
        );

        if (approvalLevel) {
            approvalLevel.status = 'rejected';
            approvalLevel.timestamp = new Date().toISOString();
            approvalLevel.comments = reason;

            request.status = 'rejected';
            request.currentApprover = null;
            request.updatedAt = new Date().toISOString();

            showMessage('Request rejected', 'error');
            this.loadPendingApprovalsContent();
            this.loadDashboardContent();
        }
    }

    viewRequestDetails(requestId) {
        const request = capexRequests.find(r => r.id === requestId);
        if (!request) return;

        // Create modal for request details
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Request Details - ${request.id}</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="request-details">
                        <div class="detail-section">
                            <h4>Basic Information</h4>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <label>Title:</label>
                                    <span>${request.title}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Type:</label>
                                    <span>${capexTypes.find(t => t.id === request.type)?.name}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Amount:</label>
                                    <span>${this.formatCurrency(request.amount)}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Status:</label>
                                    <span class="status status-${request.status}">
                                        <i class="fas fa-circle"></i>
                                        ${statusDefinitions[request.status].label}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Description</h4>
                            <p>${request.description}</p>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Business Justification</h4>
                            <p>${request.justification}</p>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Approval Chain</h4>
                            <div class="approval-chain">
                                ${request.approvalChain.map(approval => `
                                    <div class="approval-step ${approval.status}">
                                        <div class="step-icon">
                                            <i class="fas fa-${approval.status === 'approved' ? 'check' : approval.status === 'rejected' ? 'times' : 'clock'}"></i>
                                        </div>
                                        <div class="step-info">
                                            <div class="step-title">${roleDefinitions[approval.level]?.label}</div>
                                            <div class="step-user">${approval.userName || 'Pending'}</div>
                                            <div class="step-time">${approval.timestamp ? this.formatDate(approval.timestamp) : 'Pending'}</div>
                                            ${approval.comments ? `<div class="step-comments">${approval.comments}</div>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    loadReportsContent() {
        const reportsContent = document.getElementById('reportsContent');
        if (!reportsContent) return;

        reportsContent.innerHTML = `
            <div class="reports-container">
                <div class="reports-header">
                    <h2>CapEx Reports & Analytics</h2>
                    <p>Comprehensive view of CapEx requests and approval metrics</p>
                </div>
                
                <div class="reports-grid">
                    <div class="report-card">
                        <h3>Request Summary</h3>
                        <div class="report-stats">
                            <div class="stat-item">
                                <span class="stat-label">Total Requests:</span>
                                <span class="stat-value">${capexRequests.length}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Pending:</span>
                                <span class="stat-value">${capexRequests.filter(r => r.status === 'pending' || r.status === 'in_progress').length}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Approved:</span>
                                <span class="stat-value">${capexRequests.filter(r => r.status === 'approved').length}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Rejected:</span>
                                <span class="stat-value">${capexRequests.filter(r => r.status === 'rejected').length}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-card">
                        <h3>Amount Analysis</h3>
                        <div class="report-stats">
                            <div class="stat-item">
                                <span class="stat-label">Total Amount:</span>
                                <span class="stat-value">${this.formatCurrency(capexRequests.reduce((sum, r) => sum + r.amount, 0))}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Average Amount:</span>
                                <span class="stat-value">${this.formatCurrency(capexRequests.reduce((sum, r) => sum + r.amount, 0) / capexRequests.length)}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Highest Amount:</span>
                                <span class="stat-value">${this.formatCurrency(Math.max(...capexRequests.map(r => r.amount)))}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-card">
                        <h3>Type Distribution</h3>
                        <div class="report-stats">
                            <div class="stat-item">
                                <span class="stat-label">Revenue Growth:</span>
                                <span class="stat-value">${capexRequests.filter(r => r.type === 'revenue_growth').length}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Maintenance:</span>
                                <span class="stat-value">${capexRequests.filter(r => r.type === 'maintenance').length}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-card">
                        <h3>Department Analysis</h3>
                        <div class="report-stats">
                            ${this.generateDepartmentStats()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateDepartmentStats() {
        const departmentStats = {};
        capexRequests.forEach(request => {
            if (!departmentStats[request.department]) {
                departmentStats[request.department] = 0;
            }
            departmentStats[request.department]++;
        });

        return Object.entries(departmentStats).map(([dept, count]) => `
            <div class="stat-item">
                <span class="stat-label">${dept}:</span>
                <span class="stat-value">${count}</span>
            </div>
        `).join('');
    }

    loadAdminContent() {
        const adminContent = document.getElementById('adminContent');
        if (!adminContent) return;

        adminContent.innerHTML = `
            <div class="admin-container">
                <div class="admin-header">
                    <h2>Admin Panel</h2>
                    <p>System administration and configuration</p>
                </div>
                
                <div class="admin-grid">
                    <div class="admin-card">
                        <h3>User Management</h3>
                        <p>Manage system users and their roles</p>
                        <button class="btn btn-primary" onclick="workflowManager.showUserManagement()">
                            <i class="fas fa-users"></i> Manage Users
                        </button>
                    </div>
                    
                    <div class="admin-card">
                        <h3>System Settings</h3>
                        <p>Configure system parameters and thresholds</p>
                        <button class="btn btn-primary" onclick="workflowManager.showSystemSettings()">
                            <i class="fas fa-cog"></i> Settings
                        </button>
                    </div>
                    
                    <div class="admin-card">
                        <h3>Data Export</h3>
                        <p>Export CapEx data for analysis</p>
                        <button class="btn btn-primary" onclick="workflowManager.exportData()">
                            <i class="fas fa-download"></i> Export Data
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showNotificationModal() {
        const modal = document.getElementById('notificationModal');
        if (modal) {
            modal.classList.add('show');
            loadNotifications();
        }
    }

    hideNotificationModal() {
        const modal = document.getElementById('notificationModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('show');
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
            
            // Update toggle button icon
            const toggleBtn = document.getElementById('sidebarToggle');
            if (toggleBtn) {
                const icon = toggleBtn.querySelector('i');
                if (sidebar.classList.contains('collapsed')) {
                    icon.className = 'fas fa-bars';
                } else {
                    icon.className = 'fas fa-times';
                }
            }
        }
    }

    toggleUserDropdown() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }

    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('show');
        }
    }

    // Utility functions
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    downloadDocument(filename) {
        // In a real application, this would download the actual file
        showMessage(`Downloading ${filename}...`, 'info');
    }

    showUserManagement() {
        showMessage('User management feature coming soon!', 'info');
    }

    showSystemSettings() {
        showMessage('System settings feature coming soon!', 'info');
    }

    exportData() {
        const data = {
            users: users,
            capexRequests: capexRequests,
            notifications: notifications,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `capex-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showMessage('Data exported successfully!', 'success');
    }

    loadProfileContent() {
        const profileContent = document.getElementById('profileContent');
        if (!profileContent) return;

        const currentUser = authManager.getCurrentUser();
        if (!currentUser) return;

        profileContent.innerHTML = `
            <div class="profile-container">
                <div class="profile-header">
                    <h2>User Profile</h2>
                    <p>Manage your account information and preferences</p>
                </div>
                
                <div class="profile-grid">
                    <div class="profile-card">
                        <div class="profile-card-header">
                            <h3>Personal Information</h3>
                        </div>
                        <div class="profile-card-content">
                            <form id="profileForm" class="profile-form">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="profileName">Full Name</label>
                                        <input type="text" id="profileName" name="name" value="${currentUser.name}" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="profileEmail">Email</label>
                                        <input type="email" id="profileEmail" name="email" value="${currentUser.email}" required>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="profileDepartment">Department</label>
                                        <input type="text" id="profileDepartment" name="department" value="${currentUser.department}" readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="profilePlant">Plant</label>
                                        <input type="text" id="profilePlant" name="plant" value="${currentUser.plant}" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="profileBusinessUnit">Business Unit</label>
                                        <input type="text" id="profileBusinessUnit" name="businessUnit" value="${currentUser.businessUnit}" readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="profileRole">Role</label>
                                        <input type="text" id="profileRole" name="role" value="${roleDefinitions[currentUser.role]?.label || currentUser.role}" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-actions">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-save"></i> Update Profile
                                    </button>
                                    <button type="button" class="btn btn-secondary" onclick="workflowManager.navigateToSection('dashboard')">
                                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div class="profile-card">
                        <div class="profile-card-header">
                            <h3>Account Statistics</h3>
                        </div>
                        <div class="profile-card-content">
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <div class="stat-icon">
                                        <i class="fas fa-file-alt"></i>
                                    </div>
                                    <div class="stat-content">
                                        <div class="stat-number">${authManager.getMyRequests().length}</div>
                                        <div class="stat-label">Total Requests</div>
                                    </div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon">
                                        <i class="fas fa-check-circle"></i>
                                    </div>
                                    <div class="stat-content">
                                        <div class="stat-number">${authManager.getMyRequests().filter(r => r.status === 'approved').length}</div>
                                        <div class="stat-label">Approved</div>
                                    </div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div class="stat-content">
                                        <div class="stat-number">${authManager.getMyRequests().filter(r => r.status === 'pending' || r.status === 'in_progress').length}</div>
                                        <div class="stat-label">Pending</div>
                                    </div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon">
                                        <i class="fas fa-times-circle"></i>
                                    </div>
                                    <div class="stat-content">
                                        <div class="stat-number">${authManager.getMyRequests().filter(r => r.status === 'rejected').length}</div>
                                        <div class="stat-label">Rejected</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Setup profile form
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProfile();
            });
        }
    }

    loadSettingsContent() {
        const settingsContent = document.getElementById('settingsContent');
        if (!settingsContent) return;

        settingsContent.innerHTML = `
            <div class="settings-container">
                <div class="settings-header">
                    <h2>Settings</h2>
                    <p>Configure your application preferences</p>
                </div>
                
                <div class="settings-grid">
                    <div class="settings-card">
                        <div class="settings-card-header">
                            <h3>Notification Preferences</h3>
                        </div>
                        <div class="settings-card-content">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <label>Email Notifications</label>
                                    <p>Receive email notifications for approvals and updates</p>
                                </div>
                                <div class="setting-control">
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <label>Push Notifications</label>
                                    <p>Receive browser notifications for important updates</p>
                                </div>
                                <div class="setting-control">
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <label>Weekly Reports</label>
                                    <p>Receive weekly summary reports via email</p>
                                </div>
                                <div class="setting-control">
                                    <label class="toggle-switch">
                                        <input type="checkbox">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <div class="settings-card-header">
                            <h3>Display Preferences</h3>
                        </div>
                        <div class="settings-card-content">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <label>Theme</label>
                                    <p>Choose your preferred color theme</p>
                                </div>
                                <div class="setting-control">
                                    <select class="form-select">
                                        <option value="light">Light Theme</option>
                                        <option value="dark">Dark Theme</option>
                                        <option value="auto">Auto (System)</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <label>Language</label>
                                    <p>Select your preferred language</p>
                                </div>
                                <div class="setting-control">
                                    <select class="form-select">
                                        <option value="en">English</option>
                                        <option value="hi">Hindi</option>
                                        <option value="es">Spanish</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <label>Date Format</label>
                                    <p>Choose your preferred date format</p>
                                </div>
                                <div class="setting-control">
                                    <select class="form-select">
                                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                                        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <div class="settings-card-header">
                            <h3>Security</h3>
                        </div>
                        <div class="settings-card-content">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <label>Change Password</label>
                                    <p>Update your account password</p>
                                </div>
                                <div class="setting-control">
                                    <button class="btn btn-secondary btn-sm" onclick="workflowManager.showChangePasswordModal()">
                                        <i class="fas fa-key"></i> Change Password
                                    </button>
                                </div>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <label>Two-Factor Authentication</label>
                                    <p>Add an extra layer of security to your account</p>
                                </div>
                                <div class="setting-control">
                                    <label class="toggle-switch">
                                        <input type="checkbox">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="settings-actions">
                    <button class="btn btn-primary" onclick="workflowManager.saveSettings()">
                        <i class="fas fa-save"></i> Save Settings
                    </button>
                    <button class="btn btn-secondary" onclick="workflowManager.navigateToSection('dashboard')">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                </div>
            </div>
        `;
    }

    updateProfile() {
        const form = document.getElementById('profileForm');
        const formData = new FormData(form);
        
        const currentUser = authManager.getCurrentUser();
        if (currentUser) {
            currentUser.name = formData.get('name');
            currentUser.email = formData.get('email');
            
            // Update localStorage
            localStorage.setItem('capex_current_user', JSON.stringify(currentUser));
            
            // Update UI
            updateUserInterface();
            
            showMessage('Profile updated successfully!', 'success');
        }
    }

    saveSettings() {
        showMessage('Settings saved successfully!', 'success');
    }

    showChangePasswordModal() {
        showMessage('Change password feature coming soon!', 'info');
    }
}

// Initialize global workflow manager
const workflowManager = new WorkflowManager();
