"""
Flask Backend for Learning Journal PWA
FGCT6021 Mobile Application Development

Student: Mykel Yadav (ID: 2321764)

This Flask application provides RESTful API endpoints for:
- Reflections (CRUD operations)
- Projects (CRUD operations)

Data is persisted in JSON files for durability.
API contract matches the Express.js backend exactly.
"""

import json
import os
import uuid
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
                "id": str(uuid.uuid4()),
                "name": "Mykel Yadav",
                "date": "Mon Jan 13 2025",
                "reflection": "This week I learned about HTML structure and semantic elements. I found it interesting how proper semantic HTML improves both accessibility and SEO. The most challenging part was understanding when to use section vs article elements.",
                "week": 1
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Mykel Yadav",
                "date": "Mon Jan 20 2025",
                "reflection": "Explored CSS Flexbox and Grid layouts. Grid is incredibly powerful for creating complex layouts with minimal code. I spent extra time practicing media queries to ensure my Learning Journal is fully responsive across all device sizes.",
                "week": 2
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Mykel Yadav",
                "date": "Mon Jan 27 2025",
                "reflection": "JavaScript DOM manipulation was the focus this week. I implemented a dynamic navigation menu and theme switcher. The event handling concepts finally clicked after building the form validation feature.",
                "week": 3
            }
        ]
        save_json(REFLECTIONS_FILE, initial_reflections)
    
    if not os.path.exists(PROJECTS_FILE):
        initial_projects = [
            {
                "id": str(uuid.uuid4()),
                "title": "Learning Journal PWA",
                "description": "A Progressive Web App for documenting weekly learning reflections with offline support, installability, and dynamic data fetching.",
                "technologies": ["HTML5", "CSS3", "JavaScript", "React", "PWA"],
                "imageUrl": None,
                "demoUrl": "/",
                "date": "Jan 2025"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Responsive Portfolio",
                "description": "A mobile-first responsive portfolio website showcasing projects and skills with CSS Grid and Flexbox layouts.",
                "technologies": ["HTML5", "CSS3", "Flexbox", "Grid"],
                "imageUrl": None,
                "demoUrl": None,
                "date": "Dec 2024"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Theme Switcher Component",
                "description": "A reusable dark/light mode toggle component using CSS custom properties and localStorage for persistence.",
                "technologies": ["JavaScript", "CSS", "LocalStorage"],
                "imageUrl": None,
                "demoUrl": None,
                "date": "Nov 2024"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Flask REST API",
                "description": "Backend API for the Learning Journal using Flask framework with JSON file storage for reflections data.",
                "technologies": ["Python", "Flask", "REST API", "JSON"],
                "imageUrl": None,
                "demoUrl": None,
                "date": "Feb 2025"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Service Worker Demo",
                "description": "Implementation of service workers for offline caching and background sync capabilities.",
                "technologies": ["JavaScript", "Service Workers", "Cache API"],
                "imageUrl": None,
                "demoUrl": None,
                "date": "Mar 2025"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Form Validation Library",
                "description": "A lightweight form validation library with custom rules and real-time feedback using the Validation API.",
                "technologies": ["JavaScript", "Validation API", "DOM"],
                "imageUrl": None,
                "demoUrl": None,
                "date": "Oct 2024"
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


@app.route('/api/reflections/<reflection_id>', methods=['GET'])
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
    
    if 'name' not in data or 'reflection' not in data:
        return jsonify({"error": "Missing required fields: name, reflection"}), 400
    
    reflections = load_json(REFLECTIONS_FILE)
    
    new_reflection = {
        "id": str(uuid.uuid4()),
        "name": data['name'],
        "date": datetime.now().strftime("%a %b %d %Y"),
        "reflection": data['reflection'],
        "week": data.get('week')
    }
    
    reflections.append(new_reflection)
    save_json(REFLECTIONS_FILE, reflections)
    
    return jsonify(new_reflection), 201


@app.route('/api/reflections/<reflection_id>', methods=['PUT'])
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
                "name": data.get('name', r['name']),
                "reflection": data.get('reflection', r['reflection']),
                "week": data.get('week', r.get('week'))
            }
            save_json(REFLECTIONS_FILE, reflections)
            return jsonify(reflections[i])
    
    return jsonify({"error": "Reflection not found"}), 404


@app.route('/api/reflections/<reflection_id>', methods=['DELETE'])
def delete_reflection(reflection_id):
    """Delete a reflection."""
    reflections = load_json(REFLECTIONS_FILE)
    
    original_length = len(reflections)
    reflections = [r for r in reflections if r['id'] != reflection_id]
    
    if len(reflections) == original_length:
        return jsonify({"error": "Reflection not found"}), 404
    
    save_json(REFLECTIONS_FILE, reflections)
    return '', 204


@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get all projects."""
    projects = load_json(PROJECTS_FILE)
    return jsonify(projects)


@app.route('/api/projects/<project_id>', methods=['GET'])
def get_project(project_id):
    """Get a specific project by ID."""
    projects = load_json(PROJECTS_FILE)
    project = next((p for p in projects if p['id'] == project_id), None)
    if project:
        return jsonify(project)
    return jsonify({"error": "Project not found"}), 404


@app.route('/api/projects', methods=['POST'])
def create_project():
    """Create a new project."""
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    required_fields = ['title', 'description', 'technologies', 'date']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    projects = load_json(PROJECTS_FILE)
    
    new_project = {
        "id": str(uuid.uuid4()),
        "title": data['title'],
        "description": data['description'],
        "technologies": data['technologies'],
        "imageUrl": data.get('imageUrl'),
        "demoUrl": data.get('demoUrl'),
        "date": data['date']
    }
    
    projects.append(new_project)
    save_json(PROJECTS_FILE, projects)
    
    return jsonify(new_project), 201


@app.route('/api/projects/<project_id>', methods=['DELETE'])
def delete_project(project_id):
    """Delete a project."""
    projects = load_json(PROJECTS_FILE)
    
    original_length = len(projects)
    projects = [p for p in projects if p['id'] != project_id]
    
    if len(projects) == original_length:
        return jsonify({"error": "Project not found"}), 404
    
    save_json(PROJECTS_FILE, projects)
    return '', 204


@app.route('/<path:path>')
def serve_static(path):
    """Serve static files or fall back to index.html for SPA routing."""
    if os.path.exists(os.path.join(STATIC_FOLDER, path)):
        return send_from_directory(STATIC_FOLDER, path)
    return send_from_directory(STATIC_FOLDER, 'index.html')


if __name__ == '__main__':
    ensure_data_files()
    app.run(host='0.0.0.0', port=5000, debug=True)
