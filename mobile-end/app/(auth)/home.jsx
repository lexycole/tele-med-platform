// Home.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, Button, Pressable } from 'react-native';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { setAuthToken } from '../lib/api';
import { getCountries } from '../lib/api';
import { Link, router  } from 'expo-router';

const Home = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      console.log(token, 'token')
      setAuthToken(token);
      const response = await getCountries();
      console.log()
      if (response.ok) {
        setCountries(response.data);
      } else {
        setError('Failed to fetch countries');
      }
    } catch (err) {
      console.error('Error fetching countries:', err);
      setError('An error occurred while fetching countries');
    } finally {
      setLoading(false);
    }
  };

  const renderCountryItem = ({ item }) => (
    <View style={styles.countryItem}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.firstName} 🎉</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00B7DD" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={countries}
          renderItem={renderCountryItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={<Text style={styles.listHeader}>Countries:</Text>}
        />
      )}
       <Link href="/TimelineAppointments" asChild>
        <Pressable style={styles.button}>
          <Text>Timeline Appointment</Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default Home;