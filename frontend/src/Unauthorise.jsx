import HomePage from "./components/HomePage";
import { Result } from "antd";
export default function Unauthorise() {
  return (
    <HomePage>
    {
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    }
  </HomePage>
  );
}
