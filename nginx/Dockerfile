FROM nginx
# official nginx image, it is found in /etc/nginx
COPY default.conf /etc/nginx/conf.d/default.conf
# CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
# RUN echo $TZ >> /usr/share/nginx/html/build.txt
# RUN date >> /usr/share/nginx/html/build.txt
