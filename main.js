// Main JavaScript for V P G Ayurveda Hospital Website
// Interactive components and animations

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeTreatmentQuiz();
    initializeMarmaMap();
    initializePanchakarmaBuilder();
    initializeBookingSystem();
    initializeScrollEffects();
});

// Animation initialization using Anime.js
function initializeAnimations() {
    // Hero text animation
    anime({
        targets: '.hero-title',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 300
    });

    // Hero subtitle animation
    anime({
        targets: '.hero-subtitle',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 600
    });

    // CTA button animation
    anime({
        targets: '.hero-cta',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutBack',
        delay: 900
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (target.classList.contains('fade-up')) {
                    anime({
                        targets: target,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }
                
                if (target.classList.contains('slide-left')) {
                    anime({
                        targets: target,
                        translateX: [-50, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                }
                
                if (target.classList.contains('scale-in')) {
                    anime({
                        targets: target,
                        scale: [0.8, 1],
                        opacity: [0, 1],
                        duration: 600,
                        easing: 'easeOutBack'
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-up, .slide-left, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// Treatment Quiz System
function initializeTreatmentQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    const questions = [
        {
            id: 1,
            question: "What is your primary health concern?",
            options: [
                { text: "Chronic pain & joint issues", value: "pain", treatments: ["kalari-marma", "panchakarma"] },
                { text: "Stress & anxiety", value: "stress", treatments: ["shirodhara", "meditation"] },
                { text: "Digestive problems", value: "digestion", treatments: ["panchakarma", "herbal"] },
                { text: "Skin conditions", value: "skin", treatments: ["herbal", "detox"] },
                { text: "General wellness", value: "wellness", treatments: ["rejuvenation", "yoga"] }
            ]
        },
        {
            id: 2,
            question: "How long have you been experiencing these issues?",
            options: [
                { text: "Less than 3 months", value: "recent" },
                { text: "3-12 months", value: "moderate" },
                { text: "1-5 years", value: "chronic" },
                { text: "More than 5 years", value: "longterm" }
            ]
        },
        {
            id: 3,
            question: "What is your preferred treatment intensity?",
            options: [
                { text: "Gentle & relaxing", value: "gentle" },
                { text: "Moderate intensity", value: "moderate" },
                { text: "Intensive therapy", value: "intensive" },
                { text: "Customized approach", value: "custom" }
            ]
        },
        {
            id: 4,
            question: "How much time can you dedicate to treatment?",
            options: [
                { text: "1-3 days", value: "short" },
                { text: "1 week", value: "week" },
                { text: "2-4 weeks", value: "extended" },
                { text: "Ongoing maintenance", value: "maintenance" }
            ]
        }
    ];

    let currentQuestion = 0;
    let answers = {};

    function renderQuestion() {
        const question = questions[currentQuestion];
        quizContainer.innerHTML = `
            <div class="quiz-card bg-white rounded-2xl p-8 shadow-lg">
                <div class="quiz-progress mb-6">
                    <div class="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Question ${currentQuestion + 1} of ${questions.length}</span>
                        <span>${Math.round(((currentQuestion) / questions.length) * 100)}% Complete</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] h-2 rounded-full transition-all duration-500" 
                             style="width: ${((currentQuestion) / questions.length) * 100}%"></div>
                    </div>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-800 mb-6">${question.question}</h3>
                
                <div class="options-grid grid gap-4 mb-8">
                    ${question.options.map((option, index) => `
                        <button class="option-btn p-4 border-2 border-gray-200 rounded-xl hover:border-[#2B4A3E] hover:bg-[#F3ECD8] transition-all duration-300 text-left"
                                data-value="${option.value}" data-index="${index}">
                            <span class="font-medium text-gray-800">${option.text}</span>
                        </button>
                    `).join('')}
                </div>
                
                <div class="quiz-navigation flex justify-between">
                    <button id="prev-btn" class="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${currentQuestion === 0 ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    <button id="next-btn" class="px-6 py-3 bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] text-white rounded hover:shadow-lg transition-all duration-300 opacity-50 cursor-not-allowed" disabled>
                        ${currentQuestion === questions.length - 1 ? 'Get Results' : 'Next →'}
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove previous selection
                document.querySelectorAll('.option-btn').forEach(b => {
                    b.classList.remove('border-[#2B4A3E]', 'bg-[#F3ECD8]');
                });
                
                // Add selection to clicked button
                this.classList.add('border-[#2B4A3E]', 'bg-[#F3ECD8]');
                
                // Store answer
                answers[question.id] = {
                    value: this.dataset.value,
                    option: question.options[this.dataset.index]
                };
                
                // Enable next button
                const nextBtn = document.getElementById('next-btn');
                nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                nextBtn.disabled = false;
            });
        });

        document.getElementById('prev-btn')?.addEventListener('click', () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                renderQuestion();
            }
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                renderQuestion();
            } else {
                showResults();
            }
        });
    }

    function showResults() {
        const recommendations = generateRecommendations();
        quizContainer.innerHTML = `
            <div class="results-card bg-white rounded-2xl p-8 shadow-lg">
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-3xl font-bold text-gray-800 mb-2">Your Personalized Treatment Plan</h3>
                    <p class="text-gray-600">Based on your responses, we recommend these treatments:</p>
                </div>
                
                <div class="recommendations space-y-6 mb-8">
                    ${recommendations.map(rec => `
                        <div class="recommendation-card p-6 border-2 border-[#D8C89A] rounded-xl bg-[#F3ECD8]">
                            <div class="flex items-start space-x-4">
                                <div class="w-12 h-12 bg-[#2B4A3E] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span class="text-white font-bold">${rec.title.charAt(0)}</span>
                                </div>
                                <div class="flex-1">
                                    <h4 class="text-xl font-bold text-gray-800 mb-2">${rec.title}</h4>
                                    <p class="text-gray-600 mb-3">${rec.description}</p>
                                    <div class="flex flex-wrap gap-2">
                                        ${rec.benefits.map(benefit => `
                                            <span class="px-3 py-1 bg-white text-[#2B4A3E] rounded-full text-sm font-medium">${benefit}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="text-center">
                    <button onclick="window.location.href='contact.html'" class="px-8 py-4 bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] text-white rounded hover:shadow-lg transition-all duration-300 font-medium">
                        Book Consultation Now
                    </button>
                    <button onclick="location.reload()" class="ml-4 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-all duration-300 font-medium">
                        Retake Quiz
                    </button>
                </div>
            </div>
        `;
    }

    function generateRecommendations() {
        const primaryConcern = answers[1]?.option;
        const recommendations = [];

        if (primaryConcern?.treatments) {
            if (primaryConcern.treatments.includes('kalari-marma')) {
                recommendations.push({
                    title: 'Kalari Marma Therapy',
                    description: 'Ancient healing technique targeting 108 vital energy points to restore balance and relieve chronic pain.',
                    benefits: ['Pain Relief', 'Energy Balance', 'Improved Mobility', 'Stress Reduction']
                });
            }
            if (primaryConcern.treatments.includes('panchakarma')) {
                recommendations.push({
                    title: 'Panchakarma Detox',
                    description: 'Comprehensive 5-action detoxification therapy to cleanse toxins and restore dosha balance.',
                    benefits: ['Deep Cleansing', 'Improved Digestion', 'Better Sleep', 'Enhanced Immunity']
                });
            }
        }

        // Default recommendations
        if (recommendations.length === 0) {
            recommendations.push({
                title: 'Rejuvenation Therapy',
                description: 'Holistic wellness program combining traditional Ayurvedic treatments for overall health improvement.',
                benefits: ['Stress Relief', 'Better Sleep', 'Increased Energy', 'Mental Clarity']
            });
        }

        return recommendations;
    }

    // Start the quiz
    renderQuestion();
}

// Interactive Kalari Marma Body Map
function initializeMarmaMap() {
    const marmaMap = document.getElementById('marma-map');
    if (!marmaMap) return;

    const marmaPoints = [
        { id: 1, name: 'Adhipati', location: 'head', benefits: ['Mental clarity', 'Headache relief', 'Stress reduction'], x: 50, y: 15 },
        { id: 2, name: 'Krikatika', location: 'neck', benefits: ['Neck pain relief', 'Improved circulation', 'Tension release'], x: 50, y: 25 },
        { id: 3, name: 'Hridaya', location: 'chest', benefits: ['Heart health', 'Emotional balance', 'Respiratory support'], x: 50, y: 40 },
        { id: 4, name: 'Nabhi', location: 'abdomen', benefits: ['Digestive health', 'Core strength', 'Energy center'], x: 50, y: 50 },
        { id: 5, name: 'Basti', location: 'lower_back', benefits: ['Lower back pain', 'Kidney support', 'Vitality'], x: 50, y: 65 },
        { id: 6, name: 'Janu', location: 'knee', benefits: ['Knee pain', 'Joint mobility', 'Leg strength'], x: 40, y: 75 },
        { id: 7, name: 'Kurcha', location: 'ankle', benefits: ['Ankle stability', 'Foot pain', 'Balance'], x: 45, y: 90 },
        { id: 8, name: 'Kshipra', location: 'hand', benefits: ['Hand flexibility', 'Wrist pain', 'Fine motor skills'], x: 35, y: 55 }
    ];

    // Create SVG body outline
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('class', 'w-full h-full');
    
    // Simple body outline
    const bodyPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bodyPath.setAttribute('d', 'M50 10 C45 10 40 15 40 20 L40 35 C35 35 30 40 30 45 L30 70 C30 75 35 80 40 80 L40 90 C40 95 45 100 50 100 C55 100 60 95 60 90 L60 80 C65 80 70 75 70 70 L70 45 C70 40 65 35 60 35 L60 20 C60 15 55 10 50 10 M30 25 C25 25 20 30 20 35 M70 25 C75 25 80 30 80 35 M40 50 L35 55 M60 50 L65 55');
    bodyPath.setAttribute('fill', 'none');
    bodyPath.setAttribute('stroke', '#C9BFA4');
    bodyPath.setAttribute('stroke-width', '2');
    svg.appendChild(bodyPath);

    // Add Marma points
    marmaPoints.forEach(point => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', '2');
        circle.setAttribute('fill', '#A9822F');
        circle.setAttribute('class', 'cursor-pointer hover:fill-[#2B4A3E] transition-colors duration-300');
        circle.setAttribute('data-point-id', point.id);
        
        // Add hover effects
        circle.addEventListener('mouseenter', function() {
            showMarmaTooltip(point, this);
        });
        
        circle.addEventListener('mouseleave', function() {
            hideMarmaTooltip();
        });
        
        circle.addEventListener('click', function() {
            showMarmaDetails(point);
        });
        
        svg.appendChild(circle);
    });

    marmaMap.appendChild(svg);

    // Tooltip functionality
    let tooltip = null;

    function showMarmaTooltip(point, element) {
        tooltip = document.createElement('div');
        tooltip.className = 'marma-tooltip absolute bg-white border border-[#D8C89A] rounded-lg p-3 shadow-lg z-10 min-w-48';
        tooltip.innerHTML = `
            <h4 class="font-bold text-gray-800 mb-2">${point.name}</h4>
            <p class="text-sm text-gray-600 mb-2">Location: ${point.location.replace('_', ' ')}</p>
            <div class="text-xs text-gray-500">
                ${point.benefits.map(benefit => `<span class="inline-block bg-[#E8DCB8] text-[#2B4A3E] px-2 py-1 rounded mr-1 mb-1">${benefit}</span>`).join('')}
            </div>
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    }

    function hideMarmaTooltip() {
        if (tooltip) {
            tooltip.remove();
            tooltip = null;
        }
    }

    function showMarmaDetails(point) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-md mx-4 relative">
                <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-white font-bold text-xl">${point.name.charAt(0)}</span>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">${point.name} Marma Point</h3>
                    <p class="text-gray-600">Vital energy center located at ${point.location.replace('_', ' ')}</p>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-2">Benefits:</h4>
                        <ul class="space-y-1">
                            ${point.benefits.map(benefit => `<li class="flex items-center text-gray-600"><span class="w-2 h-2 bg-[#A9822F] rounded-full mr-2"></span>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="text-center pt-4">
                        <button onclick="window.location.href='contact.html'" class="px-6 py-3 bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] text-white rounded hover:shadow-lg transition-all duration-300">
                            Book Treatment
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Panchakarma Program Builder
function initializePanchakarmaBuilder() {
    const builder = document.getElementById('panchakarma-builder');
    if (!builder) return;

    const programs = {
        '7-day': {
            title: '7-Day Rejuvenation Program',
            duration: 7,
            price: '₹35,000',
            description: 'Perfect introduction to Panchakarma with essential treatments',
            schedule: [
                { day: 1, activities: ['Consultation', 'Preparation diet', 'Oil massage'], meals: ['Khichdi', 'Herbal tea'] },
                { day: 2, activities: ['Vamana therapy', 'Rest', 'Light yoga'], meals: ['Light soup', 'Rice water'] },
                { day: 3, activities: ['Virechana therapy', 'Monitoring', 'Rest'], meals: ['Boiled vegetables', 'Buttermilk'] },
                { day: 4, activities: ['Basti treatment', 'Abhyanga massage', 'Steam'], meals: ['Khichdi', 'Herbal water'] },
                { day: 5, activities: ['Nasya treatment', 'Shirodhara', 'Meditation'], meals: ['Light meals', 'Herbal tea'] },
                { day: 6, activities: ['Raktamokshana', 'Body massage', 'Rest'], meals: ['Balanced diet', 'Fresh juices'] },
                { day: 7, activities: ['Final consultation', 'Diet planning', 'Yoga'], meals: ['Normal Ayurvedic meals'] }
            ]
        },
        '14-day': {
            title: '14-Day Intensive Detox',
            duration: 14,
            price: '₹65,000',
            description: 'Comprehensive detoxification with extended treatments',
            schedule: [
                { day: 1, activities: ['Detailed consultation', 'Body analysis', 'Preparation'], meals: ['Detox diet', 'Herbal drinks'] },
                { day: 2, activities: ['Snehapana', 'Light massage', 'Rest'], meals: ['Ghee preparation', 'Warm water'] },
                { day: 3, activities: ['Snehapana continues', 'Monitoring', 'Yoga'], meals: ['Medicated ghee', 'Herbal tea'] },
                { day: 4, activities: ['Swedana', 'Oil massage', 'Steam therapy'], meals: ['Light meals', 'Detox drinks'] },
                { day: 5, activities: ['Vamana therapy', 'Post-therapy care', 'Rest'], meals: ['Special diet', 'Warm water'] },
                { day: 6, activities: ['Recovery day', 'Light treatments', 'Meditation'], meals: ['Gradual diet', 'Herbal supplements'] },
                { day: 7, activities: ['Virechana preparation', 'Diet modification', 'Massage'], meals: ['Preparation diet', 'Medicated water'] },
                { day: 8, activities: ['Virechana therapy', 'Monitoring', 'Rest'], meals: ['Liquid diet', 'Electrolytes'] },
                { day: 9, activities: ['Recovery treatments', 'Gentle yoga', 'Massage'], meals: ['Light solids', 'Herbal teas'] },
                { day: 10, activities: ['Basti treatments', 'Abhyanga', 'Steam'], meals: ['Specific diet', 'Buttermilk'] },
                { day: 11, activities: ['Basti continues', 'Body treatments', 'Rest'], meals: ['Medicated meals', 'Herbal drinks'] },
                { day: 12, activities: ['Nasya therapy', 'Shirodhara', 'Meditation'], meals: ['Balanced diet', 'Fresh juices'] },
                { day: 13, activities: ['Raktamokshana', 'Final treatments', 'Yoga'], meals: ['Normal diet', 'Supplements'] },
                { day: 14, activities: ['Final consultation', 'Diet plan', 'Home program'], meals: ['Regular Ayurvedic meals'] }
            ]
        }
    };

    let selectedProgram = null;

    function renderProgramSelector() {
        builder.innerHTML = `
            <div class="program-selector">
                <div class="text-center mb-8">
                    <h3 class="text-3xl font-bold text-gray-800 mb-4">Choose Your Panchakarma Program</h3>
                    <p class="text-gray-600">Select the duration that best fits your health goals and schedule</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    ${Object.entries(programs).map(([key, program]) => `
                        <div class="program-card p-6 border-2 border-gray-200 rounded-2xl hover:border-[#2B4A3E] transition-all duration-300 cursor-pointer" data-program="${key}">
                            <div class="text-center mb-4">
                                <div class="w-16 h-16 bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span class="text-white font-bold text-xl">${program.duration}</span>
                                </div>
                                <h4 class="text-2xl font-bold text-gray-800 mb-2">${program.title}</h4>
                                <p class="text-gray-600 mb-4">${program.description}</p>
                                <div class="text-3xl font-bold text-[#2B4A3E] mb-4">${program.price}</div>
                            </div>
                            
                            <div class="space-y-2">
                                <div class="flex items-center text-gray-600">
                                    <svg class="w-5 h-5 text-[#2B4A3E] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    ${program.duration} days comprehensive treatment
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <svg class="w-5 h-5 text-[#2B4A3E] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Personalized diet plan
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <svg class="w-5 h-5 text-[#2B4A3E] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Expert consultation
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <svg class="w-5 h-5 text-[#2B4A3E] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Follow-up support
                                </div>
                            </div>
                            
                            <button class="w-full mt-6 py-3 bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] text-white rounded hover:shadow-lg transition-all duration-300">
                                Select Program
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Add event listeners
        document.querySelectorAll('.program-card').forEach(card => {
            card.addEventListener('click', function() {
                const programKey = this.dataset.program;
                selectedProgram = programs[programKey];
                renderProgramDetails();
            });
        });
    }

    function renderProgramDetails() {
        builder.innerHTML = `
            <div class="program-details">
                <div class="flex items-center justify-between mb-8">
                    <button onclick="renderProgramSelector()" class="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back to Programs
                    </button>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-[#2B4A3E]">${selectedProgram.price}</div>
                        <div class="text-sm text-gray-600">${selectedProgram.duration} days</div>
                    </div>
                </div>
                
                <div class="text-center mb-8">
                    <h3 class="text-3xl font-bold text-gray-800 mb-2">${selectedProgram.title}</h3>
                    <p class="text-gray-600">${selectedProgram.description}</p>
                </div>
                
                <div class="schedule-timeline">
                    <h4 class="text-xl font-bold text-gray-800 mb-6">Daily Schedule</h4>
                    <div class="space-y-4">
                        ${selectedProgram.schedule.map((day, index) => `
                            <div class="day-card p-6 border border-gray-200 rounded-xl hover:border-[#D8C89A] transition-colors">
                                <div class="flex items-start space-x-4">
                                    <div class="w-12 h-12 bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span class="text-white font-bold">${index + 1}</span>
                                    </div>
                                    <div class="flex-1">
                                        <h5 class="font-bold text-gray-800 mb-2">Day ${index + 1}</h5>
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h6 class="font-medium text-gray-700 mb-1">Activities:</h6>
                                                <ul class="text-sm text-gray-600 space-y-1">
                                                    ${day.activities.map(activity => `<li>• ${activity}</li>`).join('')}
                                                </ul>
                                            </div>
                                            <div>
                                                <h6 class="font-medium text-gray-700 mb-1">Meals:</h6>
                                                <ul class="text-sm text-gray-600 space-y-1">
                                                    ${day.meals.map(meal => `<li>• ${meal}</li>`).join('')}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="text-center mt-8">
                    <button onclick="window.location.href='contact.html'" class="px-8 py-4 bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] text-white rounded hover:shadow-lg transition-all duration-300 font-medium">
                        Book This Program
                    </button>
                </div>
            </div>
        `;
    }

    renderProgramSelector();
}

// Booking System
function initializeBookingSystem() {
    const bookingForm = document.getElementById('booking-form');
    if (!bookingForm) return;

    const doctors = [
        { id: 1, name: 'Dr. V. P. Gopalakrishnan', specialization: 'Kalari Marma & Traditional Ayurveda', experience: '25 years' },
        { id: 2, name: 'Dr. Priya Nair', specialization: 'Panchakarma Specialist', experience: '15 years' },
        { id: 3, name: 'Dr. Arun Kumar', specialization: 'Sports Medicine & Injury Recovery', experience: '12 years' }
    ];

    const treatments = [
        { id: 1, name: 'Kalari Marma Therapy', duration: '60-90 minutes', price: '₹2,500' },
        { id: 2, name: 'Panchakarma Treatment', duration: '2-4 hours', price: '₹5,000' },
        { id: 3, name: 'Rejuvenation Massage', duration: '60 minutes', price: '₹1,800' },
        { id: 4, name: 'Consultation Only', duration: '30 minutes', price: '₹500' }
    ];

    // Populate doctor and treatment selects
    const doctorSelect = bookingForm.querySelector('#doctor');
    const treatmentSelect = bookingForm.querySelector('#treatment');

    if (doctorSelect) {
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = `${doctor.name} - ${doctor.specialization} (${doctor.experience})`;
            doctorSelect.appendChild(option);
        });
    }

    if (treatmentSelect) {
        treatments.forEach(treatment => {
            const option = document.createElement('option');
            option.value = treatment.id;
            option.textContent = `${treatment.name} (${treatment.duration}) - ${treatment.price}`;
            treatmentSelect.appendChild(option);
        });
    }

    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const bookingData = Object.fromEntries(formData.entries());
        
        // Show success message
        showBookingSuccess(bookingData);
    });

    function showBookingSuccess(data) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-md mx-4 relative">
                <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h3>
                    <p class="text-gray-600 mb-6">Your appointment request has been received. Our team will contact you within 24 hours to confirm your appointment.</p>
                    
                    <div class="bg-[#F3ECD8] rounded-xl p-4 mb-6 text-left">
                        <h4 class="font-bold text-gray-800 mb-2">Booking Details:</h4>
                        <p class="text-sm text-gray-600 mb-1"><strong>Name:</strong> ${data.name}</p>
                        <p class="text-sm text-gray-600 mb-1"><strong>Phone:</strong> ${data.phone}</p>
                        <p class="text-sm text-gray-600 mb-1"><strong>Preferred Date:</strong> ${data.date}</p>
                        <p class="text-sm text-gray-600"><strong>Preferred Time:</strong> ${data.time}</p>
                    </div>
                    
                    <button onclick="this.closest('.fixed').remove()" class="px-6 py-3 bg-gradient-to-r from-[#A9822F] to-[#2B4A3E] text-white rounded hover:shadow-lg transition-all duration-300">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Reset form
        bookingForm.reset();
    }
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-bg');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Header background on scroll
    const header = document.querySelector('header');
    if (header) {
        const updateHeader = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 60);
        };
        window.addEventListener('scroll', updateHeader);
        updateHeader();
    }
}

// Utility functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-[#2B4A3E] text-white' : 'bg-[#9A3324] text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export functions for global access
window.showNotification = showNotification;