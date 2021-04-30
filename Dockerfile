# FROM node:14
FROM node:alpine
# Create app directory
RUN mkdir -p /usr/scr/app/node_modules && chown -R node:node /usr/scr/app
WORKDIR /usr/scr/app
# RUN git clone https://github.com/BillyCheung10botics/watson_token_generator.git
COPY package*.json ./
# USER node
RUN npm install
# RUN npm ci --only=production
# COPY --chown=node:node . .
# Build app source
COPY . .

# ENV PORT 30000
# ENV TZ UTC
# EXPOSE $PORT
EXPOSE 30000
# need to put the ibm-credentials.env file on the root directory first
CMD ["node", "index.js"]
