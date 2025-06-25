import {Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const targetDate = new Date("2025-11-04T00:00:00").getTime()

        const timer = setInterval(() => {
            const now = new Date().getTime()
            const difference = targetDate - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                })
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <section className="py-20 bg-gradient-to-br relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center">
                        <div className="mb-12">
                            <Typography variant="h3" className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Event Countdown
                            </Typography>
                            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
                            {Object.entries(timeLeft).map(([unit, value]) => (
                                <div key={unit} className="group">
                                    <div className="relative">
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 bg-amber-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                                        
                                        {/* Main countdown box */}
                                        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl group-hover:scale-105 transition-all duration-300">
                                            <Typography variant="h2" className="text-3xl md:text-5xl font-black text-amber-400 mb-2">
                                                {value.toString().padStart(2, "0")}
                                            </Typography>
                                            <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50 mb-2"></div>
                                            <Typography className="text-gray-300 font-semibold text-sm md:text-base uppercase tracking-wider">
                                                {unit}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Additional info */}
                        <div className="mt-16">
                            <Typography className="text-gray-400 text-lg mb-4">
                                P2P is a 2-day expo connecting logistics, freight, clearing, import/export and transport professionals in Zimbabwe.
                            </Typography>
                            <div className="flex items-center justify-center gap-4 text-amber-400">
                                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                                <Typography className="text-sm font-medium">November 4, 2025 • Hyatt Regency Harare</Typography>
                                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CountdownTimer