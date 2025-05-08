FROM node:18
WORKDIR /app
COPY . .
COPY shared/db_template.json infrastructure/db/db.json
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]