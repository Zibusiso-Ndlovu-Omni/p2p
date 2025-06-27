import Hero from "./Hero.jsx";
import CountdownTimer from "./CountdownTimer.jsx";
import QuickActions from "./QuickActions.jsx";
import KeyFeatures from "./KeyFeatures.jsx";
import AboutEvent from "./AboutEvent.jsx";
import KeyIndustries from "./KeyIndustries.jsx";


function Home() {

    return (
        <div className="min-h-screen bg-gray-800">
                <Hero />
                <CountdownTimer />
            <AboutEvent />
            <KeyFeatures />
            <KeyIndustries />
                <QuickActions/>
        </div>
    )
}

export default Home
