# Use uma imagem Node adequada para construir a aplicação
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: Servir com Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove arquivos padrão do Nginx
RUN rm -rf ./*

# Copia os arquivos do build Angular para o Nginx
COPY --from=build /app/dist/dist/formulario-suporte-redragon/browser .

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 4200
EXPOSE 4200

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
