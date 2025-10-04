"use client"
import React, { useState, useEffect } from 'react';
import {skills} from "@/data/profile"

const SkillsShowcase = () => {
    const [animatedSkills, setAnimatedSkills] = useState([]);

    // انیمیشن لود progress bar
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedSkills(skills);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen  p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* هدر */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Front-end Skills
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Showcasing programming skills and capabilities
                    </p>
                </div>

                {/* Grid مهارت‌ها */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((skill, index) => {
                        const Icon = skill.icon;
                        const isAnimated = animatedSkills.find(s => s.id === skill.id);

                        return (
                            <div
                                key={skill.id}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105"
                                style={{
                                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                                }}
                            >
                                {/* هدر مهارت */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className="p-3 rounded-xl"
                                        style={{
                                            backgroundColor: `${skill.color}20`,
                                            color: skill.color
                                        }}
                                    >
                                        <Icon size={28} strokeWidth={2} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white">
                                            {skill.name}
                                        </h3>
                                    </div>
                                    <div
                                        className="text-2xl font-bold"
                                        style={{ color: skill.color }}
                                    >
                                        {skill.proficiency}%
                                    </div>
                                </div>

                                {/* Progress Bar Container */}
                                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                                    {/* Progress Bar Fill */}
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: isAnimated ? `${skill.proficiency}%` : '0%',
                                            backgroundColor: skill.color,
                                            boxShadow: `0 0 20px ${skill.color}80`
                                        }}
                                    >
                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                    </div>
                                </div>

                                {/* سطح مهارت به صورت متنی */}
                                <div className="mt-3 text-center">
                                    <span className="text-sm text-gray-300">
                                        {skill.proficiency >= 90 ? 'Excellent proficiency' :
                                            skill.proficiency >= 80 ? 'Good proficiency' :
                                                skill.proficiency >= 70 ? 'Average proficiency' : 'Learning'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* آماره‌های کلی */}
                <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-4xl font-bold text-purple-400 mb-2">
                                {skills.length}
                            </div>
                            <div className="text-gray-300">Technology</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-400 mb-2">
                                {Math.round(skills.reduce((acc, skill) => acc + skill.proficiency, 0) / skills.length)}%
                            </div>
                            <div className="text-gray-300">Average proficiency</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-400 mb-2">
                                {skills.filter(s => s.proficiency >= 85).length}
                            </div>
                            <div className="text-gray-300">Advanced skills</div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
        </div>
    );
};

export default SkillsShowcase;