# Build Stage: React Frontend
FROM node:18-alpine AS build-stage
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Final Stage: Python Backend
FROM python:3.9-slim
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy frontend build from build-stage
COPY --from=build-stage /app/frontend/dist ./frontend/dist

# Expose port 7860 for Hugging Face Spaces
EXPOSE 7860

# Set environment variables
ENV PYTHONPATH=/app
ENV PORT=7860

# Run the unified application
CMD ["python", "backend/app.py"]
