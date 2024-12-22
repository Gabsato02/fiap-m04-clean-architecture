FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8501
CMD ["npm", "start", "--", "--port", "8501"]