# Search Functionality Setup Guide

This guide explains how to set up and use the search functionality in the Wedding Website.

## Backend Setup

1. Make sure MongoDB is running and your connection string is correctly set in the `.env` file.

2. Install the backend dependencies:

   ```bash
   cd Backend
   npm install
   ```

3. Initialize the sample data for search:

   ```bash
   npm run init-data
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

## Search API Endpoints

The search API provides the following endpoints:

- `GET /api/search/suggestions?q=query` - Returns autocomplete suggestions
- `GET /api/search?q=query&category=category` - Returns full search results
- `GET /api/search/stats` - Returns search statistics (optional)
- `POST /api/search/sample-data` - Adds sample data (development only)

## Frontend Integration

The frontend search component in `HeaderSection.jsx` is already configured to connect to these endpoints.

1. Make sure the backend server is running on port 9000.

2. The search bar will automatically connect to the backend to get:

   - Real-time suggestions as the user types
   - Full search results when the user submits a search

3. The implementation includes fallbacks to mock data if the backend connection fails.

## Data Model

The search functionality uses the `WeddingService` model which includes:

- Basic information: title, description, category
- Media: image URLs
- Location data
- Contact information
- Pricing information
- Ratings and reviews
- Additional metadata

## Troubleshooting

If you encounter issues with the search functionality:

1. Check the backend connection:

   - Ensure MongoDB is running
   - Verify the backend server is running on port 9000
   - Check CORS settings if needed

2. Verify data initialization:

   - Run `npm run init-data` to populate the database
   - Check MongoDB to ensure data was added

3. Debug network requests:

   - Use browser developer tools to check network requests
   - Verify the API endpoints are returning expected responses

4. Console logs:
   - Check both frontend and backend console logs for errors

## Extending the Search

To extend the search functionality:

1. Add more fields to the `WeddingService` model
2. Update the search controller to include new fields
3. Enhance the frontend to display additional data

## Production Considerations

Before deploying to production:

1. Remove mock data fallbacks
2. Secure the sample data endpoint
3. Add proper error handling
4. Implement caching for frequent searches
5. Consider adding search analytics
