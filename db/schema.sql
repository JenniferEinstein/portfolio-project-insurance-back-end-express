DROP DATABASE IF EXISTS insuranceeinsteinium;
CREATE DATABASE insuranceeinsteinium;
\c insuranceeinsteinium;

DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
    id serial PRIMARY KEY,
    patient text NOT NULL,
    service_date text,
    description text NOT NULL,
    cost NUMERIC(8,2),
    insurance text,
    status text DEFAULT 'to send to insurance',
    sentto_how text,
    sentto_when date,
    claimnumber text,
    EOB BOOLEAN DEFAULT false,
    notes text
);