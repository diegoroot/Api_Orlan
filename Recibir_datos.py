import mysql.connector
from flask import Flask, jsonify, request
from datetime import timedelta
from datetime import datetime
import json
from flask_cors import cross_origin
from flask_cors import CORS
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="",
  database = "Cultivo"
)
mycursor = mydb.cursor()

app = Flask(__name__)
@app.route('/registrar',methods=['POST'])
def pintar():
    #INSERT INTO `Registros`(`Reg_Id`, `Id_Sen`, `Reg_Tem`, `Reg_Hum`, `Reg_Fec`) VALUES (1,1,29,42,"2020-02-25 13:41:00")
    consulta = "INSERT INTO Registros(Id_Sen, Reg_Tem, Reg_Hum, Reg_Fec) VALUES "
    content = request.get_json(silent=True)
    id = content['Id_sen']
    temp = content['Reg_tem']
    hum = content['Reg_hum']
    now = datetime.now()
    fecha = now.strftime('%Y-%m-%d')
    consulta += '('+ str(id)+','+str(temp)+','+str(hum)+",'"+str(fecha)+"')"
    print(consulta)
    mycursor.execute(consulta)
    mydb.commit()
    mycursor.close()
    return 'ya'

cors = CORS(app, resources={r"/leer": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/leer',methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def pintar1():
    consulta = "SELECT * FROM Registros"
    mycursor.execute(consulta)
    row_headers=[x[0] for x in mycursor.description]
    myresult = mycursor.fetchall()
    json_data=[]
    data = []
    #print(jsonify(myresult))
    for x in myresult:
        data1 = []
        data1.append(x[0])
        data1.append(x[1])
        data1.append(x[2])
        data1.append(x[3])
        data1.append(x[4].strftime("%d/%m/%Y"))
        data.append(dict(zip(row_headers,data1)))
        print(data)
    return json.dumps(data)

cors = CORS(app, resources={r"/leerTemp": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/leerTemp',methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def pintar5():
    consulta = "SELECT Registros.Reg_Hum, Registros.Reg_Tem FROM Registros ORDER BY Registros.Reg_Fec DESC LIMIT 1"
    mycursor.execute(consulta)
    row_headers=[x[0] for x in mycursor.description]
    myresult = mycursor.fetchall()
    json_data=[]
    data = []
    #print(jsonify(myresult))
    for x in myresult:
        data1 = []
        data1.append(x[0])
        data1.append(x[1])
        #data1.append(x[2])
        #data1.append(x[3])
        #data1.append(x[4].strftime("%d/%m/%Y"))
        data.append(dict(zip(row_headers,data1)))
        print(x)
    return json.dumps(data)

#SELECT AVG(Registros.Reg_Tem), AVG(Registros.Reg_Hum),Registros.Reg_Fec FROM `Registros` GROUP BY Registros.Reg_Fec LIMIT 2
cors = CORS(app, resources={r"/leerData": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/leerData',methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def pintar6():
    consulta = "SELECT AVG(Registros.Reg_Tem) AS Reg_Tem, AVG(Registros.Reg_Hum) AS Reg_Hum, Registros.Reg_Fec FROM Registros GROUP BY Registros.Reg_Fec LIMIT 4"
    mycursor.execute(consulta)
    row_headers=[x[0] for x in mycursor.description]
    myresult = mycursor.fetchall()
    json_data=[]
    data = []
    #print(jsonify(myresult))
    for x in myresult:
        data1 = []
        data1.append(str(x[0]))
        data1.append(str(x[1]))
        #data1.append(x[2])
        #data1.append(x[3])
        data1.append(x[2].strftime("%d/%m/%Y"))
        data.append(dict(zip(row_headers,data1)))
        print(x)
    return json.dumps(data)


@app.route('/leer_Id/<int:id_sensor>',methods=['GET'])
def pintar2(id_sensor):
    consulta = "SELECT * FROM Registros, Nodos WHERE Registros.Id_Sen = "+str(id_sensor)
    mycursor.execute(consulta)
    myresult = mycursor.fetchall()
    print('rows = '+ str(mycursor.rowcount))
    for x in myresult:
        print(x)
    return 'correcto'

@app.route('/leer_Fec',methods=['POST'])
def pintar3():
    consulta = "SELECT * FROM Registros WHERE Registros.Reg_Fec ="+"'"
    content = request.get_json(silent=True)
    fecha = content['Fecha']
    consulta +=fecha+"'"
    print(fecha)
    print(consulta)
    mycursor.execute(consulta)
    myresult = mycursor.fetchall()
    print('rows = '+ str(mycursor.rowcount))
    for x in myresult:
        print(x)
    return 'correcto'

if __name__ == '__main__':
    app.run(debug=True, port=5000)
