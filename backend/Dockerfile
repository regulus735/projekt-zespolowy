# Use the official ASP.NET Core SDK image as a parent image
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Set the working directory in the container
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build the application
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime

# Set the working directory in the container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/out ./

# Expose port 8080 for the application
EXPOSE 8080

# Change default port
ENV ASPNETCORE_URLS=http://+:8080

# Start the ASP.NET Core app
ENTRYPOINT ["dotnet", "projekt_zespolowy.dll"]
