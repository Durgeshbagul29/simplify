// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Video popup functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get the video section by its ID
    const videoSection = document.getElementById('videoSection');
    const videoPopup = document.getElementById('videoPopup');
    const closePopup = document.getElementById('closePopup');
    const popupVideo = document.getElementById('popupVideo');

    if (videoSection && videoPopup && closePopup && popupVideo) {
        // Open popup when video section is clicked
        videoSection.addEventListener('click', (e) => {
            // Prevent opening popup when clicking on links or buttons within the section
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                e.preventDefault();
                videoPopup.classList.add('active');
                // Play the video when popup opens
                popupVideo.play().catch(error => {
                    console.log('Video play failed:', error);
                });
            }
        });

        // Close popup when close button is clicked
        closePopup.addEventListener('click', () => {
            videoPopup.classList.remove('active');
            popupVideo.pause();
            popupVideo.currentTime = 0;
        });

        // Close popup when clicking outside the video
        videoPopup.addEventListener('click', (e) => {
            if (e.target === videoPopup) {
                videoPopup.classList.remove('active');
                popupVideo.pause();
                popupVideo.currentTime = 0;
            }
        });

        // Close popup with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoPopup.classList.contains('active')) {
                videoPopup.classList.remove('active');
                popupVideo.pause();
                popupVideo.currentTime = 0;
            }
        });
    }
});

// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Toggle menu on click
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .step, .stat-item, .benefit, .contact-info, .contact-form, .app-content, .app-image');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element, target) => {
    let count = 0;
    const increment = target / 100;

    const updateCount = () => {
        if (count < target) {
            count += increment;
            element.innerText = Math.ceil(count);
            setTimeout(updateCount, 20);
        } else {
            element.innerText = target;
        }
    };

    updateCount();
};

// Trigger counter animation when stats section is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            // Stop observing after animation
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats section
const statsSection = document.querySelector('.stats-container');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (name && email && message) {
            // In a real application, you would send the form data to a server here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations for elements already in view
document.addEventListener('DOMContentLoaded', () => {
    // Trigger animations for elements already in view
    const elements = document.querySelectorAll('[class*="animate-"]');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Element is in view
            element.style.animationDelay = '0s';
        }
    });
});

// Show/hide button on scroll
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {       // Show after 300px
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
});

// Scroll to top on click
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"             // Smooth scrolling
    });
});

