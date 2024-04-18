# Weather-app
OpenWeather API Front-End Application
Overview
This project involves creating a single-page web application to interact with the OpenWeather API. The application will fetch and display a 5-day weather forecast based on user input, which can be a city name, zip code, or geographic coordinates.

Key Features
User Input Options: Users can specify the location using one of three methods: city name, zip code, or coordinates. Input is selected via radio buttons and entered through a single text field.
Weather Forecast Display: The application retrieves and displays the forecast for the next three days, excluding today. Displayed data includes maximum temperature, average cloud cover, and maximum pressure.
Data Handling: Utilizes AJAX to make HTTP requests and processes the JSON response to update the web page dynamically.
Error Handling: Displays an error message if the specified location is invalid.
Technical Details
API Registration: Users must register at OpenWeather to obtain an API key.
Forecast API: The application uses the "5 day / 3 hour forecast" API endpoint.
Date Handling: Uses Unix timestamp conversion to filter and display relevant forecast data.
Data Aggregation: Calculates maximum values for temperature and pressure, and averages for cloud cover per day.
Development Tools
JavaScript: Core programming language.
AJAX: For asynchronous data fetching.
HTML/CSS: For layout and styling.
Setup
Register for an API key at OpenWeather API.
Follow the API details provided at 5 day / 3 hour forecast API.
This project provides practical experience with AJAX and API integration in building modern web applications.
