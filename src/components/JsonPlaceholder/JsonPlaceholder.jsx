import { useEffect, useState } from "react";
import React from "react";

const JsonPlaceholder = () => {
  const [usuarios, setUsuarios] = useState([]);

  const pedirUsuarios = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setUsuarios(data);
  };
  useEffect(() => {
    try {
      pedirUsuarios();
    } catch (error) {
      console.log("Error al conectar");
    }
  }, []);

  return (
    <div>
      <h2>Usuarios de JsonPlaceholder</h2>
      <ul>
        {usuarios.map((usuario) => {
          return <li key={usuario.id}>{usuario.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default JsonPlaceholder;
