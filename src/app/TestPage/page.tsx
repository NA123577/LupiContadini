"use client";
import { useState, useEffect } from "react";
import { fetchSalas, createSala, deleteSala } from "../BusinessLogic/SalaService";
import { Sala } from "../Entities/Sala";

const SalaPage = () => {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [newSala, setNewSala] = useState("");

  // Load data when component mounts
  useEffect(() => {
    const loadSalas = async () => {
      try {
        const data = await fetchSalas();
        setSalas(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadSalas();
  }, []);

  const handleCreateSala = async () => {
    try {
      const newSalaData = await createSala(newSala);
      setSalas([...salas, newSalaData]); // Update UI
      setNewSala("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSala = async (id: number) => {
    try {
      await deleteSala(id);
      setSalas(salas.filter((sala) => sala.Id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Salas</h1>
      <input
        type="text"
        value={newSala}
        onChange={(e) => setNewSala(e.target.value)}
        placeholder="Enter Sala name"
      />
      <button onClick={handleCreateSala}>Create Sala</button>

      <ul>
        {salas.map((sala, index) => (
          <li key={index}>
            {sala?.NomeSala} 
            <button onClick={() => handleDeleteSala(sala.Id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalaPage;
