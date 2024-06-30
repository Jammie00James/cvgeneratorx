const { PrismaClient } = require('@prisma/client');
const CustomError = require('../utils/custom-errors')

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.gemini_api_key;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "You are an experienced resume writer. Your job is to help individuals create compelling and professional resumes that effectively showcase their skills, experience, and qualifications to potential employers. You are knowledgeable about various industries and understand what hiring managers are looking for in a candidate. Your task is to ask the right questions to gather all necessary information from the client and then use that information to craft a polished and tailored resume and im your assistant. \ni have asked our candidate a couple of questions about himself, ill provide the conversation transcript for you, I want you to extract all relevant data from this conversation and create a standard CV in json format following this template. TEMPLATE: \n{\n    \"NAME\": \"John Doe\",\n    \"ROLE\": \"Backend Web Developer\",\n    \"about\": \"As a seasoned Backend Developer with over 7 years of experience, I am passionate about creating robust, scalable, and efficient backend systems that drive seamless user experiences. Proficient in Python, Node.js, and Ruby on Rails, I have a proven track record of designing and implementing complex APIs, optimizing database performance, and integrating cloud services such as AWS and Google Cloud. My experience spans across various industries, from tech startups to large enterprises, where I have led backend teams, contributed to open-source projects, and consistently delivered high-quality code. I am eager to bring my expertise, dedication, and enthusiasm for innovative solutions to a forward-thinking company that values excellence and growth.\",\n    \"CONTACT_INFO\": {\n        \"address\": \"1 Oral Creasent of Stadium Road Benin City\",\n        \"phone\": \"234813848740\",\n        \"email\": \"omoeiyekewenjames@gmail.com\",\n        \"githubUrl\": \"https://github/jammie00james\",\n        \"twitter\": \"https://x.com/jammie00james\"\n    },\n    \"SKILLS\": [\n            \"HTML\",\n            \"Javascript\",\n            \"Python\",\n            \"Typescript\",\n            \"express.js\",\n            \"nest.js\",\n            \"django\",\n            \"mysql\",\n            \"postgres\",\n            \"mongodb\"\n    ],\n    \"EXPERIENCE\": [\n        {\n            \"company_name\": \"J Tech Institute\",\n            \"role\": \"Backend Web Developer\",\n            \"duration\": \"MAY, 2020 - DECEMBER 2020\",\n            \"key_achievments\": \"1)Collaborated with the Department Lead to develop the companyss first mobile application backend using Nestjs and Typescript. 2) Led the development and recent launch of company's subscription platform, contributing to its growth and user engagement. Built APIs with Laravel to integrate the digital library, subscription platform, and other applications into a cohesive ecosystem.\"\n        },\n        {\n            \"company_name\": \"J NotTech Organization\",\n            \"role\": \"Lead Backend Web Developer\",\n            \"duration\": \"JANUARY, 2020 - APRIL 2020\",\n            \"key_achievments\": \"1)Collaborated with the Department Lead to develop the companyss first mobile application backend using Nestjs and Typescript. 2) Led the development and recent launch of company's subscription platform, contributing to its growth and user engagement. Built APIs with Laravel to integrate the digital library, subscription platform, and other applications into a cohesive ecosystem.\"\n        }\n    ],\n    \"EDUCATION\": [\n        {\n            \"course\": \"B.sc Taxation\",\n            \"school\": \"University of Benin\",\n            \"duration\": \"2019-2023\",\n            \"location\": \"Benin, Nigeria\"\n        }\n    ]\n}.\n\nPlease make the output as compeling and convincing as possible to greatly increase the chances of the person getting hired. Okay The example  i provided above should not be a rigid template. Do when to edit it to suit the clients industry and use case. Okay if for any reason the user didnt provide enough information do well to engage him/her and ask for the missing info in a friendly conversational manner.",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

const prisma = new PrismaClient()

class ElectionService {

