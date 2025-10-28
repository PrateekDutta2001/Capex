// Sample Data for CapEx Automation Application

// User Data
const users = [
    {
        id: 1,
        username: 'john.doe',
        password: 'password123',
        name: 'John Doe',
        role: 'requester',
        department: 'Production',
        plant: 'Plant A',
        businessUnit: 'Manufacturing',
        email: 'john.doe@company.com',
        avatar: null
    },
    {
        id: 2,
        username: 'sarah.wilson',
        password: 'password123',
        name: 'Sarah Wilson',
        role: 'department_head',
        department: 'Production',
        plant: 'Plant A',
        businessUnit: 'Manufacturing',
        email: 'sarah.wilson@company.com',
        avatar: null
    },
    {
        id: 3,
        username: 'mike.johnson',
        password: 'password123',
        name: 'Mike Johnson',
        role: 'plant_head',
        department: 'Operations',
        plant: 'Plant A',
        businessUnit: 'Manufacturing',
        email: 'mike.johnson@company.com',
        avatar: null
    },
    {
        id: 4,
        username: 'lisa.brown',
        password: 'password123',
        name: 'Lisa Brown',
        role: 'business_ceo',
        department: 'Executive',
        plant: 'All Plants',
        businessUnit: 'Manufacturing',
        email: 'lisa.brown@company.com',
        avatar: null
    },
    {
        id: 5,
        username: 'david.garcia',
        password: 'password123',
        name: 'David Garcia',
        role: 'cfo',
        department: 'Finance',
        plant: 'All Plants',
        businessUnit: 'All Business Units',
        email: 'david.garcia@company.com',
        avatar: null
    },
    {
        id: 6,
        username: 'committee.member',
        password: 'password123',
        name: 'Robert Smith',
        role: 'capex_committee',
        department: 'Strategic Planning',
        plant: 'All Plants',
        businessUnit: 'All Business Units',
        email: 'robert.smith@company.com',
        avatar: null
    },
    {
        id: 7,
        username: 'admin.user',
        password: 'password123',
        name: 'Admin User',
        role: 'admin',
        department: 'IT',
        plant: 'All Plants',
        businessUnit: 'All Business Units',
        email: 'admin@company.com',
        avatar: null
    },
    {
        id: 8,
        username: 'jane.miller',
        password: 'password123',
        name: 'Jane Miller',
        role: 'requester',
        department: 'Maintenance',
        plant: 'Plant B',
        businessUnit: 'Manufacturing',
        email: 'jane.miller@company.com',
        avatar: null
    },
    {
        id: 9,
        username: 'tom.davis',
        password: 'password123',
        name: 'Tom Davis',
        role: 'department_head',
        department: 'Maintenance',
        plant: 'Plant B',
        businessUnit: 'Manufacturing',
        email: 'tom.davis@company.com',
        avatar: null
    },
    {
        id: 10,
        username: 'alex.chen',
        password: 'password123',
        name: 'Alex Chen',
        role: 'plant_head',
        department: 'Operations',
        plant: 'Plant B',
        businessUnit: 'Manufacturing',
        email: 'alex.chen@company.com',
        avatar: null
    }
];

