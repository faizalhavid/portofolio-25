export async function loadJsonArray(filePath: string): Promise<object[]> {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error('Failed to load JSON');
    return await response.json();
}
