FROM node:18
WORKDIR /app
COPY . .
RUN npm install -g json-server
EXPOSE 3000
CMD ["json-server", "--watch", "db.json", "--port", "3000"]