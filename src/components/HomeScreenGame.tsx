import WelcomeScreen from "./WelcomeScreen";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { reactionTimeIcon } from "../assets/icons";

const HomeScreenGame = () => {
  const navigate = useNavigate();
  return (
    <div className="game-window bg-blue">
      <WelcomeScreen
        button={
          <Button
            text="Get Started"
            color="yellow"
            onClick={() => navigate("/test/reactiontime")}
          />
        }
        description="Measure your abilitiesa with brain games andcognitive tests."
        logo={reactionTimeIcon}
        heading="Human Benchmark"
      />
    </div>
  );
};

export default HomeScreenGame;
