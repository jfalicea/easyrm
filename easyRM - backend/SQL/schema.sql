CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    user_fname VARCHAR(60),
    user_lname VARCHAR(60), 
    user_email VARCHAR(255),
    user_title VARCHAR(60), 
    user_department VARCHAR(60), 
    token VARCHAR(60), 
    password VARCHAR(255)
);


CREATE TABLE vendors (
    id SERIAL PRIMARY KEY NOT NULL, 
    vendor_name VARCHAR(255), 
    vendor_address VARCHAR(255), 
    vendor_address_1 VARCHAR(255), 
    city VARCHAR(255), 
    state VARCHAR(255),
    zipcode VARCHAR(255), 
    sales_contact VARCHAR(255), 
    vendor_phone_number VARCHAR(255), 
    vendor_fax_number VARCHAR(255)
);


CREATE TABLE products (
    id SERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR(255), 
    description_of_service TEXT, 
    contract_start_date VARCHAR(255), 
    contract_end_date VARCHAR(255), 
    cancelation_leadtime VARCHAR(20), 
    operational_risk VARCHAR(20),
    operational_risk_analysis TEXT,
    transactional_risk VARCHAR(20),
    transactional_risk_analysis TEXT,
    reputational_risk VARCHAR(20),
    reputational_risk_analysis TEXT,
    strategic_risk VARCHAR(20),
    strategic_risk_analysis TEXT,
    compliance_risk VARCHAR(20),
    compliance_risk_analysis TEXT,
    credit_risk VARCHAR(20),
    credit_risk_analysis TEXT,
    overall_risk varchar(20),
    product_sponsor INTEGER REFERENCES users(id), 
    vendor INTEGER REFERENCES vendors(id)
);