// CapEx Request Data
const capexRequests = [
    {
        id: 'CAPEX-2024-001',
        title: 'New Production Line Equipment',
        description: 'Purchase of automated assembly line equipment to increase production capacity by 30%',
        type: 'revenue_growth',
        amount: 4500000,
        currency: 'INR',
        department: 'Production',
        plant: 'Plant A',
        businessUnit: 'Manufacturing',
        requesterId: 1,
        requesterName: 'John Doe',
        status: 'pending',
        currentApprover: 'department_head',
        approvalChain: [
            { level: 'requester', userId: 1, userName: 'John Doe', status: 'approved', timestamp: '2024-01-15T09:00:00Z', comments: 'Request submitted' },
            { level: 'department_head', userId: 2, userName: 'Sarah Wilson', status: 'pending', timestamp: null, comments: '' },
            { level: 'plant_head', userId: 3, userName: 'Mike Johnson', status: 'pending', timestamp: null, comments: '' },
            { level: 'capex_committee', userId: 6, userName: 'Robert Smith', status: 'pending', timestamp: null, comments: '' },
            { level: 'business_ceo', userId: 4, userName: 'Lisa Brown', status: 'pending', timestamp: null, comments: '' },
            { level: 'cfo', userId: 5, userName: 'David Garcia', status: 'pending', timestamp: null, comments: '' }
        ],
        documents: [
            { name: 'Equipment Specifications.pdf', type: 'pdf', size: '2.5MB', uploadedAt: '2024-01-15T09:15:00Z' },
            { name: 'Cost Analysis.xlsx', type: 'excel', size: '1.2MB', uploadedAt: '2024-01-15T09:20:00Z' }
        ],
        createdAt: '2024-01-15T09:00:00Z',
        updatedAt: '2024-01-15T09:00:00Z',
        expectedDelivery: '2024-06-15',
        justification: 'Required to meet increased demand and improve operational efficiency',
        wbsCode: null,
        aucCode: null,
        poNumber: null
    },
    {
        id: 'CAPEX-2024-002',
        title: 'HVAC System Replacement',
        description: 'Replacement of aging HVAC system in Plant A to improve energy efficiency and reduce maintenance costs',
        type: 'maintenance',
        amount: 1800000,
        currency: 'INR',
        department: 'Maintenance',
        plant: 'Plant A',
        businessUnit: 'Manufacturing',
        requesterId: 8,
        requesterName: 'Jane Miller',
        status: 'approved',
        currentApprover: null,
        approvalChain: [
            { level: 'requester', userId: 8, userName: 'Jane Miller', status: 'approved', timestamp: '2024-01-10T10:00:00Z', comments: 'Request submitted' },
            { level: 'department_head', userId: 9, userName: 'Tom Davis', status: 'approved', timestamp: '2024-01-11T14:30:00Z', comments: 'Approved - Critical maintenance requirement' },
            { level: 'plant_head', userId: 3, userName: 'Mike Johnson', status: 'approved', timestamp: '2024-01-12T11:15:00Z', comments: 'Approved - Energy efficiency improvement' },
            { level: 'business_ceo', userId: 4, userName: 'Lisa Brown', status: 'approved', timestamp: '2024-01-13T16:45:00Z', comments: 'Approved - Good ROI' },
            { level: 'cfo', userId: 5, userName: 'David Garcia', status: 'approved', timestamp: '2024-01-14T09:30:00Z', comments: 'Approved - Budget allocated' }
        ],
        documents: [
            { name: 'HVAC Specifications.pdf', type: 'pdf', size: '3.1MB', uploadedAt: '2024-01-10T10:15:00Z' },
            { name: 'Energy Analysis Report.pdf', type: 'pdf', size: '2.8MB', uploadedAt: '2024-01-10T10:30:00Z' },
            { name: 'Vendor Quotes.xlsx', type: 'excel', size: '0.8MB', uploadedAt: '2024-01-10T10:45:00Z' }
        ],
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-14T09:30:00Z',
        expectedDelivery: '2024-04-30',
        justification: 'Current HVAC system is 15 years old and causing high energy bills',
        wbsCode: 'WBS-2024-002',
        aucCode: 'AUC-2024-002',
        poNumber: 'PO-2024-002'
    },
    {
        id: 'CAPEX-2024-003',
        title: 'Quality Control Equipment Upgrade',
        description: 'Upgrade of quality control equipment to meet new industry standards and improve product quality',
        type: 'revenue_growth',
        amount: 1200000,
        currency: 'INR',
        department: 'Quality Control',
        plant: 'Plant B',
        businessUnit: 'Manufacturing',
        requesterId: 8,
        requesterName: 'Jane Miller',
        status: 'rejected',
        currentApprover: null,
        approvalChain: [
            { level: 'requester', userId: 8, userName: 'Jane Miller', status: 'approved', timestamp: '2024-01-08T08:00:00Z', comments: 'Request submitted' },
            { level: 'department_head', userId: 9, userName: 'Tom Davis', status: 'approved', timestamp: '2024-01-09T10:30:00Z', comments: 'Approved - Quality improvement needed' },
            { level: 'plant_head', userId: 10, userName: 'Alex Chen', status: 'rejected', timestamp: '2024-01-10T15:20:00Z', comments: 'Rejected - Budget constraints, defer to next quarter' }
        ],
        documents: [
            { name: 'QC Equipment Specs.pdf', type: 'pdf', size: '1.9MB', uploadedAt: '2024-01-08T08:15:00Z' },
            { name: 'Standards Compliance.pdf', type: 'pdf', size: '2.2MB', uploadedAt: '2024-01-08T08:30:00Z' }
        ],
        createdAt: '2024-01-08T08:00:00Z',
        updatedAt: '2024-01-10T15:20:00Z',
        expectedDelivery: '2024-05-15',
        justification: 'Required to meet new industry quality standards',
        wbsCode: null,
        aucCode: null,
        poNumber: null
    },
    {
        id: 'CAPEX-2024-004',
        title: 'IT Infrastructure Upgrade',
        description: 'Upgrade of IT infrastructure including servers, network equipment, and security systems',
        type: 'maintenance',
        amount: 3200000,
        currency: 'INR',
        department: 'IT',
        plant: 'All Plants',
        businessUnit: 'All Business Units',
        requesterId: 7,
        requesterName: 'Admin User',
        status: 'in_progress',
        currentApprover: 'capex_committee',
        approvalChain: [
            { level: 'requester', userId: 7, userName: 'Admin User', status: 'approved', timestamp: '2024-01-12T11:00:00Z', comments: 'Request submitted' },
            { level: 'department_head', userId: 7, userName: 'Admin User', status: 'approved', timestamp: '2024-01-12T11:05:00Z', comments: 'Self-approved as IT head' },
            { level: 'plant_head', userId: 3, userName: 'Mike Johnson', status: 'approved', timestamp: '2024-01-13T09:30:00Z', comments: 'Approved - Critical IT upgrade' },
            { level: 'capex_committee', userId: 6, userName: 'Robert Smith', status: 'pending', timestamp: null, comments: '' },
            { level: 'business_ceo', userId: 4, userName: 'Lisa Brown', status: 'pending', timestamp: null, comments: '' },
            { level: 'cfo', userId: 5, userName: 'David Garcia', status: 'pending', timestamp: null, comments: '' }
        ],
        documents: [
            { name: 'IT Infrastructure Plan.pdf', type: 'pdf', size: '4.2MB', uploadedAt: '2024-01-12T11:15:00Z' },
            { name: 'Security Assessment.pdf', type: 'pdf', size: '3.8MB', uploadedAt: '2024-01-12T11:30:00Z' },
            { name: 'Vendor Proposals.xlsx', type: 'excel', size: '1.5MB', uploadedAt: '2024-01-12T11:45:00Z' }
        ],
        createdAt: '2024-01-12T11:00:00Z',
        updatedAt: '2024-01-13T09:30:00Z',
        expectedDelivery: '2024-07-30',
        justification: 'Current IT infrastructure is outdated and poses security risks',
        wbsCode: null,
        aucCode: null,
        poNumber: null
    },
    {
        id: 'CAPEX-2024-005',
        title: 'Safety Equipment Installation',
        description: 'Installation of new safety equipment including fire suppression systems and emergency response equipment',
        type: 'maintenance',
        amount: 850000,
        currency: 'INR',
        department: 'Safety',
        plant: 'Plant B',
        businessUnit: 'Manufacturing',
        requesterId: 8,
        requesterName: 'Jane Miller',
        status: 'pending',
        currentApprover: 'department_head',
        approvalChain: [
            { level: 'requester', userId: 8, userName: 'Jane Miller', status: 'approved', timestamp: '2024-01-16T14:00:00Z', comments: 'Request submitted' },
            { level: 'department_head', userId: 9, userName: 'Tom Davis', status: 'pending', timestamp: null, comments: '' },
            { level: 'plant_head', userId: 10, userName: 'Alex Chen', status: 'pending', timestamp: null, comments: '' },
            { level: 'business_ceo', userId: 4, userName: 'Lisa Brown', status: 'pending', timestamp: null, comments: '' },
            { level: 'cfo', userId: 5, userName: 'David Garcia', status: 'pending', timestamp: null, comments: '' }
        ],
        documents: [
            { name: 'Safety Equipment Specs.pdf', type: 'pdf', size: '2.1MB', uploadedAt: '2024-01-16T14:15:00Z' },
            { name: 'Compliance Requirements.pdf', type: 'pdf', size: '1.8MB', uploadedAt: '2024-01-16T14:30:00Z' }
        ],
        createdAt: '2024-01-16T14:00:00Z',
        updatedAt: '2024-01-16T14:00:00Z',
        expectedDelivery: '2024-05-30',
        justification: 'Required for regulatory compliance and employee safety',
        wbsCode: null,
        aucCode: null,
        poNumber: null
    },
    {
        id: 'CAPEX-2024-006',
        title: 'Warehouse Automation System',
        description: 'Implementation of automated warehouse management system including robotics and inventory tracking',
        type: 'revenue_growth',
        amount: 6800000,
        currency: 'INR',
        department: 'Logistics',
        plant: 'Plant A',
        businessUnit: 'Manufacturing',
        requesterId: 1,
        requesterName: 'John Doe',
        status: 'pending',
        currentApprover: 'capex_committee',
        approvalChain: [
            { level: 'requester', userId: 1, userName: 'John Doe', status: 'approved', timestamp: '2024-01-14T13:00:00Z', comments: 'Request submitted' },
            { level: 'department_head', userId: 2, userName: 'Sarah Wilson', status: 'approved', timestamp: '2024-01-15T10:30:00Z', comments: 'Approved - Significant efficiency gains' },
            { level: 'plant_head', userId: 3, userName: 'Mike Johnson', status: 'approved', timestamp: '2024-01-16T11:15:00Z', comments: 'Approved - Strategic investment' },
            { level: 'capex_committee', userId: 6, userName: 'Robert Smith', status: 'pending', timestamp: null, comments: '' },
            { level: 'business_ceo', userId: 4, userName: 'Lisa Brown', status: 'pending', timestamp: null, comments: '' },
            { level: 'cfo', userId: 5, userName: 'David Garcia', status: 'pending', timestamp: null, comments: '' }
        ],
        documents: [
            { name: 'Automation System Design.pdf', type: 'pdf', size: '5.2MB', uploadedAt: '2024-01-14T13:15:00Z' },
            { name: 'ROI Analysis.xlsx', type: 'excel', size: '2.1MB', uploadedAt: '2024-01-14T13:30:00Z' },
            { name: 'Vendor Comparison.pdf', type: 'pdf', size: '3.8MB', uploadedAt: '2024-01-14T13:45:00Z' }
        ],
        createdAt: '2024-01-14T13:00:00Z',
        updatedAt: '2024-01-16T11:15:00Z',
        expectedDelivery: '2024-09-30',
        justification: 'Required to handle increased inventory volume and improve accuracy',
        wbsCode: null,
        aucCode: null,
        poNumber: null
    }
];

