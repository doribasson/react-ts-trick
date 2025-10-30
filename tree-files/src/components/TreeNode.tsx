// src/components/TreeNode.tsx
import React, { useState, useCallback } from 'react';
import { NodeData, fetchChildren } from '../data/api';
import { Folder, FolderOpen, File } from 'lucide-react';
import './FileTree.css';

interface TreeNodeProps {
  node: NodeData;
  cache: Map<string, NodeData[]>;
  setCache: React.Dispatch<React.SetStateAction<Map<string, NodeData[]>>>;
  depth: number;
  onFileClick: (file: NodeData) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, cache, setCache, depth, onFileClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<NodeData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = useCallback(async () => {
    if (node.FILE_TYPE === 'FOLDER') {
      if (!isOpen) {
        if (cache.has(node.SH)) {
          setChildren(cache.get(node.SH)!);
        } else {
          try {
            setLoading(true);
            setError(null);
            const data = await fetchChildren(node.SH);
            setCache((prev) => new Map(prev).set(node.SH, data));
            setChildren(data);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }
      }
      setIsOpen((prev) => !prev);
    } else {
      onFileClick(node);
    }
  }, [node, isOpen, cache, setCache, onFileClick]);

  return (
    <li>
      <div
        className="tree-item"
        style={{ paddingLeft: `${depth * 16}px` }}
        onClick={handleToggle}
      >
        {node.FILE_TYPE === 'FOLDER' ? (
          isOpen ? <FolderOpen className="icon folder" /> : <Folder className="icon folder" />
        ) : (
          <File className="icon file" />
        )}
        <span>{node.NAME}</span>
      </div>

      {loading && <p className="tree-loading">Loading...</p>}
      {error && <p className="tree-error">{error}</p>}

      {isOpen && children && (
        <ul>
          {children.map((child) => (
            <TreeNode
              key={child.SH}
              node={child}
              cache={cache}
              setCache={setCache}
              depth={depth + 1}
              onFileClick={onFileClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
