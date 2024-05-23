#!/bin/bash

set -e
set -u

if [ -n "$POPULATE_DATABASE" ]; then
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -d "$DB_DATABASE" < "$DB_DUMP"
	echo "$DB_DATABASE restored... ??"
fi
