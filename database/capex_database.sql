-- =====================================================
-- CapEx Portal Database Schema
-- =====================================================
-- This SQL script creates the complete database structure
-- for the CapEx Portal application
-- =====================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS capex_portal;
USE capex_portal;

-- =====================================================
-- TABLE: users
-- Stores all system users with their roles and permissions
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role ENUM('requester', 'department_head', 'plant_head', 'business_ceo', 'cfo', 'capex_committee', 'admin') NOT NULL,
    department VARCHAR(100),
    plant VARCHAR(100),
    business_unit VARCHAR(100),
    avatar VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_role (role),
    INDEX idx_email (email)
);

-- =====================================================
-- TABLE: departments
-- Stores department information
-- =====================================================
CREATE TABLE IF NOT EXISTS departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    plant VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_plant (plant)
);

-- =====================================================
-- TABLE: plants
-- Stores plant/location information
-- =====================================================
CREATE TABLE IF NOT EXISTS plants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    business_unit VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: business_units
-- Stores business unit information
-- =====================================================
CREATE TABLE IF NOT EXISTS business_units (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    ceo VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: capex_requests
-- Main table for storing CapEx requests
-- =====================================================
CREATE TABLE IF NOT EXISTS capex_requests (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(100),
    department VARCHAR(100),
    plant VARCHAR(100),
    business_unit VARCHAR(100),
    date_of_proposal DATE,
    financial_year VARCHAR(20),
    purpose_of_capex VARCHAR(255),
    project_type JSON,
    project_description TEXT,
    current_process TEXT,
    justification TEXT,
    similar_activity TEXT,
    support_attached JSON,
    project_duration VARCHAR(50),
    required_by_date VARCHAR(50),
    capex_amount DECIMAL(15, 2) NOT NULL,
    machinery_cost DECIMAL(15, 2),
    installation DECIMAL(15, 2),
    other_breakdown DECIMAL(15, 2),
    payback_period VARCHAR(50),
    npv_payback VARCHAR(50),
    detailed_working TEXT,
    requester_id INT NOT NULL,
    requester_name VARCHAR(100) NOT NULL,
    status ENUM('pending', 'in_progress', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
    current_approver VARCHAR(50),
    wbs_code VARCHAR(50),
    auc_code VARCHAR(50),
    po_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES users(id),
    INDEX idx_requester (requester_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_amount (capex_amount)
);

-- =====================================================
-- TABLE: approval_chain
-- Stores approval workflow chain for each request
-- =====================================================
CREATE TABLE IF NOT EXISTS approval_chain (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_id VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    user_id INT,
    user_name VARCHAR(100),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    comments TEXT,
    timestamp TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES capex_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_request (request_id),
    INDEX idx_status (status)
);

-- =====================================================
-- TABLE: documents
-- Stores uploaded documents for CapEx requests
-- =====================================================
CREATE TABLE IF NOT EXISTS documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    size BIGINT,
    file_path VARCHAR(500),
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES capex_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id),
    INDEX idx_request (request_id)
);

-- =====================================================
-- TABLE: notifications
-- Stores user notifications
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    read BOOLEAN DEFAULT FALSE,
    related_request_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id),
    INDEX idx_read (read),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- TABLE: audit_logs
-- Stores all system activity for auditing
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(50),
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- TABLE: settings
-- Stores system-wide settings and configuration
-- =====================================================
CREATE TABLE IF NOT EXISTS settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (setting_key)
);

-- =====================================================
-- TABLE: approval_thresholds
-- Stores approval threshold amounts
-- =====================================================
CREATE TABLE IF NOT EXISTS approval_thresholds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    threshold_name VARCHAR(100) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Insert default users
INSERT INTO users (username, password, name, email, role, department, plant, business_unit) VALUES
('john.doe', 'password123', 'John Doe', 'john.doe@company.com', 'requester', 'Production', 'Plant A', 'Manufacturing'),
('sarah.wilson', 'password123', 'Sarah Wilson', 'sarah.wilson@company.com', 'department_head', 'Production', 'Plant A', 'Manufacturing'),
('mike.johnson', 'password123', 'Mike Johnson', 'mike.johnson@company.com', 'plant_head', 'Operations', 'Plant A', 'Manufacturing'),
('lisa.brown', 'password123', 'Lisa Brown', 'lisa.brown@company.com', 'business_ceo', 'Executive', 'All Plants', 'Manufacturing'),
('david.garcia', 'password123', 'David Garcia', 'david.garcia@company.com', 'cfo', 'Finance', 'All Plants', 'All Business Units'),
('committee.member', 'password123', 'Robert Smith', 'robert.smith@company.com', 'capex_committee', 'Strategic Planning', 'All Plants', 'All Business Units'),
('admin.user', 'password123', 'Admin User', 'admin@company.com', 'admin', 'IT', 'All Plants', 'All Business Units'),
('jane.miller', 'password123', 'Jane Miller', 'jane.miller@company.com', 'requester', 'Maintenance', 'Plant B', 'Manufacturing'),
('tom.davis', 'password123', 'Tom Davis', 'tom.davis@company.com', 'department_head', 'Maintenance', 'Plant B', 'Manufacturing'),
('alex.chen', 'password123', 'Alex Chen', 'alex.chen@company.com', 'plant_head', 'Operations', 'Plant B', 'Manufacturing')
ON DUPLICATE KEY UPDATE username=username;

