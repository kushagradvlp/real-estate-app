from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_openai import ChatOpenAI
import os
import json
import openai
import os

app = Flask(__name__)
CORS(app)

settings_path = os.path.join(os.getcwd(), 'settings.json')

try:
    with open(settings_path) as f:
        settings = json.load(f)
except FileNotFoundError:
    print("❌ settings.json not found at", settings_path)
    raise

# Get the API key from the dictionary
api_key = settings.get("OpenAI_API_KEY")
llm = ChatOpenAI(model_name="gpt-4o-mini", openai_api_key=api_key)

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

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
