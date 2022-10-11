FROM nginx:1.12

#  default conf for proxy service
COPY env/docker_nginx/default.conf /etc/nginx/conf.d/default.conf

# Proxy configurations
COPY env/docker_nginx/includes/ /etc/nginx/includes/