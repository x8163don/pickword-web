import LearningProgress from "./LearningProgress";
import RecentlyLearning from "./RecentlyLearning";

export default function Dashboard() {
    return <main className="p-6 grid grid-cols-4 gap-8">
        <LearningProgress className="col-span-2"></LearningProgress>

        <RecentlyLearning className="row-start-2 col-span-4"></RecentlyLearning>
    </main>
}