import { headers } from "next/headers";
import FetchDataComponent from "./fetchDataComponent";
const Home = () => {
  const headersList = headers();
  return (
    <div>
      <FetchDataComponent category="tech" />
    </div>
  );
};

export default Home;
