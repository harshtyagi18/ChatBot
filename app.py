from flask import Flask, render_template, request, jsonify, json
import openai

app = Flask(__name__)

openai.api_key = 'API_KEY'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    message = request.json['message']
    completion = openai.Completion.create(
        engine="text-davinci-003",
        prompt=message,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )
    response = {'message': completion.choices[0].text.strip()}
    return jsonify(response)


if __name__=='__main__':
    app.run()
