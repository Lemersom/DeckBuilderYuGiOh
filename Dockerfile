FROM node 

COPY src /home/frontend/src
COPY index.html /home/frontend
COPY package.json /home/frontend
COPY package-lock.json /home/frontend
COPY vite.config.js /home/frontend
COPY public /home/frontend/public

WORKDIR /home/frontend

RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]

EXPOSE 5173