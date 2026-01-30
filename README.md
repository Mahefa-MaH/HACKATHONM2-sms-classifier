ISPM - Institut Supérieur Polytechnique de Madagascar (www.ispm-edu.com)

- Name of each member :
  LAZAHARIVELO Jakina Andriantsoa : Backend Developer;
  RAJOHNSON Fitia : Frontend developer;
  RAMANDIMBISON Ezra Niel : AI Expert;
  RANDRIANAVALONA Mahefa Nirina : DevOps;
  ANDRITIANA FANORENANTSOA Steddi Karen : Data Scientist;
  RANDRIANANDRAINA Jessica : Data Scientist;
  ANDRIANIRINA Tsanta Fitiavana : Frontend Developer.
  
- Stack description:
  Next.js : Next.js is an open-source React framework developed by Vercel that simplifies building fast, SEO-friendly, and scalable web applications.
  FastAPI : FastAPI is a modern, high-performance web framework for building APIs with Python, leveraging standard Python type hints for automatic data validation, serialization, and interactive documentation.
   
- Process description :
  The project is a *Machine Learning–based system for detecting spam and ham SMS messages*.
It follows a *client–server architecture*, with a front-end built using *Next.js* and a back-end developed with *FastAPI*.
The user enters an SMS message through the web interface.
The message is sent to the back-end via an HTTP request.
Before prediction, the text undergoes the same *preprocessing steps* used during training.
A *pre-trained Machine Learning model* is then used to classify the message.
The model was trained on a dataset *retrieved from Hugging Face via a public link*.
It predicts whether the message is *spam or ham*.
The model also returns a *confidence score or accuracy* associated with the prediction.
Finally, the result is sent back to the front-end and displayed to the user in real time.

- ML process description :
  Project Setup and Data Loading: Initialize the project by importing necessary libraries and loading the SMS Spam Collection dataset.
  Exploratory Data Analysis (EDA): Analyze the dataset to understand the distribution of spam and ham messages and engineered a 'message length' feature.
  Text Preprocessing and Vectorization: Clean the text data by removing punctuation and stopwords, and convert messages into numerical feature vectors using CountVectorizer (Bag of Words).
  Naive Bayes Model Training and Evaluation (Unigrams): Split the data into training and testing sets, train a Multinomial Naive Bayes classifier, and evaluate its performance using classification reports and confusion matrices.
  Feature Importance Analysis: Analyze and visualize the most important features (words/bigrams) identified by both the Random Forest model and the Naive Bayes model to understand what drives spam/ham classifications.
  Final Task: Summarize the overall project, comparing the performance of different models and highlighting key insights.

- Datasets :
https://huggingface.co/datasets/dbarbedillo/SMS_Spam_Multilingual_Collection_Dataset
- Hosted app link :
