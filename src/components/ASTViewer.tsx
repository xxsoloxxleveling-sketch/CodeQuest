"use client";

import { useEffect, useState } from "react";
import ReactFlow, { 
  Background, 
  Controls, 
  Node, 
  Edge,
  MarkerType,
  BackgroundVariant
} from "reactflow";
import "reactflow/dist/style.css";

interface ASTViewerProps {
  code: string;
}

// A simple utility to generate a pseudo-AST for visualization if Pyodide AST parsing is complex
// In a real scenario, we would parse this using Python's `ast` module via Pyodide.
// For now, we will build a simplified parser/visualizer based on basic Python syntax.
function generateASTNodes(code: string): { nodes: Node[], edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  if (!code.trim()) {
    return { nodes, edges };
  }

  // Root Node
  nodes.push({
    id: "root",
    position: { x: 250, y: 50 },
    data: { label: "Module" },
    style: { 
      background: "#161a2f", 
      color: "#dee1fd", 
      border: "1px solid #5eead4",
      borderRadius: "8px",
      fontWeight: "bold",
      boxShadow: "0 0 10px rgba(94, 234, 212, 0.2)"
    }
  });

  const lines = code.split("\n").filter(l => l.trim().length > 0);
  
  lines.forEach((line, index) => {
    const nodeId = `stmt-${index}`;
    let label = "Statement";
    let color = "#bdc2ff"; // secondary

    if (line.includes("print(") || line.includes("System.out.print")) {
      label = line.includes("System.out.print") ? `Call: System.out.println` : `Call: print`;
      color = "#818cf8";
    } else if (line.includes("=")) {
      const cleanLine = line.trim().replace(";", "");
      const parts = cleanLine.split("=");
      const assignParts = parts[0].trim().split(/\s+/);
      const varName = assignParts[assignParts.length - 1];
      label = `Assign: ${varName}`;
      color = "#b5fff0";
    } else if (line.startsWith("def ")) {
      label = `FunctionDef`;
      color = "#fba76e";
    } else if (line.trim().startsWith("public class") || line.trim().startsWith("class ")) {
      label = `ClassDef`;
      color = "#f59e0b";
    } else if (line.trim().startsWith("public static void main") || line.trim().startsWith("public void main")) {
      label = `MethodDef: main`;
      color = "#fba76e";
    } else if (line.trim().startsWith("#") || line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) {
      label = "Comment";
      color = "#bbcac5";
    }

    nodes.push({
      id: nodeId,
      position: { x: 250 + (Math.random() * 40 - 20), y: 150 + index * 80 },
      data: { label },
      style: {
        background: "#0e1226",
        color: "#dee1fd",
        border: `1px solid ${color}`,
        borderRadius: "8px",
      }
    });

    edges.push({
      id: `e-root-${nodeId}`,
      source: index === 0 ? "root" : `stmt-${index - 1}`,
      target: nodeId,
      animated: true,
      style: { stroke: "#34384e" },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#34384e",
      },
    });
  });

  return { nodes, edges };
}

export default function ASTViewer({ code }: ASTViewerProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = generateASTNodes(code);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [code]);

  return (
    <div className="w-full h-full bg-background rounded-xl overflow-hidden border border-secondary/10">
      <ReactFlow 
        nodes={nodes} 
        edges={edges}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#34384e" />
        <Controls 
          className="bg-surface-container-high border-secondary/20 fill-on-surface" 

        />
      </ReactFlow>
    </div>
  );
}
