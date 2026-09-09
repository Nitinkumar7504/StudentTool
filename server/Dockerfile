FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y \
       libreoffice \
       python3 \
       python3-pip \
       python3-venv \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --no-cache-dir pdf2docx

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 10000

CMD ["npm", "start"]