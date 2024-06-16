from flask import Flask, render_template, jsonify
import pandas as pd
import numpy as np
import pickle
import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense, LeakyReLU
from keras.optimizers import Adam
from keras import backend as K

app = Flask(__name__, static_folder='static', template_folder='templates')
patient_ID=''

# import scalar for consistant scaling
with open('models/robust_scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

# Recreate the model architecture
model = Sequential()
model.add(Dense(activation='leaky_relu', input_dim=19, units=19, kernel_initializer="glorot_normal"))
model.add(Dense(activation='leaky_relu', units=128, kernel_initializer="glorot_normal"))
model.add(Dense(activation='leaky_relu', units=64, kernel_initializer="glorot_normal"))
model.add(Dense(activation='leaky_relu', units=32, kernel_initializer="glorot_normal"))
model.add(Dense(units=10))
model.compile(optimizer = Adam(learning_rate=0.001))

# Load the previously saved weights
model.load_weights('models/model_weights.h5')

# Load patient data
data=pd.read_csv('data/KMI_data_cleaned_with_ID.csv')


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ID/<string:ID>')
def patient_data(ID):
    global patient_ID
    patient_ID=ID
    return render_template('index.html')

@app.route('/initial_fetch_prediction', methods=['GET'])
def initial_fetch_prediction():
    global patient_ID
    if (patient_ID==''):
        patient_ID='P00020'
    initial_data=data[data['ID'] == patient_ID].values[0][1:21].tolist()
    return jsonify(initial_data)

@app.route('/predict_val/<float:weight>/<float:waist>/<float:strength>/<float:aerobic>/<float:alcohol1>/<float:alcohol2>/<float:smoking>/<float:white_blood_cells>/<float:height>/<float:platelets>/<float:hemoglobin>/<float:amylase>/<float:ratio>/<float:red_blood_cells>/<float:iron>/<float:age>/<float:lymphocytes>/<float:total_protein>/<float:hypertension>/<float:pH>', methods=['GET'])
def predict_val(weight, waist, strength, aerobic, alcohol1, alcohol2, smoking, white_blood_cells, height, platelets, hemoglobin, amylase, ratio, red_blood_cells, iron, age, lymphocytes, total_protein, hypertension, pH):
    if (alcohol1==2): alcohol1=12
    if (alcohol1==3): alcohol1=52
    input_data = np.array([[weight, waist, strength, aerobic, alcohol1*alcohol2, smoking, white_blood_cells, height, platelets, hemoglobin, amylase, ratio, red_blood_cells, iron, age, lymphocytes, total_protein, hypertension, pH]])
    normalized_test_data = scaler.transform(input_data)
    prediction = model.predict(normalized_test_data)
    prediction = prediction.tolist()[0]
    prediction = [float(p) for p in prediction]
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)