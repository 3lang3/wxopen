/** @jsx h */
import { h } from "preact";
import CallAppUp from "../islands/CallAppUp.tsx";
import Layout from "../components/Layout.tsx"

export default function CallPage() {
  return (
    <Layout>
      <CallAppUp />;
    </Layout>
  );
}
