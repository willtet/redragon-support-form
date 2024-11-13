# Use uma imagem Node adequada para construir a aplicação
FROM node:20-alpine AS build

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para instalar as dependências
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o restante dos arquivos do projeto para o contêiner
COPY . .

# Compile a aplicação Angular para produção
RUN npm run build -- --output-path=dist

# Use uma imagem nginx para servir a aplicação Angular
FROM nginx:alpine

# Copie a aplicação compilada para o diretório padrão do NGINX
COPY --from=build /app/dist/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY mime.types /etc/nginx/mime.types

# Exponha a porta 80 para servir a aplicação
EXPOSE 80

# Inicie o NGINX
CMD ["nginx", "-g", "daemon off;"]
