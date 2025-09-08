import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack, Alert } from '@mui/material';

const Test: React.FC = () => {
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [isRunning, setIsRunning] = useState(false);

  // Test services directly
  const testServices = async () => {
    console.log('=== TESTING SERVICES ===');
    const results: Record<string, any> = {};

    try {
      // Test basic service imports
      const { getEvents, getMeetups, getUsers, getAllItems } = await import('@/services');
      
      console.log('Testing getEvents...');
      const events = await getEvents();
      results.getEvents = { success: true, count: events.length, sample: events[0] };

      console.log('Testing getMeetups...');
      const meetups = await getMeetups();
      results.getMeetups = { success: true, count: meetups.length, sample: meetups[0] };

      console.log('Testing getUsers...');
      const users = await getUsers();
      results.getUsers = { success: true, count: users.length, sample: users[0] };

      console.log('Testing getAllItems...');
      const allItems = await getAllItems();
      results.getAllItems = { success: true, count: allItems.length, sample: allItems[0] };

    } catch (error) {
      console.error('Service test error:', error);
      results.error = { message: error instanceof Error ? error.message : 'Unknown error' };
    }

    console.log('=== SERVICES TEST COMPLETE ===');
    return results;
  };

  // Test hooks
  const testHooks = async () => {
    console.log('=== TESTING HOOKS ===');
    const results: Record<string, any> = {};

    try {
      // Test hook imports
      const { useEvents, useMeetups, useUsers, useUnifiedItems } = await import('@/hooks');
      
      // Note: We can't actually call hooks here since we're not in a React component context
      // But we can test that they exist
      results.useEvents = { success: true, type: typeof useEvents };
      results.useMeetups = { success: true, type: typeof useMeetups };
      results.useUsers = { success: true, type: typeof useUsers };
      results.useUnifiedItems = { success: true, type: typeof useUnifiedItems };

    } catch (error) {
      console.error('Hook test error:', error);
      results.error = { message: error instanceof Error ? error.message : 'Unknown error' };
    }

    console.log('=== HOOKS TEST COMPLETE ===');
    return results;
  };

  // Test stores
  const testStores = async () => {
    console.log('=== TESTING STORES ===');
    const results: Record<string, any> = {};

    try {
      // Test store imports
      const userStore = await import('@/store/userStore');
      const filtersStore = await import('@/store/filtersStore');
      const dataStore = await import('@/store/dataStore');
      const bookingStore = await import('@/store/bookingStore');
      const geoStore = await import('@/store/geoStore');
      const appStore = await import('@/store/appStore');

      // Test store state access
      const userState = userStore.default.getState();
      const filtersState = filtersStore.useFiltersStore.getState();
      const dataState = dataStore.useDataStore.getState();
      const bookingState = bookingStore.default.getState();
      const geoState = geoStore.useGeoStore.getState();
      const appState = appStore.useAppStore.getState();

      results.userStore = { success: true, hasUser: !!userState.user };
      results.filtersStore = { success: true, categoryFilter: filtersState.categoryFilter };
      results.dataStore = { success: true, meetupStep: dataState.meetupCreation.step };
      results.bookingStore = { success: true, hasBookingData: !!bookingState.bookingData };
      results.geoStore = { success: true, city: geoState.city };
      results.appStore = { success: true, isLoading: appState.isLoading };

    } catch (error) {
      console.error('Store test error:', error);
      results.error = { message: error instanceof Error ? error.message : 'Unknown error' };
    }

    console.log('=== STORES TEST COMPLETE ===');
    return results;
  };

  // Test utils
  const testUtils = async () => {
    console.log('=== TESTING UTILS ===');
    const results: Record<string, any> = {};

    try {
      // Test utils imports
      const utils = await import('@/utils');
      
      // Test date formatting
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      
      results.formatEventRange = { 
        success: true, 
        result: utils.formatEventRange(now, tomorrow) 
      };

      results.formatSmartDate = { 
        success: true, 
        result: utils.formatSmartDate(now) 
      };

      // Test filter utils
      results.hasActiveFilters = { 
        success: true, 
        result: utils.hasActiveFilters() 
      };

      // Test notification functions
      results.showError = { success: true, type: typeof utils.showError };
      results.showSuccess = { success: true, type: typeof utils.showSuccess };

      // Test geo functions
      results.reverseGeocode = { success: true, type: typeof utils.reverseGeocode };
      results.detectUserLocation = { success: true, type: typeof utils.detectUserLocation };

    } catch (error) {
      console.error('Utils test error:', error);
      results.error = { message: error instanceof Error ? error.message : 'Unknown error' };
    }

    console.log('=== UTILS TEST COMPLETE ===');
    return results;
  };

  // Run all tests
  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults({});

    try {
      const [servicesResults, hooksResults, storesResults, utilsResults] = await Promise.all([
        testServices(),
        testHooks(),
        testStores(),
        testUtils()
      ]);

      const allResults = {
        services: servicesResults,
        hooks: hooksResults,
        stores: storesResults,
        utils: utilsResults
      };

      setTestResults(allResults);
      console.log('=== ALL TESTS COMPLETE ===', allResults);

    } catch (error) {
      console.error('Test suite error:', error);
      setTestResults({ error: { message: error instanceof Error ? error.message : 'Unknown error' } });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6">
        Core Architecture Test Suite
      </Typography>

      <Button 
        variant="contained" 
        onClick={runAllTests} 
        disabled={isRunning}
        className="mb-6"
      >
        {isRunning ? 'Running Tests...' : 'Run All Tests'}
      </Button>

      {Object.keys(testResults).length > 0 && (
        <Stack spacing={2}>
          {Object.entries(testResults).map(([category, results]) => (
            <Box key={category}>
              <Typography variant="h6" className="mb-2">
                {category.toUpperCase()} Results:
              </Typography>
              
              {results.error ? (
                <Alert severity="error">
                  Error: {results.error.message}
                </Alert>
              ) : (
                <Box className="bg-gray-100 p-4 rounded">
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(results, null, 2)}
                  </pre>
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      )}

      <Typography variant="body2" className="mt-4 text-gray-600">
        Check browser console for detailed test logs.
      </Typography>
    </Box>
  );
};

export default Test;