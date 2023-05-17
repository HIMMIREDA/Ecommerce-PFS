import { FadeLoader } from "react-spinners";

function Spinner() {
  return (
    <div
      className={`h-96 w-full bg-opacity-50 flex items-center justify-center`}
    > 
      <FadeLoader color="#36d7b7" loading speedMultiplier={1} />
    </div>
  );
}

Spinner.defaultProps = {
  fixed: true,
};
export default Spinner;
