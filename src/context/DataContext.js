import { createContext, useEffect, useState } from "react";
import api from "../axios/createAxios";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [postsList, setPostsList] = useState([]);
  const [searchText, setSearchText] = useState("");
  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        let response = await api.get("/postsList");
        setPostsList(response.data);
      } catch (error) {
        console.log(`Error:${error}`);
      }
    };
    fetchInitialData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        postsList,
        setPostsList,
        searchText,
        setSearchText
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