-- Insert departments
INSERT INTO departments (name, plant) VALUES
('Production', 'Plant A'),
('Maintenance', 'Plant A'),
('Quality Control', 'Plant B'),
('IT', 'All Plants'),
('Safety', 'Plant B'),
('Logistics', 'Plant A')
ON DUPLICATE KEY UPDATE name=name;

-- Insert plants
INSERT INTO plants (name, location, business_unit) VALUES
('Plant A', 'Mumbai', 'Manufacturing'),
('Plant B', 'Delhi', 'Manufacturing'),
('Plant C', 'Bangalore', 'Manufacturing')
ON DUPLICATE KEY UPDATE name=name;

-- Insert business units
INSERT INTO business_units (name, ceo) VALUES
('Manufacturing', 'Lisa Brown'),
('Sales & Marketing', 'Lisa Brown'),
('Research & Development', 'Lisa Brown')
ON DUPLICATE KEY UPDATE name=name;

-- Insert approval thresholds
INSERT INTO approval_thresholds (threshold_name, amount, description) VALUES
('standard_process', 2500000, 'Standard approval process threshold (25 Lakhs)'),
('committee_review', 2500000, 'Requires Capex Committee review (25 Lakhs)')
ON DUPLICATE KEY UPDATE threshold_name=threshold_name;

-- =====================================================
-- VIEWS
-- =====================================================

-- View: Pending Approvals
CREATE OR REPLACE VIEW v_pending_approvals AS
SELECT 
    r.id,
    r.title,
    r.requester_name,
    r.capex_amount,
    r.created_at,
    ac.level,
    ac.user_id,
    u.name as approver_name
FROM capex_requests r
JOIN approval_chain ac ON r.id = ac.request_id
LEFT JOIN users u ON ac.user_id = u.id
WHERE ac.status = 'pending'
AND (r.status = 'pending' OR r.status = 'in_progress');

-- View: User Request Statistics
CREATE OR REPLACE VIEW v_user_stats AS
SELECT 
    requester_id,
    requester_name,
    COUNT(*) as total_requests,
    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_count,
    SUM(CASE WHEN status IN ('pending', 'in_progress') THEN 1 ELSE 0 END) as pending_count,
    SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_count,
    SUM(CASE WHEN status = 'approved' THEN capex_amount ELSE 0 END) as total_approved_amount
FROM capex_requests
GROUP BY requester_id, requester_name;

-- View: Department Statistics
CREATE OR REPLACE VIEW v_department_stats AS
SELECT 
    department,
    COUNT(*) as total_requests,
    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_count,
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count,
    SUM(capex_amount) as total_amount,
    AVG(capex_amount) as avg_amount
FROM capex_requests
GROUP BY department;

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

