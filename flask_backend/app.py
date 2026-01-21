"""
Flask Backend for Learning Journal PWA
FGCT6021 Mobile Application Development

Student: Mykel Yadav (ID: 2321764)

This Flask application provides RESTful API endpoints for:
- Reflections (CRUD operations)
- Projects (Read operations)

Data is persisted in JSON files for durability.
"""

import json
import os
from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

STATIC_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'dist', 'public')
app = Flask(__name__, static_folder=STATIC_FOLDER, static_url_path='')
CORS(app, resources={r"/api/*": {"origins": "*"}})

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

REFLECTIONS_FILE = os.path.join(DATA_DIR, 'reflections.json')
PROJECTS_FILE = os.path.join(DATA_DIR, 'projects.json')


def ensure_data_files():
    """Ensure data directory and files exist with initial data."""
    os.makedirs(DATA_DIR, exist_ok=True)
    
    if not os.path.exists(REFLECTIONS_FILE):
        initial_reflections = [
            {
                "id": 1,
                "weekNumber": 1,
                "title": "Introduction to Mobile Development",
                "content": "This week I learned about the fundamentals of mobile application development...",
                "learnings": "Key concepts: PWA, responsive design, mobile-first approach",
                "challenges": "Setting up the development environment",
                "createdAt": datetime.now().isoformat()
            },
            {
                "id": 2,
                "weekNumber": 2,
                "title": "HTML & CSS Fundamentals",
                "content": "Explored semantic HTML and modern CSS techniques...",
                "learnings": "Flexbox, Grid, CSS Variables",
                "challenges": "Cross-browser compatibility",
                "createdAt": datetime.now().isoformat()
            }
        ]
        save_json(REFLECTIONS_FILE, initial_reflections)
    
    if not os.path.exists(PROJECTS_FILE):
        initial_projects = [
            {
                "id": 1,
                "title": "Learning Journal PWA",
                "description": "A Progressive Web App for documenting weekly learning in mobile development.",
                "technologies": ["React", "Flask", "PWA", "Tailwind CSS"],
                "imageUrl": "/placeholder-project.svg",
                "liveUrl": "#",
                "githubUrl": "https://github.com/mycall175-lgtm/learning-journal-PWA"
            },
            {
                "id": 2,
                "title": "Tic Tac Toe Game",
                "description": "Classic game implemented as part of the mini project requirement.",
                "technologies": ["React", "TypeScript", "Game Logic"],
                "imageUrl": "/placeholder-project.svg",
                "liveUrl": "/game",
                "githubUrl": "#"
            },
            {
                "id": 3,
                "title": "Weather Dashboard",
                "description": "A weather application using third-party API integration.",
                "technologies": ["API Integration", "React Query", "Data Visualization"],
                "imageUrl": "/placeholder-project.svg",
                "liveUrl": "#",
                "githubUrl": "#"
            }
        ]
        save_json(PROJECTS_FILE, initial_projects)


def load_json(filepath):
    """Load data from a JSON file."""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_json(filepath, data):
    """Save data to a JSON file."""
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)


@app.route('/')
def serve_index():
    """Serve the React frontend."""
    return send_from_directory(STATIC_FOLDER, 'index.html')


@app.route('/api/reflections', methods=['GET'])
def get_reflections():
    """Get all reflections."""
    reflections = load_json(REFLECTIONS_FILE)
    return jsonify(reflections)


@app.route('/api/reflections/<int:reflection_id>', methods=['GET'])
def get_reflection(reflection_id):
    """Get a specific reflection by ID."""
    reflections = load_json(REFLECTIONS_FILE)
    reflection = next((r for r in reflections if r['id'] == reflection_id), None)
    if reflection:
        return jsonify(reflection)
    return jsonify({"error": "Reflection not found"}), 404


@app.route('/api/reflections', methods=['POST'])
def create_reflection():
    """Create a new reflection."""
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    required_fields = ['weekNumber', 'title', 'content']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    reflections = load_json(REFLECTIONS_FILE)
    
    new_id = max([r['id'] for r in reflections], default=0) + 1
    
    new_reflection = {
        "id": new_id,
        "weekNumber": data['weekNumber'],
        "title": data['title'],
        "content": data['content'],
        "learnings": data.get('learnings', ''),
        "challenges": data.get('challenges', ''),
        "createdAt": datetime.now().isoformat()
    }
    
    reflections.append(new_reflection)
    save_json(REFLECTIONS_FILE, reflections)
    
    return jsonify(new_reflection), 201


@app.route('/api/reflections/<int:reflection_id>', methods=['PUT'])
def update_reflection(reflection_id):
    """Update an existing reflection."""
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    reflections = load_json(REFLECTIONS_FILE)
    
    for i, r in enumerate(reflections):
        if r['id'] == reflection_id:
            reflections[i] = {
                **r,
                "weekNumber": data.get('weekNumber', r['weekNumber']),
                "title": data.get('title', r['title']),
                "content": data.get('content', r['content']),
                "learnings": data.get('learnings', r.get('learnings', '')),
                "challenges": data.get('challenges', r.get('challenges', ''))
            }
            save_json(REFLECTIONS_FILE, reflections)
            return jsonify(reflections[i])
    
    return jsonify({"error": "Reflection not found"}), 404


@app.route('/api/reflections/<int:reflection_id>', methods=['DELETE'])
def delete_reflection(reflection_id):
    """Delete a reflection."""
    reflections = load_json(REFLECTIONS_FILE)
    
    original_length = len(reflections)
    reflections = [r for r in reflections if r['id'] != reflection_id]
    
    if len(reflections) == original_length:
        return jsonify({"error": "Reflection not found"}), 404
    
    save_json(REFLECTIONS_FILE, reflections)
    return jsonify({"message": "Reflection deleted successfully"})


@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get all projects."""
    projects = load_json(PROJECTS_FILE)
    return jsonify(projects)


@app.route('/api/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    """Get a specific project by ID."""
    projects = load_json(PROJECTS_FILE)
    project = next((p for p in projects if p['id'] == project_id), None)
    if project:
        return jsonify(project)
    return jsonify({"error": "Project not found"}), 404


@app.route('/<path:path>')
def serve_static(path):
    """Serve static files or fall back to index.html for SPA routing."""
    if os.path.exists(os.path.join(STATIC_FOLDER, path)):
        return send_from_directory(STATIC_FOLDER, path)
    return send_from_directory(STATIC_FOLDER, 'index.html')


if __name__ == '__main__':
    ensure_data_files()
    app.run(host='0.0.0.0', port=5000, debug=True)
