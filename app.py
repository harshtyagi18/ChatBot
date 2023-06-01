from flask import Flask, render_template, request, jsonify, json
import openai

app = Flask(__name__)

openai.api_key = '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'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    message = request.json['message']
    completion = openai.Completion.create(
        model="text-davinci-003",
        prompt=message,
        temperature=1,
        max_tokens=256,
)
    response = {'message': completion.choices[0].text.strip()}
    return jsonify(response)    


if __name__=='__main__':
    app.run()
