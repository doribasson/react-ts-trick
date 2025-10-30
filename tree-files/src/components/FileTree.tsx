// src/components/FileTree.tsx
import React, { useEffect, useState } from 'react';
import { NodeData, fetchChildren } from '../data/api';
import TreeNode from './TreeNode';
import './FileTree.css';

const FileTree: React.FC = () => {
  const [root, setRoot] = useState<NodeData[] | null>(null);
  const [cache, setCache] = useState<Map<string, NodeData[]>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<NodeData | null>(null);

  useEffect(() => {
    const loadRoot = async () => {
      try {
        const rootData = await fetchChildren('ROOT');
        setRoot(rootData);
        setCache(new Map([['ROOT', rootData]]));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadRoot();
  }, []);

  if (loading) return <p className="tree-loading">Loading tree...</p>;
  if (error) return <p className="tree-error">{error}</p>;

  return (
    <div className="filetree-container">
      <ul className="filetree">
        {root?.map((node) => (
          <TreeNode
            key={node.SH}
            node={node}
            cache={cache}
            setCache={setCache}
            depth={0}
            onFileClick={setSelectedFile}
          />
        ))}
      </ul>

      <div className="file-preview">
        {selectedFile ? (
          <div>
            <h2>📄 {selectedFile.NAME}</h2>
            <p className="preview-text">File content preview goes here.</p>
          </div>
        ) : (
          <p className="preview-text">Select a file to preview...</p>
        )}
      </div>
    </div>
  );
};

export default FileTree;
















// // src/components/FileTree.tsx
// import React, { useEffect, useState } from 'react';
// import { NodeData, fetchChildren } from '../data/api';
// import TreeNode from './TreeNode';
// import './FileTree.css';

// const FileTree: React.FC = () => {
//   const [root, setRoot] = useState<NodeData[] | null>(null);
//   const [cache, setCache] = useState<Map<string, NodeData[]>>(new Map());
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedFile, setSelectedFile] = useState<NodeData | null>(null);

//   useEffect(() => {
//     const loadRoot = async () => {
//       try {
//         const rootData = await fetchChildren('ROOT');
//         setRoot(rootData);
//         setCache(new Map([['ROOT', rootData]]));
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadRoot();
//   }, []);

//   if (loading) return <p className="tree-loading">Loading tree...</p>;
//   if (error) return <p className="tree-error">{error}</p>;

//   return (
//     <div className="filetree-container">
//       <ul className="filetree">
//         {root?.map((node) => (
//           <TreeNode
//             key={node.SH}
//             node={node}
//             cache={cache}
//             setCache={setCache}
//             depth={0}
//             onFileClick={setSelectedFile}
//           />
//         ))}
//       </ul>

//       <div className="file-preview">
//         {selectedFile ? (
//           <div>
//             <h2>📄 {selectedFile.NAME}</h2>
//             <p className="preview-text">File content preview goes here.</p>
//           </div>
//         ) : (
//           <p className="preview-text">Select a file to preview...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileTree;























// // import React, { useState, useCallback, useEffect } from 'react';
// // import { NodeData } from '../types';
// // import { fetchChildren } from '../api';
// // import { Folder, FolderOpen, File } from 'lucide-react';
// // // import './FileTree.css'; // 👈 נשתמש בקובץ ה־CSS

// // interface TreeNodeProps {
// //   node: NodeData;
// //   cache: Map<string, NodeData[]>;
// //   setCache: React.Dispatch<React.SetStateAction<Map<string, NodeData[]>>>;
// //   depth: number;
// // }

// // const TreeNode: React.FC<TreeNodeProps> = ({ node, cache, setCache, depth }) => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [children, setChildren] = useState<NodeData[] | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);


// // useEffect(() => {
// //   console.log("📦 Cache updated:", Array.from(cache.entries()));
// // }, [cache]);

// //   const handleToggle = useCallback(async () => {
// //     if (node.FILE_TYPE === 'FOLDER') {
// //       if (!isOpen) {
// //         if (cache.has(node.SH)) {
// //           setChildren(cache.get(node.SH)!);
// //         } else {
// //           try {
// //             setLoading(true);
// //             setError(null);

// //             const data = await fetchChildren(node.SH);
// //             setCache((prev) => new Map(prev).set(node.SH, data));
// //             setChildren(data);
// //           } catch (err: any) {
// //             setError(err.message || 'Failed to load folder');
// //           } finally {
// //             setLoading(false);
// //           }
// //         }
// //       }
// //       setIsOpen((prev) => !prev);
// //     } else {
// //       alert(`📄 Opening file: ${node.NAME}`);
// //     }
// //   }, [node, isOpen, cache, setCache]);

// //   return (
// //     <li className={`tree-node depth-${depth}`}>
// //       <div onClick={handleToggle} className="tree-item">
// //         {node.FILE_TYPE === 'FOLDER' ? (
// //           isOpen ? <FolderOpen className="icon folder" /> : <Folder className="icon folder" />
// //         ) : (
// //           <File className="icon file" />
// //         )}
// //         <span>{node.NAME}</span>
// //       </div>

// //       {loading && <p className="loading">Loading...</p>}
// //       {error && <p className="error">⚠️ {error}</p>}

// //       {isOpen && children && (
// //         <ul className="children">
// //           {children.map((child) => (
// //             <TreeNode
// //               key={child.SH}
// //               node={child}
// //               cache={cache}
// //               setCache={setCache}
// //               depth={depth + 1}
// //             />
// //           ))}
// //         </ul>
// //       )}
// //     </li>
// //   );
// // };

// // interface FileTreeProps {
// //   root: NodeData;
// // }

// // const FileTree: React.FC<FileTreeProps> = ({ root }) => {
// //   const [cache, setCache] = useState<Map<string, NodeData[]>>(new Map());

// //   return (
// //     <ul className="file-tree">
// //       <TreeNode node={root} cache={cache} setCache={setCache} depth={0} />
// //     </ul>
// //   );
// // };

// // export default FileTree;
