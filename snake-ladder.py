import random
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Function to generate random snakes and ladders
def generate_snakes_and_ladders(count):
    positions = set()
    while len(positions) < count * 2:
        start = random.randint(2, 99)  # Generate start position between 2 and 99
        end = random.randint(1, start - 1)  # Generate end position less than start
        positions.add((start, end))
    return list(positions)

# Generate 5 random snakes and ladders
snakes = generate_snakes_and_ladders(12)
ladders = generate_snakes_and_ladders(9)

# Initial game state
game_state = {
    "players": [
        {"id": 1, "position": 0},
        {"id": 2, "position": 0}
    ],
    "ladders": ladders,
    "winner": None  # Add a winner field
}

def apply_snakes_and_ladders(position):
    for start, end in snakes:
        if position == start:
            return end
    for start, end in ladders:
        if position == start:
            return end
    return position

@app.route('/')
def index():
    return "Snake and Ladder Game API"

@app.route('/api/game-state', methods=['GET'])
def get_game_state():
    return jsonify(game_state)

@app.route('/api/move-player', methods=['POST'])
def move_player():
    data = request.get_json()
    player_id = data['playerId']
    dice_roll = data['diceRoll']
    player = next(p for p in game_state["players"] if p["id"] == player_id)

    new_position = player["position"] + dice_roll
    if new_position <= 100:
        new_position = apply_snakes_and_ladders(new_position)
        player["position"] = new_position

    # Check if the player has reached position 100
    if new_position == 100:
        game_state["winner"] = player_id

    return jsonify(game_state)

if __name__ == '__main__':
    app.run(debug=True)
