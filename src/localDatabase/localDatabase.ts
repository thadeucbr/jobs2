import fs from 'fs';
import path from 'path';

const PATHNAME = path.join(__dirname, '/data.json')
export function openFile(): string[] {
  try {
    return JSON.parse(fs.readFileSync(PATHNAME, 'utf-8'))
  } catch (err) {
    console.log(err)
    fs.writeFileSync(PATHNAME, '[]')
    return []
  }
}

export function validateIfUrlExists(url: string): boolean {
  try {
    const localData = openFile()
    const urlExists = localData.some((storedUrl) => storedUrl === url)
    return urlExists
  } catch (err) {
    console.log((err as Error).message)
    return false
  }
}

export function saveUrl(url: string): void {
  try {
    let localData = openFile()
    localData.push(url)
    fs.writeFileSync(PATHNAME, JSON.stringify(localData))
  } catch (err) {
    console.log((err as Error).message)
  }
}