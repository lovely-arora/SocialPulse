#!/bin/sh

host="$1"
port="$2"
shift 2

echo "⏳ Waiting for MySQL at $host:$port..."

while ! nc -z "$host" "$port"; do
  echo "⏳ Still waiting for MySQL at $host:$port..."
  sleep 2
done

echo "✅ MySQL is up — executing command"
exec "$@"
