FROM openjdk:11
WORKDIR /var/app
COPY ./build/libs/project94-1.0.0.jar /var/app/project94-1.0.0.jar
ENV _JAVA_OPTIONS '-Dspring.redis.host=redis-server'
CMD [ "java", "-jar", "/var/app/project94-1.0.0.jar" ]
EXPOSE 8080 5005