-- Procedure: Create CapEx Request
DELIMITER //
CREATE PROCEDURE sp_create_capex_request(
    IN p_id VARCHAR(50),
    IN p_title VARCHAR(255),
    IN p_capex_amount DECIMAL(15, 2),
    IN p_requester_id INT,
    IN p_requester_name VARCHAR(100),
    IN p_department VARCHAR(100),
    IN p_plant VARCHAR(100)
)
BEGIN
    DECLARE approval_levels JSON DEFAULT JSON_ARRAY();
    DECLARE needs_committee BOOLEAN;
    
    -- Determine if committee review is needed
    IF p_capex_amount >= 2500000 THEN
        SET needs_committee = TRUE;
    ELSE
        SET needs_committee = FALSE;
    END IF;
    
    -- Insert request
    INSERT INTO capex_requests (
        id, title, capex_amount, requester_id, requester_name,
        department, plant, status, created_at, updated_at
    ) VALUES (
        p_id, p_title, p_capex_amount, p_requester_id, p_requester_name,
        p_department, p_plant, 'pending', NOW(), NOW()
    );
    
    -- Create approval chain
    IF needs_committee THEN
        INSERT INTO approval_chain (request_id, level, status) VALUES
        (p_id, 'requester', 'approved'),
        (p_id, 'department_head', 'pending'),
        (p_id, 'plant_head', 'pending'),
        (p_id, 'capex_committee', 'pending'),
        (p_id, 'business_ceo', 'pending'),
        (p_id, 'cfo', 'pending');
    ELSE
        INSERT INTO approval_chain (request_id, level, status) VALUES
        (p_id, 'requester', 'approved'),
        (p_id, 'department_head', 'pending'),
        (p_id, 'plant_head', 'pending'),
        (p_id, 'business_ceo', 'pending'),
        (p_id, 'cfo', 'pending');
    END IF;
    
    SELECT 'Success' as result;
END //
DELIMITER ;

-- Procedure: Approve Request
DELIMITER //
CREATE PROCEDURE sp_approve_request(
    IN p_request_id VARCHAR(50),
    IN p_user_id INT,
    IN p_user_name VARCHAR(100),
    IN p_comments TEXT
)
BEGIN
    DECLARE current_level_id INT;
    DECLARE next_level_id INT;
    DECLARE is_final_approval BOOLEAN;
    
    -- Update current approval
    UPDATE approval_chain
    SET status = 'approved',
        user_id = p_user_id,
        user_name = p_user_name,
        comments = COALESCE(p_comments, 'Approved'),
        timestamp = NOW(),
        updated_at = NOW()
    WHERE request_id = p_request_id 
    AND status = 'pending'
    LIMIT 1;
    
    -- Check if there are more approvals pending
    SELECT COUNT(*) = 0 INTO is_final_approval
    FROM approval_chain
    WHERE request_id = p_request_id
    AND status = 'pending';
    
    -- Update request status
    IF is_final_approval THEN
        UPDATE capex_requests
        SET status = 'approved',
            wbs_code = CONCAT('WBS-', p_request_id),
            auc_code = CONCAT('AUC-', p_request_id),
            po_number = CONCAT('PO-', p_request_id),
            current_approver = NULL,
            updated_at = NOW()
        WHERE id = p_request_id;
    ELSE
        SELECT level INTO @next_level
        FROM approval_chain
        WHERE request_id = p_request_id
        AND status = 'pending'
        LIMIT 1;
        
        UPDATE capex_requests
        SET status = 'in_progress',
            current_approver = @next_level,
            updated_at = NOW()
        WHERE id = p_request_id;
    END IF;
    
    SELECT 'Success' as result;
END //
DELIMITER ;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger: Auto-generate notification on new request
DELIMITER //
CREATE TRIGGER trg_new_request_notification
AFTER INSERT ON capex_requests
FOR EACH ROW
BEGIN
    INSERT INTO notifications (user_id, title, message, type, related_request_id)
    SELECT 
        id,
        'New CapEx Request',
        CONCAT(NEW.requester_name, ' has submitted a new CapEx request: ', NEW.title, ' (₹', FORMAT(NEW.capex_amount, 0), ')'),
        'info',
        NEW.id
    FROM users
    WHERE role IN ('department_head', 'plant_head', 'business_ceo', 'cfo')
    OR role = 'capex_committee' AND NEW.capex_amount >= 2500000;
END //
DELIMITER ;

-- Trigger: Auto-generate notification on approval
DELIMITER //
CREATE TRIGGER trg_approval_notification
AFTER UPDATE ON approval_chain
FOR EACH ROW
BEGIN
    IF NEW.status = 'approved' AND OLD.status = 'pending' THEN
        INSERT INTO notifications (user_id, title, message, type, related_request_id)
        SELECT 
            requester_id,
            'Request Approved',
            CONCAT('Your request "', (SELECT title FROM capex_requests WHERE id = NEW.request_id), '" has been approved by ', NEW.user_name),
            'success',
            NEW.request_id
        FROM capex_requests
        WHERE id = NEW.request_id;
    END IF;
END //
DELIMITER ;

-- =====================================================
-- END OF SCHEMA
-- =====================================================

