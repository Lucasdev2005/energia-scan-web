# Use uma imagem base que tenha o Node.js instalado. ##
FROM node:18 as builder

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

RUN npm run build

# Etapa de produção: servir a aplicação usando um servidor HTTP. ##
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build /app/build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]
