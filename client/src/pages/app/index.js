import Layout from "./layout";
import { withAuth } from "wiremock/components/utils/withAuth";

function App() {
  return (
    <div className="">
      <Layout />
    </div>
  );
}

export default withAuth(App);