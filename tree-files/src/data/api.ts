// src/data/api.ts
export type NodeData = {
  SH: string;
  NAME: string;
  FILE_TYPE: 'FILE' | 'FOLDER';
};

const fileTreeData: Record<string, NodeData[]> = {
  ROOT: [
    { SH: 'SH1', NAME: 'src', FILE_TYPE: 'FOLDER' },
    { SH: 'SH2', NAME: 'readme.md', FILE_TYPE: 'FILE' },
  ],
  SH1: [
    { SH: 'SH3', NAME: 'components', FILE_TYPE: 'FOLDER' },
    { SH: 'SH4', NAME: 'App.tsx', FILE_TYPE: 'FILE' },
  ],
  SH3: [
    { SH: 'SH5', NAME: 'Header.tsx', FILE_TYPE: 'FILE' },
    { SH: 'SH6', NAME: 'Footer.tsx', FILE_TYPE: 'FILE' },
  ],
};

export const fetchChildren = async (key: string): Promise<NodeData[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = fileTreeData[key];
      if (data) resolve(data);
      else reject(new Error(`No data found for key ${key}`));
    }, 400);
  });
};
