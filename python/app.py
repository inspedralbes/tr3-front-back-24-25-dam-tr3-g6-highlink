from flask import Flask, request, jsonify
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure
import matplotlib.pyplot as plt
import io
import base64
from dotenv import load_dotenv
import os #provides ways to access the Operating System and allows us to read the environment variables
import time

load_dotenv()  # take environment variables from .env.

app = Flask(__name__)

# Step 1: Connect to MongoDB
def connect_to_mongodb(host='mongo', port=27017, db_name='mydatabase', collection_name='mycollection', username=None, password=None, auth_source='admin', auth_mechanism='SCRAM-SHA-1'):
    
    try:
    
        client = MongoClient(
                host=host,
                port=port,
                username=username,
                password=password,
                authSource=auth_source,
                authMechanism=auth_mechanism
            )
        
        client.admin.command('ping')
        print("Connected to MongoDB!")
        
        # Access the database and collection
        db = client[db_name]
        collection = db[collection_name]
        return collection

    except ConnectionFailure as e:
        print("Failed to connect to MongoDB:", e)
        raise
    except OperationFailure as e:
        print("Authentication failed:", e)
        raise

# Step 2: Fetch all documents from the collection
def fetch_data(collection, game_id):
    query = {"game_id": game_id}
    return list(collection.find(query))

# Step 3: Extract height values from the data
def extract_heights(data):
    heights = []
    for document in data:
        if 'height' in document:  # Ensure the 'height' field exists
            heights.append(document['height'])
    return heights

# # Step 4: Plot a line graph using Matplotlib and return it as a base64-encoded image
# def plot_line_graph(heights):
#     plt.plot(heights, marker='o')
#     plt.title('Height Values Line Graph')
#     plt.xlabel('Index')
#     plt.ylabel('Height')
#     plt.grid(True)

#     # Save the plot to a BytesIO object
#     buf = io.BytesIO()
#     plt.savefig(buf, format='png')
#     buf.seek(0)
#     plt.close()

#     # Encode the image as base64
#     image_base64 = base64.b64encode(buf.read()).decode('utf-8')
#     return image_base64

def plot_line_graph_save_as_image(heights, game_id):
    plt.plot(heights, marker='o')
    plt.title(f'Height Values Line Graph for game {game_id}')
    plt.xlabel('Index')
    plt.ylabel('Height')
    plt.grid(True)

    # time = int(time.time()) 
    # Save the plot to the "images" folder
    image_path = f'images/game_{game_id}_graph.png'
    plt.savefig(image_path)
    plt.close()

    return image_path


# Flask endpoint to trigger the script
@app.route('/run-script/<int:game_id>', methods=['POST'])
def run_script(game_id):
    try:
        # MongoDB connection details
        host = os.getenv("PYMONGO_HOST")
        port = int(os.getenv("PYMONGO_PORT"))
        db_name = os.getenv("PYMONGO_DB")
        collection_name = os.getenv("PYMONGO_COLLECTION")
        username = os.getenv("PYMONGO_INITDB_ROOT_USERNAME")  # Replace with your MongoDB username
        password = os.getenv("PYMONGO_INITDB_ROOT_PASSWORD")  # Replace with your MongoDB password
        auth_source = 'admin'  # Replace with the authentication database
        auth_mechanism = 'SCRAM-SHA-1'  # Replace if using a different mechanism

        # Connect to MongoDB
        collection = connect_to_mongodb(host, port, db_name, collection_name, username, password, auth_source, auth_mechanism)

        print("collection: ",collection)

        # Fetch data
        data = fetch_data(collection, game_id)

        print("data: ", data)
        # Extract height values
        heights = extract_heights(data)
        print("Heights: ", heights)

        # Plot the line graph and get the base64-encoded image
        # image_base64 = plot_line_graph(heights)

        # Plot the line graph and save it to the "images" folder
        image_path = plot_line_graph_save_as_image(heights, game_id)

        print("Image path: ", image_path)

        # Return the result as JSON
        # return jsonify({
        #     "status": "success",
        #     "image": image_base64
        # })
    
        # Return the result as JSON
        return jsonify({
            "status": "success",
            "case_id": game_id,
            "image_path": image_path
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(5000))