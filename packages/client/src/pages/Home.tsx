import React from "react";
import { Link } from "react-router-dom";
import EndosTable from "../components/EndosTable";
import { useEndosQuery } from "../generated/graphql";

interface Props {}

const Home = ({}: Props) => {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>

      <EndosTable />
      <nav>
        <Link to="/search">Search</Link>
      </nav>
    </>
  );
};
export default Home;
