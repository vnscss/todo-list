#!/bin/bash

# Path to the SQLite database file
DB_PATH="./data.db"

# Create the employees table if it doesn't exist
sqlite3 "$DB_PATH" <<EOF
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lastname TEXT NOT NULL
);
EOF

# Insert 10 hardcoded lastnames
sqlite3 "$DB_PATH" <<EOF
INSERT INTO employees (lastname) VALUES ('Anderson');
INSERT INTO employees (lastname) VALUES ('Brown');
INSERT INTO employees (lastname) VALUES ('Clark');
INSERT INTO employees (lastname) VALUES ('Davis');
INSERT INTO employees (lastname) VALUES ('Evans');
INSERT INTO employees (lastname) VALUES ('Garcia');
INSERT INTO employees (lastname) VALUES ('Harris');
INSERT INTO employees (lastname) VALUES ('Johnson');
INSERT INTO employees (lastname) VALUES ('Lewis');
INSERT INTO employees (lastname) VALUES ('Martinez');
EOF

echo "Inserted 10 hardcoded last names into 'employees' table."
