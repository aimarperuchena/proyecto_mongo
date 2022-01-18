FROM node:17
RUN mkdir mongo_api
WORKDIR "/mongo_api"
COPY /api .

RUN npm install
CMD ["npm", "start"]