// Notification Data
const notifications = [
    {
        id: 1,
        userId: 2,
        title: 'New CapEx Request',
        message: 'John Doe has submitted a new CapEx request: "New Production Line Equipment" (₹45,00,000)',
        type: 'info',
        read: false,
        createdAt: '2024-01-15T09:00:00Z',
        relatedRequestId: 'CAPEX-2024-001'
    },
    {
        id: 2,
        userId: 3,
        title: 'CapEx Request Approved',
        message: 'Sarah Wilson has approved the CapEx request: "HVAC System Replacement" (₹18,00,000)',
        type: 'success',
        read: false,
        createdAt: '2024-01-11T14:30:00Z',
        relatedRequestId: 'CAPEX-2024-002'
    },
    {
        id: 3,
        userId: 6,
        title: 'High Value CapEx Request',
        message: 'New CapEx request requiring committee review: "Warehouse Automation System" (₹68,00,000)',
        type: 'warning',
        read: false,
        createdAt: '2024-01-16T11:15:00Z',
        relatedRequestId: 'CAPEX-2024-006'
    },
    {
        id: 4,
        userId: 4,
        title: 'CapEx Request Rejected',
        message: 'Alex Chen has rejected the CapEx request: "Quality Control Equipment Upgrade" (₹12,00,000)',
        type: 'error',
        read: true,
        createdAt: '2024-01-10T15:20:00Z',
        relatedRequestId: 'CAPEX-2024-003'
    },
    {
        id: 5,
        userId: 5,
        title: 'Final Approval Required',
        message: 'CapEx request "HVAC System Replacement" requires your final approval',
        type: 'info',
        read: true,
        createdAt: '2024-01-13T16:45:00Z',
        relatedRequestId: 'CAPEX-2024-002'
    }
];

