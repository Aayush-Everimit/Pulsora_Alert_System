# ---- Stage 1: Build the app ----
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy Maven files first (to leverage cache)
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Pre-fetch dependencies only once (cached across builds)
RUN ./mvnw dependency:go-offline -B

# Copy the rest of the source
COPY src src

# Package the app
RUN ./mvnw package -DskipTests

# ---- Stage 2: Run the app ----
FROM eclipse-temurin:21-jdk
WORKDIR /opt/app

# Copy only the built JAR
COPY --from=build /app/target/Pulsora-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
