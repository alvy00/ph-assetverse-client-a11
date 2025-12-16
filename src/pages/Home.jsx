import AboutSection from "../components/AboutSection/AboutSection";
import ExtraSection from "../components/ExtraSections/ExtraSection";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import PackageSection from "../components/PackageSection/PackageSection";
import TestimonialSection from "../components/TestimonialSection/TestimonialSection";

const Home = () => {
    return (
        <div className="flex flex-col gap-10">
            {/* Full-width HeroBanner */}
            <HeroBanner />

            {/* Constrained sections */}
            <div className="flex flex-col gap-10 w-11/12 mx-auto">
                <AboutSection />
                <PackageSection />
                <FeaturesSection />
                <TestimonialSection />
                <ExtraSection />
            </div>
        </div>
    );
};

export default Home;