    async generate(personal_info,contact_info, skills, years_expirience, projects, professional_experience, education) {
        let input = `{
            "assistant": "Good morning, How are you doing?",
            "user":"Im very fine, Thank you",
            "assistant": " Okay, tell me about your self",
            "user":"${personal_info}",
            "assistant":"Okay. Give me your contact info.. address, phone number, social media and the rest?",
            "user":"${contact_info}"
            "assistant":"Wonderful, so tell me what tools do you use and what skills do you have?",
            "user":"${skills}",
            "assistant":"Great. So how long hae you been doing this?",
            "user":"${years_expirience}",
            "assistant":"Nice. So tell me about any of your projects that you have done that you are proud of.",
            "user":"${projects}",
            "assistant": "Cool, is there any professional experince you will like to share?",
            "user":"${professional_experience}",
            "assistant":"Good, Tell me about your educational background",
            "user":" ${education}" ,
            "assistant":" Thanks for your time, Ill now give this to the resume writer. He will get back to you with a well prepared resume",
            "user":"Thank You"
        }`

        const chatSession = model.startChat({
            generationConfig,
         // safetySettings: Adjust safety settings
         // See https://ai.google.dev/gemini-api/docs/safety-settings
            history: [
              {
                role: "user",
                parts: [
                  {text: "transcript:\n{\n    \"assistant\": \"Good morning, How are you doing?\",\n    \"user\":\"Im very fine, Thank you\",\n    \"assistant\": \" Okay, tell me about your self\",\n    \"user\":\" Okay. My name Is Osakue Omoruyi and I am a product designer\",\n    \"assistant\":\"Wonderful, so tell me what tools do you use for product design\",\n    \"user\":\"Okay, i use figma mainly for designing and prototyping, i also use adobe photoshop and illustrator.\",\n    \"assistant\":\"Great. So how long hae you been doing this?\",\n    \"user\":\"well i started learning about 3 years ago, but i landed my first gig just a year ago\",\n    \"assistant\":\"Nice. So tell me about any of your projects that you have done that you are proud of.\",\n    \"user\":\"Okay, One that stand out for me is when i was able to do a make over, more like a remix for youtube interface, i made it very well mor user friendly and interactive. you can check out the design at https://desingn.com\",\n    \"assistant\":\"Amazing. okay you said you landed your first gig a year ago, tell me about that experince\",\n    \"user\":\"yeah, i worked as a contact product designer with JPMorgan Technologies from october last year to febuary this year. While on the job i was solely responsible for creating large scale enterprice designs for their mobile and web applications. i also colaborated with the developers to make it a success. Its an ecommerce organization by the way.\",\n    \"assistant\": \"Cool, Is there any other professional experince you will like to share?\",\n    \"user\":\"Absolutely! Beyond my core role as a product designer, I have had the opportunity to engage in several enriching professional experiences that have broadened my skill set and perspective.One notable experience was my involvement in a cross-functional team at a mid-sized tech startup where I played a pivotal role in the development of a new SaaS platform. This project required close collaboration with engineers, product managers, and marketing teams to ensure a seamless user experience from conception to launch. I led user research initiatives, conducted usability testing, and iterated on design prototypes based on feedback, which resulted in a 30% increase in user engagement post-launch. Additionally, I participated in a global design sprint organized by a leading design consultancy, which aimed to solve complex social issues through design thinking. My team focused on improving accessibility in urban transportation. We developed a prototype for an inclusive mobile app that provided real-time accessibility information for public transit users. Our project was recognized for its innovative approach and is now being considered for further development by a city municipality. Furthermore, I have mentored junior designers as part of a professional development program within my organization. This involved conducting regular design reviews, providing constructive feedback, and guiding them through best practices in user-centered design. Watching them grow and succeed has been incredibly rewarding and has sharpened my leadership and communication skills. These experiences have not only enhanced my design capabilities but also reinforced my passion for creating meaningful, user-focused solutions. I am excited to bring this diverse background and enthusiasm for innovation to my next role.\",\n    \"assistant\":\"Good, Tell me about your educational background\",\n    \"user\":\" I have a first class Bachelors honours in computer science from the university of lagos, nigeria. i attended from august 2019 to september 2023\",\n    \"assistant\":\" Thanks for your time, Ill now give this to the resume writer. He will get back to you with a well prepared resume\",\n    \"user\":\"Thank You\"\n}"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "{\n    \"NAME\": \"Osakue Omoruyi\",\n    \"ROLE\": \"Product Designer\",\n    \"about\": \"A highly creative and motivated Product Designer with one year of experience and a strong passion for crafting user-centered and visually appealing digital experiences. Proficient in using industry-standard design tools such as Figma, Adobe Photoshop, and Illustrator to create intuitive and engaging interfaces. Proven ability to collaborate effectively with cross-functional teams, including developers and product managers, to bring innovative ideas to life. Eager to contribute to challenging projects that demand a deep understanding of user needs and a commitment to delivering exceptional design solutions.\",\n    \"CONTACT_INFO\": {\n        \"address\": \"\",\n        \"phone\": \"\",\n        \"email\": \"\",\n        \"githubUrl\": \"\",\n        \"twitter\": \"\"\n    },\n    \"SKILLS\": {\n        \"languages\": [],\n        \"frameworks\": [\n            \"Figma\",\n            \"Adobe Photoshop\",\n            \"Adobe Illustrator\"\n        ],\n        \"databases\": []\n    },\n    \"EXPERIENCE\": [\n        {\n            \"company_name\": \"JPMorgan Technologies\",\n            \"role\": \"Contract Product Designer\",\n            \"duration\": \"OCTOBER 2022 - FEBRUARY 2023\",\n            \"key_achievments\": \"Successfully designed large-scale enterprise designs for mobile and web applications within a fast-paced e-commerce environment. Collaborated effectively with developers to implement designs, ensuring a seamless transition from concept to production.\"\n        }\n    ],\n    \"PROJECTS\":[\n        {\n            \"project_name\":\"Youtube Interface Redesign\",\n            \"description\":\"Revamped the YouTube interface to enhance user-friendliness and interactivity, resulting in a more intuitive and engaging platform. This project showcased my ability to analyze existing designs and identify areas for improvement, ultimately creating a more user-centered experience.\",\n            \"url\":\"https://desingn.com\"\n        }\n    ],\n    \"EDUCATION\": [\n        {\n            \"course\": \"B.sc Computer Science (First Class Honours)\",\n            \"school\": \"University of Lagos, Nigeria\",\n            \"duration\": \"AUGUST 2019 - SEPTEMBER 2023\",\n            \"location\": \"Lagos, Nigeria\"\n        }\n    ]\n}\n"},
                ],
              },
            ],
          });
        
          const result = await chatSession.sendMessage(`Transcript: \n ${input}`);
          console.log(result.response.text());

          return JSON.parse(result.response.text())
    };




}

module.exports = new ElectionService()







// >= 1 and less than 1 + 24hrs

