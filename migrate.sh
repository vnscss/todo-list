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
    data TEXT,
    user TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS hashes (
    hash TEXT PRIMARY KEY
);
EOF
echo "Migration completa: tabela 'tarefas' criada e dados mock inseridos."
