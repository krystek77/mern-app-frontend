export const getExtensionFile = (filename) => {
  const tab = filename.split('.');
  return tab[tab.length - 1];
};

export default getExtensionFile;
