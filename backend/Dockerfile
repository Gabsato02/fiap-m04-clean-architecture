FROM node:18
WORKDIR /app
COPY . .
COPY _db.json db.json
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]