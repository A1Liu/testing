import type { z } from 'zod';

export async function parseFormData<T extends object>(
  request: Request,
  schema: z.Schema<T>
): Promise<T> {
  const data = await request.formData();

  const record: Record<string, unknown> = {};
  for (const key in schema) {
    record[key] = data.get(key);
  }

  return schema.parse(record);
}
