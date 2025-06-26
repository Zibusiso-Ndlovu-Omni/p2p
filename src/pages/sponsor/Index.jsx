import SponsorshipPricing from "./SponsorshipPricing.jsx";
import Sponsors from "./Sponsors.jsx";
import SponsorBanner from "./SponsorBanner.jsx";

function Home() {
    return (
        <div className="min-h-screen bg-gray-800">
            <SponsorBanner />
            <Sponsors />
            <SponsorshipPricing />
        </div>
    )
}

export default Home