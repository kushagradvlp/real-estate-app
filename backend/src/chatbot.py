from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_openai import ChatOpenAI
import os
import json
import openai
import os
print(os.getcwd())
print(os.getcwd()+'/settings.json')
# Open and read the JSON file
with open(os.getcwd()+'/settings.json') as f:
    settings = json.load(f)

# Get the API key from the dictionary
api_key = settings.get("OpenAI_API_KEY")
print(api_key)


def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for frontend communication
    
    # Load API key from environment variable
    os.environ["OPENAI_API_KEY"] = api_key
    llm = ChatOpenAI(model_name='gpt-4o-mini')

    @app.route("/chat", methods=["POST"])
    def chat():
        data = request.json
        user_message = data.get("message")
        
        if not user_message:
            return jsonify({"error": "Message is required"}), 400
        
        try:
            ai_response = llm.invoke(user_message).content
            return jsonify({"reply": ai_response})
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
