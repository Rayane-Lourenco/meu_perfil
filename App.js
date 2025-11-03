import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from "react-native";

export default function App() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch("http://192.168.56.1:3000/api/perfils")
    .then((res) => res.json())
    .then((json) => { 
      console.log(json);
      setPerfil(json);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    })
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }
   
  if (!perfil) {
    console.log(perfil);
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar dados</Text>
      </View>
    );
  }
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: perfil.image}} style={styles.image} />
      <Text style={styles.titulo}>Perfil</Text>
      <Text style={styles.texto}>Nome:{perfil.nome}</Text>
      <Text style={styles.texto}>Idade:{perfil.idade}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  texto: {
    fontSize: 18,
    marginBottom: 5,
    width: "70%",
    textAlign: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
});
