import { StatsContainer, TrendingQuizContainer } from "../components";
import Loading from "../components/Loading";

import { useQuizStats } from "../queries/useQuizStats";

function Dashboard() {
  return (
    <div>
      <StatsContainer />
      <TrendingQuizContainer />
    </div>
  );
}

export default Dashboard;
