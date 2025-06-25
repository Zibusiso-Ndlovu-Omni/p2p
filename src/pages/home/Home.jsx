import Hero from "./Hero.jsx";
import CountdownTimer from "./CountdownTimer.jsx";
import QuickActions from "./QuickActions.jsx";


function Home() {

    return (
        <div className="min-h-screen bg-gray-800">
                <Hero />
                <CountdownTimer />
                <QuickActions/>
        </div>
    )
}

export default Home
