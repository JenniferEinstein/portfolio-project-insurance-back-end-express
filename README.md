# portfolio-project-insurance-back-end-express

In the United States, our health insurance system is a mess. Out of pocket expenses are wildly difficult keep track of, especially if you also have an HSA or FSA. You don’t necessarily get billed immediately and when you do get billed, you don’t always recognize who the bills are coming from. Some insurers automatically reject claims knowing that people will not resubmit. This spplication is my attempt to let the consumer take back a little control.


https://trello.com/b/YU3uT3zn/full-stack-portfolio-project


# User Stories

A user can see all the information they has put into the database. 

A user can see which charges they still needs to send into the insurance.

A user can see which reimbursements they is waiting for.

Users can initiate a new entry by clicking a button, which opens a form.

Users can edit existing entries by clicking a button that opens a pre-filled edit form and can update information as needed (which gets information back from insurance).

Users can delete entries.

Users can filter entries by patient name, receipts needed to be sent, and reimbursements needed

Users can access the app via a provided URL.


# Database Fields

- `id` - serial primary key (Unique identifier for each entry (auto-generated).)
- `name of patient` - a string, required
- `name of provider` - a string, required
- `date of service` - date, required
- `amount charged` - a number (5,2)
- `insurance name`  - a string, varchar(200)
- `date sent to insurance` - date
- `method sent to insurance` - a string (fax, email, US mail, etc)
- `date of reimburement` - date
- `amount of reimburement` - a number (5,2)
- `status` - drop down menu?, required
- `claim number` - a string
- `explanation_of_benefits` - a string
- `picture of receipt/bill` - a picture
- `notes` - a string

# Fiels to Consider for the Future

- `sent to FSA` - a boolean
- `send to secondary insurance` - a boolean
- `payment method` - a string
- `date patient paid`  - date
- `department` - a string
- `tags` - an array

Notes for ReadMe:

https://www.postgresql.org/docs/current/ddl-constraints.html
