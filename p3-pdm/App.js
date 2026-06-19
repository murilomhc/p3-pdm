import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);

const fetchCats = async () => {
  setLoading(true);
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5');
    setCats(response.data.slice(0, 5)); 
  } catch (error) {
    console.error("Erro ao buscar gatinhos:", error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Galeria de Gatinhos</Text>
      
      <TouchableOpacity style={styles.button} onPress={fetchCats} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Carregando..." : "Ver outros gatinhos"}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ margin: 20 }} />}

      <View style={styles.listContainer}>
        {cats.map((cat) => (
          <Image 
            key={cat.id} 
            source={{ uri: cat.url }} 
            style={styles.catImage} 
            resizeMode="cover"
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    width: '100%',
  },
  catImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 15, 
  },
});