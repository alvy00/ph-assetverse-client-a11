import Typewriter from "typewriter-effect";
import banner from "../../assets/banner.png";

const HeroBanner = () => {
    return (
        <section className="rounded-lg relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden mt-3">
            <img
                className=" w-full h-full object-cover object-center scale-105 transition-transform duration-1000 hover:scale-110"
                src={banner}
                alt="hero section banner"
            />

            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/70 flex flex-col justify-center items-start px-6 md:px-16 lg:px-32 space-y-4">
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
                    AssetVerse
                </h1>

                <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl drop-shadow-md">
                    <Typewriter
                        options={{
                            strings: [
                                `Streamline your company's asset management. Keep track of
                    laptops, chairs, keyboards, and more assigned to the right
                    employees, always.`,
                            ],
                            autoStart: true,
                            loop: true,
                            delay: 50,
                        }}
                    />
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                    <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:-translate-y-1 hover:scale-105">
                        Get Started
                    </button>
                    <button className="cursor-pointer bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:-translate-y-1 hover:scale-105">
                        Learn More
                    </button>
                </div>

                <p className="text-white/80 text-sm md:text-base mt-4 max-w-lg drop-shadow-sm">
                    Trusted by businesses worldwide to simplify HR & asset
                    management.
                </p>
            </div>

            <div className="absolute -bottom-10 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -top-20 left-5 w-60 h-60 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
        </section>
    );
};

export default HeroBanner;
