import React, { useState, useEffect } from "react";

import api from "/home/thiago/Documentos/desafio03-master/src/services/api.js"

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get(`/repositories`).then( response => {
      setRepositories(response.data)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post(`/repositories`, {
        title: `Novo projeto ${Date.now()}`,
        tech: 'ReactJs'
    })

    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const filteredRepo = repositories.filter(repo => repo.id !== id);
    setRepositories(filteredRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repositorie => 
          <li key= {repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
