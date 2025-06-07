#!/bin/bash

# Caminho para o arquivo do banco SQLite
DB_PATH="./data.db"

# Criar a tabela 'tarefas' se não existir
sqlite3 "$DB_PATH" <<EOF
CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    descricao TEXT,
    done BOOLEAN NOT NULL CHECK (done IN (0,1)) DEFAULT 0,
    data INTEGER,
    user TEXT NOT NULL DEFAULT ''
);
EOF

# Inserir dados mock na tabela 'tarefas'
sqlite3 "$DB_PATH" <<EOF
INSERT INTO tarefas (name, descricao, done, data, user) VALUES 
('Comprar leite', 'Comprar leite no supermercado até às 18h', 0, strftime('%s','now'), 'a3f5c1d2e4b67890abcdef1234567890abcdef1234567890abcdef1234567890'),
('Enviar relatório', 'Enviar relatório mensal para o gerente', 1, strftime('%s','now','-1 day'), 'b4f6d2e3f7c89012abcdef3456789012abcdef3456789012abcdef3456789012'),
('Pagar contas', 'Pagar contas de água e luz antes do vencimento', 0, strftime('%s','now','+2 days'), 'c5a7e3f8d9b01234abcdef5678901234abcdef5678901234abcdef5678901234');
EOF

