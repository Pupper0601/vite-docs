import { writeFile } from 'fs/promises';
import { readdir, stat } from 'fs/promises';
import { extname, join } from 'path';

async function getMarkdownFiles(dirPath) {
  let entries = await readdir(dirPath, { withFileTypes: true });
  let filePromises = entries.map(entry => {
    let fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      return getMarkdownFiles(fullPath);
    } else if (extname(entry.name) === '.md' && entry.name !== 'index.md' && entry.name !== 'nav.md') {
      return fullPath.replace('docs/', '');
    }
  });
  let files = await Promise.all(filePromises);
  return files.flat().filter(Boolean);
}

async function processMarkdownFiles(mdFiles) {
  return mdFiles.reduce((acc, filePath) => {
    let parts = filePath.split('/');
    let mdFile = parts.pop().split('.md')[0];
    let key = "/" + parts.join('/') + "/";
    let text = parts[parts.length - 1].split('.').pop();
    let link = "/" + filePath.split(".md")[0];

    let existingItems = acc[key];
    if (!existingItems) {
      existingItems = acc[key] = [{ "text": text, "items": [] }];
    }
    let existingItem = existingItems.find(item => item.text === text);
    if (!existingItem) {
      existingItem = { "text": text, "items": [] };
      existingItems.push(existingItem);
    }
    existingItem.items.push({ text: mdFile, link });

    return acc;
  }, {});
}

export async function updateSidebar() {
  try {
    const mdFiles = await getMarkdownFiles('docs');
    const result = await processMarkdownFiles(mdFiles);
    await writeFile('./docs/.vitepress/configs/series.json', JSON.stringify(result, null, 2));
    console.log('侧边栏更新成功');
  } catch (err) {
    console.error(err);
  }
}
