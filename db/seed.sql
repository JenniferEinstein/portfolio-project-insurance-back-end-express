\c entries;

INSERT INTO entries (patient, service_date, description, cost, insurance, status, sentto_how, sentto_when, claimnumber, EOB, notes) VALUES 
('Jamie Kim', '2023-08-18', 'office visit, Dr. Breslow', '35.00', 'AETNA', '', '', '', false, 'doctor. Need to follow up with Dr. B.'),
('Jamie Kim', '2023-07-01', 'CVS Specialty - Humira', '5.00', 'AETNA', 'Done!', 'by provider', '2023-07-01', '23ouoijpoiaed', true, 'Rx'),
('Ru Kim', '2023-05-04', 'annual physical', '10.00', 'HealthFirst', '', '', '8675309AE4', true, ''),
('Jamie Kim', '2023-01-11', 'NYKI', '350.00', 'AETNA', 'sent to insurance', 'through portal', '2023-05-05', '', false, 'Waiting to hear back from AETNA');