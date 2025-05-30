FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose ports for both apps
EXPOSE 5000
EXPOSE 5001

CMD ["sleep", "infinity"]  # We'll override this in docker-compose for each app
