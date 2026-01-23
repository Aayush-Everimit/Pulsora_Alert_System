# Pulsora – AI-Powered Disaster Management System  

**Pulsora** is an intelligent disaster management and response platform built with **Spring Boot**, **Gemini AI**, and **JWT-secured microservices**.  
It enables communities to track disasters, collect on-ground feedback, and receive **personalized AI-driven safety guidance**, all visualized on an interactive **map interface**.  

---

###Overview  

Pulsora bridges **human input** and **AI intelligence** to transform disaster reporting into actionable insights.  
Users report events, share experiences, and get **Gemini-powered recommendations** that adapt to their situation and location.

---

##  Core Features  

### User Management  
- Secure signup/login with **JWT Authentication**  
- Track users by **location** for proximity alerts  
- Auto-update last active time  

---

### Disaster Event Management  
- Register and track disaster events (Earthquake, Flood, etc.)  
- Manage severity: `LOW`, `MEDIUM`, `HIGH`  
- Manage status: `REPORTED`, `CONFIRMED`, `RESOLVED`  
- Auto-generated timestamps for events  

---

### Two-Way User Response System  
- Users submit responses: `FELT`, `NOT_FELT`, `NO_RESPONSE`  
- Add custom descriptions of personal experiences  
- Each response links to a **User** and a **Disaster Event**  
- Enables **contextual AI analysis**  

---

### Gemini AI Analysis Engine  
Pulsora integrates the **Gemini 1.5-Pro API** to analyze user responses and event data.  
The AI generates:
-  **Aggregate summary** of the event  
-  **Recommended safety actions** for each user  

#### How It Works:
1. Auto detect any unusual experiences and diisasters by the help of APIs from different sources.
2. An initial notification is generated to the users in proximity about the ground reality and user's situations.
3. User reports disaster experience along with some description of his/her situation
4. Pulsora builds a detailed prompt with event + user data 
5. Gemini API processes and returns a text response (safety roadmap)
6. AI response is saved to the database and sent as a **Phase-II Notification**

**Example Prompt:**
```text
You are an AI disaster support assistant.
Generate a short personalized response for the user, including:
1. A concise summary of their situation.
2. A clear recommended action for their safety.
