/// <reference lib="webworker" />

let pyodide: any = null;

self.onmessage = async (event) => {
  const { id, python } = event.data;

  try {
    if (!pyodide) {
      self.postMessage({ id, status: "loading", message: "Loading Python environment..." });
      
      // Load Pyodide from CDN dynamically
      importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");
      
      // @ts-ignore
      pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
      });
    }

    self.postMessage({ id, status: "running", message: "Executing code..." });

    // Inject Game API
    pyodide.runPython(`
import sys
import io
import js
import json

class GameAPI:
    def say(self, text):
        payload = json.dumps({"type": "GAME_ACTION", "action": "say", "text": text})
        js.postMessage(js.JSON.parse(payload))
    
    def open_gate(self):
        payload = json.dumps({"type": "GAME_ACTION", "action": "open_gate"})
        js.postMessage(js.JSON.parse(payload))

game = GameAPI()

sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
    `);

    // Run the user's code
    await pyodide.runPythonAsync(python);

    // Get the captured output
    const stdout = pyodide.runPython("sys.stdout.getvalue()");
    const stderr = pyodide.runPython("sys.stderr.getvalue()");

    self.postMessage({ 
      id, 
      status: "success", 
      output: stdout, 
      error: stderr 
    });
  } catch (error: any) {
    self.postMessage({ 
      id, 
      status: "error", 
      error: error.message || String(error) 
    });
  }
};