// Department Data
const departments = [
    { id: 1, name: 'Production', plant: 'Plant A' },
    { id: 2, name: 'Maintenance', plant: 'Plant A' },
    { id: 3, name: 'Quality Control', plant: 'Plant B' },
    { id: 4, name: 'IT', plant: 'All Plants' },
    { id: 5, name: 'Safety', plant: 'Plant B' },
    { id: 6, name: 'Logistics', plant: 'Plant A' },
    { id: 7, name: 'Finance', plant: 'All Plants' },
    { id: 8, name: 'HR', plant: 'All Plants' },
    { id: 9, name: 'Operations', plant: 'Plant A' },
    { id: 10, name: 'Operations', plant: 'Plant B' }
];

// Plant Data
const plants = [
    { id: 1, name: 'Plant A', location: 'Mumbai', businessUnit: 'Manufacturing' },
    { id: 2, name: 'Plant B', location: 'Delhi', businessUnit: 'Manufacturing' },
    { id: 3, name: 'Plant C', location: 'Bangalore', businessUnit: 'Manufacturing' }
];

// Business Unit Data
const businessUnits = [
    { id: 1, name: 'Manufacturing', ceo: 'Lisa Brown' },
    { id: 2, name: 'Sales & Marketing', ceo: 'Lisa Brown' },
    { id: 3, name: 'Research & Development', ceo: 'Lisa Brown' }
];

