FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8502
CMD ["npm", "start", "--", "--port", "8502"]