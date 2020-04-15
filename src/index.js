import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  Text, FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native'

import api from './services/api'

// import { Container } from './styles'

export default function App() {
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject() {
    
    const response = await api.post('/projects', {
      name: `um projeto ${Date.now()}`
    })
    const project = response.data

    setProjects([...projects, project])
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Lista de projetos:</Text>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.name}</Text>
          )}
        />

        <TouchableOpacity 
          onPress={handleAddProject}
          style={styles.button}
          activeOpacity={0.6}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center'
  },
  text: {
    color: '#335577',
    fontSize: 32,
    fontWeight: 'bold'
  },
  project: {
    fontSize: 20,
    color: '#7159c1'
  },

  button: {
    backgroundColor: '#0F4C81',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  }

})