// Chat Bot Functionality
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {

        // ====== DOM Elements ======
        const chatBotBtn = document.getElementById('chatBotBtn');
        const chatBotPopup = document.getElementById('chatBotPopup');
        const closeChatBtn = document.getElementById('closeChatBtn');
        const chatInput = document.getElementById('chatInput');
        const sendChatBtn = document.getElementById('sendChatBtn');
        const chatMessages = document.getElementById('chatMessages');

        if (!chatBotBtn || !chatBotPopup || !closeChatBtn || !chatInput || !sendChatBtn || !chatMessages) {
            console.error("Chat elements missing in DOM");
            return;
        }

        // ====== GOOGLE SHEET URL ======
        const GOOGLE_WEB_APP = "https://script.google.com/macros/s/AKfycbw-FJHuxcPgJdgEGUNW4JkUqPmN23AylvWydBW9CBDTptIWcZrPvLYQRhmK47QVQsIZ/exec";

        // ====== USER DATA ======
        let userData = { name: "", phone: "", email: "", apps: [], collected: false, timestamp: null };
        let collectionStep = 0;
        let userDataStored = false; // Flag to track if user data has been stored in Google Sheets
        
        // Check if user data exists in localStorage
        const savedUserData = localStorage.getItem('samplifyUserData');
        if (savedUserData) {
            userData = JSON.parse(savedUserData);
            if (userData.collected) {
                collectionStep = 3; // Skip data collection if already collected
                // Check if data was already stored in Google Sheets
                userDataStored = userData.storedInSheets || false;
            }
        }
        
        // Log initialization for debugging
        console.log('Chatbot initialized with user data:', userData);

        // ====== OPEN CHAT ======
        chatBotBtn.addEventListener("click", () => {
            chatBotPopup.classList.toggle("active");

            // Only show welcome message if no messages exist (first time opening chat)
            if (chatMessages.children.length === 0) {
                if (userData.collected) {
                    // User data already collected, greet with name
                    addMessage(`Hello ${userData.name}! How can I assist you today?`, "bot");
                } else {
                    // Need to collect user data
                    addMessage("Hello! I'm your Samplify assistant. To better assist you, I'll need to collect some basic information first. Please tell me your name.", "bot");
                }
            }
        });

        // ====== CLOSE CHAT ======
        closeChatBtn.addEventListener("click", () => chatBotPopup.classList.remove("active"));

        // ====== SEND MESSAGE ======
        function sendMessage() {
            const msg = chatInput.value.trim();
            if (!msg) return;

            addMessage(msg, "user");
            console.log("User Input ➜", msg);

            chatInput.value = "";

            if (!userData.collected) {
                collectUserInfo(msg);
            } else {
                processWithGemini(msg);
                storeChat("user", msg);
            }
        }

        sendChatBtn.addEventListener("click", sendMessage);
        chatInput.addEventListener("keypress", e => e.key === "Enter" ? sendMessage() : null);

        // ====== VALIDATION FUNCTIONS ======
        function isValidPhoneNumber(phone) {
            // Remove all non-digit characters
            const cleaned = phone.replace(/\D/g, '');
            // Check if it's exactly 10 digits or 11 digits starting with 1
            return (cleaned.length === 10 && /^\d{10}$/.test(cleaned)) || 
                   (cleaned.length === 11 && /^1\d{10}$/.test(cleaned));
        }

        function isValidEmail(email) {
            // More comprehensive email validation regex
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return emailRegex.test(email);
        }

        // ====== COLLECT USER INFORMATION ======
        function collectUserInfo(msg) {
            if (collectionStep === 0) {
                userData.name = msg;
                collectionStep++;
                addMessage("Thanks " + userData.name + "! Please enter your phone number.", "bot");
            }

            else if (collectionStep === 1) {
                // Validate phone number
                if (!isValidPhoneNumber(msg)) {
                    addMessage("Please enter a valid 10-digit phone number (e.g., 1234567890).", "bot");
                    return;
                }
                userData.phone = msg;
                collectionStep++;
                addMessage("Great! Now share your email address.", "bot");
            }

            else if (collectionStep === 2) {
                // Validate email address
                if (!isValidEmail(msg)) {
                    addMessage("Please enter a valid email address (e.g., user@example.com).", "bot");
                    return;
                }
                userData.email = msg;
                collectionStep++;
                
                // Create checkbox options message
                const optionsMessage = document.createElement("div");
                optionsMessage.className = "message bot-message";
                optionsMessage.innerHTML = `
                    <p>Thanks for providing your information! Which of our apps are you interested in?</p>
                    <div style="margin-top: 10px;">
                        <label style="display: block; margin: 5px 0;">
                            <input type="checkbox" id="samplifyApp" value="Samplify App" style="margin-right: 8px;"> 
                            1. Samplify App
                        </label>
                        <label style="display: block; margin: 5px 0;">
                            <input type="checkbox" id="noiseMapApp" value="Noise Map App" style="margin-right: 8px;">
                            2. Noise Map App
                        </label>
                        <button id="submitApps" style="margin-top: 10px; padding: 8px 15px; background: #2363d5; color: white; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
                    </div>
                `;
                
                chatMessages.appendChild(optionsMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Add event listener for the submit button
                setTimeout(() => {
                    const submitBtn = document.getElementById("submitApps");
                    if (submitBtn) {
                        submitBtn.addEventListener("click", handleAppSelection);
                    }
                }, 100);
            }
        }

        // ====== HANDLE APP SELECTION ======
        function handleAppSelection() {
            const samplifyApp = document.getElementById("samplifyApp");
            const noiseMapApp = document.getElementById("noiseMapApp");
            
            const selectedApps = [];
            if (samplifyApp.checked) selectedApps.push(samplifyApp.value);
            if (noiseMapApp.checked) selectedApps.push(noiseMapApp.value);
            
            // Store selected apps in userData
            userData.apps = selectedApps;
            userData.collected = true;
            
            // Set timestamp only once when user data is first collected
            if (!userData.timestamp) {
                userData.timestamp = new Date().toISOString();
            }
            
            // Save to localStorage
            localStorage.setItem('samplifyUserData', JSON.stringify(userData));
            
            // Remove the options message
            const optionsMessage = document.querySelector('.bot-message:last-child');
            if (optionsMessage) optionsMessage.remove();
            
            // Add confirmation message
            let confirmationText = "Your information is saved!";
            if (selectedApps.length > 0) {
                confirmationText += " You've selected: " + selectedApps.join(", ") + ".";
            } else {
                confirmationText += " No apps selected.";
            }
            confirmationText += " How can I assist you today?";
            
            addMessage(confirmationText, "bot");
            console.log("User Data Collected ➜", userData);
            
            // Update the data being sent to Google Sheets to include apps (only once)
            if (!userDataStored) {
                storeUserDataWithApps(userData);
                userDataStored = true; // Mark as stored
                // Also mark in userData object and save to localStorage
                userData.storedInSheets = true;
                localStorage.setItem('samplifyUserData', JSON.stringify(userData));
            }
        }

        // ====== ADD MESSAGE TO CHAT ======
        function addMessage(text, sender) {
            const msgDiv = document.createElement("div");
            msgDiv.className = `message ${sender}-message`;
            
            // Format the message content for better readability
            if (sender === "bot") {
                // For bot messages, preserve line breaks and format lists
                const formattedText = text
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/^- (.*?)(?=\n|$)/gm, '• $1');
                msgDiv.innerHTML = formattedText;
            } else {
                // For user messages, escape HTML and preserve line breaks
                msgDiv.textContent = text;
            }

            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            console.log(sender.toUpperCase() + " Output ➜", text);
        }

        // ====== GEMINI API INTEGRATION WITH GOOGLE DOCS ======
        async function processWithGemini(userMsg) {
            try {
                // Show typing indicator
                const typingIndicator = document.createElement("div");
                typingIndicator.className = "message bot-message typing-indicator";
                typingIndicator.textContent = "...";
                chatMessages.appendChild(typingIndicator);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Get response from enhanced Gemini API with Google Docs knowledge
                console.log('Processing user message with enhanced Gemini:', userMsg);
                const botReply = await getEnhancedGeminiResponse(userMsg, userData);
                
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);
                
                // Log the response for debugging
                console.log('Enhanced Gemini response:', botReply);
                
                addMessage(botReply, "bot");
                storeChat("bot", botReply);
            } catch (error) {
                console.error("Enhanced Gemini API Error:", error);
                
                // Remove typing indicator
                const typingIndicators = chatMessages.querySelectorAll(".typing-indicator");
                typingIndicators.forEach(indicator => indicator.remove());
                
                // Show error message to user
                addMessage("I'm having trouble accessing my knowledge base right now. Let me try to answer based on my general knowledge.", "bot");
                
                // Fallback to standard Gemini API
                try {
                    const fallbackReply = await getGeminiResponse(userMsg, userData);
                    addMessage(fallbackReply, "bot");
                    storeChat("bot", fallbackReply);
                } catch (fallbackError) {
                    console.error("Fallback Gemini API Error:", fallbackError);
                    // Final fallback to rule-based response
                    const finalFallbackReply = getBotReply(userMsg);
                    addMessage(finalFallbackReply, "bot");
                    storeChat("bot", finalFallbackReply);
                }
            }
        }

        function getBotReply(msg) {
            msg = msg.toLowerCase();

            if (msg.includes("hello") || msg.includes("hi")) return "Hi! How can I assist you?";
            if (msg.includes("noise")) return "Noise Map App detects sound levels with accuracy.";
            if (msg.includes("water") || msg.includes("air")) return "Samplify supports air & water testing.";
            if (msg.includes("download")) return "You can download our app from Google Play Store.";
            if (msg.includes("contact")) return "Contact us at support@Abraca-Dabra.com";

            return "Thank you for your message! How else can I help?";
        }

        // ====== STORE USER DETAILS IN GOOGLE SHEET ======
        async function storeUserData(data) {
            const body = `type=user&name=${encodeURIComponent(data.name)}&phone=${encodeURIComponent(data.phone)}&email=${encodeURIComponent(data.email)}`;

            console.log("Sending User Data to Google Sheet ➜", body);

            fetch(GOOGLE_WEB_APP, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body
            }).then(() => {
                console.log("User Data Saved ✔");
            }).catch(err => console.error("Sheet Error:", err));
        }

        // ====== STORE USER DETAILS WITH APPS IN GOOGLE SHEET ======
        async function storeUserDataWithApps(data) {
            const apps = data.apps ? data.apps.join(", ") : "";
            const timestamp = data.timestamp ? data.timestamp : new Date().toISOString();
            const body = `type=user&name=${encodeURIComponent(data.name)}&phone=${encodeURIComponent(data.phone)}&email=${encodeURIComponent(data.email)}&apps=${encodeURIComponent(apps)}&timestamp=${encodeURIComponent(timestamp)}`;

            console.log("Sending User Data with Apps to Google Sheet ➜", body);

            fetch(GOOGLE_WEB_APP, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body
            }).then(() => {
                console.log("User Data with Apps Saved ✔");
            }).catch(err => console.error("Sheet Error:", err));
        }

        // ====== STORE CHAT IN GOOGLE SHEET ======
        function storeChat(sender, text) {
            const body = `type=chat&sender=${encodeURIComponent(sender)}&message=${encodeURIComponent(text)}`;

            console.log("Saving Chat Message ➜", body);

            fetch(GOOGLE_WEB_APP, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body
            }).then(() => {
                console.log("Chat Message Saved ✔");
            }).catch(err => console.error("Sheet Error:", err));
        }
        
        // ====== CLEAR USER DATA FROM LOCALSTORAGE ======
        function clearUserData() {
            localStorage.removeItem('samplifyUserData');
            userData = { name: "", phone: "", email: "", apps: [], collected: false, timestamp: null, storedInSheets: false };
            collectionStep = 0;
            userDataStored = false; // Reset the flag
            console.log("User data cleared from localStorage");
        }
        
        // Expose clearUserData function globally for testing purposes
        window.clearSamplifyUserData = clearUserData;
        


    }, 100);
});


