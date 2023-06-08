import "./index.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import AddPost from "./Components/AddPost";
import About from "./Components/About";
import PostDetails from "./Components/PostDetails";
import EditPost from "./Components/EditPost";
import Missing from "./Components/Missing";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <Header />
      <DataProvider>
        <Nav />
        <Routes>
          <Route exact path="/addpost" element={<AddPost />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/post/:id" element={<PostDetails />} />
          <Route exact path="/editpost/:id" element={<EditPost />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
