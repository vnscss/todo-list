#!/bin/bash

# Caminho para o arquivo do banco SQLite
DB_PATH="./data.db"

# Criar as tabelas se não existirem
sqlite3 "$DB_PATH" <<EOF
CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    descricao TEXT,
    done BOOLEAN NOT NULL CHECK (done IN (0,1)) DEFAULT 0,
    data TEXT,
    user TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS hashes (
    hash TEXT PRIMARY KEY
);
EOF

# Definir o hash válido que será usado nas 3 tasks e inserido na tabela hashes
HASH_VALIDO='a3f5c1d2e4b67890abcdef1234567890abcdef1234567890abcdef1234567890'

# Inserir o hash válido na tabela hashes (ignora se já existir)
sqlite3 "$DB_PATH" <<EOF
INSERT OR IGNORE INTO hashes (hash) VALUES ('$HASH_VALIDO');
EOF

# Inserir 3 tasks com o mesmo hash válido no campo user, com datas formatadas como TEXT (ISO 8601)
sqlite3 "$DB_PATH" <<EOF
INSERT INTO tarefas (name, descricao, done, data, user) VALUES 
('Comprar leite', 'Comprar leite no supermercado até às 18h', 0, strftime('%Y-%m-%d %H:%M:%S','now'), '$HASH_VALIDO'),
('Enviar relatório', 'Enviar relatório mensal para o gerente', 1, strftime('%Y-%m-%d %H:%M:%S','now','-1 day'), '$HASH_VALIDO'),
('Pagar contas', 'Pagar contas de água e luz antes do vencimento', 0, strftime('%Y-%m-%d %H:%M:%S','now','+2 days'), '$HASH_VALIDO');
EOF


echo "Mock inserido: 3 tarefas com o mesmo hash válido."
