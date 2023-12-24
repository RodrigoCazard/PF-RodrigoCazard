import React from "react";
import { useFetch } from "../../hooks/useFetch";

const UseFetch = () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const data = useFetch(url);

  return (
    <>
      <ul>
        {data.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </>
  );
};

export default UseFetch;
