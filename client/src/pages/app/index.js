import Layout from "./layout";
import { withAuth } from "wiremock/components/withAuth";

function App() {

  return (
    <div className="">
      <Layout />
    </div>
  );
}

export default withAuth(App);