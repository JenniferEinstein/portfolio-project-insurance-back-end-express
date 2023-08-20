DROP DATABASE IF EXISTS insuranceeinsteinium;
CREATE DATABASE insuranceeinsteinium;
\c insuranceeinsteinium;

DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
    id serial PRIMARY KEY,
    patient TEXT NOT NULL,
    service_date DATE NOT NULL,
    description TEXT NOT NULL,
    cost NUMERIC(8,2),
    insurance TEXT,
    status TEXT NOT NULL DEFAULT 'to send to insurance',
    sentto_how TEXT,
    sentto_when DATE,
    claimnumber TEXT,
    EOB BOOLEAN DEFAULT false,
    notes TEXT, 
);