// Protection against inspection and image saving
// (function () {
//     // Disable right-click context menu
//     document.addEventListener('contextmenu', function (e) {
//         e.preventDefault();
//         return false;
//     });

//     // Disable common keyboard shortcuts for developer tools
//     document.addEventListener('keydown', function (e) {
//         // F12 key
//         if (e.keyCode === 123) {
//             e.preventDefault();
//             return false;
//         }

//         // Ctrl+Shift+I
//         if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
//             e.preventDefault();
//             return false;
//         }

//         // Ctrl+Shift+J
//         if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
//             e.preventDefault();
//             return false;
//         }

//         // Ctrl+U (view source)
//         if (e.ctrlKey && e.keyCode === 85) {
//             e.preventDefault();
//             return false;
//         }

//         // Ctrl+S (save page)
//         if (e.ctrlKey && e.keyCode === 83) {
//             e.preventDefault();
//             return false;
//         }

//         // Ctrl+Shift+C (inspect element)
//         if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
//             e.preventDefault();
//             return false;
//         }
//     });

//     // Disable image drag and drop
//     document.addEventListener('dragstart', function (e) {
//         if (e.target.tagName === 'IMG') {
//             e.preventDefault();
//             return false;
//         }
//     });

//     // Additional protection against screenshot tools
//     let devtools = {
//         open: false,
//         orientation: null
//     };

//     const threshold = 160;

//     setInterval(() => {
//         if (window.outerHeight - window.innerHeight > threshold ||
//             window.outerWidth - window.innerWidth > threshold) {
//             if (!devtools.open) {
//                 devtools.open = true;
//                 // Optionally redirect or show a message
//                 // window.location.href = 'about:blank';
//             }
//         } else {
//             devtools.open = false;
//         }
//     }, 500);

//     // Disable selection of text
//     document.addEventListener('selectstart', function (e) {
//         e.preventDefault();
//         return false;
//     });

//     // Disable dragging of elements
//     document.addEventListener('dragstart', function (e) {
//         e.preventDefault();
//         return false;
//     });
// })();

// FAQ Section Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Add click event listeners to FAQ questions
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });
});
