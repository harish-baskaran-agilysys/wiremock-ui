import React, { useState, useEffect } from "react";
import Button from "wiremock/components/native/button";
import Header from "wiremock/components/native/header";
import Logo from "wiremock/components/native/logo";

const LOCAL_STORAGE_KEY = "wiremock_folders";

const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

const FolderNode = ({ node, onAddSubfolder, onAddItem }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{ marginLeft: 10 }}>
      <div className="flex justify-between">
        <div>
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? "📂" : "📁"}
          </button>
          {node.name}
        </div>
        <div className="flex gap-2">
          <Logo
            icon="fas fa-folder"
            onClick={() => onAddSubfolder(node.id)}
            className="text-sky-600 mt-1"
          />
          <Logo
            icon="fas fa-file"
            onClick={() => onAddItem(node.id)}
            className="text-sky-600 mt-1 mr-3"
          />
        </div>
      </div>
      {expanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FolderNode
              key={child.id}
              node={child}
              onAddSubfolder={onAddSubfolder}
              onAddItem={onAddItem}
            />
          ))}
          {node.items?.length > 0 && (
            <ul style={{ marginLeft: 10 }}>
              {node.items.map((item, i) => (
                <li key={i}>📄 {item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const FolderTree = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setTreeData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(treeData));
  }, [treeData]);

  const addFolder = (parentId = null) => {
    const name = prompt("Folder name?");
    if (!name) return;

    const newFolder = { id: generateId(), name, children: [], items: [] };

    if (!parentId) {
      setTreeData([...treeData, newFolder]);
    } else {
      const updated = addFolderRecursive(treeData, parentId, newFolder);
      setTreeData(updated);
    }
  };

  const addItem = (folderId) => {
    const name = prompt("Item name?");
    if (!name) return;
    const updated = addItemRecursive(treeData, folderId, name);
    setTreeData(updated);
  };

  const addFolderRecursive = (nodes, targetId, newFolder) => {
    return nodes.map((node) => {
      if (node.id === targetId) {
        return { ...node, children: [...(node.children || []), newFolder] };
      } else if (node.children) {
        return {
          ...node,
          children: addFolderRecursive(node.children, targetId, newFolder),
        };
      }
      return node;
    });
  };

  const addItemRecursive = (nodes, targetId, newItem) => {
    return nodes.map((node) => {
      if (node.id === targetId) {
        return { ...node, items: [...(node.items || []), newItem] };
      } else if (node.children) {
        return {
          ...node,
          children: addItemRecursive(node.children, targetId, newItem),
        };
      }
      return node;
    });
  };

  return (
    <div className="ml-2 h-[90vh] border-2 border-sky-300 w-[25%]">
      <div className="flex justify-between pb-2 border-b-2 border-sky-300">
        <Header label="📁 Stub Folder Structure" />
        <Logo
          icon="fas fa-folder"
          onClick={() => addFolder(null)}
          className="text-sky-600 mt-3 mr-3"
        />
      </div>
      <div>
        {treeData.length === 0 && <p>No folders yet.</p>}
        {treeData.map((folder) => (
          <FolderNode
            key={folder.id}
            node={folder}
            onAddSubfolder={addFolder}
            onAddItem={addItem}
          />
        ))}
      </div>
    </div>
  );
};

export default FolderTree;