// CapEx Types
const capexTypes = [
    { id: 'revenue_growth', name: 'Revenue Growth CapEx', description: 'Investments for business expansion and growth' },
    { id: 'maintenance', name: 'Maintenance CapEx', description: 'Equipment maintenance and replacement' }
];

// Approval Thresholds
const approvalThresholds = {
    standardProcess: 2500000, // 25 lakhs
    committeeReview: 2500000   // 25 lakhs
};

// Status Definitions
const statusDefinitions = {
    pending: { label: 'Pending', color: 'warning', description: 'Awaiting approval' },
    approved: { label: 'Approved', color: 'success', description: 'Approved by all required approvers' },
    rejected: { label: 'Rejected', color: 'error', description: 'Rejected by an approver' },
    in_progress: { label: 'In Progress', color: 'info', description: 'Partially approved, pending further approvals' },
    cancelled: { label: 'Cancelled', color: 'secondary', description: 'Cancelled by requester' }
};

// Role Definitions
const roleDefinitions = {
    requester: { label: 'Requester', level: 1, description: 'Can create and view own requests' },
    department_head: { label: 'Department Head', level: 2, description: 'First level approval authority' },
    plant_head: { label: 'Plant Head', level: 3, description: 'Second level approval authority' },
    capex_committee: { label: 'CapEx Committee', level: 4, description: 'Special approval for high-value requests' },
    business_ceo: { label: 'Business CEO', level: 5, description: 'Third level approval authority' },
    cfo: { label: 'CFO', level: 6, description: 'Final approval authority' },
    admin: { label: 'Admin', level: 0, description: 'System administration' }
};

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        users,
        capexRequests,
        notifications,
        departments,
        plants,
        businessUnits,
        capexTypes,
        approvalThresholds,
        statusDefinitions,
        roleDefinitions
    };
}
