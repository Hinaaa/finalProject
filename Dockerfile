From openjdk:21
EXPOSE 8080
ADD backend/target/finalproject.jar finalproject.jar
ENTRYPOINT ["java", "-jar", "finalproject.jar"]