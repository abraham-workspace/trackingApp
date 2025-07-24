
-- 1. ROLES TABLE
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL CHECK (name IN ('user', 'admin'))
);

-- 2. USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role_id UUID REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. DEVICES TABLE
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    device_name VARCHAR(100) NOT NULL,
    device_type VARCHAR(50),
    serial_number VARCHAR(100) UNIQUE,
    description VARCHAR(100) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_lost BOOLEAN DEFAULT FALSE
);

-- 4. LOGIN HISTORY TABLE
CREATE TABLE logins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50),
    device_info TEXT
);

-- 5. INSERT DEFAULT ROLES
INSERT INTO roles (name) VALUES ('user'), ('admin');
